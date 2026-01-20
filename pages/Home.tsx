import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Loader2, Sparkles, Phone, Mail, Search, MapPin, Star, TrendingUp, MousePointer2, Eye, Heart, Share2, Youtube, Camera, MessageCircle, BarChart2, CheckCircle2 } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import CountUp from '../components/CountUp';
import ServiceVisual from '../components/ServiceVisual';
import { partners } from '../data/content';
import { useData } from '../context/DataContext';

// Wrapper for custom element to avoid TypeScript errors with JSX.IntrinsicElements
const SplineViewer = React.forwardRef<any, any>((props, ref) => {
  return React.createElement('spline-viewer', { ...props, ref });
});

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef<any>(null);
  const { serviceImages } = useData();

  useEffect(() => {
    // Shorter timeout to improve perceived speed
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

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

  // Split partners into 3 rows for the marquee
  const row1 = partners.slice(0, 14);
  const row2 = partners.slice(14, 28);
  const row3 = partners.slice(28);

  const services = [
    {
      id: "place",
      category: "Service 01",
      title: "플레이스 마케팅",
      desc: "매출의 80%는 지역 검색에서 시작됩니다.\n상권 분석 데이터와 최적화 로직으로 당신의 매장을 지역 1위로 만듭니다.",
      image: serviceImages['place'] || "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop", // Phone Map mockup
      link: "/services/place",
      groups: [
        // Group A
        [
          { icon: Search, title: "검색 순위", value: "강남 맛집 1위", position: "top-[10%] -left-[5%]", color: "text-blue-600", bgColor: "bg-blue-100" },
          { icon: MousePointer2, title: "클릭 경쟁률", value: "32.5%", sub: "매우좋음", position: "bottom-[20%] -right-[5%]", color: "text-green-600", bgColor: "bg-green-100" },
          { icon: MapPin, title: "지역 유입", value: "12,405명", position: "top-[40%] -right-[10%]", color: "text-red-600", bgColor: "bg-red-100" },
        ],
        // Group B
        [
          { icon: Star, title: "리뷰 평점", value: "4.9점", sub: "(521건)", position: "top-[20%] -right-[5%]", color: "text-yellow-600", bgColor: "bg-yellow-100" },
          { icon: TrendingUp, title: "트래픽 분석", value: "유입량 ▲300%", position: "bottom-[30%] -left-[10%]", color: "text-purple-600", bgColor: "bg-purple-100" },
          { icon: CheckCircle2, title: "SEO 상태", value: "최적화 완료", position: "top-[5%] left-[10%]", color: "text-blue-600", bgColor: "bg-blue-50" },
        ]
      ]
    },
    {
      id: "clip",
      category: "Service 02",
      title: "네이버 클립",
      desc: "지금 가장 뜨거운 트래픽, 숏폼.\n60초 안에 소비자의 마음을 훔치는 고감도 영상을 제작하고 배포합니다.",
      image: serviceImages['clip'] || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop", // Vertical Video Interface
      link: "/services/clip",
      groups: [
        [
          { icon: Eye, title: "누적 조회수", value: "15.2M", position: "top-[15%] -left-[5%]", color: "text-indigo-600", bgColor: "bg-indigo-100" },
          { icon: Heart, title: "좋아요", value: "42.5K", position: "bottom-[15%] -right-[5%]", color: "text-red-500", bgColor: "bg-red-100" },
        ],
        [
          { icon: Share2, title: "공유 횟수", value: "5,230회", position: "top-[30%] -right-[10%]", color: "text-blue-500", bgColor: "bg-blue-100" },
          { icon: TrendingUp, title: "실시간 트렌드", value: "인기 급상승", position: "bottom-[40%] -left-[10%]", color: "text-orange-500", bgColor: "bg-orange-100" },
          { icon: MousePointer2, title: "링크 클릭", value: "전환율 12%", position: "top-[5%] left-[0%]", color: "text-green-600", bgColor: "bg-green-100" },
        ]
      ]
    },
    {
      id: "experience",
      category: "Service 03",
      title: "체험단 마케팅",
      desc: "광고가 아닌 경험을 팝니다.\n진정성 있는 리뷰 콘텐츠로 잠재 고객의 구매 결정을 확신으로 바꿉니다.",
      image: serviceImages['experience'] || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop", // Blog typing
      link: "/services/experience",
      groups: [
        [
          { icon: Camera, title: "포토 리뷰", value: "고퀄리티 보장", position: "top-[10%] -right-[5%]", color: "text-pink-600", bgColor: "bg-pink-100" },
          { icon: MessageCircle, title: "블로그 댓글", value: "120개+", position: "bottom-[20%] -left-[5%]", color: "text-green-600", bgColor: "bg-green-100" },
        ],
        [
          { icon: Search, title: "상위 노출", value: "VIEW 탭 1위", position: "top-[40%] -left-[10%]", color: "text-blue-600", bgColor: "bg-blue-100" },
          { icon: CheckCircle2, title: "키워드", value: "맛집 추천", position: "bottom-[30%] -right-[10%]", color: "text-gray-600", bgColor: "bg-gray-100" },
          { icon: Star, title: "만족도", value: "5.0/5.0", position: "top-[5%] right-[10%]", color: "text-yellow-500", bgColor: "bg-yellow-100" },
        ]
      ]
    },
    {
      id: "youtube",
      category: "Service 04",
      title: "유튜브 관리",
      desc: "브랜드의 팬덤을 구축하는 가장 강력한 무기.\n기획부터 촬영, 편집, 채널 운영까지 전문 PD 그룹이 전담합니다.",
      image: serviceImages['youtube'] || "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=800&auto=format&fit=crop", // Youtube Dashboard
      link: "/services/youtube",
      groups: [
        [
          { icon: Youtube, title: "구독자 수", value: "100,000+", position: "top-[20%] -left-[8%]", color: "text-red-600", bgColor: "bg-red-100" },
          { icon: BarChart2, title: "시청 지속시간", value: "평균 8분 20초", position: "bottom-[10%] -right-[5%]", color: "text-gray-700", bgColor: "bg-gray-200" },
        ],
        [
          { icon: Loader2, title: "알고리즘", value: "분석 중...", position: "top-[10%] -right-[5%]", color: "text-blue-500", bgColor: "bg-blue-100" },
          { icon: MessageCircle, title: "팬덤 반응", value: "긍정적", position: "bottom-[40%] -left-[5%]", color: "text-green-500", bgColor: "bg-green-100" },
        ]
      ]
    },
    {
      id: "instagram",
      category: "Service 05",
      title: "인스타그램",
      desc: "비주얼 임팩트로 소비 욕구를 자극합니다.\n트렌디한 감각과 정밀한 타겟팅으로 브랜드 인지도를 폭발시킵니다.",
      image: serviceImages['instagram'] || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop", // Instagram UI
      link: "/services/instagram",
      groups: [
        [
          { icon: Heart, title: "도달 계정", value: "45,200명", position: "top-[15%] -right-[8%]", color: "text-pink-600", bgColor: "bg-pink-100" },
          { icon: Share2, title: "저장됨", value: "1,203건", position: "bottom-[20%] -left-[5%]", color: "text-purple-600", bgColor: "bg-purple-100" },
        ],
        [
          { icon: TrendingUp, title: "팔로워 증가", value: "+1,500/월", position: "top-[30%] -left-[10%]", color: "text-blue-600", bgColor: "bg-blue-100" },
          { icon: Star, title: "브랜드 인지도", value: "상승세", position: "bottom-[10%] -right-[5%]", color: "text-yellow-600", bgColor: "bg-yellow-100" },
          { icon: MessageCircle, title: "DM 문의", value: "폭주 중", position: "top-[5%] left-[5%]", color: "text-indigo-500", bgColor: "bg-indigo-100" },
        ]
      ]
    }
  ];

  return (
    <div className="overflow-hidden bg-white selection:bg-brand-accent selection:text-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
         {!isLoaded && (
           <div className="absolute inset-0 flex items-center justify-center bg-black z-20 pointer-events-none">
             <div className="flex flex-col items-center gap-4">
               <Loader2 className="w-10 h-10 text-white animate-spin" />
             </div>
           </div>
         )}
         
         {/* Spline Viewer */}
         <div className="absolute inset-0 w-full h-full pointer-events-none">
            <SplineViewer 
              ref={splineRef}
              loading-anim-type="spinner-small-dark"
              url="https://prod.spline.design/R8sj9KJPt6z0DcZx/scene.splinecode"
              className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
         </div>

         {/* Overlay Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 z-10 pointer-events-none" />

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

      {/* About Us Section */}
      <section className="py-32 px-6 bg-white relative">
         <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
               <div className="flex flex-col lg:flex-row gap-20 items-start">
                  <div className="w-full lg:w-1/2 sticky top-32">
                     <span className="text-brand-accent font-bold text-sm tracking-[0.2em] uppercase mb-4 block opacity-80">About Us</span>
                     <h2 className="text-5xl md:text-7xl font-bold mb-8 text-brand-black leading-[0.9] tracking-tight">
                        We Design<br/>Success.
                     </h2>
                     <p className="text-gray-500 text-xl leading-relaxed mb-12">
                        그로스랩은 감이 아닌 데이터로 움직입니다.<br/>
                        수천 건의 성공 사례를 통해 검증된 알고리즘 분석 시스템과
                        트래픽 최적화 솔루션으로 비즈니스의 확실한 성장을 약속합니다.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                        <div>
                           <div className="text-5xl font-bold text-brand-black mb-2 tracking-tighter"><CountUp end={1200} suffix="+" /></div>
                           <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Projects</div>
                        </div>
                        <div>
                           <div className="text-5xl font-bold text-brand-black mb-2 tracking-tighter"><CountUp end={98} suffix="%" /></div>
                           <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Satisfaction</div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2 space-y-8">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100 group shadow-2xl">
                         {/* Korean Business Meeting */}
                         <img 
                            src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1200&auto=format&fit=crop" 
                            alt="Strategy Meeting" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy" 
                         />
                         <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                         {/* Chart Floating UI */}
                         <div className="absolute top-10 right-10 animate-float-medium">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-3 flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                  <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                               <div>
                                  <div className="text-[10px] text-gray-400 font-bold">Growth Rate</div>
                                  <div className="text-sm font-bold">+245%</div>
                               </div>
                            </div>
                         </div>
                      </div>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* Services Section with Sequential Pop-up Animation */}
      <section className="py-32 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
            <RevealOnScroll>
               <h2 className="text-4xl md:text-6xl font-bold text-brand-black mb-6 tracking-tight">Our Solutions</h2>
               <p className="text-xl text-gray-500 max-w-2xl mx-auto">비즈니스 성장의 모든 단계에 필요한 최적의 솔루션을 제안합니다.</p>
            </RevealOnScroll>
         </div>

         <div className="flex flex-col gap-0">
            {services.map((service, index) => (
               <div key={service.id} className="sticky top-0 min-h-screen flex items-center bg-white border-t border-gray-100 last:border-b py-20 lg:py-0">
                  <div className="max-w-7xl mx-auto px-6 w-full">
                     <RevealOnScroll className="w-full">
                        <div className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                           <div className="w-full lg:w-1/2 relative">
                              <ServiceVisual image={service.image} groups={service.groups} />
                           </div>
                           
                           <div className="w-full lg:w-1/2">
                              <span className="text-brand-accent font-bold tracking-[0.2em] uppercase mb-4 block">{service.category}</span>
                              <h3 className="text-4xl md:text-6xl font-bold mb-8 text-brand-black leading-tight tracking-tight">{service.title}</h3>
                              <p className="text-xl text-gray-500 leading-relaxed mb-10 whitespace-pre-line">
                                 {service.desc}
                              </p>
                              <Link 
                                 to={service.link}
                                 className="inline-flex items-center gap-3 px-8 py-4 bg-brand-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:gap-5 shadow-lg hover:shadow-xl"
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

      {/* Partner Marquee - Moved Here (Above Contact Us) */}
      <section className="py-24 bg-slate-50 border-b border-gray-100 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
             <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Market Leaders</h3>
             <p className="text-gray-500">1,200+ 파트너사가 그로스랩과 함께 성장하고 있습니다.</p>
         </div>

         <div className="flex flex-col gap-8 opacity-80">
            {/* Row 1: Normal Scroll */}
            <div className="flex w-[200%] animate-scroll hover:[animation-play-state:paused]">
               {[...row1, ...row1].map((partner, i) => (
                  <div key={`r1-${i}`} className="flex-1 text-center min-w-[200px] px-2">
                     <div className="bg-white border border-gray-200 py-4 rounded-xl shadow-sm hover:shadow-md hover:border-brand-accent hover:text-brand-accent transition-all text-gray-600 font-bold text-lg">
                        {partner}
                     </div>
                  </div>
               ))}
            </div>

            {/* Row 2: Reverse Scroll */}
            <div className="flex w-[200%] animate-scroll-reverse hover:[animation-play-state:paused]">
               {[...row2, ...row2].map((partner, i) => (
                  <div key={`r2-${i}`} className="flex-1 text-center min-w-[200px] px-2">
                     <div className="bg-white border border-gray-200 py-4 rounded-xl shadow-sm hover:shadow-md hover:border-green-500 hover:text-green-600 transition-all text-gray-600 font-bold text-lg">
                        {partner}
                     </div>
                  </div>
               ))}
            </div>

            {/* Row 3: Normal Scroll */}
            <div className="flex w-[200%] animate-scroll hover:[animation-play-state:paused]">
               {[...row3, ...row3].map((partner, i) => (
                  <div key={`r3-${i}`} className="flex-1 text-center min-w-[200px] px-2">
                     <div className="bg-white border border-gray-200 py-4 rounded-xl shadow-sm hover:shadow-md hover:border-purple-500 hover:text-purple-600 transition-all text-gray-600 font-bold text-lg">
                        {partner}
                     </div>
                  </div>
               ))}
            </div>
         </div>
         {/* Fade Edges */}
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* Contact Section - Reduced Height */}
      <section className="py-20 px-6 bg-brand-black text-white">
         <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
               <span className="text-gray-500 font-bold tracking-[0.2em] uppercase mb-4 block">Contact Us</span>
               <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  망설이는 시간에도<br/>
                  경쟁사는 성장하고 있습니다.
               </h2>
               <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
                  지금 바로 문의하세요. 귀사의 비즈니스 현황을 무료로 진단해 드립니다.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <a href="tel:02-1234-5678" className="group flex items-center justify-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                     </div>
                     <div className="text-left">
                        <h3 className="text-lg font-bold">전화 문의</h3>
                        <p className="text-gray-400 text-sm">02-1234-5678</p>
                     </div>
                  </a>
                  <a href="mailto:yonging@kakao.com" className="group flex items-center justify-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                     </div>
                     <div className="text-left">
                        <h3 className="text-lg font-bold">이메일 문의</h3>
                        <p className="text-gray-400 text-sm">yonging@kakao.com</p>
                     </div>
                  </a>
               </div>
               
               <Link to="/contact" className="inline-block px-10 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1">
                  무료 진단 신청하기
               </Link>
            </RevealOnScroll>
         </div>
      </section>
    </div>
  );
};

export default Home;