import React from 'react';
import { Star, Quote } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import { useData } from '../context/DataContext';

const Reviews: React.FC = () => {
  const { reviews } = useData();

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
            <RevealOnScroll key={review.id} delay={idx * 100}>
              <div className="bg-white border border-gray-200 p-10 rounded-3xl relative hover:shadow-2xl transition-all h-full flex flex-col justify-between group hover:-translate-y-2">
                <div>
                  <Quote className="absolute top-8 right-8 w-10 h-10 text-gray-100 group-hover:text-brand-accent/20 transition-colors" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  
                  {/* Content Rendering Logic */}
                  {review.type === 'image' && review.imageUrl ? (
                    <div className="mb-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                       <img src={review.imageUrl} alt="Review Screenshot" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <p className="text-gray-800 leading-relaxed mb-8 text-lg font-medium">"{review.content}"</p>
                  )}
                  
                </div>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-blue-700 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.company}</p>
                    <p className="text-xs text-gray-400 mt-1">{review.date}</p>
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