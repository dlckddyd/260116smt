import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, MapPin, Video, Users, MonitorPlay, Camera, Loader2, Sparkles, Phone, Mail } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import CountUp from '../components/CountUp';

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Safety timeout: If the 'load' event doesn't fire for any reason, 
    // force the viewer to show after 500ms so the user doesn't see a black screen.
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const element = splineRef.current;
    
    const handleLoad = () => {
      console.log("Spline loaded via event listener");
      setIsLoaded(true);
    };

    if (element) {
      element.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      if (element) {
        element.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  // Partner logos placeholder
  const partners = ["SAMSUNG", "LG", "SK", "HYUNDAI", "NAVER", "KAKAO", "COUPANG", "TOSS"];

  const services = [
    {
      id: "place",
      category: "Service 01",
      title: "플레이스 마케팅",
      desc: "매출의 80%는 지역 검색에서 시작됩니다.\n상권 분석 데이터와 최적화 로직으로 당신의 매장을 지역 1위로 만듭니다.",
      image: "https://images.unsplash.com/photo-1504544770734-697c19446229?q=80&w=1500&auto=format&fit=crop", // Korean Style Cafe/Interior
      icon: MapPin,
      color: "bg-blue-600",
      link: "/services/place"
    },
    {
      id: "clip",
      category: "Service 02",
      title: "네이버 클립",
      desc: "지금 가장 뜨거운 트래픽, 숏폼.\n60초 안에 소비자의 마음을 훔치는 고감도 영상을 제작하고 배포합니다.",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=1500&auto=format&fit=crop", // Seoul Street/Fashion
      icon: Video,
      color: "bg-green-600",
      link: "/services/clip"
    },
    {
      id: "experience",
      category: "Service 03",
      title: "체험단 마케팅",
      desc: "광고가 아닌 경험을 팝니다.\n진정성 있는 리뷰 콘텐츠로 잠재 고객의 구매 결정을 확신으로 바꿉니다.",
      image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1500&auto=format&fit=crop", // Food/Dining Korea vibe
      icon: Users,
      color: "bg-purple-600",
      link: "/services/experience"
    },
    {
      id: "youtube",
      category: "Service 04",
      title: "유튜브 관리",
      desc: "브랜드의 팬덤을 구축하는 가장 강력한 무기.\n기획부터 촬영, 편집, 채널 운영까지 전문 PD 그룹이 전담합니다.",
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1500&auto=format&fit=crop", // Asian Professional/Media
      icon: MonitorPlay,
      color: "bg-red-600",
      link: "/services/youtube"
    },
    {
      id: "instagram",
      category: "Service 05",
      title: "인스타그램",
      desc: "비주얼 임팩트로 소비 욕구를 자극합니다.\n트렌디한 감각과 정밀한 타겟팅으로 브랜드 인지도를 폭발시킵니다.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1500&auto=format&fit=crop", // Aesthetic/Lifestyle
      icon: Camera,
      color: "bg-pink-600",
      link: "/services/instagram"
    }
  ];

  return (
    <div className="overflow-hidden bg-white selection:bg-black selection:text-white">
      {/* Hero Section - Restored to h-screen */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
         {!isLoaded && (
           <div className="absolute inset-0 flex items-center justify-center bg-black z-20 pointer-events-none">
             <div className="flex flex-col items-center gap-4">
               <Loader2 className="w-10 h-10 text-white animate-spin" />
             </div>
           </div>
         )}
         
         {/* Spline Viewer Implementation */}
         <div className="absolute inset-0 w-full h-full">
            <spline-viewer 
              ref={splineRef}
              loading-anim-type="spinner-small-dark"
              url="https://prod.spline.design/R8sj9KJPt6z0DcZx/scene.splinecode"
              className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            ></spline-viewer>
         </div>

         {/* Overlay Gradient - Added pointer-events-none to allow clicking through to 3D scene */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10 pointer-events-none" />

        <div className="relative z-20 text-center px-6 max-w-7xl mx-auto mt-20 pointer-events-none">
          <RevealOnScroll>
            <div className="flex justify-center mb-8 pointer-events-auto">
              <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-sm font-medium tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Digital Growth Partner
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-8 text-white tracking-tighter mix-blend-overlay opacity-90 pointer-events-auto">
              GROWTH LAB
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-normal mb-12 pointer-events-auto">
               데이터로 증명하는 <span className="text-green-400 font-semibold">확실한 성과</span><br/>
               당신의 비즈니스에 초록불을 켜드립니다.
            </p>
            <div className="pointer-events-auto">
              <Link to="/about" className="group inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-all text-lg">
                 Explore Our Vision <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30 pointer-events-none">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Partner Marquee - Reduced Padding */}
      <section className="py-6 bg-black border-b border-white/10 overflow-hidden">
         <div className="flex w-[200%] animate-scroll">
            {[...partners, ...partners, ...partners].map((partner, i) => (
               <div key={i} className="flex-1 text-center min-w-[200px]">
                  <span className="text-2xl font-bold text-white/30 hover:text-white transition-colors cursor-default tracking-widest">{partner}</span>
               </div>
            ))}
         </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 px-6 bg-white relative">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
               <div className="flex flex-col lg:flex-row gap-20 items-start">
                  <div className="w-full lg:w-1/2 sticky top-32">
                     <span className="text-black font-bold text-sm tracking-[0.2em] uppercase mb-4 block opacity-50">About Us</span>
                     <h2 className="text-5xl md:text-7xl font-bold mb-8 text-black leading-[0.9] tracking-tight">
                        We Design<br/>Success.
                     </h2>
                     <p className="text-gray-500 text-xl leading-relaxed mb-12">
                        그로스랩은 감이 아닌 데이터로 움직입니다.<br/>
                        수천 건의 성공 사례를 통해 검증된 알고리즘 분석 시스템과
                        트래픽 최적화 솔루션으로 비즈니스의 확실한 성장을 약속합니다.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                        <div>
                           <div className="text-5xl font-bold text-black mb-2 tracking-tighter"><CountUp end={1200} suffix="+" /></div>
                           <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Projects</div>
                        </div>
                        <div>
                           <div className="text-5xl font-bold text-black mb-2 tracking-tighter"><CountUp end={98} suffix="%" /></div>
                           <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Satisfaction</div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2 space-y-8">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100 group shadow-2xl">
                         {/* Korean/Asian Business Meeting Image */}
                         <img 
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop" 
                            alt="Strategy Meeting" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                         <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-lg">
                            <p className="text-black font-bold text-lg flex items-center gap-2">
                               <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                               Strategic Planning
                            </p>
                         </div>
                      </div>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
            <RevealOnScroll>
               <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">Our Solutions</h2>
               <p className="text-xl text-gray-500 max-w-2xl mx-auto">비즈니스 성장의 모든 단계에 필요한 최적의 솔루션을 제안합니다.</p>
            </RevealOnScroll>
         </div>

         <div className="flex flex-col gap-0">
            {services.map((service, index) => (
               <div key={service.id} className="sticky top-0 min-h-screen flex items-center bg-white border-t border-gray-100 last:border-b py-20 lg:py-0">
                  <div className="max-w-7xl mx-auto px-6 w-full">
                     <RevealOnScroll className="w-full">
                        <div className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                           <div className="w-full lg:w-1/2">
                              <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl group transition-all duration-500 hover:-translate-y-2">
                                 <div className={`absolute inset-0 ${service.color} mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity duration-500 z-10`}></div>
                                 <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                 />
                                 <div className="absolute top-8 left-8 bg-white rounded-full p-4 shadow-lg z-20">
                                    <service.icon className="w-6 h-6 text-black" />
                                 </div>
                              </div>
                           </div>
                           <div className="w-full lg:w-1/2">
                              <span className="text-gray-400 font-bold tracking-[0.2em] uppercase mb-4 block">{service.category}</span>
                              <h3 className="text-4xl md:text-6xl font-bold mb-8 text-black leading-tight tracking-tight">{service.title}</h3>
                              <p className="text-xl text-gray-500 leading-relaxed mb-10 whitespace-pre-line">
                                 {service.desc}
                              </p>
                              <Link 
                                 to={service.link}
                                 className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:gap-5"
                              >
                                 자세히 보기 <ArrowRight className="w-5 h-5" />
                              </Link>
                           </div>
                        </div>
                     </RevealOnScroll>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 bg-black text-white">
         <div className="max-w-5xl mx-auto text-center">
            <RevealOnScroll>
               <span className="text-gray-500 font-bold tracking-[0.2em] uppercase mb-4 block">Contact Us</span>
               <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">
                  망설이는 시간에도<br/>
                  경쟁사는 성장하고 있습니다.
               </h2>
               <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
                  지금 바로 문의하세요. 귀사의 비즈니스 현황을 무료로 진단해 드립니다.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <a href="tel:02-1234-5678" className="group flex flex-col items-center justify-center p-12 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1">
                     <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Phone className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-2">전화 문의</h3>
                     <p className="text-gray-400">02-1234-5678</p>
                  </a>
                  <a href="mailto:contact@growthlab.kr" className="group flex flex-col items-center justify-center p-12 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1">
                     <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Mail className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-2">이메일 문의</h3>
                     <p className="text-gray-400">contact@growthlab.kr</p>
                  </a>
               </div>

               <Link to="/contact" className="inline-flex items-center gap-2 text-lg font-bold border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all">
                  1:1 상담 신청서 작성하기 <ArrowRight className="w-5 h-5" />
               </Link>
            </RevealOnScroll>
         </div>
      </section>
    </div>
  );
};

export default Home;