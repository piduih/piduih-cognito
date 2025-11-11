import React from 'react';

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  // Split by bold and italic markers, keeping the delimiters.
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <div className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-bold text-slate-800">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index} className="italic text-slate-700">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      })}
    </div>
  );
};

export default MarkdownRenderer;