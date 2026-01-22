import React, { useState, useEffect } from 'react';
import AccordionItem from '../components/Accordion';
import RevealOnScroll from '../components/RevealOnScroll';
import { useData } from '../context/DataContext';
import { Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const { faqs, categories } = useData();
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Set initial category when data loads
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
        setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const filteredData = faqs.filter(item => {
    // Search Implementation: If query exists, ignore category and search everything
    const textContent = item.blocks
        .filter(b => b.type === 'text')
        .map(b => b.content)
        .join(' ');
        
    const searchMatch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        textContent.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim().length > 0) {
        return searchMatch;
    }
    
    // Check if category matches (handling both single category string and array of categories)
    const itemCats = item.categories || []; 
    // Fallback for old data structure if needed, though DataContext handles migration
    return itemCats.includes(activeCategory);
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex flex-col items-center justify-center overflow-hidden bg-brand-black">
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-brand-black z-0"></div>
         <div className="relative z-10 text-center px-6 max-w-3xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">무엇을 도와드릴까요?</h1>
            
            {/* Search Bar */}
            <div className="relative w-full">
               <input 
                  type="text" 
                  placeholder="질문 키워드를 검색해보세요 (예: 비용, 예약)"
                  className="w-full py-4 pl-14 pr-6 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:bg-white focus:text-brand-black focus:placeholder-gray-500 transition-all outline-none text-lg backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
         </div>
      </section>

      {/* Category Navigation - Hide when searching */}
      {searchQuery.trim().length === 0 && (
          <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm py-4">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                       setActiveCategory(category);
                       setSearchQuery(""); // Reset search on category change
                    }}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                      activeCategory === category
                        ? 'bg-green-600 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
      )}
      
      {/* Search Result Indicator */}
      {searchQuery.trim().length > 0 && (
          <div className="max-w-4xl mx-auto px-6 pt-12 pb-2">
              <h2 className="text-xl font-bold text-gray-800">
                  '<span className="text-brand-accent">{searchQuery}</span>' 검색 결과 ({filteredData.length}건)
              </h2>
          </div>
      )}

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-8 min-h-[500px]">
        <RevealOnScroll>
           <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
             {filteredData.length > 0 ? (
               filteredData.map((faq) => (
                 <AccordionItem 
                    key={faq.id} 
                    question={faq.question} 
                    blocks={faq.blocks}
                 />
               ))
             ) : (
               <div className="p-12 text-center text-gray-500">
                  {searchQuery ? (
                      <p className="text-lg">검색 결과가 없습니다.</p>
                  ) : (
                      <p className="text-lg">해당 카테고리에 등록된 질문이 없습니다.</p>
                  )}
               </div>
             )}
           </div>
        </RevealOnScroll>

        <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8">
          <p className="text-gray-600 mb-4 font-medium">원하시는 답변을 찾지 못하셨나요?</p>
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-brand-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all">
            1:1 상담 문의하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;