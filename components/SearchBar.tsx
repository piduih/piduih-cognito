import React, { useState } from 'react';
import StopIcon from './icons/StopIcon';

interface SearchBarProps {
  onSendMessage: (query: string) => void;
  isLoading: boolean;
  onStop: () => void;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);


const SearchBar: React.FC<SearchBarProps> = ({ onSendMessage, isLoading, onStop }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSendMessage(query.trim());
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto flex items-end gap-2">
            <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a coding question..."
            className="w-full p-3 text-base text-slate-900 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 resize-none"
            disabled={isLoading}
            rows={1}
            style={{maxHeight: '200px'}}
            onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
            }}
            />
            {isLoading ? (
                 <button
                    type="button"
                    onClick={onStop}
                    className="flex items-center justify-center w-auto h-12 text-slate-800 bg-slate-200 rounded-lg hover:bg-slate-300 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300 flex-shrink-0 px-4 gap-2"
                    aria-label="Stop generating"
                >
                    <StopIcon /> Stop
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={!query.trim()}
                    className="flex items-center justify-center w-12 h-12 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300 flex-shrink-0"
                    aria-label="Send message"
                >
                    <SendIcon />
                </button>
            )}
        </form>
    </div>
  );
};

export default SearchBar;