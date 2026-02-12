
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowRight, AlertCircle, Palette, MonitorPlay, Hash, MessageCircle, Lightbulb, Camera, Calendar, PieChart } from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import { SectionTitle, FaqSection, CtaSection } from '../../components/ServiceShared';

const InstagramMarketing: React.FC = () => {
    return (
        <div className="bg-white">
             {/* 1. Hero: Vibrant & Trendy */}
             <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-black">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 z-0"></div>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
                 <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-[80px] animate-pulse"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                 <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-bold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.3)] text-sm tracking-wider uppercase">
                             <Instagram className="w-4 h-4" /> Visual Branding Lab
                         </div>
                         <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                             소비자의 시각을<br/>
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">지배하는 브랜드</span>
                         </h1>
                         <p className="text-xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed">
                             이미지 한 장, 릴스 하나가 브랜드의 격을 결정합니다.<br/>
                             트렌디한 <strong>감각(Sense)</strong>과 정교한 <strong>타겟팅(Targeting)</strong>으로 팬덤을 구축합니다.
                         </p>
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_0_30px_rgba(219,39,119,0.4)] flex items-center justify-center gap-2">
                                인스타 브랜딩 진단 <ArrowRight className="w-5 h-5" />
                            </Link>
                         </div>
                     </RevealOnScroll>
                 </div>
            </section>

            {/* 2. Reality Check */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <span className="text-pink-600 font-bold tracking-widest uppercase mb-4 block">Market Reality</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    "팔로워는 많은데<br/>
                                    왜 반응이 없을까요?"
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    보여주기식 숫자 늘리기는 끝났습니다. <br/>
                                    단순 팔로워보다 중요한 것은 실제 고객의 <strong>참여(Engagement)</strong>입니다.<br/>
                                    알고리즘은 <span className="text-pink-600 font-bold">소통하는 계정</span>을 선택합니다.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <AlertCircle className="w-6 h-6 text-gray-400" />
                                        <span className="font-bold text-gray-600">구매형 유령 팔로워 = 계정 지수 하락</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <AlertCircle className="w-6 h-6 text-gray-400" />
                                        <span className="font-bold text-gray-600">일관성 없는 피드 = 이탈률 증가</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-100 rounded-[2rem] p-6 opacity-50 scale-90">
                                        <div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-gray-300 rounded-full"></div><div className="h-2 w-20 bg-gray-300 rounded"></div></div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="aspect-square bg-gray-300 rounded-lg"></div><div className="aspect-square bg-gray-300 rounded-lg"></div><div className="aspect-square bg-gray-300 rounded-lg"></div><div className="aspect-square bg-gray-300 rounded-lg"></div>
                                        </div>
                                        <div className="mt-4 text-center text-gray-500 font-bold">관리 전 (Dead)</div>
                                    </div>
                                    <div className="bg-white border-2 border-pink-100 rounded-[2rem] p-6 shadow-2xl relative z-10 transform -translate-x-8 translate-y-8">
                                        <div className="absolute -top-3 -right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Active 🔥</div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-full p-[2px]"><div className="w-full h-full bg-white rounded-full border-2 border-transparent"></div></div>
                                            <div className="h-2 w-24 bg-gray-800 rounded"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="aspect-square bg-pink-50 rounded-lg border border-pink-100 flex items-center justify-center"></div>
                                            <div className="aspect-square bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center"></div>
                                            <div className="aspect-square bg-blue-50 rounded-lg border border-blue-100"></div>
                                            <div className="aspect-square bg-orange-50 rounded-lg border border-orange-100"></div>
                                        </div>
                                        <div className="mt-4 text-center text-pink-600 font-bold">브랜딩 (Alive)</div>
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
                            title={<>성공하는 계정의<br/><span className="text-pink-600">4가지 비주얼 전략</span></>} 
                        />
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(260px,auto)]">
                             <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                                 <div className="relative z-10">
                                     <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6">
                                         <Palette className="w-6 h-6" />
                                     </div>
                                     <h3 className="text-2xl font-bold mb-3 text-gray-900">피드 톤앤매너 (Tone & Manner)</h3>
                                     <p className="text-gray-500 leading-relaxed max-w-md">
                                         피드는 브랜드의 쇼윈도입니다. 
                                         브랜드 정체성에 맞는 <strong>컬러, 무드, 레이아웃</strong>을 통일하여 
                                         방문자가 '팔로우' 버튼을 누르게 만드는 매력적인 첫인상을 설계합니다.
                                     </p>
                                 </div>
                                 <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-pink-50 to-transparent rounded-tl-[100px] -mr-10 -mb-10 group-hover:scale-110 transition-transform"></div>
                             </div>
                             <div className="md:row-span-2 bg-gradient-to-b from-[#833ab4] to-[#fd1d1d] text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
                                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                 <div className="relative z-10 h-full flex flex-col justify-between">
                                     <div>
                                         <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                                             <MonitorPlay className="w-6 h-6" />
                                         </div>
                                         <h3 className="text-2xl font-bold mb-3">릴스 바이럴<br/>(Reels Viral)</h3>
                                         <p className="text-white/80 leading-relaxed text-sm">
                                             현재 인스타그램 도달의 핵심은 릴스입니다.<br/><br/>
                                             트렌디한 음원, 빠른 컷 전환으로 알고리즘 타는 <strong>숏폼 콘텐츠</strong>를 제작합니다.
                                         </p>
                                     </div>
                                     <div className="mt-8 pt-8 border-t border-white/20">
                                         <div className="flex items-end gap-2">
                                             <span className="text-4xl font-bold text-yellow-300">Explosive</span>
                                             <span className="text-sm text-white/70 mb-2">폭발적 도달</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                 <div className="flex items-center gap-4 mb-4">
                                     <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                         <Hash className="w-5 h-5" />
                                     </div>
                                     <h3 className="text-xl font-bold">해시태그 SEO</h3>
                                 </div>
                                 <p className="text-gray-500 text-sm">
                                     무의미한 태그 남발은 금물. 
                                     잠재 고객이 검색하는 <strong>핵심 키워드</strong>를 분석하여 노출을 최적화합니다.
                                 </p>
                             </div>
                             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                 <div className="flex items-center gap-4 mb-4">
                                     <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                         <MessageCircle className="w-5 h-5" />
                                     </div>
                                     <h3 className="text-xl font-bold">진정성 있는 소통</h3>
                                 </div>
                                 <p className="text-gray-500 text-sm">
                                     스토리 투표, 질문 받기, 댓글 관리를 통해 
                                     단순 눈팅족을 <strong>참여하는 팬(Fan)</strong>으로 전환시킵니다.
                                 </p>
                             </div>
                         </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 4. Process: Flowchart */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle sub="Workflow" title="체계적인 브랜드 성장 루틴" />
                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block z-0"></div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                {[
                                    { title: "01. 컨셉 기획", desc: "브랜드 페르소나 설정 및\n무드보드 제안", icon: Lightbulb },
                                    { title: "02. 콘텐츠 제작", desc: "고감도 사진 촬영 및\n카드뉴스/릴스 제작", icon: Camera },
                                    { title: "03. 운영 & 업로드", desc: "골든타임 업로드 및\n스토리/하이라이트 관리", icon: Calendar },
                                    { title: "04. 성과 분석", desc: "인사이트 분석 리포트 및\n다음 전략 수립", icon: PieChart }
                                ].map((step, i) => (
                                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-200 text-center hover:border-pink-500 transition-colors shadow-lg shadow-gray-100/50">
                                        <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600 border-4 border-white shadow-sm">
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

            {/* 5. Result Graph Section (High-End Dashboard Style) */}
            <section className="py-32 px-6 bg-gray-900 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealOnScroll>
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="text-pink-500 font-bold tracking-widest uppercase mb-4 block text-sm animate-pulse">Performance Data</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                숫자로 증명하는<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">도달률의 차이</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                감성으로 시작해서 데이터로 완성합니다.<br className="md:hidden"/>
                                <strong>노출, 도달, 참여율</strong> 모든 지표를 투명하게 관리합니다.
                            </p>
                        </div>

                        <div className="bg-[#151515] border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
                            <div className="flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
                                <div className="flex-1 space-y-10 w-full">
                                    <div>
                                        <div className="text-gray-500 font-medium mb-2 text-lg">계정 도달 (Accounts Reached)</div>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-7xl md:text-8xl font-black text-white tracking-tighter">+450<span className="text-pink-500 text-5xl md:text-6xl">%</span></span>
                                            <span className="text-pink-500 font-bold bg-pink-500/10 px-3 py-1 rounded-full text-sm border border-pink-500/20">Monthly</span>
                                        </div>
                                    </div>
                                    <div className="h-px w-full bg-white/10"></div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="text-gray-500 text-sm mb-1">참여율 (Engagement)</div>
                                            <div className="text-2xl font-bold text-white">8.2% <span className="text-sm text-green-500">▲</span></div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500 text-sm mb-1">팔로워 증가</div>
                                            <div className="text-2xl font-bold text-white">+1.5k <span className="text-sm text-green-500">▲</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 h-[300px] relative flex items-end justify-center px-4">
                                    <div className="w-full flex items-end justify-between gap-4 h-full pt-10">
                                        {[30, 45, 40, 60, 55, 80, 70, 90, 85, 100].map((h, i) => (
                                            <div key={i} className="flex-1 bg-gray-800 rounded-t-lg relative group-hover:bg-gray-700 transition-colors duration-500 overflow-hidden" style={{height: `${h}%`}}>
                                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-pink-600 to-purple-500 opacity-80" style={{height: '100%'}}></div>
                                                <div className="absolute top-0 w-full h-1 bg-white/30"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
                                        <path d="M0,250 C100,200 200,100 400,20" fill="none" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" style={{transform: 'scaleY(0.8) translateY(20%)'}} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "팔로워 구매도 가능한가요?", a: "저희는 유령 계정을 구매하는 어뷰징 방식은 진행하지 않습니다. 실제 타겟 고객과의 소통을 통해 '진성 팔로워'를 늘리는 정공법만을 사용합니다. 이것이 계정을 살리는 유일한 길입니다." },
                { q: "카드뉴스 제작도 해주시나요?", a: "네, 정보성 콘텐츠나 홍보용 카드뉴스 제작도 포함되어 있습니다. 전문 디자이너가 브랜드 톤앤매너에 맞춰 가독성 높고 트렌디한 디자인을 제공합니다." },
                { q: "릴스 촬영은 어떻게 진행되나요?", a: "제품을 보내주시면 스튜디오에서 촬영하거나, 매장으로 직접 방문하여 촬영을 진행합니다. 기획, 촬영, 편집, 음원 선정까지 올인원으로 제공됩니다." }
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

export default InstagramMarketing;
