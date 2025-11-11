import React from 'react';

interface SuggestedQuestionsProps {
    onSuggestionClick: (question: string) => void;
}

const questions = [
    "Create a React button component with a loading state",
    "Write a python function to fetch data from an API",
    "How to center a div with CSS Flexbox?",
    "Generate a SQL query to find duplicate emails",
];

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSuggestionClick }) => {
    return (
        <div className="mt-8 text-center w-full max-w-3xl">
            <h3 className="text-slate-500 mb-4">Or try one of these:</h3>
            <div className="flex flex-wrap justify-center gap-3">
                {questions.map((q) => (
                    <button 
                        key={q} 
                        onClick={() => onSuggestionClick(q)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-full text-slate-600 hover:bg-slate-100 hover:border-indigo-500 transition-colors duration-200"
                    >
                        {q}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SuggestedQuestions;
