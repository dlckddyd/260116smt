import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ContentBlock } from '../data/content';

interface AccordionItemProps {
  question: string;
  blocks?: ContentBlock[]; 
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, blocks }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Custom CSS for rich text content, specifically targeting lists and nested accordions
  const richTextStyles = `
    .prose ol { counter-reset: list-counter; list-style: none; padding-left: 0; }
    .prose ol > li { position: relative; padding-left: 1.5rem; margin-bottom: 0.5rem; font-weight: 700; color: #111; }
    .prose ol > li::before { 
        content: counter(list-counter) "."; 
        counter-increment: list-counter; 
        position: absolute; 
        left: 0; 
        color: #2563eb; /* Brand Accent Blue */
        font-weight: 800;
    }
    
    /* Simulate the Green Bar style from Naver, adapted to Brand Blue */
    .prose ul.green-bar, .prose ol.green-bar {
        border-left: 4px solid #2563eb;
        padding-left: 1.5rem;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        background-color: #eff6ff;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-radius: 0 0.5rem 0.5rem 0;
    }

    /* Nested Details/Summary (Accordion inside Accordion) */
    .prose details {
        margin-bottom: 0.5rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: #fff;
    }
    .prose summary {
        padding: 1rem;
        cursor: pointer;
        font-weight: 600;
        background-color: #f9fafb;
        list-style: none; /* Hide default triangle */
        position: relative;
        padding-right: 2.5rem;
        transition: background-color 0.2s;
    }
    .prose summary:hover {
        background-color: #f3f4f6;
    }
    .prose summary::-webkit-details-marker {
        display: none;
    }
    .prose summary::after {
        content: '+';
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.2rem;
        color: #9ca3af;
        font-weight: normal;
    }
    .prose details[open] summary::after {
        content: '-';
    }
    .prose details[open] summary {
        border-bottom: 1px solid #e5e7eb;
        color: #2563eb;
    }
    .prose details > div, .prose details > p {
        padding: 1rem;
        background-color: #fff;
        font-size: 0.95rem;
        color: #4b5563;
        line-height: 1.6;
    }
  `;

  return (
    <div className="border-b border-gray-100 last:border-none bg-white">
      <style>{richTextStyles}</style>
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
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[20000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-gray-50/50 rounded-b-lg space-y-6">
           {blocks && blocks.map((block, index) => {
              if (block.type === 'text') {
                 // Inject logic to wrap simple ordered lists in a styling class if they look like the user screenshot
                 let content = block.content;
                 if (content.includes('<ol>') && !content.includes('class=')) {
                     content = content.replace('<ol>', '<ol class="green-bar">');
                 }

                 return (
                    <div 
                        key={block.id || index} 
                        className="text-gray-600 leading-relaxed font-medium prose prose-sm max-w-none prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: content }}
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