import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import CodeBlock from './CodeBlock';
import SuggestedQuestions from './SuggestedQuestions';
import RegenerateIcon from './icons/RegenerateIcon';

interface ChatViewProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick: (question: string) => void;
  onRegenerate: () => void;
}

const BlinkingCursor: React.FC = () => (
  <span className="inline-block w-1 h-6 bg-indigo-500 animate-pulse ml-1" />
);

const parseResponse = (content: string) => {
    const parts = content.split(/(\`\`\`[a-zA-Z]*\n[\s\S]*?\n\`\`\`)/g);
    return parts.map((part, index) => {
        const codeBlockMatch = part.match(/\`\`\`([a-zA-Z]*)?\n([\s\S]*?)\n\`\`\`/);
        if (codeBlockMatch) {
            const language = codeBlockMatch[1] || 'plaintext';
            const code = codeBlockMatch[2];
            return { type: 'code', content: code, language, key: `code-${index}` };
        }
        return { type: 'text', content: part, key: `text-${index}` };
    }).filter(p => p.content.trim() !== '');
};

const ChatView: React.FC<ChatViewProps> = ({ messages, isLoading, onSuggestionClick, onRegenerate }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Cognito Coder
            </h1>
            <p className="text-slate-500 mt-2">Your AI-powered coding agent.</p>
        </div>
        <SuggestedQuestions onSuggestionClick={onSuggestionClick} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {messages.map((message, index) => {
          const parsedParts = message.role === 'model' ? parseResponse(message.content) : [];
          const isLastModelMessage = message.role === 'model' && index === messages.length - 1;
          
          return (
            <div
              key={index}
              className={`mb-2 flex group ${
                message.role === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div className="flex flex-col items-end max-w-full">
                <div
                  className={`p-4 rounded-xl shadow-sm ${
                    message.role === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white border border-slate-200 text-slate-800'
                  }`}
                  style={{ maxWidth: '90vw' }}
                >
                  {message.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      {parsedParts.map(part =>
                        part.type === 'code' ? (
                          <CodeBlock key={part.key} language={part.language} code={part.content} />
                        ) : (
                          <MarkdownRenderer key={part.key} text={part.content} />
                        )
                      )}
                    </div>
                  )}
                </div>
                {isLastModelMessage && !isLoading && (
                  <button onClick={onRegenerate} className="mt-2 p-1.5 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors opacity-0 group-hover:opacity-100" title="Regenerate response">
                    <RegenerateIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
            <div className="mb-6 flex justify-start">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm" style={{ maxWidth: '90%' }}>
                    <BlinkingCursor />
                </div>
            </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatView;