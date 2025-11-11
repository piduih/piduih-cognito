import React, { useState, useMemo } from 'react';
import { ChatSession } from '../types';
import TrashIcon from './icons/TrashIcon';

interface HistorySidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  isOpen: boolean;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ sessions, activeSessionId, onSelectSession, onNewChat, onDeleteSession, isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = useMemo(() => {
    if (!searchQuery) {
      return sessions;
    }
    return sessions.filter(session =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sessions, searchQuery]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent the session from being selected when deleting
    onDeleteSession(id);
  };

  return (
    <aside className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'w-64 translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 flex-shrink-0 w-64 space-y-4">
        <button
          onClick={onNewChat}
          className="w-full text-center font-semibold text-indigo-600 border-2 border-indigo-500 rounded-lg py-2 hover:bg-indigo-50 transition-colors duration-200"
        >
          + New Chat
        </button>
        <input
          type="text"
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 text-sm text-slate-900 bg-slate-100 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"
        />
      </div>
      <div className="overflow-y-auto flex-1 w-64 px-4 pb-4">
        <h2 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider px-2">History</h2>
        {filteredSessions.length === 0 ? (
          <p className="text-sm text-slate-500 px-2">{searchQuery ? 'No matches found.' : 'No chat history yet.'}</p>
        ) : (
          <ul>
            {filteredSessions.map((session) => (
              <li key={session.id} className="mb-1 group">
                <button
                  onClick={() => onSelectSession(session.id)}
                  className={`w-full flex justify-between items-center text-left text-sm p-2 rounded-md transition-colors duration-200 truncate ${
                    activeSessionId === session.id
                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  title={session.title}
                >
                  <span className="truncate">{session.title}</span>
                  <span
                    onClick={(e) => handleDelete(e, session.id)} 
                    className="ml-2 p-1 rounded-md text-slate-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete chat"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default HistorySidebar;