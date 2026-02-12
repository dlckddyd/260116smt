
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, ArrowRight, AlertCircle, BrainCircuit, MousePointerClick, Clapperboard, Users, Search, FileText, Video, BarChart } from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import { SectionTitle, FaqSection, CtaSection } from '../../components/ServiceShared';

const YoutubeMarketing: React.FC = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero: Cinematic & Dark Theme */}
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0f0f0f]">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-red-900/10 to-[#0f0f0f]"></div>
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
                                <div className="relative aspect-[4/3] bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl overflow-hidden p-8 flex flex-col group">
                                    <div className="flex justify-between text-gray-400 font-bold text-lg mb-8">
                                        <span>채널 성장 그래프</span>
                                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs">Strategy Applied</span>
                                    </div>
                                    <div className="relative flex-1 w-full flex items-end">
                                        <div className="absolute inset-0 flex items-end">
                                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                <path d="M0,80 Q20,85 40,80 T80,82" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeDasharray="5,5" />
                                            </svg>
                                        </div>
                                        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d="M0,80 Q30,80 50,50 T100,10" fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" className="drop-shadow-lg" />
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

            {/* 4. Process Bar */}
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

            {/* 5. Result Graph Section */}
            <section className="py-32 px-6 bg-[#0f0f0f] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealOnScroll>
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
                        <div className="bg-[#1a1a1a] border border-white/5 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
                            <div className="flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
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
                                <div className="w-full md:w-1/2 h-[300px] relative flex items-end justify-center">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                        <line x1="0" y1="150" x2="400" y2="150" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                                        <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                                        <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                                        <path d="M0,180 L100,175 L150,178" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M150,178 C200,170 250,100 400,20" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                                        <text x="75" y="195" fill="#666" fontSize="12" textAnchor="middle">관리 전</text>
                                        <text x="300" y="195" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">솔루션 도입 후</text>
                                        <circle cx="400" cy="20" r="6" fill="#dc2626" stroke="white" strokeWidth="2" className="animate-pulse" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

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

export default YoutubeMarketing;
