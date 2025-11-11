import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copyStatus, setCopyStatus] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus('Copy'), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg bg-white border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-100/70 rounded-t-md border-b border-slate-200">
        <span className="text-sm text-slate-500 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-1 text-sm text-slate-600 rounded-md hover:bg-slate-200 transition-colors"
          disabled={copyStatus === 'Copied!'}
        >
          {copyStatus === 'Copied!' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <ClipboardIcon className="h-4 w-4" />}
          {copyStatus}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{ margin: 0, borderRadius: '0 0 0.5rem 0.5rem', background: '#ffffff' }}
        codeTagProps={{ style: { fontFamily: '"Fira Code", monospace' } }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;