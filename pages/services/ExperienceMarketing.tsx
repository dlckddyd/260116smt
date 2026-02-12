
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, AlertCircle, Star, DollarSign, Search, ShieldCheck, Layers, FileText, Target, UserCheck, Camera, BarChart } from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import { SectionTitle, FaqSection, CtaSection } from '../../components/ServiceShared';

const ExperienceMarketing: React.FC = () => {
    return (
        <div className="bg-white">
             {/* 1. Hero: Premium & Trustworthy */}
             <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a0b00]">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00]/20 via-[#ff9500]/10 to-[#1a0b00] z-0"></div>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0"></div>
                 <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] animate-pulse"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                 <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                     <RevealOnScroll>
                         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-bold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.3)] text-sm tracking-wider uppercase">
                             <Users className="w-4 h-4" /> Premium Review Lab
                         </div>
                         <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                             고객의 선택을 만드는<br/>
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">확신의 증거(Social Proof)</span>
                         </h1>
                         <p className="text-xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed">
                             단순 배포형 리뷰는 이제 통하지 않습니다.<br/>
                             구매 여정의 마지막 단계에서 <strong>결제(Payment)</strong>를 이끌어내는 전략적 콘텐츠를 설계합니다.
                         </p>
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2">
                                체험단 전략 제안받기 <ArrowRight className="w-5 h-5" />
                            </Link>
                         </div>
                     </RevealOnScroll>
                 </div>
             </section>

            {/* 2. Reality Check: The Power of Reviews */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <span className="text-orange-600 font-bold tracking-widest uppercase mb-4 block">Consumer Psychology</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    "광고비는 쓰는데<br/>
                                    왜 구매하지 않을까요?"
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    소비자의 <strong>92%</strong>는 구매 전 반드시 리뷰를 확인합니다.<br/>
                                    아무리 노출이 잘 되어도, 신뢰할 수 있는 <strong>'검증된 후기'</strong>가 없다면 이탈합니다.<br/>
                                    리뷰는 선택이 아닌 <span className="text-orange-600 font-bold">구매의 필수 조건</span>입니다.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <AlertCircle className="w-6 h-6 text-gray-400" />
                                        <span className="font-bold text-gray-600">광고성 짙은 원고 = 브랜드 신뢰도 하락</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <AlertCircle className="w-6 h-6 text-gray-400" />
                                        <span className="font-bold text-gray-600">상위 노출 실패 = 마케팅 비용 손실</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                <div className="relative aspect-[4/3] bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl overflow-hidden p-8 flex flex-col justify-center items-center">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                                    <div className="w-full max-w-md space-y-2 relative z-10">
                                        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl opacity-50">
                                            <span className="font-bold text-gray-500">1. 검색/노출</span>
                                            <div className="h-2 w-32 bg-gray-300 rounded-full"></div>
                                        </div>
                                        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl opacity-70">
                                            <span className="font-bold text-gray-600">2. 상세페이지</span>
                                            <div className="h-2 w-24 bg-gray-400 rounded-full"></div>
                                        </div>
                                        <div className="flex items-center justify-between bg-orange-50 border border-orange-200 p-5 rounded-xl shadow-lg transform scale-105 z-20">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-orange-500 text-white p-2 rounded-lg"><Star className="w-5 h-5 fill-white" /></div>
                                                <span className="font-bold text-orange-900">3. 리뷰 확인 (Review)</span>
                                            </div>
                                            <div className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Critical Point</div>
                                        </div>
                                        <div className="flex items-center justify-between bg-gray-900 text-white p-4 rounded-xl mt-4">
                                            <span className="font-bold">4. 구매 전환</span>
                                            <div className="flex text-yellow-400 text-xs">
                                                <DollarSign className="w-4 h-4" /> Revenue
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-gray-200 -z-0"></div>
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
                            title={<>성공하는 리뷰 마케팅의<br/><span className="text-orange-600">4가지 핵심 전략</span></>} 
                        />
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(260px,auto)]">
                             <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                                 <div className="relative z-10">
                                     <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                                         <Search className="w-6 h-6" />
                                     </div>
                                     <h3 className="text-2xl font-bold mb-3 text-gray-900">키워드 장악 (SEO Dominance)</h3>
                                     <p className="text-gray-500 leading-relaxed max-w-md">
                                         단순히 '맛집', '추천' 키워드만 노리지 않습니다. 
                                         세부 키워드(Long-tail)부터 메인 키워드까지 단계별로 점유하여 
                                         <strong>VIEW 탭 상위 노출</strong>을 통해 유입을 극대화합니다.
                                     </p>
                                 </div>
                                 <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-orange-50 to-transparent rounded-tl-[100px] -mr-10 -mb-10 group-hover:scale-110 transition-transform"></div>
                             </div>
                             <div className="md:row-span-2 bg-gray-900 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
                                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                 <div className="relative z-10 h-full flex flex-col justify-between">
                                     <div>
                                         <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                                             <ShieldCheck className="w-6 h-6" />
                                         </div>
                                         <h3 className="text-2xl font-bold mb-3">엄격한 필터링<br/>(Quality Control)</h3>
                                         <p className="text-white/80 leading-relaxed text-sm">
                                             아무나 보내지 않습니다.<br/><br/>
                                             <strong>블랙리스트 DB</strong>를 기반으로 체리피커, 저품질 계정을 원천 차단하고,
                                             브랜드 핏에 맞는 <strong>진성 인플루언서</strong>만을 선별합니다.
                                         </p>
                                     </div>
                                     <div className="mt-8 pt-8 border-t border-white/20">
                                         <div className="flex items-end gap-2">
                                             <span className="text-4xl font-bold text-orange-400">Zero</span>
                                             <span className="text-sm text-white/70 mb-2">저품질/노쇼율</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                 <div className="flex items-center gap-4 mb-4">
                                     <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
                                         <Layers className="w-5 h-5" />
                                     </div>
                                     <h3 className="text-xl font-bold">멀티 채널 확산</h3>
                                 </div>
                                 <p className="text-gray-500 text-sm">
                                     블로그뿐만 아니라 <strong>인스타그램(릴스)</strong>, <strong>유튜브 쇼츠</strong>까지. 
                                     다양한 포맷으로 콘텐츠를 확산시켜 브랜드 인지도를 높입니다.
                                 </p>
                             </div>
                             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:shadow-lg transition-all">
                                 <div className="flex items-center gap-4 mb-4">
                                     <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                         <FileText className="w-5 h-5" />
                                     </div>
                                     <h3 className="text-xl font-bold">고퀄리티 가이드</h3>
                                 </div>
                                 <p className="text-gray-500 text-sm">
                                     단순 사진 나열이 아닌, 소구점(Selling Point)이 명확한 
                                     <strong>스토리텔링 가이드라인</strong>을 제공하여 구매 욕구를 자극합니다.
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
                        <SectionTitle sub="Workflow" title="체계적인 캠페인 운영 프로세스" />
                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block z-0"></div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                {[
                                    { title: "01. 기획 & 모집", desc: "키워드 분석 및\n타겟 인플루언서 모집", icon: Target },
                                    { title: "02. 선정 & 가이드", desc: "블랙리스트 필터링 및\n맞춤 가이드라인 배포", icon: UserCheck },
                                    { title: "03. 체험 & 리뷰", desc: "제품/서비스 체험 및\n고퀄리티 리뷰 작성", icon: Camera },
                                    { title: "04. 결과 & 보고", desc: "노출 현황 모니터링 및\n결과 리포트 제공", icon: BarChart }
                                ].map((step, i) => (
                                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-200 text-center hover:border-orange-500 transition-colors shadow-lg shadow-gray-100/50">
                                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 border-4 border-white shadow-sm">
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
            <section className="py-32 px-6 bg-[#1a1510] relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealOnScroll>
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="text-orange-500 font-bold tracking-widest uppercase mb-4 block text-sm animate-pulse">Campaign Performance</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                리뷰가 쌓일수록<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">매출 그래프</span>는 올라갑니다
                            </h2>
                            <p className="text-gray-400 text-lg">
                                일회성 배포가 아닙니다.<br className="md:hidden"/>
                                지속적인 <strong>Social Proof(사회적 증거)</strong> 축적으로 J-Curve 성장을 만듭니다.
                            </p>
                        </div>

                        <div className="bg-[#241c15] border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
                            <div className="flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
                                <div className="flex-1 space-y-10 w-full">
                                    <div>
                                        <div className="text-gray-500 font-medium mb-2 text-lg">브랜드 검색량 (Brand Search)</div>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-7xl md:text-8xl font-black text-white tracking-tighter">+320<span className="text-orange-500 text-5xl md:text-6xl">%</span></span>
                                            <span className="text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full text-sm border border-orange-500/20">Growth</span>
                                        </div>
                                    </div>
                                    <div className="h-px w-full bg-white/10"></div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="text-gray-500 text-sm mb-1">상위 노출 키워드</div>
                                            <div className="text-2xl font-bold text-white">128개 <span className="text-sm text-green-500">▲</span></div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500 text-sm mb-1">구매 전환율 (CVR)</div>
                                            <div className="text-2xl font-bold text-white">4.8% <span className="text-sm text-green-500">▲</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 h-[300px] relative flex items-end justify-center px-4">
                                    <div className="absolute inset-0 flex flex-col justify-between py-6">
                                        <div className="w-full h-px bg-white/5"></div><div className="w-full h-px bg-white/5"></div><div className="w-full h-px bg-white/5"></div><div className="w-full h-px bg-white/5"></div>
                                    </div>
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                        <path 
                                            d="M0,180 C100,180 150,150 200,120 S300,50 400,10" 
                                            fill="none" 
                                            stroke="url(#gradientStroke)" 
                                            strokeWidth="6" 
                                            strokeLinecap="round"
                                            className="drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                                        />
                                        <circle cx="400" cy="10" r="6" fill="#f59e0b" stroke="white" strokeWidth="2" className="animate-pulse" />
                                        <text x="20" y="195" fill="#666" fontSize="12">Start</text>
                                        <text x="200" y="195" fill="#666" fontSize="12">Campaign On</text>
                                        <text x="380" y="195" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="end">Boost</text>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

             <FaqSection items={[
                { q: "체험단 모집 기간은 얼마나 걸리나요?", a: "보통 모집 시작 후 1주일 내로 인원 선정이 완료되며, 선정 후 제품 배송/방문 기간을 포함하여 약 2주 내에 리뷰가 순차적으로 등록됩니다." },
                { q: "제품 배송형도 가능한가요?", a: "네, 맛집/뷰티 같은 '방문형' 뿐만 아니라, 제품을 택배로 발송하는 '배송형', 서비스를 이용하는 '기자단' 등 모든 형태가 가능합니다." },
                { q: "노쇼(No-Show) 관리는 어떻게 하나요?", a: "자체 블랙리스트 DB를 통해 상습 노쇼 인원을 사전 필터링하며, 불가피한 사정으로 노쇼 발생 시 즉시 대체 인원을 투입하여 약속된 인원을 100% 보장해 드립니다." },
                { q: "키워드는 어떻게 선정하나요?", a: "단순히 검색량이 많은 키워드가 아닌, '구매 전환 가능성'이 높은 키워드와 '상위 노출 가능성'이 높은 키워드를 황금 비율로 믹스하여 제안해 드립니다." }
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

export default ExperienceMarketing;
