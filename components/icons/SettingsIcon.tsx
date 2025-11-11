import React from 'react';

const SettingsIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.226l.55-.22a2.25 2.25 0 0 1 2.164 0l.55.22a1.125 1.125 0 0 0 1.11 1.226c.552.099 1.023.52 1.226 1.11l.22.55a2.25 2.25 0 0 1 0 2.164l-.22.55a1.125 1.125 0 0 0-1.226 1.11c-.099.552-.52 1.023-1.11 1.226l-.55.22a2.25 2.25 0 0 1-2.164 0l-.55-.22a1.125 1.125 0 0 0-1.11-1.226c-.552-.099-1.023-.52-1.226-1.11l-.22-.55a2.25 2.25 0 0 1 0-2.164l.22-.55c.203-.552.674-.973 1.226-1.11ZM12 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </svg>
);

export default SettingsIcon;