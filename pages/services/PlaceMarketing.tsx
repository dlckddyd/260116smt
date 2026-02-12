
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, AlertCircle, BrainCircuit, MousePointerClick, Database, MessageCircle, Search, Settings, Rocket, LineChart, Check } from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import { SectionTitle, FaqSection, CtaSection } from '../../components/ServiceShared';

const PlaceMarketing: React.FC = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero: Tech & Data Focused */}
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1c]">
                <div className="absolute inset-0">
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
                                <div className="relative aspect-[4/3] bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl overflow-hidden p-8 flex flex-col">
                                    <div className="flex justify-between text-gray-400 font-bold text-lg mb-4">
                                        <span>Rank 1</span>
                                        <span>Rank 50+</span>
                                    </div>
                                    <div className="relative flex-1 w-full">
                                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 300">
                                            <path d="M0,20 C150,20 200,200 400,280" fill="none" stroke="#ff6b6b" strokeWidth="5" strokeDasharray="12 12" strokeLinecap="round" className="drop-shadow-sm" />
                                            <circle cx="20" cy="20" r="8" fill="#ff6b6b" className="animate-pulse" />
                                            <circle cx="380" cy="280" r="8" fill="#ff6b6b" />
                                        </svg>
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

            {/* 5. Special Offer */}
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
                                    {["키워드 정밀 진단", "단계별 순위 상승 유도", "로직 변화 실시간 대응", "어뷰징 없는 클린 관리"].map((t,i)=>(
                                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium"><Check className="w-5 h-5 text-blue-500" /> {t}</li>
                                    ))}
                                </ul>
                                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all">
                                    상담 신청하기
                                </Link>
                            </div>
                            <div className="w-full md:w-1/3 flex flex-col gap-4">
                                {[
                                    { rank: "1위", name: "마라 마파두부", loc: "서울 강남구", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop" },
                                    { rank: "4위", name: "두반 퍼시픽", loc: "부산 해운대구", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=200&auto=format&fit=crop" },
                                    { rank: "7위", name: "가산오프라인마켓", loc: "서울 금천구", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                                        <div className="p-3 flex gap-3 items-center">
                                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"><img src={item.img} className="w-full h-full object-cover" /></div>
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

export default PlaceMarketing;
