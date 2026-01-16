import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Video, MonitorPlay, Instagram, Users, Check, ArrowRight, ThumbsUp, BarChart2, Zap } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

const serviceData: Record<string, any> = {
  place: {
    title: "플레이스 마케팅",
    subtitle: "우리 동네 1등 매장의 비밀",
    icon: MapPin,
    heroImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop", // Korean Cafe
    description: "오프라인 매장의 매출은 네이버 지도에서 결정됩니다. 단순 순위 상승을 넘어, 실제 방문으로 이어지는 '전환형' 플레이스 마케팅을 제공합니다.",
    recommended: ["지역 맛집 및 카페", "미용실, 네일샵 등 뷰티업종", "병원, 한의원", "피트니스, 필라테스 센터"],
    features: [
      "빅데이터 기반 지역/업종별 키워드 분석",
      "고품질 영수증 리뷰 및 블로그 리뷰 배포",
      "매장 매력을 극대화하는 사진 촬영 및 등록",
      "스마트콜, 네이버 톡톡, 예약 최적화 세팅"
    ],
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1500&auto=format&fit=crop", // Restaurant interior
    effect: "평균 플레이스 유입량 300% 증가, 예약률 150% 상승"
  },
  clip: {
    title: "네이버 클립",
    subtitle: "60초의 승부, 숏폼 마케팅",
    icon: Video,
    heroImage: "https://images.unsplash.com/photo-1531256379416-9f000ebd3a8f?q=80&w=2000&auto=format&fit=crop", // Young people tech
    description: "텍스트보다 영상이 편한 시대. 네이버의 숏폼 플랫폼 '클립'은 폭발적인 노출량을 보장합니다.",
    recommended: ["비주얼이 중요한 요식업/뷰티", "제품 시연이 필요한 쇼핑몰", "트렌디한 공간을 보유한 핫플레이스"],
    features: [
      "최신 밈(Meme)과 트렌드를 반영한 기획",
      "전문 촬영팀 및 편집자의 고퀄리티 제작",
      "플레이스 연동을 통한 즉각적인 예약 유도",
      "알고리즘 최적화 해시태그 전략"
    ],
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1500&auto=format&fit=crop", // Phone recording
    effect: "게시물 당 평균 조회수 10,000+ 달성"
  },
  youtube: {
    title: "유튜브 관리",
    subtitle: "브랜드 팬덤을 만드는 영상",
    icon: MonitorPlay,
    heroImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop", // Studio
    description: "유튜브는 이제 선택이 아닌 필수입니다. 기획, 대본, 촬영, 편집, 채널 관리까지 전문 PD팀이 함께합니다.",
    recommended: ["전문성을 보여줘야 하는 기업", "브랜딩이 필요한 프랜차이즈", "제품 상세 설명이 필요한 제조사"],
    features: [
      "채널 페르소나 설정 및 콘텐츠 기획",
      "스튜디오 촬영 및 전문 편집",
      "썸네일 A/B 테스트 및 클릭률 최적화",
      "유튜브 쇼츠(Shorts) 멀티 유즈 전략"
    ],
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=1500&auto=format&fit=crop", // Editing
    effect: "진성 구독자 확보 및 브랜드 신뢰도 상승"
  },
  instagram: {
    title: "인스타그램",
    subtitle: "비주얼로 소통하는 브랜드",
    icon: Instagram,
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop", // Social media
    description: "인스타그램은 브랜드의 첫인상입니다. 감각적인 콘텐츠로 팔로우를 부르고 구매 버튼을 누르게 만듭니다.",
    recommended: ["패션/잡화/뷰티 브랜드", "인테리어/가구 업체", "온라인 쇼핑몰", "감성 카페/숙소"],
    features: [
      "브랜드 무드보드 기획 및 피드 디자인",
      "인플루언서 협업 및 태그 바이럴",
      "구매 전환을 위한 릴스(Reels) 제작",
      "정밀 타겟팅 스폰서드 광고 집행"
    ],
    image: "https://images.unsplash.com/photo-1516251193000-18e6584856ed?q=80&w=1500&auto=format&fit=crop", // Influencer vibe
    effect: "브랜드 인지도 상승 및 ROAS 500% 달성"
  },
  experience: {
    title: "체험단 마케팅",
    subtitle: "소비자가 증명하는 진짜 후기",
    icon: Users,
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop", // Food
    description: "잘 쓴 리뷰 하나가 열 광고 안 부럽습니다. 영향력 있는 블로거와 인플루언서를 선별하여 진정성 있는 후기를 만듭니다.",
    recommended: ["신제품 런칭 기업", "리뷰가 부족한 신규 매장", "입소문이 필요한 서비스"],
    features: [
      "일 방문자 3,000명 이상 프리미엄 블로거 섭외",
      "검색 키워드 상위노출 가이드라인 제공",
      "체험단 진행 현황 실시간 리포트",
      "불성실 리뷰어 필터링 및 재진행 보장"
    ],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1500&auto=format&fit=crop", // Cafe Food
    effect: "메인 키워드 상위노출 및 구매 전환율 상승"
  }
};

const ServiceDetail: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const data = serviceData[type || 'place'];
  const Icon = data.icon;

  return (
    <div className="bg-white">
      {/* Fullscreen Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <img 
           src={data.heroImage} 
           alt={data.title} 
           className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <RevealOnScroll>
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 text-white mx-auto border border-white/20">
              <Icon className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">{data.title}</h1>
            <p className="text-2xl text-gray-200 font-light tracking-wide">{data.subtitle}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <span className="text-brand-accent font-bold tracking-wider uppercase mb-2 block">Service Overview</span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">왜 {data.title}이 필요한가요?</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {data.description}
              </p>
              
              <div className="bg-brand-gray p-6 rounded-2xl mb-8 border border-gray-100">
                 <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-brand-accent" /> 이런 분들께 추천합니다
                 </h4>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.recommended?.map((rec: string, idx: number) => (
                       <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-brand-success rounded-full"></span> {rec}
                       </li>
                    ))}
                 </ul>
              </div>

              <div className="space-y-4">
                {data.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-accent/30 hover:shadow-lg transition-all bg-white hover:-translate-y-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-brand-accent" />
                    </div>
                    <span className="font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-accent">
                    <BarChart2 className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="text-sm text-gray-500 font-semibold uppercase">Expected Effect</div>
                    <div className="text-lg font-bold text-gray-900">{data.effect}</div>
                 </div>
              </div>

              <Link to="/contact" className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-brand-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-1">
                전문가 상담 신청하기 <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative hover:-translate-y-2 transition-transform duration-700">
                 <div className="absolute -inset-4 bg-brand-accent/5 rounded-[2rem] transform rotate-3"></div>
                 <img src={data.image} alt={data.title} className="relative rounded-2xl shadow-2xl border border-gray-100 w-full h-[600px] object-cover" />
                 <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl max-w-xs border border-white/50">
                    <div className="flex items-center gap-2 mb-2">
                       <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                       <span className="font-bold text-gray-900">Growth Point</span>
                    </div>
                    <p className="text-sm text-gray-600">데이터 분석을 통해 귀사의 비즈니스에 가장 적합한 마케팅 전략을 도출합니다.</p>
                 </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
        
        {/* Detailed Process Section */}
        <div className="border-t border-gray-100 pt-24">
           <div className="text-center mb-16">
              <span className="text-brand-accent font-bold tracking-wider uppercase mb-2 block">Work Process</span>
              <h3 className="text-3xl font-bold text-gray-900">체계적인 진행 프로세스</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
              
              {[
                { step: "01", title: "진단 및 분석", desc: "경쟁사 및 시장 환경 분석\n타겟 오디언스 설정" },
                { step: "02", title: "전략 기획", desc: "매체별 최적화 전략 수립\nKPI 목표 설정" },
                { step: "03", title: "실행 및 확산", desc: "고퀄리티 콘텐츠 제작\n타겟 광고 집행" },
                { step: "04", title: "성과 최적화", desc: "데이터 분석 및 인사이트\n지속적인 효율 개선" },
              ].map((item, i) => (
                <RevealOnScroll key={i} delay={i * 100} className="relative bg-white pt-4">
                   <div className="w-16 h-16 mx-auto bg-brand-accent text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-6 shadow-lg border-4 border-white relative z-10 transition-transform hover:scale-110">
                      {item.step}
                   </div>
                   <div className="text-center px-4">
                      <h4 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h4>
                      <p className="text-gray-500 whitespace-pre-line leading-relaxed text-sm">{item.desc}</p>
                   </div>
                </RevealOnScroll>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;