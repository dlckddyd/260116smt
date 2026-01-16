import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';

const portfolios = [
  { category: "Place", title: "강남 OOO 맛집", result: "월 매출 200% 상승", img: "https://picsum.photos/600/400?random=20" },
  { category: "Instagram", title: "패션 브랜드 D사", result: "팔로워 1만 달성", img: "https://picsum.photos/600/400?random=21" },
  { category: "YouTube", title: "법무법인 K", result: "구독자 5만 돌파", img: "https://picsum.photos/600/400?random=22" },
  { category: "Clip", title: "성수동 카페 A", result: "조회수 100만 달성", img: "https://picsum.photos/600/400?random=23" },
  { category: "Place", title: "홍대 미용실 S", result: "예약률 1위 달성", img: "https://picsum.photos/600/400?random=24" },
  { category: "Experience", title: "화장품 브랜드 M", result: "리뷰 500건 확보", img: "https://picsum.photos/600/400?random=25" },
];

const Portfolio: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Fullscreen Hero */}
      <section className="relative w-full h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop" 
            alt="Portfolio Hero" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/70"></div>
         <div className="relative z-10 text-center px-6">
            <RevealOnScroll>
               <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Portfolio</h1>
               <p className="text-xl text-gray-300">우리가 만들어낸 숫자가 실력을 증명합니다.</p>
            </RevealOnScroll>
         </div>
      </section>

      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 50}>
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300">{item.result}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;