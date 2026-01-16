import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-none">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-brand-accent' : 'text-gray-200 group-hover:text-white'}`}>
          Q. {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-brand-accent" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-gray-400 leading-relaxed pl-4 border-l-2 border-brand-accent/30">
          {answer.split('\n').map((line, i) => (
            <p key={i} className="mb-2 last:mb-0">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;