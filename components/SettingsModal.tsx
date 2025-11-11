import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newInstruction: string) => void;
  currentInstruction?: string;
}

const defaultInstruction = `You are Cognito Coder, an expert coding agent.
- Your primary goal is to provide accurate, efficient, and well-explained code.
- Always wrap code blocks in triple backticks (\`\`\`).
- Specify the language after the opening backticks (e.g., \`\`\`javascript).
- Provide a clear, concise explanation of what the code does, its dependencies, and how to use it.
- If the user asks a non-coding question, politely decline and state your purpose as a coding assistant.
- Your responses should be in markdown format.`;

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentInstruction }) => {
  const [instruction, setInstruction] = useState(currentInstruction || defaultInstruction);

  useEffect(() => {
    setInstruction(currentInstruction || defaultInstruction);
  }, [currentInstruction, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(instruction);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <header className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">Chat Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Customize the AI's instructions for this chat session.</p>
        </header>
        <main className="p-4 flex-1 overflow-y-auto">
          <label htmlFor="system-instruction" className="block text-sm font-medium text-slate-700 mb-2">
            System Prompt
          </label>
          <textarea
            id="system-instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            className="w-full h-full min-h-64 p-3 text-sm text-slate-900 bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 resize-none font-mono"
          />
        </main>
        <footer className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;