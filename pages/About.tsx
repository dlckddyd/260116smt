import React, { useEffect, useRef, useState } from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import ServiceVisual from '../components/ServiceVisual';
import { Target, Lightbulb, MapPin, Flag, TrendingUp, Users, Award, ExternalLink, Phone, Copy, AlertCircle } from 'lucide-react';

const About: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 20; // 10 seconds (500ms * 20)

    const initMap = () => {
      if (!mapRef.current) return;
      
      // Check if Naver Maps API is loaded
      if (!(window as any).naver || !(window as any).naver.maps) {
         if (retryCount < maxRetries) {
             retryCount++;
             setTimeout(initMap, 500);
         } else {
             setMapError(true);
         }
         return;
      }

      // Prevent duplicate map initialization
      if (mapRef.current.children.length > 0) {
          mapRef.current.innerHTML = '';
      }

      try {
          const location = new (window as any).naver.maps.LatLng(37.558385, 126.860875);
          const map = new (window as any).naver.maps.Map(mapRef.current, {
            center: location,
            zoom: 16,
            minZoom: 10,
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: (window as any).naver.maps.Position.TOP_RIGHT
            }
          });

          new (window as any).naver.maps.Marker({
            position: location,
            map: map,
            title: "스마트마케팅 플레이스",
            animation: (window as any).naver.maps.Animation.DROP
          });
          
          mapInstance.current = map;
      } catch (e) {
          console.error("Map initialization failed", e);
          setMapError(true);
      }
    };

    // Start initialization
    initMap();

  }, []);

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
      {/* Hero Section - Fullscreen */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
         {/* Seoul Cityscape Night */}
         <img 
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2000&auto=format&fit=crop" 
            alt="Seoul Cityscape" 
            className="absolute inset-0 w-full h-full object-cover"
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

      {/* 1. Mission Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="w-full md:w-1/2">
                  <div className="inline-block p-3 bg-brand-accent/10 rounded-xl mb-6">
                     <Target className="w-8 h-8 text-brand-accent" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6">Mission</h2>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">"모든 비즈니스의 잠재력을 현실로"</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                     우리는 뛰어난 제품과 서비스를 가졌음에도 마케팅의 부재로 빛을 보지 못하는 기업들을 위해 존재합니다. 
                     데이터 기반의 의사결정으로 성장의 장벽을 허물고, 클라이언트의 성공이 곧 우리의 성공이라는 믿음으로 나아갑니다.
                  </p>
               </div>
               <div className="w-full md:w-1/2">
                  <div className="relative">
                      {/* Using ServiceVisual for Popup Animation */}
                      <ServiceVisual 
                        image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
                        groups={aboutVisualGroups}
                      />
                  </div>
               </div>
            </div>
         </RevealOnScroll>
      </section>

      {/* 2. Vision Section */}
      <section className="py-24 px-6 bg-gray-50">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
               <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                  <div className="w-full md:w-1/2">
                     <div className="inline-block p-3 bg-green-100 rounded-xl mb-6">
                        <Lightbulb className="w-8 h-8 text-green-600" />
                     </div>
                     <h2 className="text-4xl font-bold mb-6">Vision</h2>
                     <h3 className="text-2xl font-semibold text-gray-800 mb-4">"No.1 퍼포먼스 마케팅 생태계"</h3>
                     <p className="text-gray-600 leading-relaxed text-lg">
                        단순 대행을 넘어, 클라이언트와 함께 성장하는 상생의 생태계를 만듭니다. 
                        기술(Tech)과 크리에이티브(Creative)가 결합된 독보적인 마케팅 솔루션 기업으로 
                        글로벌 시장을 선도합니다.
                     </p>
                  </div>
                  <div className="w-full md:w-1/2">
                     {/* Modern Tech Office */}
                     <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop" className="rounded-3xl shadow-xl w-full h-80 object-cover hover:-translate-y-2 transition-transform duration-500" alt="Vision" />
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 3. History Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
         <div className="text-center mb-16">
            <div className="inline-block p-3 bg-purple-100 rounded-xl mb-6">
               <Flag className="w-8 h-8 text-purple-600" />
            </div>
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
                  <div className="hidden md:block w-1/2 text-right pr-12">
                     <span className="text-5xl font-bold text-gray-200 group-hover:text-brand-accent transition-colors">{item.year}</span>
                  </div>
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

      {/* 4. Location Section with Naver Map */}
      <section className="py-24 px-6 bg-gray-900 text-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3">
               <div className="inline-block p-3 bg-white/10 rounded-xl mb-6">
                  <MapPin className="w-8 h-8 text-white" />
               </div>
               <h2 className="text-4xl font-bold mb-8">오시는 길</h2>
               <div className="space-y-8">
                  <div>
                     <h4 className="text-lg font-bold text-gray-300 mb-2">주소</h4>
                     <p className="text-lg leading-relaxed mb-2">서울특별시 강서구 양천로 547<br/>마스터밸류</p>
                     <button onClick={copyAddress} className="text-sm bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-colors">
                        <Copy className="w-3 h-3" /> 주소 복사
                     </button>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-gray-300 mb-2">대중교통</h4>
                     <p className="text-gray-400">증미역 2번 출구 도보 1분</p>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-gray-300 mb-2">연락처</h4>
                     <p className="text-xl font-bold text-white flex items-center gap-2">
                        <Phone className="w-5 h-5" /> 02-6958-9144
                     </p>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-2/3 h-96 bg-gray-800 rounded-3xl overflow-hidden relative shadow-2xl border border-gray-700">
               <div ref={mapRef} className="w-full h-full" id="naver-map" style={{ minHeight: '400px', backgroundColor: '#1a1f2c' }}></div>
               
               {/* Map Loading/Error State */}
               {(!mapRef.current || mapError) && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-400 z-10">
                       {mapError ? (
                           <>
                             <AlertCircle className="w-10 h-10 mb-4 text-red-400" />
                             <p>지도를 불러올 수 없습니다.</p>
                             <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-sm">새로고침</button>
                           </>
                       ) : (
                           <p>지도를 불러오는 중입니다...</p>
                       )}
                   </div>
               )}
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;