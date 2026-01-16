import React, { useState } from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { addInquiry } = useData();
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    phone: '',
    type: '플레이스 마케팅',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      addInquiry(formState);
      alert('문의가 성공적으로 접수되었습니다. 관리자 페이지에서 확인하실 수 있습니다.');
      setFormState({
        name: '',
        company: '',
        phone: '',
        type: '플레이스 마케팅',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-black">
         {/* Seoul City Night View */}
         <img 
            src="https://images.unsplash.com/photo-1546874177-9e664107314e?q=80&w=2000&auto=format&fit=crop" 
            alt="Contact Hero Seoul" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
         <div className="relative z-10 text-center px-6 max-w-4xl">
            <RevealOnScroll>
               <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Contact Us</h1>
               <p className="text-xl text-gray-300 font-light tracking-wide">
                  성공적인 비즈니스를 위한 첫 걸음,<br/>
                  GROWTH LAB이 함께합니다.
               </p>
            </RevealOnScroll>
         </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto -mt-20 relative z-20">
         <div className="flex flex-col lg:flex-row gap-12">
            {/* Info Card */}
            <div className="w-full lg:w-1/3">
               <RevealOnScroll>
                  <div className="bg-black text-white p-10 rounded-[2rem] shadow-2xl h-full flex flex-col justify-between">
                     <div>
                        <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
                        <p className="text-gray-400 mb-10 leading-relaxed">
                           마케팅 관련 문의사항이나 제휴 제안 등<br/>
                           궁금하신 점을 남겨주세요.
                        </p>
                        
                        <div className="space-y-8">
                           <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                 <Phone className="w-5 h-5" />
                              </div>
                              <div>
                                 <span className="block text-sm text-gray-400 mb-1">Phone</span>
                                 <p className="text-xl font-bold">02-1234-5678</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                 <Mail className="w-5 h-5" />
                              </div>
                              <div>
                                 <span className="block text-sm text-gray-400 mb-1">Email</span>
                                 <p className="text-lg font-medium">contact@growthlab.kr</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                 <MapPin className="w-5 h-5" />
                              </div>
                              <div>
                                 <span className="block text-sm text-gray-400 mb-1">Office</span>
                                 <p className="text-lg font-medium">서울시 강서구 양천로 547<br/>마스터밸류</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                 <Clock className="w-5 h-5" />
                              </div>
                              <div>
                                 <span className="block text-sm text-gray-400 mb-1">Hours</span>
                                 <p className="text-lg font-medium">Mon-Fri: 09:00 - 18:00</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </RevealOnScroll>
            </div>

            {/* Form */}
            <div className="w-full lg:w-2/3">
               <RevealOnScroll delay={100}>
                  <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
                     <h3 className="text-2xl font-bold text-gray-900 mb-8">무료 진단 상담 신청</h3>
                     <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 ml-1">담당자 성함</label>
                              <input 
                                 type="text" 
                                 required
                                 className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all outline-none font-medium"
                                 placeholder="홍길동"
                                 value={formState.name}
                                 onChange={(e) => setFormState({...formState, name: e.target.value})}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 ml-1">업체명</label>
                              <input 
                                 type="text" 
                                 required
                                 className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all outline-none font-medium"
                                 placeholder="(주)그로스랩"
                                 value={formState.company}
                                 onChange={(e) => setFormState({...formState, company: e.target.value})}
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 ml-1">연락처</label>
                              <input 
                                 type="tel" 
                                 required
                                 className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all outline-none font-medium"
                                 placeholder="010-0000-0000"
                                 value={formState.phone}
                                 onChange={(e) => setFormState({...formState, phone: e.target.value})}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 ml-1">문의 유형</label>
                              <select 
                                 className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all outline-none font-medium appearance-none"
                                 value={formState.type}
                                 onChange={(e) => setFormState({...formState, type: e.target.value})}
                              >
                                 <option>플레이스 마케팅</option>
                                 <option>네이버 클립</option>
                                 <option>유튜브 관리</option>
                                 <option>인스타그램</option>
                                 <option>체험단 마케팅</option>
                                 <option>기타 문의</option>
                              </select>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-sm font-bold text-gray-700 ml-1">문의 내용</label>
                           <textarea 
                              rows={5}
                              className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all outline-none font-medium resize-none"
                              placeholder="현재 운영중인 상황과 고민을 간단히 적어주세요."
                              value={formState.message}
                              onChange={(e) => setFormState({...formState, message: e.target.value})}
                           />
                        </div>

                        <div className="pt-4">
                           <button 
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-5 bg-brand-accent text-white font-bold text-lg rounded-xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50"
                           >
                              {isSubmitting ? '처리중...' : '무료 진단 신청하기'} <ArrowRight className="w-5 h-5" />
                           </button>
                           <p className="text-center text-xs text-gray-400 mt-4">
                              개인정보는 상담 목적으로만 사용되며, 안전하게 보호됩니다.
                           </p>
                        </div>
                     </form>
                  </div>
               </RevealOnScroll>
            </div>
         </div>
      </section>

      {/* Map Section with Interactive Iframe */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden h-96 relative group shadow-lg border border-gray-100">
             <iframe 
                title="Growth Lab Contact Map"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EC%84%9C%EA%B5%AC%20%EC%96%91%EC%B2%9C%EB%A1%9C%20547%20%EB%A7%88%EC%8A%A4%ED%84%B0%EB%B0%B8%EB%A5%98&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
         </div>
      </section>
    </div>
  );
};

export default Contact;