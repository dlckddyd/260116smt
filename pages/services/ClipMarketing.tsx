
import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Play, TrendingUp, PlayCircle, Heart, MessageCircle, Zap, Music, Activity, Search, Palette, Layers, MousePointerClick, CheckCircle2, Check } from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import { SectionTitle, FaqSection, CtaSection } from '../../components/ServiceShared';

const ClipMarketing: React.FC = () => {
    return (
        <div className="bg-white">
            <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-green-900/10 to-[#050505]"></div>
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

            <section className="py-24 px-6 bg-gray-50">
               <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <SectionTitle 
                            sub="Our Strategy" 
                            title={<>성공하는 숏폼의<br/><span className="text-green-600">3가지 절대 법칙</span></>} 
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
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
                                <div className="relative bg-gray-50 rounded-[3rem] p-10 border border-gray-100">
                                    <div className="flex flex-col gap-6 items-center">
                                        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '0ms'}}>
                                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500"><PlayCircle className="w-6 h-6"/></div>
                                            <div>
                                                <div className="font-bold text-gray-900">영상 시청</div>
                                                <div className="text-xs text-gray-500">네이버 메인/검색 노출</div>
                                            </div>
                                        </div>
                                        <div className="text-gray-300">↓</div>
                                        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '150ms'}}>
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500"><MousePointerClick className="w-6 h-6"/></div>
                                            <div>
                                                <div className="font-bold text-gray-900">장소 클릭</div>
                                                <div className="text-xs text-gray-500">영상 하단 플레이스 태그</div>
                                            </div>
                                        </div>
                                        <div className="text-gray-300">↓</div>
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

            <section className="py-24 px-6 bg-[#f8fafc] overflow-hidden relative">
                <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
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

                    <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
                        <div className="relative bg-white rounded-[2.5rem] border border-gray-200 p-10 shadow-2xl overflow-hidden flex flex-col aspect-[4/3]">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            
                            <div className="flex justify-between items-end mb-8 relative z-10">
                                <div>
                                    <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Organic Reach</div>
                                    <div className="text-3xl font-bold text-gray-900">도달률 비교</div>
                                </div>
                                <div className="text-5xl font-black text-green-500 tracking-tighter">8.5x</div>
                            </div>
                            
                            <div className="relative flex-1 w-full mt-4">
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    <line x1="0" y1="150" x2="400" y2="150" stroke="#f1f5f9" strokeWidth="2" />
                                    <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="2" />
                                    <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" strokeWidth="2" />
                                    
                                    <path 
                                        d="M20,180 C100,180 150,160 200,140 S300,50 380,20" 
                                        fill="none" 
                                        stroke="#22c55e" 
                                        strokeWidth="5" 
                                        strokeLinecap="round"
                                        className="drop-shadow-lg"
                                    />
                                    
                                    <circle cx="20" cy="180" r="6" fill="white" stroke="#22c55e" strokeWidth="3" />
                                    <circle cx="200" cy="140" r="6" fill="white" stroke="#22c55e" strokeWidth="3" />
                                    <circle cx="380" cy="20" r="8" fill="#22c55e" className="animate-pulse" />
                                </svg>
                                
                                <div className="absolute top-[5%] right-0 transform translate-x-4 -translate-y-4">
                                    <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg shadow-green-200 animate-bounce">
                                        Algorithm Boost!
                                    </div>
                                </div>

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

export default ClipMarketing;
