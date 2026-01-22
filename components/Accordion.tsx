import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ContentBlock } from '../data/content';

interface AccordionItemProps {
  question: string;
  blocks?: ContentBlock[]; 
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, blocks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-none bg-white">
      <button
        className="w-full py-6 px-4 flex justify-between items-center text-left focus:outline-none group hover:bg-gray-50 transition-colors rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-[17px] font-bold transition-colors ${isOpen ? 'text-brand-accent' : 'text-gray-800 group-hover:text-brand-accent'}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-brand-accent flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-brand-accent flex-shrink-0 ml-4" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-gray-50/50 rounded-b-lg space-y-6">
           {blocks && blocks.map((block, index) => {
              if (block.type === 'text') {
                 return (
                    <div 
                        key={block.id || index} 
                        className="text-gray-600 leading-relaxed font-medium prose prose-sm max-w-none prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800"
                        // Render HTML content safely
                        dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                 );
              } else if (block.type === 'image') {
                 return (
                    <div key={block.id || index} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm my-4">
                       <img 
                          src={block.content} 
                          alt={`Content ${index}`} 
                          className="w-full h-auto object-cover"
                       />
                    </div>
                 );
              }
              return null;
           })}
           
           {(!blocks || blocks.length === 0) && (
              <p className="text-gray-400">내용이 없습니다.</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;