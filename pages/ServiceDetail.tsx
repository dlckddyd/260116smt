
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Video, MonitorPlay, Instagram, Users, Check, ArrowRight, ThumbsUp, BarChart2, Zap, Search, MousePointer2, Star, TrendingUp, CheckCircle2, Eye, Heart, Share2, Camera, MessageCircle, Youtube, Loader2, HelpCircle, ChevronDown, ChevronUp, Trophy, UserCheck, Layout, DollarSign, Target, PieChart, Award, Rocket, Calendar, ShieldCheck, Layers, FileText, PlayCircle, Film, Clapperboard, Sparkles, Smartphone, Monitor, Scissors, Palette, Grid, Hash, ShoppingBag, Megaphone, Image, Filter, PenTool, Radio } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import ServiceVisual from '../components/ServiceVisual';
import { useData } from '../context/DataContext';

// --- Data for Other Services (Generic) ---
const serviceData: Record<string, any> = {
  // Place, Clip, Youtube, Instagram, Experience are handled in specialized components
  place: {
    title: "플레이스 마케팅",
    subtitle: "우리 동네 1등 매장의 비밀",
    icon: MapPin,
    heroImage: "https://storage.googleapis.com/yonging_bucket/Gemini_Generated_Image_iix02fiix02fiix0_cleanup.png", 
    description: "오프라인 매장의 매출은 네이버 지도에서 결정됩니다. 단순 순위 상승을 넘어, 실제 방문으로 이어지는 '전환형' 플레이스 마케팅을 제공합니다.",
  },
  clip: {
    title: "네이버 클립",
    subtitle: "60초의 승부, 숏폼 마케팅",
    icon: Video,
    heroImage: "https://storage.googleapis.com/yonging_bucket/Gemini_Generated_Image_lrscgnlrscgnlrsc_cleanup.png",
    description: "텍스트보다 영상이 편한 시대. 네이버의 숏폼 플랫폼 '클립'은 폭발적인 노출량을 보장합니다.",
  },
  youtube: {
    title: "유튜브 관리",
    subtitle: "브랜드 팬덤을 만드는 영상",
    icon: MonitorPlay,
    heroImage: "https://storage.googleapis.com/yonging_bucket/%E1%84%8B%E1%85%B2%E1%84%90%E1%85%B2%E1%84%87%E1%85%B3_cleanup.png",
    description: "유튜브는 이제 선택이 아닌 필수입니다. 기획, 대본, 촬영, 편집, 채널 관리까지 전문 PD팀이 함께합니다.",
  },
  instagram: {
    title: "인스타그램",
    subtitle: "비주얼로 소통하는 브랜드",
    icon: Instagram,
    heroImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000&auto=format&fit=crop", // Cafe Food
    description: "인스타그램은 브랜드의 첫인상입니다. 감각적인 콘텐츠로 팔로우를 부르고 구매 버튼을 누르게 만듭니다.",
  },
  experience: {
    title: "체험단 마케팅",
    subtitle: "소비자가 증명하는 진짜 후기",
    icon: Users,
    heroImage: "https://storage.googleapis.com/yonging_bucket/%E1%84%8E%E1%85%A6%E1%84%92%E1%85%A5%E1%86%B7%E1%84%83%E1%85%A1%E1%86%AB_cleanup.png",
    description: "잘 쓴 리뷰 하나가 열 광고 안 부럽습니다. 영향력 있는 블로거와 인플루언서를 선별하여 진정성 있는 후기를 만듭니다.",
  }
};

// --- Specialized Experience Marketing Component ---
const ExperienceMarketingDetail: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-white">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop" 
                        alt="Experience Marketing Hero" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-800/80 mix-blend-multiply"></div>
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-green-300 font-bold mb-8 backdrop-blur-md shadow-lg">
                            <PenTool className="w-4 h-4" /> 소비자가 만드는 진짜 광고
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                            잘 쓴 리뷰 하나가<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">열 광고 안 부럽습니다</span>
                        </h1>
                        <p className="text-xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
                            광고인 줄 알면서도 클릭하게 만드는 퀄리티.<br/>
                            단순 배포가 아닌, 구매를 설득하는 프리미엄 체험단을 운영합니다.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-[0_0_30px_rgba(22,163,74,0.4)] flex items-center justify-center gap-2 hover:-translate-y-1">
                                체험단 모집 문의 <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/portfolio" className="w-full sm:w-auto px-10 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all hover:-translate-y-1 backdrop-blur-md">
                                진행 사례 보기
                            </Link>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 2. Pain Points Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-20">
                            <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-3 block">Review Marketing Reality</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">혹시 이런 고민 있으신가요?</h2>
                            <p className="text-gray-500">고객은 구매 전 반드시 '후기'를 검색합니다.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: Search, title: "검색 결과 0건", desc: "매장명을 검색해도 아무런 정보나 후기가 나오지 않아 불안하신가요?" },
                                { icon: UserCheck, title: "먹튀 체험단", desc: "제품만 받고 잠수타거나, 성의 없는 리뷰로 스트레스 받으시나요?" },
                                { icon: MessageCircle, title: "낮은 신뢰도", desc: "광고 티가 너무 나는 리뷰 때문에 오히려 브랜드 이미지가 깎이시나요?" },
                                { icon: TrendingUp, title: "상위 노출 실패", desc: "비싼 돈 주고 체험단을 썼는데 정작 검색 결과에 노출이 안 되나요?" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-[4rem] transition-colors group-hover:bg-green-100"></div>
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:text-green-600 group-hover:bg-white group-hover:shadow-md transition-all">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed break-keep">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 3. Solution Simulation Section */}
            <section className="py-24 px-6 bg-[#f0fdf4] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-40"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealOnScroll>
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                실패 없는 체험단의<br/>
                                <span className="text-green-600">성공 방정식</span>
                            </h2>
                            <p className="text-gray-600">철저한 검증과 기획으로 단순 배포 그 이상의 가치를 만듭니다.</p>
                        </div>

                        {/* Process Flow */}
                        <div className="relative">
                            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-gray-300 via-green-400 to-gray-300 -translate-y-1/2 z-0"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                                {/* Step 1: Selection */}
                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner font-bold text-2xl">01</div>
                                    <h3 className="text-xl font-bold mb-3">상위 1% 인플루언서 선정</h3>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                        일 방문자 수, 블로그 지수, 전문성을<br/>종합 분석하여 최적의 인원을 선발합니다.
                                    </p>
                                    <div className="flex gap-2 justify-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white -ml-2"></div>
                                        <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white -ml-2"></div>
                                        <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white -ml-2 flex items-center justify-center text-white"><Check className="w-5 h-5"/></div>
                                    </div>
                                </div>

                                {/* Step 2: Planning */}
                                <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-green-200 flex flex-col items-center text-center transform scale-105 z-20 relative">
                                    <div className="absolute -top-4 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">KEY POINT</div>
                                    <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 font-bold text-2xl">02</div>
                                    <h3 className="text-xl font-bold mb-3">키워드 & 가이드라인 기획</h3>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                        검색량은 많고 경쟁은 적은 '황금 키워드'와<br/>구매를 부르는 가이드라인을 제공합니다.
                                    </p>
                                    <div className="w-full bg-gray-50 rounded-xl p-3 border border-gray-100 text-xs text-left text-gray-400 font-mono">
                                        <div className="bg-gray-200 h-2 w-3/4 mb-2 rounded"></div>
                                        <div className="bg-gray-200 h-2 w-1/2 mb-2 rounded"></div>
                                        <div className="bg-green-100 h-2 w-full rounded text-green-600 font-bold">#지역맛집 #데이트코스</div>
                                    </div>
                                </div>

                                {/* Step 3: Monitoring */}
                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner font-bold text-2xl">03</div>
                                    <h3 className="text-xl font-bold mb-3">배포 및 사후 관리</h3>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                        리뷰 등록 현황을 실시간 모니터링하며<br/>누락 시 재진행 A/S를 보장합니다.
                                    </p>
                                    <div className="w-full h-12 flex items-center justify-center gap-4">
                                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">등록완료</div>
                                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">상위노출</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 4. Detailed Features (Zigzag) */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto space-y-32">
                    {[
                        {
                            category: "Viral Strategy",
                            title: "검색했을 때 우리 가게가\n도배되도록 만듭니다",
                            desc: "소비자는 한 번의 검색으로 구매하지 않습니다. 스마트플레이스, 블로그, 카페 등 다양한 영역에 브랜드를 노출시켜 신뢰도를 쌓고 방문을 유도합니다.",
                            icon: <Layers className="w-6 h-6 text-white" />,
                            img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
                            align: "left",
                            color: "bg-green-600"
                        },
                        {
                            category: "Quality Content",
                            title: "사진 작가 뺨치는\n고퀄리티 포토 리뷰",
                            desc: "흐릿하고 맛없어 보이는 사진은 오히려 역효과를 냅니다. DSLR급 고화질 촬영이 가능한 리뷰어를 선별하여 매장의 분위기와 음식의 맛을 생생하게 담아냅니다.",
                            icon: <Camera className="w-6 h-6 text-white" />,
                            img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
                            align: "right",
                            color: "bg-orange-500"
                        },
                        {
                            category: "Keyword Logic",
                            title: "노출이 안 되면\n의미가 없습니다",
                            desc: "최신 네이버 로직(C-Rank, DIA+)을 분석하여 상위 노출 확률을 높입니다. 단순히 글자 수만 채우는 것이 아니라, 알고리즘이 좋아하는 구조로 포스팅합니다.",
                            icon: <Search className="w-6 h-6 text-white" />,
                            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
                            align: "left",
                            color: "bg-blue-600"
                        },
                        {
                            category: "Conversion",
                            title: "읽다 보면 가고 싶어지는\n스토리텔링 마케팅",
                            desc: "단순한 스펙 나열이 아닌, 소비자의 입장에서 공감할 수 있는 스토리를 담습니다. '가보고 싶다', '먹어보고 싶다'는 마음이 들게 하는 설득력 있는 글을 씁니다.",
                            icon: <PenTool className="w-6 h-6 text-white" />,
                            img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
                            align: "right",
                            color: "bg-purple-600"
                        }
                    ].map((feature, idx) => (
                        <RevealOnScroll key={idx} direction={feature.align === 'left' ? 'left' : 'right'}>
                            <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${feature.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-1/2">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4 ${feature.color} bg-opacity-80`}>
                                        {feature.category}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight whitespace-pre-line text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                                        {feature.desc}
                                    </p>
                                    <div className="mt-8 flex gap-4">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
                                            <Check className="w-4 h-4 text-brand-accent" /> 프리미엄 블로거
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
                                            <Check className="w-4 h-4 text-brand-accent" /> 키워드 보장
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white/50">
                                        <img src={feature.img} alt={feature.title} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                                        <div className={`absolute bottom-6 right-6 w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center text-white shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform`}>
                                            {feature.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </section>

            {/* 5. Special Solution (Blacklist System) */}
            <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
                 {/* Background Elements */}
                 <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                 <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
                 
                 <div className="max-w-7xl mx-auto text-center relative z-10">
                    <RevealOnScroll>
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-green-400 font-bold mb-6 backdrop-blur-md">
                            Smart Filtering System
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">철저한 블랙리스트 관리</h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                            자체 보유한 '불량 리뷰어 DB'를 통해<br/>
                            브랜드에 해가 되는 체험단은 원천 차단합니다.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
                            {[
                                { title: "저품질 블로그 필터링", desc: "노출이 안 되는 죽은 블로그 제외" },
                                { title: "상습 먹튀/지각 관리", desc: "약속을 어기는 인원 영구 제명" },
                                { title: "복사 붙여넣기 원고", desc: "성의 없는 원고 작성자 배제" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col items-center gap-4 hover:bg-white/10 transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                        <Filter className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                 </div>
            </section>

            {/* 6. Why Us */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold mb-16">왜 스마트플레이스 체험단인가요?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "업계 최다 인풀루언서", desc: "뷰티, 맛집, 여행 등 분야별 전문 블로거 10만 명 보유", icon: Users },
                                { title: "1:1 전담 매니저", desc: "모집부터 결과 보고까지 전담 매니저가 밀착 케어합니다.", icon: UserCheck },
                                { title: "압도적 가성비", desc: "타사 대비 합리적인 비용으로 최고의 효율을 냅니다.", icon: DollarSign },
                                { title: "결과 보고서 제공", desc: "노출 현황과 성과를 한눈에 볼 수 있는 리포트를 드립니다.", icon: FileText },
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group text-left hover:-translate-y-1 duration-300">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-gray-400 group-hover:text-white group-hover:bg-green-600 transition-all duration-300">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 7. Reviews */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">파트너사들의 리얼 후기</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "오픈 초기인데 줄 서서 먹어요.", content: "체험단 10팀 진행했는데, 그 글 보고 오셨다는 손님이 정말 많습니다. 덕분에 오픈 초기 자리를 빨리 잡았어요.", author: "홍대 고기집 사장님", tag: "#오픈마케팅" },
                                { title: "매출이 2배나 올랐습니다.", content: "온라인에 정보가 없어서 손님이 없었는데, 리뷰가 쌓이니까 신뢰도가 올라갔는지 배달 주문까지 늘었습니다.", author: "강남 디저트 카페", tag: "#매출상승" },
                                { title: "사진 퀄리티가 너무 좋아요.", content: "체험단 분들이 찍어주신 사진을 상세페이지에도 쓰고 인스타에도 쓰고 있어요. 마케팅 소스로 활용하기 너무 좋습니다.", author: "화장품 브랜드 담당자", tag: "#고퀄리티" }
                            ].map((review, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                        <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-3 text-gray-900">"{review.title}"</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[80px]">{review.content}</p>
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <span className="text-sm font-bold text-gray-800">{review.author}</span>
                                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">{review.tag}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 8. FAQ */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <RevealOnScroll>
                        <h2 className="text-3xl font-bold mb-10 text-center">자주 묻는 질문</h2>
                        <div className="space-y-4">
                            {[
                                { q: "최소 진행 가능한 인원은 몇 명인가요?", a: "기본 5팀부터 진행 가능하며, 업종과 규모에 따라 10팀, 20팀 등 맞춤 제안을 드립니다. 꾸준히 진행하는 것이 가장 효과적입니다." },
                                { q: "제품 배송형과 방문형 중 어떤 게 좋나요?", a: "맛집, 뷰티샵, 펜션 등 오프라인 매장은 '방문형'을, 화장품, 밀키트, 의류 등 택배 발송이 가능한 제품은 '배송형'을 추천드립니다." },
                                { q: "키워드 상위노출은 보장되나요?", a: "100% 보장은 네이버 정책상 불가능하지만, 당사의 노하우로 선별한 키워드와 로직에 맞춘 가이드라인을 통해 높은 확률로 상위 노출을 이끌어냅니다." },
                            ].map((item, idx) => (
                                <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-green-200 transition-colors">
                                    <button 
                                        onClick={() => toggleFaq(idx)} 
                                        className="w-full py-6 px-6 flex justify-between items-center text-left font-bold text-lg hover:text-green-600 transition-colors bg-white"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-green-600">Q.</span> {item.q}
                                        </span>
                                        {openFaq === idx ? <ChevronUp className="w-5 h-5 text-green-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 text-sm border-t border-gray-100">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 9. Bottom CTA */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-600 to-emerald-700 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            아직도 광고비만 날리고 계신가요?<br/>
                            이제 <span className="text-yellow-300">매출로 이어지는 체험단</span>을 경험하세요.
                        </h2>
                        <p className="text-green-100 text-lg mb-12">업종별 성공 사례 데이터와 견적을 무료로 받아보세요.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:scale-105">
                                무료 상담 신청 <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a href="tel:02-6958-9144" className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-green-800 text-white font-bold rounded-full hover:bg-green-900 transition-all shadow-xl">
                                전화 문의 02-6958-9144
                            </a>
                        </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                </div>
            </section>
        </div>
    );
};

// --- Generic Service Detail Component ---
const GenericServiceDetail: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return <div className="min-h-screen flex items-center justify-center">Service not found</div>;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-brand-black">
        <div className="absolute inset-0">
            <img 
                src={data.heroImage} 
                alt={data.title} 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
            <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-brand-accent font-bold mb-8 backdrop-blur-md shadow-lg">
                    <data.icon className="w-4 h-4" /> {data.subtitle}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                    {data.title}
                </h1>
                <p className="text-xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
                    {data.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 hover:-translate-y-1">
                        서비스 문의하기 <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </RevealOnScroll>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
              <RevealOnScroll>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">비즈니스 성공을 위한 <span className="text-brand-accent">최적의 솔루션</span></h2>
                  <p className="text-gray-600 mb-12 text-lg">
                      데이터 기반의 전략과 크리에이티브한 콘텐츠로<br/>
                      귀사의 브랜드 가치를 높이고 확실한 성과를 만들어냅니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                      <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-brand-accent mb-6"><Target className="w-6 h-6"/></div>
                          <h3 className="text-xl font-bold mb-3">정밀한 타겟팅</h3>
                          <p className="text-gray-500">빅데이터 분석을 통해 잠재 고객을 정확히 찾아내고 도달합니다.</p>
                      </div>
                      <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6"><Sparkles className="w-6 h-6"/></div>
                          <h3 className="text-xl font-bold mb-3">고퀄리티 콘텐츠</h3>
                          <p className="text-gray-500">전문 기획자와 디자이너가 브랜드의 매력을 극대화하는 콘텐츠를 제작합니다.</p>
                      </div>
                      <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6"><TrendingUp className="w-6 h-6"/></div>
                          <h3 className="text-xl font-bold mb-3">확실한 성과</h3>
                          <p className="text-gray-500">단순 노출을 넘어 실제 전환과 매출 상승으로 이어지는 성과를 약속합니다.</p>
                      </div>
                  </div>
              </RevealOnScroll>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center px-6">
              <h2 className="text-3xl font-bold mb-8">지금 바로 시작하세요</h2>
              <Link to="/contact" className="inline-flex items-center gap-2 px-12 py-5 bg-brand-black text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1">
                  무료 상담 신청 <ArrowRight className="w-5 h-5" />
              </Link>
          </div>
      </section>
    </div>
  );
};

// --- Specialized Wrappers for Each Service ---
const PlaceMarketingDetail: React.FC = () => <GenericServiceDetail data={serviceData['place']} />;
const ClipMarketingDetail: React.FC = () => <GenericServiceDetail data={serviceData['clip']} />;
const YoutubeMarketingDetail: React.FC = () => <GenericServiceDetail data={serviceData['youtube']} />;
const InstagramMarketingDetail: React.FC = () => <GenericServiceDetail data={serviceData['instagram']} />;

const ServiceDetail: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  if (type === 'place') {
      return <PlaceMarketingDetail />;
  }
  
  if (type === 'clip') {
      return <ClipMarketingDetail />;
  }

  if (type === 'youtube') {
      return <YoutubeMarketingDetail />;
  }

  if (type === 'instagram') {
      return <InstagramMarketingDetail />;
  }

  if (type === 'experience') {
      return <ExperienceMarketingDetail />;
  }

  const data = serviceData[type || 'place'];
  return <GenericServiceDetail data={data} />;
};

export default ServiceDetail;
