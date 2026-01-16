import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import { Gift, TrendingUp, ShieldCheck, Smartphone, Check } from 'lucide-react';

const Reward: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Fullscreen Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2000&auto=format&fit=crop" 
            alt="Reward Marketing Payment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
           <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-400/50 bg-yellow-400/10 text-yellow-400 mb-6 backdrop-blur-md">
                 <Gift className="w-4 h-4" />
                 <span className="text-sm font-bold uppercase tracking-wider">Performance Reward System</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                 확실한 보상,<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">폭발적인 트래픽</span>
              </h1>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                 유저에게 혜택을 제공하여 자발적인 참여를 유도합니다.<br/>
                 진성 유저 기반의 고품질 트래픽으로 순위 상승을 견인합니다.
              </p>
              <div className="flex gap-4 justify-center">
                 <button className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                    서비스 제안서 받기
                 </button>
              </div>
           </RevealOnScroll>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <RevealOnScroll className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
               <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-yellow-600" />
               </div>
               <h3 className="text-2xl font-bold mb-4">CPI / CPE / CPA</h3>
               <p className="text-gray-600 leading-relaxed">
                  앱 설치(CPI), 실행(CPE), 액션(CPA) 등<br/>
                  목표로 하는 행동에 대해서만 비용을 지불하는<br/>
                  합리적인 퍼포먼스 마케팅입니다.
               </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
               <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-blue-600" />
               </div>
               <h3 className="text-2xl font-bold mb-4">플레이스 트래픽 최적화</h3>
               <p className="text-gray-600 leading-relaxed">
                  리워드를 통해 실사용자의 검색 및 유입을 유도하여<br/>
                  플레이스 순위 로직에 최적화된<br/>
                  유효 트래픽을 공급합니다.
               </p>
            </RevealOnScroll>
            <RevealOnScroll delay={200} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
               <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-green-600" />
               </div>
               <h3 className="text-2xl font-bold mb-4">어뷰징 필터링 시스템</h3>
               <p className="text-gray-600 leading-relaxed">
                  중복 IP, 가상 머신 등 불량 트래픽을<br/>
                  실시간으로 차단하여<br/>
                  안전하고 깨끗한 결과를 보장합니다.
               </p>
            </RevealOnScroll>
         </div>
      </section>

      {/* Process Image Section */}
      <section className="py-20 bg-brand-black text-white">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               <RevealOnScroll>
                  <span className="text-yellow-500 font-bold tracking-wider uppercase mb-2 block">How it works</span>
                  <h2 className="text-4xl font-bold mb-8">유저와 브랜드가<br/>모두 만족하는 선순환 구조</h2>
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1">
                           <span className="font-bold text-yellow-500">1</span>
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">미션 참여</h4>
                           <p className="text-gray-400">유저가 브랜드의 미션(검색, 저장, 알림받기 등)에 참여합니다.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1">
                           <span className="font-bold text-yellow-500">2</span>
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">리워드 지급</h4>
                           <p className="text-gray-400">미션을 완수한 유저에게 즉시 포인트나 현금성 리워드를 지급합니다.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1">
                           <span className="font-bold text-yellow-500">3</span>
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">순위 상승 및 전환</h4>
                           <p className="text-gray-400">증가된 트래픽과 인터랙션으로 플랫폼 내 지수가 상승합니다.</p>
                        </div>
                     </div>
                  </div>
               </RevealOnScroll>
            </div>
            <div className="w-full md:w-1/2">
               <img 
                  src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1200&auto=format&fit=crop" 
                  alt="Financial Growth" 
                  className="rounded-3xl shadow-2xl opacity-90 hover:-translate-y-2 transition-transform duration-500"
               />
            </div>
         </div>
      </section>
    </div>
  );
};

export default Reward;