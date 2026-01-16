import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import { Gift, TrendingUp, ShieldCheck, Smartphone, Check, AlertTriangle, ArrowDown, Target, Zap, MousePointer } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reward: React.FC = () => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section - Focused on Result */}
      <section className="relative pt-32 pb-20 px-6 text-center bg-gray-50">
         <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 mb-6 font-bold text-sm">
                리워드 · 자체 프로그램 기반
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
               1페이지의 핵심은<br/>결국 <span className="text-blue-600">트래픽</span>입니다.
            </h1>
            <p className="text-xl text-gray-500 mb-10">
               압도적인 실사용자 유입으로 순위 상승의 공식을 완성합니다.
            </p>
            <Link to="/contact" className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
               무료 상담 신청하기
            </Link>
            
            <div className="mt-16 max-w-5xl mx-auto">
               <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                  alt="Dashboard Platform" 
                  className="rounded-2xl shadow-2xl border border-gray-200"
               />
            </div>
         </RevealOnScroll>
      </section>

      {/* 2. Problem Section */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">현재 광고를 하더라도<br/>이런 문제가 반복되고 있으신가요?</h2>
                  <p className="text-gray-500">단순 노출만으로는 더 이상 매출이 오르지 않습니다.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { title: "검색 결과에 내 상품이 없나요?", desc: "경쟁사 상품은 계속 노출되는데, 내 상품은 10페이지 뒤에 숨어있지 않나요?" },
                     { title: "매출이 상승하지 않나요?", desc: "비싼 광고비를 집행해도 실제 구매로 이어지지 않아 고민이신가요?" },
                     { title: "노출이 유지되지 않나요?", desc: "잠깐 1페이지에 올라갔다가 금방 순위가 떨어져서 불안하신가요?" }
                  ].map((item, idx) => (
                     <div key={idx} className="bg-gray-50 p-8 rounded-3xl text-center hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                     </div>
                  ))}
               </div>
               
               <div className="mt-12 text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-blue-800 font-bold text-lg">
                     플랫폼은 '구매자와 유사한 행동패턴'을 기준으로<br className="md:hidden"/> 인기있는 상품을 판단하기 때문입니다.
                  </p>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 3. Solution Section */}
      <section className="py-24 px-6 bg-gray-900 text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto relative z-10">
            <RevealOnScroll>
               <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                     스마트마케팅 플레이스는<br/>
                     <span className="text-blue-400">리워드와 프로그램</span>을 활용하여<br/>
                     사용자 행동 패턴을 설계합니다.
                  </h2>
                  <p className="text-gray-400">플랫폼이 평가하는 로직에 정확히 부합하는 트래픽을 공급합니다.</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-white/10 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                     <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold mb-6">리워드</div>
                     <h3 className="text-2xl font-bold mb-4">실사용자의 검색·클릭·체류 흐름을<br/>설계하는 리워드</h3>
                     <p className="text-gray-400 mb-8 leading-relaxed">
                        실제 사용자 행동을 바탕으로 한 유효타 데이터를 생성합니다. 
                        초기에 만드는 데 사용할 수 있어요. 단순 클릭이 아닌 체류시간까지 확보합니다.
                     </p>
                     <img 
                        src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800&auto=format&fit=crop" 
                        className="w-full h-48 object-cover rounded-xl opacity-80" 
                        alt="Reward Logic"
                     />
                  </div>
                  <div className="bg-white/10 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                     <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-6">프로그램</div>
                     <h3 className="text-2xl font-bold mb-4">실제 구매자 유사 행동 패턴을<br/>설계하는 프로그램</h3>
                     <p className="text-gray-400 mb-8 leading-relaxed">
                        자체적인 반복 프로그램을 통해 인위적인 반복 없이 계정 리스크를 줄일 수 있어요.
                        다양한 디바이스 환경을 구축하여 정밀하게 타겟팅합니다.
                     </p>
                     <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" 
                        className="w-full h-48 object-cover rounded-xl opacity-80" 
                        alt="Program Logic"
                     />
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 4. Effect Graph Section */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">설계된 방식은<br/>실제 순위 상승으로 이어졌습니다.</h2>
               </div>
               
               {/* Mockup Graphs */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                     { k: "쿠팡", rank: "1위", up: "22위 상승" },
                     { k: "플레이스", rank: "1위", up: "86위 상승" },
                     { k: "스마트스토어", rank: "1위", up: "54위 상승" },
                     { k: "쇼핑검색", rank: "2위", up: "12위 상승" }
                  ].map((item, idx) => (
                     <div key={idx} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-xs text-gray-400 mb-2">{item.k} 키워드</div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{item.rank}</div>
                        <div className="text-sm text-red-500 font-bold flex items-center gap-1">
                           <TrendingUp className="w-4 h-4" /> {item.up}
                        </div>
                        <div className="mt-4 h-16 bg-gray-50 rounded-lg flex items-end justify-center pb-2 px-2 overflow-hidden">
                           <div className="w-full h-full bg-gradient-to-t from-red-100 to-transparent relative">
                              <div className="absolute bottom-0 w-full bg-red-400 h-[2px]"></div>
                              <div className="absolute bottom-0 left-0 w-full h-full bg-red-400/10 transform skew-y-12 origin-bottom-left"></div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="mt-8 text-center text-sm text-gray-400">
                  * 구매자와 유사한 행동 패턴이 누적되며, 각 플랫폼에서 1페이지 진입을 포함한 실제 순위 상승 결과 확인
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 5. Process Detail */}
      <section className="py-24 px-6 bg-gray-50">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6">순위가 오를 수 밖에 없는 조건</h2>
                  <p className="text-gray-600">플랫폼은 특정 방식이 아니라 '구매자와 유사한 행동 패턴'이 어떻게 누적됐는지 평가합니다.</p>
               </div>

               <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                  <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-gray-100">
                     <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white font-bold text-xl">1</div>
                     <h3 className="text-xl font-bold mb-3">검색 및 유입</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">
                        키워드 검색을 통해 자연스럽게 상품을 찾고 클릭합니다. 체류 시간을 확보하여 이탈률을 낮춥니다.
                     </p>
                  </div>
                  <ArrowDown className="md:hidden text-gray-300" />
                  <div className="hidden md:block w-16 h-1 bg-gray-200"></div>
                  
                  <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-gray-100">
                     <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white font-bold text-xl">2</div>
                     <h3 className="text-xl font-bold mb-3">행동 패턴 누적</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">
                        찜하기, 장바구니 담기, 알림 받기 등 구매 의사가 있는 사용자의 패턴을 학습시킵니다.
                     </p>
                  </div>
                  <ArrowDown className="md:hidden text-gray-300" />
                  <div className="hidden md:block w-16 h-1 bg-gray-200"></div>

                  <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-gray-100">
                     <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white font-bold text-xl">3</div>
                     <h3 className="text-xl font-bold mb-3">순위 최적화</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">
                        누적된 데이터가 플랫폼 로직에 반영되어 자연스러운 순위 상승을 이끌어냅니다.
                     </p>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-24 px-6 bg-black text-white text-center">
         <RevealOnScroll>
            <div className="max-w-4xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-bold mb-8">
                  이 중 하나라도 해당된다면<br/>
                  <span className="text-blue-500">그냥 넘기지 마세요.</span>
               </h2>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-left">
                  <div className="bg-white/10 p-4 rounded-xl">
                     <Target className="w-6 h-6 text-blue-400 mb-2" />
                     <p className="text-sm text-gray-300">노출이 불안정한 브랜드</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                     <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                     <p className="text-sm text-gray-300">광고 효율이 떨어지는 브랜드</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                     <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                     <p className="text-sm text-gray-300">순위 유지가 필요한 브랜드</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                     <MousePointer className="w-6 h-6 text-purple-400 mb-2" />
                     <p className="text-sm text-gray-300">성과가 정체된 브랜드</p>
                  </div>
               </div>

               <div className="bg-blue-600/20 border border-blue-500/30 rounded-3xl p-10 backdrop-blur-md">
                  <h3 className="text-2xl font-bold mb-4">우리 브랜드에 맞는 전략이 어떤건지<br/>지금 확인해보세요.</h3>
                  <Link to="/contact" className="inline-block px-12 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                     무료 상담하기
                  </Link>
               </div>
            </div>
         </RevealOnScroll>
      </section>
    </div>
  );
};

export default Reward;