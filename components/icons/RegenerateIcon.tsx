import React from 'react';

const RegenerateIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0M2.985 19.644l3.182-3.182m0 0-3.182 3.183m7.5-11.664a8.25 8.25 0 1 0 0 11.664" />
    </svg>
);

export default RegenerateIcon;
