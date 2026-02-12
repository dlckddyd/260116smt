
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Search, MapPin, Star, TrendingUp, MousePointer2, Eye, Heart, Share2, Youtube, Camera, MessageCircle, BarChart2, CheckCircle2, ExternalLink, Target, Activity, Layers, ArrowDown, Loader2 } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import ServiceVisual from '../components/ServiceVisual';
import { partners } from '../data/content';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { serviceImages } = useData();
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const row1 = partners.slice(0, 14);
  const row2 = partners.slice(14, 28);
  const row3 = partners.slice(28);

  const services = [
    {
      id: "place",
      category: "01. Place Marketing",
      title: "지역 1등 매장의\n숨겨진 비밀",
      desc: "매출의 80%는 지역 검색에서 시작됩니다.\n상권 분석 데이터와 최적화 로직으로\n당신의 매장을 지역 1위로 만듭니다.",
      image: serviceImages['place'] || "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop",
      link: "/services/place",
      labels: { left: "최적화 전", right: "최적화 후" },
      color: "text-blue-600",
      groups: [
        [
          { icon: Search, title: "검색 순위", value: "강남 맛집 1위", position: "top-[10%] -left-[5%]", color: "text-blue-600", bgColor: "bg-blue-100" },
          { icon: MousePointer2, title: "클릭 경쟁률", value: "32.5%", sub: "매우좋음", position: "bottom-[20%] -right-[5%]", color: "text-green-600", bgColor: "bg-green-100" },
          { icon: MapPin, title: "지역 유입", value: "12,405명", position: "top-[40%] -right-[10%]", color: "text-red-600", bgColor: "bg-red-100" },
        ],
        [
          { icon: Star, title: "리뷰 평점", value: "4.9점", sub: "(521건)", position: "top-[20%] -right-[5%]", color: "text-yellow-600", bgColor: "bg-yellow-100" },
          { icon: TrendingUp, title: "트래픽 분석", value: "유입량 ▲300%", position: "bottom-[30%] -left-[10%]", color: "text-purple-600", bgColor: "bg-purple-100" },
          { icon: CheckCircle2, title: "SEO 상태", value: "최적화 완료", position: "top-[5%] left-[10%]", color: "text-blue-600", bgColor: "bg-blue-50" },
        ]
      ]
    },
    {
      id: "clip",
      category: "02. Naver Clip",
      title: "60초의 승부,\n숏폼 트래픽",
      desc: "지금 가장 뜨거운 트래픽, 숏폼.\n60초 안에 소비자의 마음을 훔치는\n고감도 영상을 제작하고 배포합니다.",
      image: serviceImages['clip'] || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
      link: "/services/clip",
      color: "text-green-600",
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
      category: "03. Experience Group",
      title: "경험을 파는\n진정성 있는 리뷰",
      desc: "단순 배포형 광고가 아닙니다.\n진정성 있는 리뷰 콘텐츠로 잠재 고객의\n구매 결정을 확신으로 바꿉니다.",
      image: serviceImages['experience'] || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
      link: "/services/experience",
      color: "text-orange-500",
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
      category: "04. Youtube Management",
      title: "팬덤을 만드는\n강력한 무기",
      desc: "유튜브는 이제 선택이 아닌 필수입니다.\n기획부터 촬영, 편집, 채널 운영까지\n전문 PD 그룹이 전담 케어합니다.",
      image: serviceImages['youtube'] || "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=800&auto=format&fit=crop",
      link: "/services/youtube",
      color: "text-red-600",
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
      category: "05. Instagram",
      title: "비주얼로 소통하는\n브랜드 이미지",
      desc: "비주얼 임팩트로 소비 욕구를 자극합니다.\n트렌디한 감각과 정밀한 타겟팅으로\n브랜드 인지도를 폭발시킵니다.",
      image: serviceImages['instagram'] || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
      link: "/services/instagram",
      color: "text-pink-600",
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
      {/* 1. Hero Section - Spline + High-end Typography */}
      <section className="relative w-full h-[90vh] md:h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-black z-0" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0 animate-pulse"></div>

         {/* Spline 3D Scene */}
         <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <iframe 
              src='https://my.spline.design/trafficlight-FOL3VWRlskdi7o0EU4PtSnLJ/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              title="3D Traffic Light Scene"
              className="w-full h-full pointer-events-none scale-110" 
              onLoad={() => setTimeout(() => setIsSplineLoaded(true), 500)}
            />
         </div>

         {/* Gradient Overlays for Readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-20 pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-20 pointer-events-none" />

        <div className="relative z-30 text-center px-6 max-w-7xl mx-auto mt-10 pointer-events-none w-full">
          <RevealOnScroll>
            {/* Top Badge */}
            <div className="flex justify-center mb-6 md:mb-8 pointer-events-auto">
              <div className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/90 text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Digital Marketing Partner
              </div>
            </div>

            {/* Main Headline (Resized for better responsiveness) */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 text-white tracking-tighter mix-blend-overlay opacity-90 pointer-events-auto break-keep">
              DATA DRIVEN<br/>GROWTH
            </h1>

            {/* Sub Headline (Refined Copy) */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-10 md:mb-12 pointer-events-auto px-4 break-keep">
               반짝하고 사라지는 순위가 아닙니다.<br className="hidden md:block"/>
               <span className="text-white font-bold">데이터</span>와 <span className="text-white font-bold">알고리즘</span>으로 증명하는<br className="md:hidden"/> 지속 가능한 성장 파트너.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto px-6">
              <Link to="/about" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                 Explore Vision <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a 
                href="https://m.idsn.co.kr/news/view/1065602129224578" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all text-white font-medium hover:scale-105"
              >
                 <span className="bg-brand-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">NEWS</span>
                 <span>언론보도 선정기사</span>
                 <ExternalLink className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-white/50" />
        </div>
      </section>

      {/* 2. Intro Philosophy Section (Reference Design) */}
      <section className="py-24 md:py-40 px-6 bg-[#050505] relative overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-green-900/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none opacity-60"></div>
          <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-blue-900/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none opacity-60"></div>

          <div className="max-w-7xl mx-auto relative z-10">
              <RevealOnScroll>
                  <div className="text-center mb-24 md:mb-32">
                      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white tracking-tight break-keep">
                          마케팅은<br className="md:hidden"/>
                          <span className="text-gray-500 mx-2">감(Feeling)</span>이 아닌<br/>
                          <span className="relative inline-block mt-2 md:mt-4">
                              <span className="relative z-10">데이터(Data)</span>
                              <span className="absolute left-0 bottom-1 md:bottom-2 w-full h-[40%] md:h-[50%] bg-[#3b82f6] -z-0 opacity-80"></span>
                          </span>
                          입니다.
                      </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      {[
                          { 
                              icon: Activity, 
                              title: "Data Analysis", 
                              sub: "빅데이터 기반의\n시장 및 경쟁사 분석",
                              iconColor: "text-blue-400",
                              glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                          },
                          { 
                              icon: Target, 
                              title: "Targeting", 
                              sub: "잠재 고객을 정확히\n타격하는 정밀 타겟팅",
                              iconColor: "text-cyan-400",
                              glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                          },
                          { 
                              icon: Layers, 
                              title: "Full Funnel", 
                              sub: "노출부터 전환까지\n빈틈없는 설계",
                              iconColor: "text-indigo-400",
                              glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                          }
                      ].map((item, i) => (
                          <div key={i} className={`p-10 md:p-12 rounded-[2rem] bg-[#111111]/80 border border-white/5 backdrop-blur-xl transition-all duration-500 group hover:-translate-y-2 ${item.glow}`}>
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-8 mx-auto border border-white/5 shadow-inner">
                                  <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.iconColor}`} />
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center">{item.title}</h3>
                              <p className="text-gray-400 leading-relaxed whitespace-pre-line text-center text-sm md:text-base font-medium">{item.sub}</p>
                          </div>
                      ))}
                  </div>
              </RevealOnScroll>
          </div>
      </section>

      {/* 3. Services Section (Sticky Scroll) */}
      <section className="bg-white">
         {services.map((service, index) => (
            <div key={service.id} className="sticky top-0 h-screen min-h-[700px] flex items-center justify-center overflow-hidden border-b border-gray-50">
               <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-10" />
               
               <div className="max-w-7xl mx-auto px-6 w-full h-full flex items-center">
                  <RevealOnScroll className="w-full">
                     <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                        
                        {/* Visual Side */}
                        <div className="w-full lg:w-1/2 relative group">
                           <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white rounded-[3rem] transform rotate-3 scale-105 opacity-50 -z-10 group-hover:rotate-6 transition-transform duration-700"></div>
                           <ServiceVisual 
                              image={service.image} 
                              groups={service.groups} 
                              labels={service.labels} 
                           />
                        </div>
                        
                        {/* Text Side */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                           <div className={`inline-block px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-bold tracking-widest uppercase mb-6 ${service.color}`}>
                               {service.category}
                           </div>
                           <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-black leading-tight tracking-tight whitespace-pre-line">
                               {service.title}
                           </h3>
                           <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 whitespace-pre-line font-medium">
                              {service.desc}
                           </p>
                           
                           <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
                               <Link 
                                  to={service.link}
                                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:gap-5 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                               >
                                  솔루션 자세히 보기 <ArrowRight className="w-5 h-5" />
                               </Link>
                           </div>
                        </div>

                     </div>
                  </RevealOnScroll>
               </div>
            </div>
         ))}
      </section>

      {/* 4. Partner Marquee (Enhanced) */}
      <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 text-center relative z-10">
             <RevealOnScroll>
                 <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Trusted by Market Leaders</h3>
                 <p className="text-lg md:text-xl text-gray-500">1,200+ 파트너사가 스마트마케팅 플레이스와 함께 성장하고 있습니다.</p>
             </RevealOnScroll>
         </div>

         {/* Gradient Masks */}
         <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

         <div className="flex flex-col gap-4 md:gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {/* Row 1 */}
            <div className="flex w-[300%] md:w-[200%] animate-scroll hover:[animation-play-state:paused]">
               {[...row1, ...row1].map((partner, i) => (
                  <div key={`r1-${i}`} className="flex-1 min-w-[150px] md:min-w-[200px] px-2 md:px-3">
                     <div className="bg-white border border-gray-200 py-4 md:py-5 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md hover:border-brand-accent hover:text-brand-accent transition-all text-gray-500 font-bold text-sm md:text-lg text-center flex items-center justify-center h-full whitespace-nowrap">
                        {partner}
                     </div>
                  </div>
               ))}
            </div>
            {/* Row 2 (Reverse) */}
            <div className="flex w-[300%] md:w-[200%] animate-scroll-reverse hover:[animation-play-state:paused]">
               {[...row2, ...row2].map((partner, i) => (
                  <div key={`r2-${i}`} className="flex-1 min-w-[150px] md:min-w-[200px] px-2 md:px-3">
                     <div className="bg-white border border-gray-200 py-4 md:py-5 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md hover:border-green-500 hover:text-green-600 transition-all text-gray-500 font-bold text-sm md:text-lg text-center flex items-center justify-center h-full whitespace-nowrap">
                        {partner}
                     </div>
                  </div>
               ))}
            </div>
            {/* Row 3 */}
            <div className="flex w-[300%] md:w-[200%] animate-scroll hover:[animation-play-state:paused]">
               {[...row3, ...row3].map((partner, i) => (
                  <div key={`r3-${i}`} className="flex-1 min-w-[150px] md:min-w-[200px] px-2 md:px-3">
                     <div className="bg-white border border-gray-200 py-4 md:py-5 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md hover:border-purple-500 hover:text-purple-600 transition-all text-gray-500 font-bold text-sm md:text-lg text-center flex items-center justify-center h-full whitespace-nowrap">
                        {partner}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Contact CTA Section (Gradient) */}
      <section className="py-24 px-6 bg-white relative">
         <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
               <div className="bg-gradient-to-r from-brand-black to-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl">
                   {/* Background Glows */}
                   <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600/20 rounded-full blur-[80px] md:blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                   <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-purple-600/20 rounded-full blur-[80px] md:blur-[100px] translate-x-1/2 translate-y-1/2"></div>
                   
                   <div className="relative z-10">
                       <span className="text-blue-400 font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 block text-xs md:text-sm">Ready to Grow?</span>
                       <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                          망설이는 시간에도<br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">경쟁사는 성장하고 있습니다.</span>
                       </h2>
                       <p className="text-base md:text-lg text-gray-400 mb-10 md:mb-12 max-w-xl mx-auto leading-relaxed">
                          지금 바로 문의하세요. 귀사의 비즈니스 현황을 무료로 진단하고<br className="hidden md:block"/> 최적의 마케팅 솔루션을 제안해 드립니다.
                       </p>

                       <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16">
                          <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:scale-105">
                              무료 진단 신청하기 <ArrowRight className="w-5 h-5" />
                          </Link>
                          <a href="tel:02-6958-9144" className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-md border border-white/10">
                              <Phone className="w-5 h-5" /> 02-6958-9144
                          </a>
                       </div>

                       {/* Contact Grid */}
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left border-t border-white/10 pt-8 md:pt-10">
                           <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Mail className="w-5 h-5"/></div>
                               <div>
                                   <div className="text-xs text-gray-500 uppercase font-bold mb-1">Email</div>
                                   <div className="text-white font-medium">yonging@kakao.com</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                               <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><MessageCircle className="w-5 h-5"/></div>
                               <div>
                                   <div className="text-xs text-gray-500 uppercase font-bold mb-1">KaKao Talk</div>
                                   <div className="text-white font-medium">스마트마케팅플레이스</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                               <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><MapPin className="w-5 h-5"/></div>
                               <div>
                                   <div className="text-xs text-gray-500 uppercase font-bold mb-1">Office</div>
                                   <div className="text-white font-medium text-sm md:text-base">서울 강서구 양천로 547</div>
                               </div>
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

export default Home;
