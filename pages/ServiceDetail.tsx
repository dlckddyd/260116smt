
import React, { useState } from 'react';
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
  Database, LineChart, BrainCircuit
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
                                {/* Abstract Graphic for 'Broken Graph' */}
                                <div className="relative aspect-square bg-gray-50 rounded-[3rem] p-10 flex items-center justify-center border border-gray-100 overflow-hidden">
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#f3f4f6_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                                    <div className="relative z-10 w-full">
                                        <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                                            <span>Rank 1</span>
                                            <span>Rank 50+</span>
                                        </div>
                                        <div className="h-64 w-full bg-white rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                                            <svg className="w-full h-full" preserveAspectRatio="none">
                                                <path d="M0,50 Q100,50 200,150 T400,250" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
                                            </svg>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
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

// --- 2. Naver Clip Detail ---
const ClipMarketingDetail: React.FC = () => {
    return (
        <div className="bg-white">
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900/20 to-black"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-bold mb-8 backdrop-blur-md text-sm tracking-wider uppercase">
                            <Video className="w-4 h-4" /> Naver Clip & Short-form
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            60초 안에 사로잡는<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">숏폼 트래픽의 기적</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            네이버가 밀어주는 최신 트래픽 '클립'.<br/>
                            단순한 영상이 아닌, 구매 전환을 유도하는 숏폼 마케팅을 경험하세요.
                        </p>
                     </RevealOnScroll>
                </div>
            </section>
            
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle sub="Why Short-form?" title="지금은 숏폼 전성시대" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {[
                                { title: "압도적 노출량", desc: "네이버 모바일 메인에 노출될 기회" },
                                { title: "높은 전환율", desc: "짧고 강렬한 메시지로 구매 유도" },
                                { title: "빠른 확산", desc: "알고리즘을 통한 폭발적인 바이럴" }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "영상 촬영도 직접 해주시나요?", a: "네, 전문 PD가 기획부터 촬영, 편집까지 올인원으로 진행해 드립니다." },
                { q: "노출 보장은 되나요?", a: "클립 알고리즘에 최적화된 콘텐츠를 제작하여 높은 확률로 추천 탭 노출을 유도합니다." },
                { q: "기존 영상을 활용할 수 있나요?", a: "네, 기존 영상을 숏폼 문법에 맞게 재가공(Recut)하여 활용할 수도 있습니다." }
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

// --- 3. YouTube Marketing Detail ---
const YoutubeMarketingDetail: React.FC = () => {
    return (
        <div className="bg-white">
             <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/20 to-black"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold mb-8 backdrop-blur-md text-sm tracking-wider uppercase">
                            <Youtube className="w-4 h-4" /> YouTube Channel Growth
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            팬덤을 만드는<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">브랜드 채널의 힘</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            유튜브는 이제 선택이 아닌 필수 브랜딩 채널입니다.<br/>
                            기획부터 촬영, 편집, 채널 운영까지 전문가에게 맡기세요.
                        </p>
                     </RevealOnScroll>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle sub="Service Process" title="유튜브 운영 프로세스" />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                             {[
                                { step: "01", title: "채널 기획", desc: "컨셉 도출 및 타겟 분석" },
                                { step: "02", title: "콘텐츠 제작", desc: "전문 장비 촬영 및 편집" },
                                { step: "03", title: "채널 운영", desc: "썸네일, 업로드, 댓글 관리" },
                                { step: "04", title: "성과 분석", desc: "데이터 분석 및 전략 수정" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center">
                                    <div className="text-red-500 font-bold text-lg mb-2">{item.step}</div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "구독자가 없어도 시작할 수 있나요?", a: "물론입니다. 초기 채널 세팅부터 콘텐츠 기획까지 제로베이스에서 성장을 도와드립니다." },
                { q: "비용은 어떻게 되나요?", a: "제작 편수와 퀄리티, 출연진 유무에 따라 견적이 달라집니다. 상담을 통해 맞춤 견적을 드립니다." },
                { q: "촬영 장비가 필요한가요?", a: "아니요, 저희가 보유한 시네마급 장비로 촬영을 진행하므로 별도 준비하실 필요 없습니다." }
            ]} color="text-red-600"/>

            <CtaSection 
                title="유튜브 채널," 
                subTitle="전문가와 함께 성장하세요"
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
             <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-black to-orange-900/30"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 font-bold mb-8 backdrop-blur-md text-sm tracking-wider uppercase">
                            <Instagram className="w-4 h-4" /> Instagram Branding
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            비주얼로 완성하는<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">브랜드 아이덴티티</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            인스타그램은 브랜드의 첫인상입니다.<br/>
                            감각적인 피드 구성과 소통으로 찐팬을 확보합니다.
                        </p>
                     </RevealOnScroll>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle sub="Strategy" title="인스타그램 성장 전략" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-gray-50 p-10 rounded-[2.5rem]">
                                <h3 className="text-2xl font-bold mb-4">피드 디자인 & 톤앤매너</h3>
                                <p className="text-gray-600 mb-6">브랜드 색깔에 맞는 통일감 있는 피드 디자인으로 팔로우 전환율을 높입니다.</p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2"><Check className="w-5 h-5 text-pink-500"/> 감성적인 사진 촬영 및 보정</li>
                                    <li className="flex items-center gap-2"><Check className="w-5 h-5 text-pink-500"/> 카드뉴스 및 정보성 콘텐츠 제작</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-10 rounded-[2.5rem]">
                                <h3 className="text-2xl font-bold mb-4">해시태그 & 계정 관리</h3>
                                <p className="text-gray-600 mb-6">잠재 고객이 검색하는 해시태그를 분석하고, 진정성 있는 소통으로 계정 지수를 높입니다.</p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2"><Check className="w-5 h-5 text-pink-500"/> 인기 게시물 노출 전략</li>
                                    <li className="flex items-center gap-2"><Check className="w-5 h-5 text-pink-500"/> 팔로워 소통 및 댓글 관리</li>
                                </ul>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "팔로워 구매도 가능한가요?", a: "저희는 유령 계정이 아닌, 실제 활동하는 한국인 타겟 유저들과의 소통을 통해 자연스러운 팔로워 증가를 지향합니다." },
                { q: "이미지는 직접 찍어서 보내야 하나요?", a: "직접 촬영해주셔도 되고, 제품을 보내주시면 저희 스튜디오에서 촬영 대행도 가능합니다." },
                { q: "릴스 제작도 포함되나요?", a: "네, 최근 인스타그램 로직상 릴스의 중요성이 커져 릴스 기획 및 제작도 패키지에 포함되어 있습니다." }
            ]} color="text-pink-600"/>

            <CtaSection 
                title="인스타그램," 
                subTitle="브랜드의 감성을 입히세요"
                colorFrom="from-purple-900" colorTo="to-orange-900"
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
             <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/20 to-black"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-bold mb-8 backdrop-blur-md text-sm tracking-wider uppercase">
                            <Users className="w-4 h-4" /> Experience Group
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            고객의 목소리로 증명하는<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">진정성 있는 리뷰</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            소비자는 광고보다 다른 사람의 후기를 믿습니다.<br/>
                            파워 블로거, 인플루언서 체험단을 통해 신뢰도를 확보하세요.
                        </p>
                     </RevealOnScroll>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle sub="Why Us?" title="스마트플레이스 체험단의 차별점" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             {[
                                { title: "엄격한 리뷰어 선별", desc: "일방문자 수, 노출 정확도 등을 분석하여 영향력 있는 인플루언서만 선별합니다." },
                                { title: "키워드 정밀 타겟팅", desc: "검색량이 많고 전환율이 높은 황금 키워드를 발굴하여 가이드라인을 제공합니다." },
                                { title: "체계적인 결과 보고", desc: "노출 현황, 조회수 등을 취합하여 투명한 결과 리포트를 제공합니다." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:-translate-y-2 transition-transform">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                                        <CheckCircle2 className="w-6 h-6"/>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "제품 배송형과 방문형 중 어떤 것이 좋나요?", a: "업종에 따라 다릅니다. 식당/뷰티샵은 방문형, 화장품/식품 등은 배송형이 적합합니다." },
                { q: "모집 기간은 얼마나 걸리나요?", a: "보통 모집 시작 후 1주일 내로 인원 선정이 완료되며, 리뷰 등록까지는 약 2~3주 소요됩니다." },
                { q: "노출이 안 되면 환불 되나요?", a: "블로거 지수 문제로 누락 시 재진행해 드립니다. 단, 로직 이슈 등 불가항력적인 상황은 제외됩니다." }
            ]} color="text-orange-600"/>

            <CtaSection 
                title="리뷰 마케팅," 
                subTitle="입소문의 시작입니다"
                colorFrom="from-gray-900" colorTo="to-orange-900"
                buttonColor="text-orange-700"
                textClass="text-orange-300"
            />
        </div>
    );
};

// --- Generic Wrapper for Fallback ---
const GenericServiceDetail: React.FC = () => <div className="p-20 text-center">서비스 준비중입니다.</div>;

const ServiceDetail: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  switch (type) {
      case 'place': return <PlaceMarketingDetail />;
      case 'clip': return <ClipMarketingDetail />;
      case 'youtube': return <YoutubeMarketingDetail />;
      case 'instagram': return <InstagramMarketingDetail />;
      case 'experience': return <ExperienceMarketingDetail />;
      default: return <GenericServiceDetail />;
  }
};

export default ServiceDetail;
