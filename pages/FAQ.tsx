import React, { useState, useEffect } from 'react';
import AccordionItem from '../components/Accordion';
import RevealOnScroll from '../components/RevealOnScroll';
import { useData } from '../context/DataContext';
import { Search, ChevronRight, HelpCircle } from 'lucide-react';

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
    // Search Implementation
    const textContent = item.blocks
        .filter(b => b.type === 'text')
        .map(b => b.content)
        .join(' ');
        
    const searchMatch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        textContent.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim().length > 0) {
        return searchMatch;
    }
    
    // Category match
    const itemCats = item.categories || []; 
    return itemCats.includes(activeCategory);
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden bg-brand-black">
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-brand-black z-0"></div>
         <div className="relative z-10 text-center px-6 max-w-3xl w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
               궁금한 점을<br className="md:hidden" /> 빠르게 찾아보세요
            </h1>
            
            {/* Search Bar */}
            <div className="relative w-full shadow-2xl">
               <input 
                  type="text" 
                  placeholder="검색어를 입력해주세요 (예: 비용, 노출)"
                  className="w-full py-4 pl-14 pr-6 rounded-full bg-white text-brand-black placeholder-gray-400 focus:ring-4 focus:ring-brand-accent/30 transition-all outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-accent" />
            </div>
         </div>
      </section>

      {/* Category Navigation - Responsive Layout */}
      {searchQuery.trim().length === 0 && (
          <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto py-4 px-4 md:px-0">
              {/* Mobile: Horizontal Scroll | Desktop: Wrap (Grid-like) */}
              <div className="flex overflow-x-auto md:flex-wrap md:justify-center md:overflow-visible gap-2 pb-2 md:pb-0">
                {categories.length > 0 ? categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border flex-shrink-0 mb-1 ${
                      activeCategory === category
                        ? 'bg-brand-accent text-white border-brand-accent shadow-md'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-brand-accent hover:text-brand-accent'
                    }`}
                  >
                    {category}
                  </button>
                )) : (
                  // Loading Skeleton for Categories
                  [1,2,3,4,5].map(i => (
                    <div key={i} className="h-10 w-24 bg-gray-100 rounded-full animate-pulse flex-shrink-0"></div>
                  ))
                )}
              </div>
            </div>
          </div>
      )}
      
      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12 min-h-[600px]">
        
        {/* Search Result Header */}
        {searchQuery.trim().length > 0 && (
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800">
                    '<span className="text-brand-accent">{searchQuery}</span>' 검색 결과 <span className="text-gray-400 text-sm ml-2">({filteredData.length}건)</span>
                </h2>
            </div>
        )}

        <RevealOnScroll>
           <div className="space-y-4">
             {filteredData.length > 0 ? (
               <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden divide-y divide-gray-100">
                   {filteredData.map((faq) => (
                     <AccordionItem 
                        key={faq.id} 
                        question={faq.question} 
                        blocks={faq.blocks}
                     />
                   ))}
               </div>
             ) : (
               <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      {searchQuery ? <Search className="w-8 h-8" /> : <HelpCircle className="w-8 h-8" />}
                  </div>
                  <p className="text-gray-500 font-medium text-lg">
                      {searchQuery ? '검색 결과가 없습니다.' : '해당 카테고리에 등록된 내용이 없습니다.'}
                  </p>
                  {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="mt-4 text-brand-accent font-bold hover:underline">
                          전체 목록 보기
                      </button>
                  )}
               </div>
             )}
           </div>
        </RevealOnScroll>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6 font-medium">원하시는 답변을 찾지 못하셨나요?</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-1">
            1:1 전문가 상담 신청 <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;