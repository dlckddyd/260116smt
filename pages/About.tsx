
import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import ServiceVisual from '../components/ServiceVisual';
import GoogleMap from '../components/GoogleMap';
import CountUp from '../components/CountUp';
import { Target, Lightbulb, MapPin, Flag, TrendingUp, Users, Award, ExternalLink, Phone, Copy, ArrowRight, Zap, ShieldCheck, BarChart3 } from 'lucide-react';

const About: React.FC = () => {

  const copyAddress = () => {
      navigator.clipboard.writeText("서울특별시 강서구 양천로 547 마스터밸류");
      alert("주소가 복사되었습니다.");
  };
   
  const aboutVisualGroups = [
    [
      { icon: TrendingUp, title: "성장률", value: "+200%", position: "top-[20%] -right-[5%]", color: "text-green-600", bgColor: "bg-green-100" },
      { icon: Users, title: "파트너사", value: "1,200+", position: "bottom-[20%] -left-[5%]", color: "text-blue-600", bgColor: "bg-blue-100" }
    ],
    [
      { icon: Award, title: "만족도", value: "98%", position: "top-[30%] -left-[5%]", color: "text-yellow-600", bgColor: "bg-yellow-100" },
      { icon: Target, title: "목표달성", value: "Success", position: "bottom-[30%] -right-[5%]", color: "text-red-600", bgColor: "bg-red-100" }
    ]
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero Section - Immersive & Bold */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
         <img 
            src="https://storage.googleapis.com/yonging_bucket/about.png" 
            alt="About Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom transition-transform duration-[20s]" 
            fetchPriority="high"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>
         
         {/* Abstract Decoration */}
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>

         <div className="relative z-10 text-center px-6 max-w-5xl">
            <RevealOnScroll>
               <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/10 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                  Since 2021
               </span>
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                  We Define<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Digital Growth</span>
               </h1>
               <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  데이터와 기술로 비즈니스의 불확실성을 확신으로 바꿉니다.<br/>
                  단순 대행을 넘어, 성장을 함께하는 파트너가 되겠습니다.
               </p>
               
               <a href="https://m.idsn.co.kr/news/view/1065602129224578" target="_blank" rel="noopener noreferrer" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
                  <span className="text-white font-medium group-hover:text-blue-300 transition-colors">혁신 성장 기업 선정 기사 보기</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
               </a>
            </RevealOnScroll>
         </div>
      </section>

      {/* 2. Core Value Statistics */}
      <section className="py-12 bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
                  {[
                      { label: "Partners", value: 1200, suffix: "+" },
                      { label: "Growth Rate", value: 200, suffix: "%" },
                      { label: "Retention", value: 98, suffix: "%" },
                      { label: "History", value: 4, suffix: "Years" }
                  ].map((stat, i) => (
                      <div key={i} className="px-4">
                          <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                              <CountUp end={stat.value} suffix={stat.suffix} />
                          </div>
                          <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 3. Mission Section - Split Layout */}
      <section className="py-24 px-6 relative">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
               <div className="w-full lg:w-1/2">
                  <RevealOnScroll>
                      <div className="inline-flex items-center gap-2 text-blue-600 font-bold mb-6">
                          <Target className="w-5 h-5" /> OUR MISSION
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                          모든 비즈니스의<br/>
                          <span className="relative inline-block">
                              잠재력을 현실로
                              <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 -z-10"></span>
                          </span>
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                          우리는 뛰어난 제품과 서비스를 가졌음에도 마케팅의 부재로 빛을 보지 못하는 기업들을 위해 존재합니다.<br/><br/>
                          감보다는 <strong>데이터</strong>를, 추측보다는 <strong>검증</strong>을 통해 성장의 장벽을 허물고 클라이언트의 성공을 우리의 성공으로 만듭니다.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                              { icon: Zap, text: "데이터 기반 의사결정" },
                              { icon: ShieldCheck, text: "투명한 성과 공유" },
                              { icon: Users, text: "전담 매니저 밀착 케어" },
                              { icon: BarChart3, text: "지속 가능한 성장" }
                          ].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                                      <item.icon className="w-4 h-4" />
                                  </div>
                                  <span className="font-bold text-gray-700">{item.text}</span>
                              </div>
                          ))}
                      </div>
                  </RevealOnScroll>
               </div>
               
               <div className="w-full lg:w-1/2 relative">
                  <RevealOnScroll delay={200}>
                      {/* Decorative Background Blob */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl -z-10"></div>
                      <ServiceVisual image="https://storage.googleapis.com/yonging_bucket/1234.jpeg" groups={aboutVisualGroups} />
                  </RevealOnScroll>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Vision Section - Dark Theme Card */}
      <section className="py-24 px-6 bg-gray-50">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
               <div className="bg-brand-black rounded-[3rem] overflow-hidden text-white shadow-2xl relative">
                   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                   
                   <div className="flex flex-col lg:flex-row">
                       <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative z-10">
                           <div className="inline-flex items-center gap-2 text-blue-400 font-bold mb-6">
                               <Lightbulb className="w-5 h-5" /> OUR VISION
                           </div>
                           <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                               No.1 퍼포먼스<br/>마케팅 생태계
                           </h2>
                           <p className="text-gray-400 text-lg leading-relaxed mb-10">
                               단순 대행을 넘어, 클라이언트와 함께 성장하는 상생의 생태계를 만듭니다. 기술(Tech)과 크리에이티브(Creative)가 결합된 독보적인 마케팅 솔루션 기업으로 글로벌 시장을 선도합니다.
                           </p>
                           <div className="flex flex-wrap gap-3">
                               {["Global Expansion", "AI Tech", "Win-Win Platform"].map((tag, i) => (
                                   <span key={i} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium backdrop-blur-sm">
                                       #{tag}
                                   </span>
                               ))}
                           </div>
                       </div>
                       <div className="lg:w-1/2 h-[400px] lg:h-auto relative">
                           <img 
                               src="https://storage.googleapis.com/yonging_bucket/%E1%84%87%E1%85%B5%E1%84%8C%E1%85%A5%E1%86%AB.jpeg" 
                               alt="Vision" 
                               className="absolute inset-0 w-full h-full object-cover opacity-80"
                           />
                           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-black lg:via-brand-black/50"></div>
                       </div>
                   </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 5. History - Modern Timeline */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
                <div className="text-center mb-20">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block">Milestones</span>
                    <h2 className="text-4xl font-bold text-gray-900">우리가 걸어온 길</h2>
                </div>
                
                <div className="relative border-l-2 border-gray-100 ml-4 md:ml-0 md:pl-0 space-y-12">
                    {[
                       { year: "2025", title: "AI Marketing Revolution", desc: "업계 최초 AI 마케팅 전담 본부 신설 및 솔루션 고도화" },
                       { year: "2024", title: "Global Expansion", desc: "해외 마케팅 솔루션 런칭, 누적 클라이언트 1,200사 돌파" },
                       { year: "2023", title: "Award Winning", desc: "대한민국 디지털 광고 대상 '퍼포먼스 부문' 대상 수상" },
                       { year: "2022", title: "Tech Innovation", desc: "AI 기반 광고 자동화 시스템 'G-Bot' 개발 및 상용화" },
                       { year: "2021", title: "Smart Place Founded", desc: "스마트마케팅 플레이스 설립, 벤처기업 인증 획득" }
                    ].map((item, idx) => (
                       <div key={idx} className="relative pl-12 md:pl-0 group">
                          {/* Desktop Layout */}
                          <div className="hidden md:flex items-center justify-between w-full">
                              <div className="w-[45%] text-right pr-12">
                                  <span className="text-6xl font-bold text-gray-100 group-hover:text-blue-600/20 transition-colors duration-500 block -mb-4 relative z-0">{item.year}</span>
                              </div>
                              
                              <div className="absolute left-1/2 -ml-[9px] w-[18px] h-[18px] rounded-full bg-white border-4 border-gray-200 group-hover:border-blue-500 group-hover:scale-125 transition-all z-10"></div>
                              
                              <div className="w-[45%] pl-12 pt-2">
                                  <h4 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                              </div>
                          </div>

                          {/* Mobile Layout */}
                          <div className="md:hidden">
                              <div className="absolute left-[-9px] w-[18px] h-[18px] rounded-full bg-white border-4 border-gray-200 group-hover:border-blue-500 z-10"></div>
                              <span className="text-4xl font-bold text-gray-200 group-hover:text-blue-600/20 transition-colors block mb-2">{item.year}</span>
                              <h4 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h4>
                              <p className="text-gray-500 text-sm">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 6. Location - Glassmorphism Card */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
         {/* Background Map Effect */}
         <div className="absolute inset-0 opacity-30 pointer-events-none filter blur-sm scale-110">
             <GoogleMap className="w-full h-full grayscale invert" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>

         <div className="max-w-6xl mx-auto relative z-10">
             <RevealOnScroll>
                 <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl h-[500px] md:h-[600px]">
                     {/* Map Side */}
                     <div className="w-full md:w-2/3 h-full relative group">
                        <GoogleMap className="w-full h-full" />
                        {/* Overlay Gradient on Map for text contrast if needed */}
                     </div>

                     {/* Info Side */}
                     <div className="w-full md:w-1/3 bg-white p-8 md:p-10 flex flex-col justify-center relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                         <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">
                             <MapPin className="w-4 h-4" /> Head Office
                         </div>
                         <h3 className="text-2xl font-bold text-gray-900 mb-2">스마트마케팅 플레이스</h3>
                         <p className="text-gray-400 text-sm mb-8">데이터가 흐르는 곳, 성장이 시작되는 곳</p>
                         
                         <div className="space-y-6">
                             <div>
                                 <p className="text-sm text-gray-400 font-bold mb-2 uppercase text-[10px]">Address</p>
                                 <p className="text-gray-700 font-medium leading-relaxed">
                                     서울특별시 강서구 양천로 547<br/>
                                     마스터밸류
                                 </p>
                                 <button onClick={copyAddress} className="mt-2 flex items-center gap-2 text-xs text-blue-600 font-bold hover:underline">
                                     <Copy className="w-3 h-3" /> 주소 복사하기
                                 </button>
                             </div>
                             
                             <div>
                                 <p className="text-sm text-gray-400 font-bold mb-2 uppercase text-[10px]">Contact</p>
                                 <a href="tel:02-6958-9144" className="block text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                     02-6958-9144
                                 </a>
                                 <p className="text-sm text-gray-500 mt-1">yonging@kakao.com</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </RevealOnScroll>
         </div>
      </section>
    </div>
  );
};

export default About;
