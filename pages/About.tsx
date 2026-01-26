
import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import ServiceVisual from '../components/ServiceVisual';
import GoogleMap from '../components/GoogleMap';
import { Target, Lightbulb, MapPin, Flag, TrendingUp, Users, Award, ExternalLink, Phone, Copy } from 'lucide-react';

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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
         {/* Corrected fetchPriority attribute name */}
         <img 
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2000&auto=format&fit=crop" 
            alt="Seoul Cityscape" 
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
         />
         <div className="absolute inset-0 bg-black/60"></div>
         <div className="relative z-10 text-center px-6 max-w-5xl">
            <RevealOnScroll>
               <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">About Smart Place</h1>
               <p className="text-xl text-gray-200 mb-8">
                  데이터와 기술로 비즈니스의 문제를 해결하는<br/>
                  <span className="font-bold text-white">Digital Growth Partner</span>
               </p>
               <a href="https://m.idsn.co.kr/news/view/1065602129224578" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors border-b border-gray-500 hover:border-white pb-1">
                  <ExternalLink className="w-4 h-4" /> [언론보도] 혁신 성장 기업 선정 뉴스 기사 확인하기
               </a>
            </RevealOnScroll>
         </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="w-full md:w-1/2">
                  <div className="inline-block p-3 bg-brand-accent/10 rounded-xl mb-6"><Target className="w-8 h-8 text-brand-accent" /></div>
                  <h2 className="text-4xl font-bold mb-6">Mission</h2>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">"모든 비즈니스의 잠재력을 현실로"</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">우리는 뛰어난 제품과 서비스를 가졌음에도 마케팅의 부재로 빛을 보지 못하는 기업들을 위해 존재합니다. 데이터 기반의 의사결정으로 성장의 장벽을 허물고, 클라이언트의 성공이 곧 우리의 성공이라는 믿음으로 나아갑니다.</p>
               </div>
               <div className="w-full md:w-1/2 relative">
                  <ServiceVisual image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" groups={aboutVisualGroups} />
               </div>
            </div>
         </RevealOnScroll>
      </section>

      {/* Vision */}
      <section className="py-24 px-6 bg-gray-50">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
               <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                  <div className="w-full md:w-1/2">
                     <div className="inline-block p-3 bg-green-100 rounded-xl mb-6"><Lightbulb className="w-8 h-8 text-green-600" /></div>
                     <h2 className="text-4xl font-bold mb-6">Vision</h2>
                     <h3 className="text-2xl font-semibold text-gray-800 mb-4">"No.1 퍼포먼스 마케팅 생태계"</h3>
                     <p className="text-gray-600 leading-relaxed text-lg">단순 대행을 넘어, 클라이언트와 함께 성장하는 상생의 생태계를 만듭니다. 기술(Tech)과 크리에이티브(Creative)가 결합된 독보적인 마케팅 솔루션 기업으로 글로벌 시장을 선도합니다.</p>
                  </div>
                  <div className="w-full md:w-1/2">
                     <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop" className="rounded-3xl shadow-xl w-full h-80 object-cover hover:-translate-y-2 transition-transform duration-500" alt="Vision" loading="lazy" decoding="async" />
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* History */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
         <div className="text-center mb-16">
            <div className="inline-block p-3 bg-purple-100 rounded-xl mb-6"><Flag className="w-8 h-8 text-purple-600" /></div>
            <h2 className="text-4xl font-bold">Our History</h2>
         </div>
         <div className="space-y-12 relative border-l-2 border-gray-200 ml-4 md:ml-0 md:pl-0">
            {[
               { year: "2024", title: "Global Expansion", desc: "해외 마케팅 솔루션 런칭, 누적 클라이언트 1,200사 돌파" },
               { year: "2023", title: "Award Winning", desc: "대한민국 디지털 광고 대상 '퍼포먼스 부문' 대상 수상" },
               { year: "2022", title: "Tech Innovation", desc: "AI 기반 광고 자동화 시스템 'G-Bot' 개발 및 상용화" },
               { year: "2021", title: "Smart Place Founded", desc: "스마트마케팅 플레이스 설립, 벤처기업 인증 획득" }
            ].map((item, idx) => (
               <RevealOnScroll key={idx} className="relative pl-12 md:pl-0 md:flex md:gap-12 md:items-center group">
                  <div className="hidden md:block w-1/2 text-right pr-12"><span className="text-5xl font-bold text-gray-200 group-hover:text-brand-accent transition-colors">{item.year}</span></div>
                  <div className="absolute left-[-9px] md:left-1/2 md:ml-[-9px] w-4 h-4 rounded-full bg-white border-4 border-brand-accent z-10"></div>
                  <div className="md:w-1/2 md:pl-12">
                     <span className="md:hidden text-3xl font-bold text-brand-accent block mb-2">{item.year}</span>
                     <h4 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h4>
                     <p className="text-gray-500">{item.desc}</p>
                  </div>
               </RevealOnScroll>
            ))}
         </div>
      </section>

      {/* Location (Improved Responsive Overlay) */}
      <section className="py-24 px-6 bg-gray-900">
         <div className="max-w-7xl mx-auto flex flex-col md:block relative h-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-700 group">
             {/* Map Component */}
             <div className="h-[400px] md:h-full w-full">
                <GoogleMap className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
             </div>

             {/* Responsive Overlay Info Box */}
             <div className="md:absolute static top-8 left-8 md:top-12 md:left-12 bg-white/95 backdrop-blur-xl p-8 rounded-b-3xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-none md:max-w-sm w-full animate-float-slow border-t md:border border-white/50 z-20">
                 <div className="flex items-center gap-3 mb-6">
                     <div className="w-12 h-12 bg-brand-black rounded-full flex items-center justify-center text-white shadow-lg"><MapPin className="w-5 h-5" /></div>
                     <div>
                        <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block mb-0.5">Location</span>
                        <h3 className="text-xl font-bold text-gray-900">스마트마케팅 플레이스</h3>
                     </div>
                 </div>
                 <div className="space-y-4">
                     <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-gray-600 leading-relaxed font-medium">서울특별시 강서구 양천로 547<br/>마스터밸류</p>
                     </div>
                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pl-2">
                        <a href="tel:02-6958-9144" className="flex items-center gap-2 text-gray-600 hover:text-brand-accent transition-colors font-bold"><Phone className="w-4 h-4 text-brand-accent" /> 02-6958-9144</a>
                        <button onClick={copyAddress} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors border-b border-gray-300 pb-0.5"><Copy className="w-3 h-3" /> 주소 복사</button>
                     </div>
                 </div>
                 <div className="absolute -top-2 -right-2 w-20 h-20 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none"></div>
             </div>
         </div>
      </section>
    </div>
  );
};

export default About;
