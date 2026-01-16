import React from 'react';
import { Star, Quote } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

const reviews = [
  { name: "김대표", company: "서초동 한우전문점", content: "오픈 초기라 막막했는데 플레이스 세팅부터 블로그 체험단까지 체계적으로 진행해주셔서 자리를 빨리 잡았습니다. 지난달 매출 역대 최고 찍었네요.", rating: 5 },
  { name: "이원장", company: "강남 피부과", content: "마케팅 회사를 여러 곳 써봤지만 여기만큼 피드백 빠르고 꼼꼼한 곳은 처음입니다. 데이터 분석해서 월별로 리포트 주는 게 정말 좋았어요.", rating: 5 },
  { name: "박대표", company: "온라인 쇼핑몰", content: "인스타그램 릴스랑 숏폼 영상 퀄리티가 너무 좋습니다. 브랜드 톤앤매너를 정확히 이해하고 계셔서 믿고 맡깁니다.", rating: 5 },
  { name: "최점장", company: "프랜차이즈 카페", content: "지역 타겟팅 광고 덕분에 동네 단골이 정말 많이 늘었어요. 비용 대비 효율이 확실히 나옵니다.", rating: 4 },
];

const Reviews: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Fullscreen Hero */}
      <section className="relative w-full h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
         {/* Korean Business Handshake */}
         <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop" 
            alt="Client Reviews" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/70"></div>
         <div className="relative z-10 text-center px-6">
            <RevealOnScroll>
               <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Client Reviews</h1>
               <p className="text-xl text-gray-300">성공한 파트너들의 생생한 이야기를 들어보세요.</p>
            </RevealOnScroll>
         </div>
      </section>

      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <div className="bg-white border border-gray-100 p-10 rounded-3xl relative hover:shadow-2xl transition-all h-full flex flex-col justify-between group hover:-translate-y-2">
                <div>
                  <Quote className="absolute top-8 right-8 w-10 h-10 text-gray-100 group-hover:text-brand-accent/20 transition-colors" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">"{review.content}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-blue-700 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.company}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;