import React from 'react';
import { Message } from '../types';

interface ContextMeterProps {
  messages: Message[];
}

// Using character count as a proxy for token count.
// A typical token is ~4 chars. Gemini Flash has a large context, but we'll set a
// practical soft limit to encourage users to start new chats for new topics for better performance.
// We'll set a soft limit around 30,000 characters (~7.5k tokens).
const CONTEXT_CHARACTER_LIMIT = 30000;

const ContextMeter: React.FC<ContextMeterProps> = ({ messages }) => {
  const totalChars = messages.reduce((acc, msg) => acc + msg.content.length, 0);
  const usagePercentage = Math.min((totalChars / CONTEXT_CHARACTER_LIMIT) * 100, 100);
  const roundedPercentage = Math.round(usagePercentage);

  let barColor = 'bg-indigo-500';
  let textColor = 'text-slate-500';
  let tooltipText = `This conversation is using ${totalChars.toLocaleString()} characters. The AI's memory is in a healthy state.`;

  if (usagePercentage > 85) {
    barColor = 'bg-red-500';
    textColor = 'text-red-600 font-semibold';
    tooltipText = `Context usage is very high (${totalChars.toLocaleString()} chars). The AI may start to forget earlier parts of the conversation. Consider starting a new chat for new topics.`;
  } else if (usagePercentage > 60) {
    barColor = 'bg-yellow-500';
    textColor = 'text-yellow-600 font-semibold';
    tooltipText = `Context usage is growing (${totalChars.toLocaleString()} chars). For the best performance with new topics, consider starting a new chat soon.`;
  }

  return (
    <div className="flex items-center gap-2" title={tooltipText}>
      <span className="text-xs font-medium text-slate-500">Context</span>
      <div className="w-20 md:w-24">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`${barColor} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
      </div>
       <span className={`text-xs w-10 text-right transition-colors duration-500 ${textColor}`}>
            {roundedPercentage}%
       </span>
    </div>
  );
};

export default ContextMeter;
