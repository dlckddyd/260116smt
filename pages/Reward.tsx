
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, TrendingUp, MousePointerClick, Users, ShieldCheck, Zap, 
  BarChart3, Search, Target, Gift, ArrowRight, CheckCircle2, 
  Smartphone, Monitor, Lock, Clock, Activity, AlertTriangle 
} from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

const Reward: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reward' | 'program'>('reward');

  return (
    <div className="bg-white">
      {/* 1. Hero Section: Data & Traffic Theme */}
      <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
         {/* Dynamic Background */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 via-transparent to-[#0f172a] z-0"></div>
         
         {/* Animated Glow Orbs */}
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

         <div className="relative z-10 text-center px-6 max-w-5xl mt-10">
            <RevealOnScroll>
               <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 font-bold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                   <Activity className="w-4 h-4" /> 순위 상승의 핵심 알고리즘
               </div>
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                   1페이지의 비밀은<br/>
                   결국 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">유효타 트래픽</span>입니다
               </h1>
               <p className="text-xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
                   단순 유입이 아닙니다. 플랫폼 로직이 좋아하는<br/>
                   '구매 전환 행동 패턴'을 설계하여 순위를 끌어올립니다.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 hover:-translate-y-1">
                       트래픽 진단 받기 <ArrowRight className="w-5 h-5" />
                   </Link>
                   <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-xl hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-md">
                       단가표 확인
                   </Link>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 2. Pain Points: Why Rank Doesn't Go Up */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
               <div className="text-center mb-20">
                  <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block">Real Problems</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">열심히 하는데 왜 순위는 그대로일까요?</h2>
                  <p className="text-gray-500">단순히 상품만 등록하고 기다린다고 트래픽이 발생하지 않습니다.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { icon: AlertTriangle, title: "죽은 상품/플레이스", desc: "10페이지 뒤에 있어 아무도 클릭하지 않는 '유령 상태'인가요?" },
                     { icon: MousePointerClick, title: "단순 클릭의 한계", desc: "체류 시간 없이 클릭만 발생하면 오히려 어뷰징으로 인식됩니다." },
                     { icon: TrendingUp, title: "유지 실패", desc: "반짝 순위가 올랐다가 금방 떨어져서 매출로 이어지지 않나요?" }
                  ].map((item, idx) => (
                     <div key={idx} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-sm text-gray-400 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300">
                           <item.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed break-keep">
                           {item.desc}
                        </p>
                     </div>
                  ))}
               </div>
               
               <div className="mt-16 p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center max-w-3xl mx-auto">
                  <p className="text-blue-900 font-bold text-lg md:text-xl">
                     💡 플랫폼은 <span className="underline decoration-wavy decoration-blue-400 underline-offset-4">'실제 구매자와 유사한 행동 패턴'</span>을 가진<br className="md:hidden"/> 트래픽에 높은 점수를 줍니다.
                  </p>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 3. Solution: Reward vs Program */}
      <section className="py-24 px-6 bg-slate-900 overflow-hidden relative">
         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10">
            <RevealOnScroll>
               <div className="text-center mb-16 text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Dual Track Strategy</h2>
                  <p className="text-gray-400">브랜드 상황에 맞춰 가장 효과적인 방식을 제안합니다.</p>
               </div>

               <div className="flex justify-center mb-12">
                   <div className="bg-white/10 p-1 rounded-full backdrop-blur-md inline-flex">
                       <button 
                           onClick={() => setActiveTab('reward')}
                           className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'reward' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                       >
                           리워드 (Reward)
                       </button>
                       <button 
                           onClick={() => setActiveTab('program')}
                           className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'program' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                       >
                           프로그램 (Program)
                       </button>
                   </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                   {/* Visual Side */}
                   <div className="relative aspect-square md:aspect-[4/3] bg-gradient-to-br from-white/5 to-white/0 rounded-[2.5rem] border border-white/10 flex items-center justify-center p-8 overflow-hidden group">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                       {activeTab === 'reward' ? (
                           <div className="relative w-full h-full flex items-center justify-center">
                               <div className="absolute top-10 right-10 animate-float-slow"><Gift className="w-16 h-16 text-blue-400" /></div>
                               <div className="absolute bottom-20 left-10 animate-float-medium"><Users className="w-12 h-12 text-blue-300" /></div>
                               <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center max-w-sm">
                                   <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/40">
                                       <Smartphone className="w-10 h-10 text-white" />
                                   </div>
                                   <h3 className="text-2xl font-bold text-white mb-2">실사용자 참여</h3>
                                   <p className="text-blue-200 text-sm">유저가 직접 검색하고 클릭하여<br/>체류 시간을 확보합니다.</p>
                               </div>
                           </div>
                       ) : (
                           <div className="relative w-full h-full flex items-center justify-center">
                               <div className="absolute top-10 left-10 animate-float-slow"><Monitor className="w-16 h-16 text-cyan-400" /></div>
                               <div className="absolute bottom-10 right-10 animate-float-medium"><Lock className="w-12 h-12 text-cyan-300" /></div>
                               <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center max-w-sm">
                                   <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                                       <Zap className="w-10 h-10 text-white" />
                                   </div>
                                   <h3 className="text-2xl font-bold text-white mb-2">정밀 타겟팅</h3>
                                   <p className="text-cyan-200 text-sm">자체 개발 솔루션으로<br/>구매 행동 패턴을 시뮬레이션합니다.</p>
                               </div>
                           </div>
                       )}
                   </div>

                   {/* Text Side */}
                   <div className="text-white">
                       <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                           {activeTab === 'reward' ? <Gift className="w-8 h-8 text-blue-500" /> : <Monitor className="w-8 h-8 text-cyan-500" />}
                           {activeTab === 'reward' ? '리워드 마케팅' : '자체 프로그램'}
                       </h3>
                       <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                           {activeTab === 'reward' 
                               ? "실제 유저에게 포인트를 지급하여 특정 행동(검색, 유입, 체류, 찜하기 등)을 유도하는 방식입니다. 100% 실계정으로 진행되어 안전하며, 초기 트래픽 확보에 탁월합니다."
                               : "디바이스 ID, IP, 브라우저 지문 등을 다양화하여 실제 구매자와 동일한 패턴의 트래픽을 발생시킵니다. 인위적인 반복을 배제하여 로직 변화에 유연하게 대응합니다."
                           }
                       </p>
                       
                       <ul className="space-y-4">
                           {(activeTab === 'reward' ? [
                               "100% 실사용자 모바일 트래픽",
                               "검색 + 유입 + 체류 + 액션(찜/저장) 패키지",
                               "초기 플레이스/쇼핑 순위 진입용",
                               "어뷰징 위험 0% 안전 보장"
                           ] : [
                               "정밀한 체류 시간 및 이탈률 관리",
                               "구매 전환율 최적화 로직 적용",
                               "경쟁 강도가 높은 키워드 공략",
                               "다양한 디바이스/통신사 IP 활용"
                           ]).map((item, i) => (
                               <li key={i} className="flex items-center gap-3 text-lg font-medium">
                                   <CheckCircle2 className={`w-6 h-6 ${activeTab === 'reward' ? 'text-blue-500' : 'text-cyan-500'}`} />
                                   {item}
                               </li>
                           ))}
                       </ul>
                   </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 4. Logic Flow (Horizontal Scroll/Steps) */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">순위가 오르는 <span className="text-blue-600">성공 방정식</span></h2>
                      <p className="text-gray-500">단순 클릭이 아닌 '유효한 데이터'가 쌓여야 합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                      {/* Connecting Line (Desktop) */}
                      <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 z-0"></div>

                      {[
                          { title: "Step 1. 검색 유입", desc: "지정된 키워드로 검색하여 자연스럽게 유입됩니다.", icon: Search },
                          { title: "Step 2. 체류 활동", desc: "상세페이지를 읽고 사진을 보며 체류 시간을 확보합니다.", icon: Clock },
                          { title: "Step 3. 액션 전환", desc: "찜하기, 알림받기, 장바구니 등 구매 시그널을 보냅니다.", icon: MousePointerClick },
                          { title: "Step 4. 순위 반영", desc: "유효타가 누적되어 플랫폼 로직에 의해 순위가 상승합니다.", icon: TrendingUp }
                      ].map((step, idx) => (
                          <div key={idx} className="relative z-10 bg-white p-8 rounded-3xl border border-gray-100 shadow-lg flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <step.icon className="w-7 h-7" />
                              </div>
                              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                          </div>
                      ))}
                  </div>
              </RevealOnScroll>
          </div>
      </section>

      {/* 5. Effect Graph Simulation */}
      <section className="py-24 px-6 bg-[#f8fafc]">
         <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">실제 데이터로 증명합니다</h2>
                  <p className="text-gray-500">다양한 카테고리에서 1페이지 상위 노출을 달성하고 있습니다.</p>
               </div>
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                     { k: "강남 맛집", rank: "1위", up: "86위 상승", color: "text-red-500", bg: "bg-red-50", line: "bg-red-500" },
                     { k: "홍대 미용실", rank: "1위", up: "54위 상승", color: "text-blue-500", bg: "bg-blue-50", line: "bg-blue-500" },
                     { k: "제주도 렌트카", rank: "2위", up: "12위 상승", color: "text-green-500", bg: "bg-green-50", line: "bg-green-500" },
                     { k: "여성 의류", rank: "1위", up: "22위 상승", color: "text-purple-500", bg: "bg-purple-50", line: "bg-purple-500" }
                  ].map((item, idx) => (
                     <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                        <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">{item.k}</div>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-bold text-gray-900">{item.rank}</span>
                            <span className={`text-sm font-bold mb-1.5 flex items-center ${item.color}`}>
                               <TrendingUp className="w-3 h-3 mr-1" /> {item.up}
                            </span>
                        </div>
                        
                        {/* Simulated Graph */}
                        <div className="h-24 w-full flex items-end justify-between gap-1 mt-4">
                            {[20, 35, 30, 50, 45, 70, 60, 90, 80, 100].map((h, i) => (
                                <div key={i} className="w-full bg-gray-100 rounded-t-sm relative overflow-hidden group-hover:bg-gray-200 transition-colors" style={{ height: `${h}%` }}>
                                    <div className={`absolute bottom-0 left-0 w-full ${item.line} opacity-20 group-hover:opacity-100 transition-opacity duration-700`} style={{ height: '100%', transitionDelay: `${i * 50}ms` }}></div>
                                </div>
                            ))}
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="mt-8 text-center text-sm text-gray-400 bg-white inline-block px-6 py-2 rounded-full border border-gray-200 mx-auto shadow-sm">
                  * 위 데이터는 실제 진행 사례를 기반으로 한 예시이며, 결과는 업종 및 키워드에 따라 상이할 수 있습니다.
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center">
         <RevealOnScroll>
            <div className="max-w-4xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  경쟁사가 자는 시간에도<br/>
                  <span className="text-blue-300">당신의 순위는 올라갑니다.</span>
               </h2>
               
               <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {[
                      "노출이 불안정한 브랜드", 
                      "광고 효율이 떨어지는 브랜드", 
                      "순위 유지가 필요한 브랜드", 
                      "성과가 정체된 브랜드"
                  ].map((text, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium backdrop-blur-sm">
                          {text}
                      </span>
                  ))}
               </div>

               <div className="bg-white/10 border border-white/20 rounded-[2rem] p-10 backdrop-blur-md max-w-2xl mx-auto hover:bg-white/15 transition-colors">
                  <h3 className="text-2xl font-bold mb-4">우리 브랜드에 맞는 전략이 무엇인지<br/>지금 바로 확인해보세요.</h3>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-12 py-5 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:scale-105 mt-4">
                     무료 상담 및 견적 받기 <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
         </RevealOnScroll>
      </section>
    </div>
  );
};

export default Reward;
