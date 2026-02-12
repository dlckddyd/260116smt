
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Video, MonitorPlay, Instagram, Users, Check, ArrowRight, ThumbsUp, 
  BarChart2, Zap, Search, MousePointer2, Star, TrendingUp, CheckCircle2, 
  Eye, Heart, Share2, Camera, MessageCircle, Youtube, Loader2, HelpCircle, 
  ChevronDown, ChevronUp, Trophy, UserCheck, Layout, DollarSign, Target, 
  PieChart, Award, Rocket, Calendar, ShieldCheck, Layers, FileText, 
  PlayCircle, Film, Clapperboard, Sparkles, Smartphone, Monitor, Scissors, 
  Palette, Grid, Hash, ShoppingBag, Megaphone, Image, Filter, PenTool, Radio,
  Clock, Activity, Lock, AlertCircle, Cpu, Globe, Settings, MousePointerClick, Lightbulb, User,
  Database, LineChart, BrainCircuit, Play, Music, BarChart
} from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

// --- Shared Components ---

const SectionTitle = ({ title, sub, color = "text-gray-900", align = "center" }: { title: React.ReactNode, sub: string, color?: string, align?: "left" | "center" }) => (
    <div className={`mb-16 md:mb-24 ${align === "center" ? "text-center" : "text-left"}`}>
        <span className={`font-bold tracking-widest uppercase text-sm mb-3 block ${color.replace('text-gray-900', 'text-brand-accent')}`}>{sub}</span>
        <h2 className={`text-3xl md:text-5xl font-bold leading-tight ${color}`}>{title}</h2>
    </div>
);

const FaqSection = ({ items, color = "text-blue-600" }: { items: {q:string, a:string}[], color?: string }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
                <RevealOnScroll>
                    <h2 className="text-3xl font-bold mb-12 text-center">자주 묻는 질문 (FAQ)</h2>
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-gray-400 transition-colors">
                                <button 
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
                                    className="w-full py-6 px-6 flex justify-between items-center text-left font-bold text-lg hover:bg-gray-50 transition-colors"
                                >
                                    <span className="flex items-center gap-4">
                                        <span className={`text-2xl ${color}`}>Q.</span> {item.q}
                                    </span>
                                    {openIndex === idx ? <ChevronUp className={`w-5 h-5 ${color}`} /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-8 text-[15px] border-t border-gray-100">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

const CtaSection = ({ title, subTitle, colorFrom, colorTo, buttonColor, textClass = "text-yellow-300" }: any) => (
    <section className="py-24 px-6">
        <div className={`max-w-6xl mx-auto bg-gradient-to-r ${colorFrom} ${colorTo} rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl group`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 text-white">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    {title}<br/>
                    <span className={textClass}>{subTitle}</span>
                </h2>
                <p className="text-white/80 text-xl mb-12 font-light">고민하는 이 순간에도 경쟁사의 순위는 오르고 있습니다.<br/>데이터로 증명된 솔루션을 지금 바로 경험하세요.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link to="/contact" className={`inline-flex items-center justify-center gap-3 px-12 py-6 bg-white ${buttonColor} font-bold text-lg rounded-full hover:bg-gray-50 transition-all shadow-xl hover:scale-105 hover:shadow-2xl`}>
                        무료 진단 및 견적 받기 <ArrowRight className="w-6 h-6" />
                    </Link>
                    <a href="tel:02-6958-9144" className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-black/20 border border-white/30 text-white font-bold text-lg rounded-full hover:bg-black/40 transition-all shadow-xl backdrop-blur-md">
                        <Smartphone className="w-6 h-6" /> 전화 문의 02-6958-9144
                    </a>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-20 animate-pulse delay-1000"></div>
        </div>
    </section>
);

// --- 1. Place Marketing Detail (Redesigned: Algorithm Lab Concept) ---
const PlaceMarketingDetail: React.FC = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero: Tech & Data Focused */}
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1c]">
                <div className="absolute inset-0">
                    {/* Abstract Data Flow Background */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-blue-900/10 to-[#0a0f1c]"></div>
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.3)] text-sm tracking-wider uppercase">
                            <Cpu className="w-4 h-4" /> Next-Gen SEO Algorithm
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                            상위노출은 운이 아닌<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">정교한 공학(Engineering)</span>입니다
                        </h1>
                        <p className="text-xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed">
                            누구나 하는 '단순 배포' 방식으로는 더 이상 네이버 로직을 뚫을 수 없습니다.<br/>
                            300여 가지 랭킹 팩터를 분석하여 귀사만의 <strong className="text-white">최적화 승리 공식</strong>을 설계합니다.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-white text-[#0a0f1c] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                                내 매장 순위 진단하기 <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 2. Problem: Logic Shift */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <span className="text-blue-600 font-bold tracking-widest uppercase mb-4 block">Reality Check</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    "왜 우리 가게만<br/>
                                    순위가 떨어질까요?"
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    네이버의 알고리즘(AiRS, C-Rank)은 매일 진화합니다.<br/>
                                    과거의 '양치기' 방식은 이제 통하지 않습니다.<br/>
                                    지금 필요한 것은 <strong>변화된 로직에 맞춘 유효 데이터</strong>입니다.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                        <AlertCircle className="w-6 h-6 text-red-500" />
                                        <span className="font-bold text-gray-800">단순 트래픽 반복 = 어뷰징 필터링 대상</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                        <AlertCircle className="w-6 h-6 text-red-500" />
                                        <span className="font-bold text-gray-800">체류 시간 없는 유입 = 품질 지수 하락</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                {/* Improved Logic Changed Graph (Matching Image 2 Style) */}
                                <div className="relative aspect-[4/3] bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl overflow-hidden p-8 flex flex-col">
                                    <div className="flex justify-between text-gray-400 font-bold text-lg mb-4">
                                        <span>Rank 1</span>
                                        <span>Rank 50+</span>
                                    </div>
                                    <div className="relative flex-1 w-full">
                                        {/* Dashed Line Down */}
                                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 300">
                                            <path 
                                                d="M0,20 C150,20 200,200 400,280" 
                                                fill="none" 
                                                stroke="#ff6b6b" 
                                                strokeWidth="5" 
                                                strokeDasharray="12 12" 
                                                strokeLinecap="round"
                                                className="drop-shadow-sm"
                                            />
                                            {/* Start Point */}
                                            <circle cx="20" cy="20" r="8" fill="#ff6b6b" className="animate-pulse" />
                                            {/* End Point */}
                                            <circle cx="380" cy="280" r="8" fill="#ff6b6b" />
                                        </svg>
                                        
                                        {/* Logic Changed Button */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="bg-[#ef4444] text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl shadow-red-200 animate-bounce whitespace-nowrap">
                                                Logic Changed!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 3. Solution: Bento Grid Layout */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle 
                            sub="Our Methodology" 
                            title={<>데이터가 증명하는<br/><span className="text-blue-600">4-Step 성장 알고리즘</span></>} 
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                            {/* Card 1: Large - Contents */}
                            <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                        <BrainCircuit className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">SEO 최적화 콘텐츠 (C-Rank)</h3>
                                    <p className="text-gray-500 leading-relaxed max-w-md">
                                        단순히 '좋아요'만 외치는 리뷰는 힘이 없습니다. 
                                        네이버 AI가 선호하는 <strong>맥락(Context)</strong>과 <strong>키워드 밀도</strong>를 계산하여,
                                        전문성이 느껴지는 고품질 포스팅을 배포합니다.
                                    </p>
                                </div>
                                <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-blue-50 to-transparent rounded-tl-[100px] -mr-10 -mb-10 group-hover:scale-110 transition-transform"></div>
                            </div>

                            {/* Card 2: Vertical - Traffic */}
                            <div className="md:row-span-2 bg-gray-900 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                                            <MousePointerClick className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">유효타 트래픽<br/>(Traffic Quality)</h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            봇(Bot)이 아닌 실제 유저 데이터를 기반으로 합니다.<br/><br/>
                                            검색 → 클릭 → 체류 → 전환으로 이어지는
                                            <strong> '구매 여정'</strong>을 시뮬레이션하여
                                            플레이스 점수를 안전하게 높입니다.
                                        </p>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <div className="flex items-end gap-2">
                                            <span className="text-4xl font-bold text-green-400">+350%</span>
                                            <span className="text-sm text-gray-400 mb-2">평균 유입 증가율</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Small - Indexing */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">플레이스 지수 인덱싱</h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    저장하기, 길찾기, 알림받기 등 
                                    <strong> '이용자 반응'</strong> 점수를 체계적으로 관리합니다.
                                </p>
                            </div>

                            {/* Card 4: Small - Review */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">신뢰도 방어 시스템</h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    영수증 리뷰 및 예약자 리뷰를 통해 
                                    <strong> 평점 관리</strong>와 <strong>키워드 긍정 확산</strong>을 실행합니다.
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 4. Process Bar */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle sub="Workflow" title="성공을 만드는 정밀 프로세스" />
                        
                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block z-0"></div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                {[
                                    { title: "01. 정밀 진단", desc: "키워드 경쟁도 및\n플레이스 현황 분석", icon: Search },
                                    { title: "02. 로직 설계", desc: "최적화 키워드 배치 및\n트래픽 시나리오 구성", icon: Settings },
                                    { title: "03. 실행 & 부스팅", desc: "콘텐츠 배포 및\n유효타 트래픽 주입", icon: Rocket },
                                    { title: "04. 성과 리포팅", desc: "순위 변동 추적 및\n방어 로직 가동", icon: LineChart }
                                ].map((step, i) => (
                                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-200 text-center hover:border-blue-500 transition-colors shadow-lg shadow-gray-100/50">
                                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 border-4 border-white shadow-sm">
                                            <step.icon className="w-7 h-7" />
                                        </div>
                                        <h4 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h4>
                                        <p className="text-sm text-gray-500 whitespace-pre-line">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 5. Special Offer (Redesigned for Steady Management) */}
            <section className="py-20 px-6 bg-[#f8fafc]">
                <div className="max-w-5xl mx-auto">
                    <RevealOnScroll>
                        <div className="bg-white rounded-[2rem] p-10 md:p-16 border border-gray-100 shadow-xl flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1">
                                <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-4">Premium Care</div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">프리미엄 순위 관리 케어</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    단기간의 무리한 상위노출은 오히려 독이 될 수 있습니다.<br/>
                                    로직에 맞춘 안전한 트래픽과 콘텐츠로 <strong>서서히, 그러나 확실하게</strong> 순위를 높입니다.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <Check className="w-5 h-5 text-blue-500" /> 키워드 정밀 진단
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <Check className="w-5 h-5 text-blue-500" /> 단계별 순위 상승 유도
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <Check className="w-5 h-5 text-blue-500" /> 로직 변화 실시간 대응
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <Check className="w-5 h-5 text-blue-500" /> 어뷰징 없는 클린 관리
                                    </li>
                                </ul>
                                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all">
                                    상담 신청하기
                                </Link>
                            </div>
                            <div className="w-full md:w-1/3 flex flex-col gap-4">
                                {/* Mockup Cards - Varied Rankings */}
                                {[
                                    { rank: "1위", name: "마라 마파두부", loc: "서울 강남구", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop" },
                                    { rank: "4위", name: "두반 퍼시픽", loc: "부산 해운대구", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=200&auto=format&fit=crop" },
                                    { rank: "7위", name: "가산오프라인마켓", loc: "서울 금천구", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                                        <div className="p-3 flex gap-3 items-center">
                                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.img} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-bold text-gray-800 text-sm truncate">{item.name}</span>
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">실시간 {item.rank}</span>
                                                </div>
                                                <div className="text-xs text-gray-400">{item.loc}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 6. FAQ */}
            <FaqSection items={[
                { q: "순위 상승까지 기간이 얼마나 걸리나요?", a: "키워드의 경쟁 강도에 따라 상이하지만, 평균적으로 로직 최적화 작업 후 2주~4주 사이에 유의미한 순위 변동이 관찰됩니다." },
                { q: "어뷰징으로 인한 순위 하락 위험은 없나요?", a: "가장 많이 하시는 걱정입니다. 저희는 기계적인 매크로 방식을 절대 사용하지 않습니다. 실제 유저 행동 패턴을 기반으로 한 '클린 트래픽'만을 사용하여 안전합니다." },
                { q: "계약이 끝나면 순위가 바로 떨어지나요?", a: "기본적으로 최적화 점수를 높여두었기 때문에 급락하지는 않습니다. 다만, 경쟁 업체들의 활동량에 따라 서서히 밀려날 수 있으므로 꾸준한 유지보수 관리를 권장합니다." }
            ]} />

            <CtaSection 
                title="망설이는 시간에도" 
                subTitle="경쟁사의 순위는 오르고 있습니다"
                colorFrom="from-slate-900" colorTo="to-blue-900"
                buttonColor="text-blue-700"
            />
        </div>
    );
};

// --- 2. Naver Clip Detail (Redesigned: Algorithm & Virality) ---
const ClipMarketingDetail: React.FC = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero: Impact & Algorithm */}
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-green-900/10 to-[#050505]"></div>
                    {/* Animated Glow Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-bold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.2)] text-sm tracking-wider uppercase">
                            <Video className="w-4 h-4" /> Short-form Algorithm Lab
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                            단 60초, 소비자의 뇌리에<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">각인되는 알고리즘</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed">
                            텍스트는 읽지 않습니다. 15초 안에 승부하지 않으면 이탈합니다.<br/>
                            철저하게 계산된 <strong>도파민 루프(Dopamine Loop)</strong>로 당신의 브랜드를 각인시킵니다.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-[#00c73c] text-white font-bold rounded-xl hover:bg-[#00b336] transition-all shadow-[0_0_20px_rgba(0,199,60,0.3)] flex items-center justify-center gap-2">
                                숏폼 컨설팅 받기 <Play className="w-5 h-5 fill-white" />
                            </Link>
                        </div>
                     </RevealOnScroll>
                </div>
            </section>
            
            {/* 2. The Shift: Why Short-form? */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <span className="text-green-600 font-bold tracking-widest uppercase mb-4 block">Market Shift</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    "왜 네이버가<br/>
                                    클립(Clip)을 밀어줄까요?"
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    검색의 시대에서 <strong>발견의 시대</strong>로 넘어왔습니다.<br/>
                                    네이버는 지금 유튜브/틱톡에 뺏긴 체류 시간을 되찾기 위해<br/>
                                    '클립' 콘텐츠에 막대한 트래픽 가산점을 부여하고 있습니다.<br/>
                                    지금이 가장 저렴하게 노출될 수 있는 <strong className="text-green-600">골든 타임</strong>입니다.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="text-3xl font-bold text-gray-300 mb-1">Old</div>
                                        <div className="font-bold text-gray-500">블로그 텍스트</div>
                                        <div className="text-sm text-gray-400 mt-2">이탈률 70% 이상</div>
                                    </div>
                                    <div className="p-5 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
                                        <div className="text-3xl font-bold text-green-500 mb-1">New</div>
                                        <div className="font-bold text-gray-800">숏폼 비디오</div>
                                        <div className="text-sm text-green-600 mt-2 font-bold">도달률 500% 증가</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                <div className="relative aspect-[9/16] max-w-sm mx-auto bg-gray-900 rounded-[2.5rem] border-8 border-gray-200 shadow-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                        <div className="text-center">
                                            <PlayCircle className="w-16 h-16 text-white/50 mb-4 mx-auto" />
                                            <p className="text-gray-400 font-medium">Viral Content Loading...</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="flex flex-col gap-2 mb-4">
                                            <div className="w-3/4 h-4 bg-gray-200/20 rounded-full animate-pulse"></div>
                                            <div className="w-1/2 h-4 bg-gray-200/20 rounded-full animate-pulse"></div>
                                        </div>
                                        <div className="flex justify-between items-center text-white">
                                            <div className="flex gap-4">
                                                <div className="flex flex-col items-center"><Heart className="w-6 h-6 mb-1"/> <span className="text-xs">2.4k</span></div>
                                                <div className="flex flex-col items-center"><MessageCircle className="w-6 h-6 mb-1"/> <span className="text-xs">342</span></div>
                                            </div>
                                            <button className="px-4 py-2 bg-[#00c73c] rounded-full text-sm font-bold">예약하기</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-10 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float-slow">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-red-500" />
                                        <span className="font-bold text-gray-800">조회수 급상승 🔥</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* NEW: Viral DNA Section */}
            <section className="py-24 px-6 bg-[#111] text-white">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <span className="text-[#00c73c] font-bold tracking-widest uppercase mb-3 block">Viral Formula</span>
                            <h2 className="text-3xl md:text-5xl font-bold">터지는 영상에는 <span className="text-[#00c73c]">법칙</span>이 있습니다</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "0.5초 후킹", desc: "시작하자마자 시선을 사로잡는 시각적 충격 효과", icon: Zap },
                                { title: "트렌드 음원", desc: "알고리즘이 선호하는 최신 유행 음원 매칭", icon: Music },
                                { title: "도파민 편집", desc: "지루할 틈 없는 빠른 컷 전환과 리듬감", icon: Activity }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#222] p-8 rounded-3xl border border-white/10 hover:border-[#00c73c] transition-colors group">
                                    <div className="w-14 h-14 bg-[#333] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#00c73c] transition-colors text-white">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 3. Strategy: Bento Grid Layout */}
            <section className="py-24 px-6 bg-gray-50">
               <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle 
                            sub="Our Strategy" 
                            title={<>성공하는 숏폼의<br/><span className="text-green-600">3가지 절대 법칙</span></>} 
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
                            {/* Card 1: Hook Logic */}
                            <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">3-Second Rule (후킹의 법칙)</h3>
                                    <p className="text-gray-500 leading-relaxed max-w-lg">
                                        영상의 성패는 초반 3초에 결정됩니다. 
                                        시각적 충격, 질문 던지기, 빠른 컷 편집을 통해 
                                        <strong> 스크롤을 멈추게(Thumb-stopping)</strong> 만드는 심리적 장치를 설계합니다.
                                    </p>
                                </div>
                                <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-red-50 to-transparent rounded-tl-[100px] -mr-10 -mb-10 group-hover:scale-110 transition-transform"></div>
                            </div>
                            {/* Card 2: SEO */}
                            <div className="md:row-span-2 bg-gray-900 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                                            <Search className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">검색 연동 SEO<br/>(Discovery)</h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            단순 노출에서 끝나지 않습니다.<br/><br/>
                                            네이버 클립은 <strong>'플레이스'</strong> 및 <strong>'키워드 검색'</strong>과 연동됩니다.
                                            영상 하단에 플레이스 지도를 심어 시청자를 즉시 구매자로 전환시킵니다.
                                        </p>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <div className="flex items-end gap-2">
                                            <span className="text-4xl font-bold text-green-400">Top 1</span>
                                            <span className="text-sm text-gray-400 mb-2">추천 탭 노출 목표</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Card 3: Quality */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                        <Palette className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">시네마틱 톤앤매너</h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    스마트폰 촬영의 한계를 넘어, 전문 장비와 색보정(Color Grading)으로 
                                    <strong> 브랜드의 격</strong>을 높입니다.
                                </p>
                            </div>
                            {/* Card 4: Structure */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">기승전결 구조화</h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    단순 나열이 아닌, 문제 제기 → 해결책 제시 → 결과 증명으로 이어지는 
                                    <strong> 설득의 서사</strong>를 담습니다.
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
               </div>
            </section>

            {/* NEW: Place Synergy Section */}
            <section className="py-24 px-6 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="w-full lg:w-1/2">
                                <span className="text-green-600 font-bold tracking-widest uppercase mb-4 block">Connection</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    영상 하나가<br/>
                                    <span className="text-green-600">매출</span>로 이어지는 과정
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    클립은 단순 조회수로 끝나지 않습니다. <br/>
                                    영상 내에 삽입된 '플레이스 정보'와 '예약 버튼'을 통해 <br/>
                                    시청자를 <strong>즉각적인 구매 행동</strong>으로 유도합니다.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm font-bold">1</div>
                                        <span className="font-bold text-gray-800">메인 노출로 신규 잠재 고객 유입</span>
                                    </li>
                                    <li className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm font-bold">2</div>
                                        <span className="font-bold text-gray-800">영상 속 장소 태그 클릭 유도</span>
                                    </li>
                                    <li className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm font-bold">3</div>
                                        <span className="font-bold text-gray-800">플레이스 저장 및 예약 확정</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/2">
                                {/* Diagram Visualization */}
                                <div className="relative bg-gray-50 rounded-[3rem] p-10 border border-gray-100">
                                    <div className="flex flex-col gap-6 items-center">
                                        {/* Step 1 */}
                                        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '0ms'}}>
                                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500"><PlayCircle className="w-6 h-6"/></div>
                                            <div>
                                                <div className="font-bold text-gray-900">영상 시청</div>
                                                <div className="text-xs text-gray-500">네이버 메인/검색 노출</div>
                                            </div>
                                        </div>
                                        <div className="text-gray-300">↓</div>
                                        {/* Step 2 */}
                                        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '150ms'}}>
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500"><MousePointerClick className="w-6 h-6"/></div>
                                            <div>
                                                <div className="font-bold text-gray-900">장소 클릭</div>
                                                <div className="text-xs text-gray-500">영상 하단 플레이스 태그</div>
                                            </div>
                                        </div>
                                        <div className="text-gray-300">↓</div>
                                        {/* Step 3 */}
                                        <div className="w-full bg-green-50 p-5 rounded-2xl shadow-md border border-green-200 flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white"><CheckCircle2 className="w-6 h-6"/></div>
                                            <div>
                                                <div className="font-bold text-green-900">매출 전환</div>
                                                <div className="text-xs text-green-700">예약 / 주문 / 저장하기</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 5. Result Graph Section (REDESIGNED: Clean White Card & Curve Style) */}
            <section className="py-24 px-6 bg-[#f8fafc] overflow-hidden relative">
                <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <span className="text-[#00c73c] font-bold tracking-[0.2em] uppercase mb-4 block text-sm">Proven Results</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight break-keep text-gray-900">
                            데이터가 증명하는<br/>
                            <span className="text-[#00c73c]">압도적 도달률 차이</span>
                        </h2>
                        <p className="text-gray-500 mb-10 text-lg leading-relaxed break-keep">
                            동일한 비용을 투자했을 때, 숏폼 콘텐츠는 텍스트/이미지 대비 <strong className="text-gray-900">평균 5~10배 높은 도달률</strong>을 기록합니다. 
                            잠재 고객에게 우리 브랜드를 노출시킬 수 있는 가장 확실한 방법입니다.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-full bg-[#00c73c]/10 flex items-center justify-center text-[#00c73c] shrink-0 border border-[#00c73c]/20">
                                    <Check className="w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold text-gray-700">네이버 메인 '추천' 탭 노출 기회</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-full bg-[#00c73c]/10 flex items-center justify-center text-[#00c73c] shrink-0 border border-[#00c73c]/20">
                                    <Check className="w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold text-gray-700">플레이스 체류 시간 상승으로 순위 견인</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Graph Visualization - Clean White Card Style (Like Image 2 but Upwards) */}
                    <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
                        {/* Device Frame */}
                        <div className="relative bg-white rounded-[2.5rem] border border-gray-200 p-10 shadow-2xl overflow-hidden flex flex-col aspect-[4/3]">
                            {/* Decorative Header Line */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            
                            <div className="flex justify-between items-end mb-8 relative z-10">
                                <div>
                                    <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Organic Reach</div>
                                    <div className="text-3xl font-bold text-gray-900">도달률 비교</div>
                                </div>
                                <div className="text-5xl font-black text-green-500 tracking-tighter">8.5x</div>
                            </div>
                            
                            <div className="relative flex-1 w-full mt-4">
                                {/* SVG Curve Graph */}
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    {/* Grid lines */}
                                    <line x1="0" y1="150" x2="400" y2="150" stroke="#f1f5f9" strokeWidth="2" />
                                    <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="2" />
                                    <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" strokeWidth="2" />
                                    
                                    {/* Rising Curve */}
                                    <path 
                                        d="M20,180 C100,180 150,160 200,140 S300,50 380,20" 
                                        fill="none" 
                                        stroke="#22c55e" 
                                        strokeWidth="5" 
                                        strokeLinecap="round"
                                        className="drop-shadow-lg"
                                    />
                                    
                                    {/* Points */}
                                    <circle cx="20" cy="180" r="6" fill="white" stroke="#22c55e" strokeWidth="3" />
                                    <circle cx="200" cy="140" r="6" fill="white" stroke="#22c55e" strokeWidth="3" />
                                    <circle cx="380" cy="20" r="8" fill="#22c55e" className="animate-pulse" />
                                </svg>
                                
                                {/* Badge Overlay */}
                                <div className="absolute top-[5%] right-0 transform translate-x-4 -translate-y-4">
                                    <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg shadow-green-200 animate-bounce">
                                        Algorithm Boost!
                                    </div>
                                </div>

                                {/* Labels */}
                                <div className="absolute bottom-0 w-full flex justify-between text-sm font-bold text-gray-500 transform translate-y-6">
                                    <span>블로그</span>
                                    <span>인스타</span>
                                    <span className="text-green-600">네이버 클립</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             <FaqSection items={[
                { q: "영상 촬영도 직접 해주시나요?", a: "네, 전문 PD가 기획부터 현장 방문 촬영, 편집, 후보정까지 올인원으로 진행해 드립니다. 사장님은 매장 공간만 빌려주시면 됩니다." },
                { q: "노출 보장은 되나요?", a: "알고리즘의 특성상 100% 보장은 불가능하지만, 클립 알고리즘(시청지속시간, 반응률 등)에 최적화된 콘텐츠를 제작하여 일반 영상 대비 압도적으로 높은 추천 탭 노출 확률을 확보합니다." },
                { q: "기존 영상을 활용할 수 있나요?", a: "네, 기존에 촬영해두신 영상 소스가 있다면 숏폼 문법에 맞게 컷편집, 자막, 효과를 더해 '재가공(Recut)'하는 서비스도 제공합니다." },
                { q: "어떤 업종에 효과적인가요?", a: "시각적 요소가 중요한 요식업(맛집, 카페), 뷰티(미용실, 네일), 펜션, 운동 시설 등 오프라인 매장이 있는 모든 업종에 강력하게 추천합니다." }
            ]} color="text-green-600"/>

             <CtaSection 
                title="숏폼 마케팅," 
                subTitle="지금 시작해야 선점합니다"
                colorFrom="from-gray-900" colorTo="to-green-900"
                buttonColor="text-green-700"
                textClass="text-green-300"
            />
        </div>
    );
};

// --- 3. YouTube Marketing Detail (REVAMPED: High-End Brand Studio) ---
const YoutubeMarketingDetail: React.FC = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero: Cinematic & Dark Theme */}
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0f0f0f]">
                 {/* Cinematic Background */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-red-900/10 to-[#0f0f0f]"></div>
                 
                 {/* Animated Abstract Play Button */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>

                 <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)] text-sm tracking-wider uppercase">
                             <Youtube className="w-4 h-4" /> YouTube Professional Lab
                         </div>
                         <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                             유튜브, 이제는<br/>
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">방송국(Broadcaster)</span>입니다
                         </h1>
                         <p className="text-xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed">
                             단순한 영상 업로드로는 팬덤을 만들 수 없습니다.<br/>
                             철저한 <strong>기획(Planning)</strong>과 <strong>알고리즘 분석</strong>으로 브랜드 채널을 설계합니다.
                         </p>
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2">
                                채널 무료 진단 <ArrowRight className="w-5 h-5" />
                            </Link>
                         </div>
                     </RevealOnScroll>
                 </div>
            </section>

            {/* 2. Reality Check (Red Ocean vs Blue Strategy) */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <span className="text-red-600 font-bold tracking-widest uppercase mb-4 block">Reality Check</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    "왜 조회수가<br/>
                                    나오지 않을까요?"
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    유튜브는 <span className="text-red-600 font-bold">총성 없는 전쟁터</span>입니다. <br/>
                                    화려한 편집 기술보다 중요한 것은, 시청자가 클릭하게 만드는 <strong>기획</strong>과 
                                    끝까지 보게 만드는 <strong>몰입 장치(Retention)</strong>입니다.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <AlertCircle className="w-6 h-6 text-gray-400" />
                                        <span className="font-bold text-gray-600">불규칙한 업로드 주기 = 노출 중단</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <AlertCircle className="w-6 h-6 text-gray-400" />
                                        <span className="font-bold text-gray-600">낮은 썸네일 클릭률(CTR) = 추천 제외</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                {/* Graph Visualization: Flatline vs Growth */}
                                <div className="relative aspect-[4/3] bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl overflow-hidden p-8 flex flex-col group">
                                    <div className="flex justify-between text-gray-400 font-bold text-lg mb-8">
                                        <span>채널 성장 그래프</span>
                                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs">Strategy Applied</span>
                                    </div>
                                    <div className="relative flex-1 w-full flex items-end">
                                        {/* Dead Line */}
                                        <div className="absolute inset-0 flex items-end">
                                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                <path d="M0,80 Q20,85 40,80 T80,82" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeDasharray="5,5" />
                                            </svg>
                                        </div>
                                        {/* Growth Curve */}
                                        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path 
                                                d="M0,80 Q30,80 50,50 T100,10" 
                                                fill="none" 
                                                stroke="#dc2626" 
                                                strokeWidth="6" 
                                                strokeLinecap="round" 
                                                className="drop-shadow-lg"
                                            />
                                            {/* Pulse Point */}
                                            <circle cx="50" cy="50" r="4" fill="white" stroke="#dc2626" strokeWidth="3" className="animate-ping origin-center" />
                                            <circle cx="50" cy="50" r="4" fill="white" stroke="#dc2626" strokeWidth="3" />
                                        </svg>
                                        
                                        <div className="absolute top-[30%] left-[55%] transform -translate-y-1/2">
                                            <div className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl animate-bounce">
                                                알고리즘 최적화!
                                            </div>
                                        </div>
                                        
                                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 font-bold mt-2">
                                            <span>단순 운영</span>
                                            <span className="text-red-600">전문가 관리</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 3. Methodology: Bento Grid */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle 
                            sub="Our Methodology" 
                            title={<>성공하는 채널의<br/><span className="text-red-600">4가지 필수 공식</span></>} 
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                            {/* Card 1: Main Strategy */}
                            <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                                        <BrainCircuit className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">데이터 기반 기획 (Data-Driven)</h3>
                                    <p className="text-gray-500 leading-relaxed max-w-md">
                                        감으로 만드는 영상은 터지지 않습니다.
                                        <strong> 경쟁사 분석, 키워드 검색량, 트렌드 추이</strong>를 데이터로 분석하여 
                                        '사람들이 지금 검색하고 싶은' 주제를 선정합니다.
                                    </p>
                                </div>
                                <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-red-50 to-transparent rounded-tl-[100px] -mr-10 -mb-10 group-hover:scale-110 transition-transform"></div>
                            </div>

                            {/* Card 2: Vertical - Thumbnail */}
                            <div className="md:row-span-2 bg-[#121212] text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                                            <MousePointerClick className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">클릭을 부르는<br/>썸네일 과학</h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            아무리 내용이 좋아도 클릭하지 않으면 무용지물입니다.<br/><br/>
                                            인간의 심리를 자극하는 <strong>카피라이팅</strong>과 <strong>디자인</strong>으로 
                                            클릭률(CTR) 10% 이상을 목표로 합니다.
                                        </p>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <div className="flex items-end gap-2">
                                            <span className="text-4xl font-bold text-red-500">10%↑</span>
                                            <span className="text-sm text-gray-400 mb-2">목표 클릭률</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Quality */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                        <Clapperboard className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">시네마틱 편집 & 사운드</h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    지루할 틈 없는 컷 편집과 몰입도를 높이는 BGM/효과음으로 시청 지속 시간을 극대화합니다.
                                </p>
                            </div>

                            {/* Card 4: Fandom */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">팬덤 커뮤니티 관리</h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    댓글 관리, 커뮤니티 탭 활용을 통해 단순 시청자를 충성 고객(Fan)으로 전환시킵니다.
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 4. Process Bar: The Youtube Cycle */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle sub="Workflow" title="체계적인 채널 성장 프로세스" />
                        
                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block z-0"></div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                {[
                                    { title: "01. 채널 진단", desc: "기존 채널 문제점 분석 및\n방향성 재설정", icon: Search },
                                    { title: "02. 기획 & 구성", desc: "킬러 콘텐츠 발굴 및\n스크립트/콘티 제작", icon: FileText },
                                    { title: "03. 촬영 & 편집", desc: "전문 장비 촬영 및\n트렌디한 편집", icon: Video },
                                    { title: "04. 업로드 & 분석", desc: "SEO 최적화 업로드 및\n성과 데이터 분석", icon: BarChart }
                                ].map((step, i) => (
                                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-200 text-center hover:border-red-500 transition-colors shadow-lg shadow-gray-100/50">
                                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 border-4 border-white shadow-sm">
                                            <step.icon className="w-7 h-7" />
                                        </div>
                                        <h4 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h4>
                                        <p className="text-sm text-gray-500 whitespace-pre-line">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 5. Result Graph Section (Reinvented: Full-Width Dashboard Style) */}
            <section className="py-32 px-6 bg-[#0f0f0f] relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealOnScroll>
                        {/* Centered Header */}
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="text-red-500 font-bold tracking-widest uppercase mb-4 block text-sm animate-pulse">Channel Analytics</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                숫자로 증명하는<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">압도적 성장세</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                단순히 영상만 올리는 것이 아닙니다. <br className="md:hidden"/>
                                <strong>구독자, 시청 시간, 클릭률</strong> 등 핵심 지표를 직접 관리합니다.
                            </p>
                        </div>

                        {/* Main Dashboard Card (Full Width) */}
                        <div className="bg-[#1a1a1a] border border-white/5 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

                            <div className="flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
                                
                                {/* Stat Highlights */}
                                <div className="flex-1 space-y-10 w-full">
                                    <div>
                                        <div className="text-gray-500 font-medium mb-2 text-lg">구독자 증가 추이</div>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-7xl md:text-8xl font-black text-white tracking-tighter">+5.2<span className="text-red-500 text-5xl md:text-6xl">K</span></span>
                                            <span className="text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-full text-sm border border-red-500/20">월간 성장</span>
                                        </div>
                                    </div>
                                    <div className="h-px w-full bg-white/10"></div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="text-gray-500 text-sm mb-1">노출 클릭률 (CTR)</div>
                                            <div className="text-2xl font-bold text-white">8.5% <span className="text-sm text-green-500">▲</span></div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500 text-sm mb-1">평균 시청 지속 시간</div>
                                            <div className="text-2xl font-bold text-white">6분 42초 <span className="text-sm text-green-500">▲</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* The Graph (YouTube Style Analytics) */}
                                <div className="w-full md:w-1/2 h-[300px] relative flex items-end justify-center">
                                    {/* Simulated Line Chart */}
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                        {/* Grid Lines */}
                                        <line x1="0" y1="150" x2="400" y2="150" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                                        <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                                        <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                                        
                                        {/* Before Management (Flat) */}
                                        <path 
                                            d="M0,180 L100,175 L150,178" 
                                            fill="none" 
                                            stroke="#555" 
                                            strokeWidth="3" 
                                            strokeLinecap="round"
                                        />
                                        
                                        {/* After Management (Skyrocket) */}
                                        <path 
                                            d="M150,178 C200,170 250,100 400,20" 
                                            fill="none" 
                                            stroke="#dc2626" 
                                            strokeWidth="5" 
                                            strokeLinecap="round"
                                            className="drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                                        />
                                        
                                        {/* Labels */}
                                        <text x="75" y="195" fill="#666" fontSize="12" textAnchor="middle">관리 전</text>
                                        <text x="300" y="195" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">솔루션 도입 후</text>
                                        
                                        {/* Point */}
                                        <circle cx="400" cy="20" r="6" fill="#dc2626" stroke="white" strokeWidth="2" className="animate-pulse" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 6. FAQ */}
            <FaqSection items={[
                { q: "편집만 따로 맡길 수 있나요?", a: "네, 가능합니다. 원본 소스만 보내주시면 컷편집, 자막, 효과 등을 입혀 완성본으로 제작해 드립니다. 단순 편집뿐만 아니라 썸네일 제작도 포함됩니다." },
                { q: "채널 개설부터 도와주시나요?", a: "네, 채널 브랜딩(로고, 채널아트)부터 초기 설정, SEO 최적화, 영상 기획 및 업로드까지 전 과정을 올인원으로 도와드립니다." },
                { q: "촬영 장비가 없는데 괜찮나요?", a: "전문 촬영팀이 방문하여 4K 고화질 카메라와 조명, 무선 마이크 등 전문 장비를 세팅하고 촬영을 진행해 드립니다. 스튜디오 대관이 필요한 경우 섭외도 도와드립니다." },
                { q: "쇼츠(Shorts)도 제작 가능한가요?", a: "네, 유튜브 성장에 필수적인 쇼츠 제작도 포함됩니다. 롱폼 영상의 하이라이트를 추출하거나, 별도의 쇼츠 전용 기획으로 제작해 드립니다." }
            ]} color="text-red-600"/>

            <CtaSection 
                title="유튜브 마케팅," 
                subTitle="전문가와 함께 시작하세요"
                colorFrom="from-gray-900" colorTo="to-red-900"
                buttonColor="text-red-700"
                textClass="text-red-300"
            />
        </div>
    );
};

// --- 4. Instagram Marketing Detail ---
const InstagramMarketingDetail: React.FC = () => {
    return (
        <div className="bg-white">
             <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
                 <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-200 font-bold mb-8 backdrop-blur-md shadow-lg text-sm tracking-wider uppercase">
                             <Instagram className="w-4 h-4" /> Visual Branding Strategy
                         </div>
                         <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                             비주얼로 소비자를<br/>
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">사로잡는 힘</span>
                         </h1>
                         <p className="text-xl text-pink-100/80 font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed">
                             감각적인 이미지 한 장이 천 마디 말보다 강력합니다.<br/>
                             트렌디한 감각으로 브랜드의 가치를 높여드립니다.
                         </p>
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-white text-pink-900 font-bold rounded-xl hover:bg-pink-50 transition-all shadow-lg flex items-center justify-center gap-2">
                                인스타 컨설팅 받기 <ArrowRight className="w-5 h-5" />
                            </Link>
                         </div>
                     </RevealOnScroll>
                 </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                         <SectionTitle 
                            sub="Instagram Strategy" 
                            title={<>브랜드의 감성을 전달하는<br/><span className="text-pink-600">비주얼 스토리텔링</span></>} 
                        />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="bg-pink-50 rounded-3xl p-10">
                                 <h3 className="text-2xl font-bold mb-4 text-pink-900">피드 디자인 & 톤앤매너</h3>
                                 <p className="text-gray-700 leading-relaxed">브랜드의 정체성을 나타내는 컬러와 무드를 설정하여, 피드 전체가 하나의 포트폴리오처럼 보이도록 기획합니다. 통일감 있는 비주얼은 팔로우 전환율을 높입니다.</p>
                             </div>
                             <div className="bg-purple-50 rounded-3xl p-10">
                                 <h3 className="text-2xl font-bold mb-4 text-purple-900">해시태그 & 도달 최적화</h3>
                                 <p className="text-gray-700 leading-relaxed">타겟 고객이 검색하는 키워드를 분석하여 최적의 해시태그를 조합합니다. 인기 게시물 노출을 통해 유입을 극대화합니다.</p>
                             </div>
                         </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "팔로워 구매도 가능한가요?", a: "저희는 유령 계정을 구매하는 어뷰징 방식은 진행하지 않습니다. 실제 타겟 고객과의 소통을 통해 진성 팔로워를 늘리는 정공법만을 사용합니다." },
                { q: "카드뉴스 제작도 해주시나요?", a: "네, 정보성 콘텐츠나 홍보용 카드뉴스 제작도 포함되어 있습니다. 전문 디자이너가 가독성 높고 트렌디한 디자인을 제공합니다." }
            ]} color="text-pink-600"/>

            <CtaSection 
                title="인스타그램 마케팅," 
                subTitle="트렌드를 리드하세요"
                colorFrom="from-purple-900" colorTo="to-pink-900"
                buttonColor="text-pink-700"
                textClass="text-pink-300"
            />
        </div>
    );
};

// --- 5. Experience Marketing Detail ---
const ExperienceMarketingDetail: React.FC = () => {
    return (
        <div className="bg-white">
             <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#ff6b00]">
                 <div className="absolute inset-0 bg-black/20 z-0"></div>
                 <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white font-bold mb-8 backdrop-blur-md shadow-lg text-sm tracking-wider uppercase">
                             <Users className="w-4 h-4" /> Authentic Review Marketing
                         </div>
                         <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                             진정성 있는 리뷰가<br/>
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">매출을 만든다</span>
                         </h1>
                         <p className="text-xl text-white/90 font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed">
                             광고 냄새 나는 리뷰는 오히려 독이 됩니다.<br/>
                             실제 고객의 생생한 체험기로 신뢰를 구축하세요.
                         </p>
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-white text-[#ff6b00] font-bold rounded-xl hover:bg-orange-50 transition-all shadow-lg flex items-center justify-center gap-2">
                                체험단 모집 의뢰 <ArrowRight className="w-5 h-5" />
                            </Link>
                         </div>
                     </RevealOnScroll>
                 </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                         <SectionTitle 
                            sub="Review Strategy" 
                            title={<>고객의 지갑을 여는<br/><span className="text-orange-500">리뷰의 기술</span></>} 
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             {[
                                 { title: "블로그 체험단", desc: "검색 노출(SEO)에 최적화된\n상세한 포스팅 배포", icon: FileText },
                                 { title: "인스타 체험단", desc: "비주얼과 해시태그로\n빠른 확산 유도", icon: Instagram },
                                 { title: "영수증 리뷰", desc: "플레이스 평점 관리 및\n신뢰도 상승 효과", icon: CheckCircle2 }
                             ].map((item, i) => (
                                 <div key={i} className="text-center p-8 bg-orange-50 rounded-3xl border border-orange-100">
                                     <div className="w-16 h-16 mx-auto bg-white text-orange-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                         <item.icon className="w-8 h-8" />
                                     </div>
                                     <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                                     <p className="text-gray-600 whitespace-pre-line">{item.desc}</p>
                                 </div>
                             ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "체험단 모집 기간은 얼마나 걸리나요?", a: "보통 모집 시작 후 1주일 내로 인원 선정이 완료되며, 선정 후 1~2주 내에 리뷰가 등록됩니다." },
                { q: "제품 배송형도 가능한가요?", a: "네, 배송형과 방문형 모두 진행 가능합니다. 제품 특성에 맞춰 가장 효과적인 방식을 제안해 드립니다." },
                { q: "노쇼(No-Show) 관리는 어떻게 하나요?", a: "체험단 선정 시 블랙리스트 필터링을 거치며, 노쇼 발생 시 대체 인원을 빠르게 투입하여 약속된 리뷰 수를 보장해 드립니다." }
            ]} color="text-orange-500"/>

            <CtaSection 
                title="체험단 마케팅," 
                subTitle="입소문을 시작하세요"
                colorFrom="from-orange-900" colorTo="to-yellow-700"
                buttonColor="text-orange-700"
                textClass="text-yellow-300"
            />
        </div>
    );
};

// --- Main Service Detail Component ---
const ServiceDetail: React.FC = () => {
    const { type } = useParams<{ type: string }>();

    // Scroll to top on type change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    switch (type) {
        case 'place':
            return <PlaceMarketingDetail />;
        case 'clip':
            return <ClipMarketingDetail />;
        case 'youtube':
            return <YoutubeMarketingDetail />;
        case 'instagram':
            return <InstagramMarketingDetail />;
        case 'experience':
            return <ExperienceMarketingDetail />;
        default:
            // Fallback for unknown routes, redirect or show place as default
            return <PlaceMarketingDetail />;
    }
};

export default ServiceDetail;
