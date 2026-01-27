import React, { useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { 
  Settings, Download, X, HelpCircle, ChevronUp, ChevronDown, 
  ChevronLeft, ChevronRight, Home, Calendar, MessageSquare, 
  BarChart2, Store, CreditCard, Monitor, User, Info, MoreHorizontal,
  Settings2, Smartphone, GraduationCap, DollarSign, Briefcase
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const SmartPlaceMockup: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showEditor, setShowEditor] = useState(true);

  // --- State for Editable Data ---
  const [config, setConfig] = useState({
    storeName: "포유마사지안마원",
    userName: "유경짱",
    dateRange: "26. 1. 26. 월 - 1. 27. 화",
    
    // Summary Data
    visitCount: 86,
    visitPrev: 298,
    reservationCount: 7,
    reservationPrev: 13,
    callCount: 2,
    callPrev: 11,
    reviewCount: 3,
    reviewPrev: 3,

    // Chart 1: Review
    chartReviewTotal: 0,
    chartReviewDataCurrent: [0, 0, 0, 0, 0, 0, 0],
    chartReviewDataPrev: [1, 0, 0, 0, 0, 0, 0],

    // Chart 2: Place Visits
    chartVisitTotal: 86,
    chartVisitDataCurrent: [86, 0, 0, 0, 0, 0, 0],
    chartVisitDataPrev: [42, 55, 38, 41, 39, 43, 40],

    // Chart 3: Smart Call
    chartCallTotal: 2,
    chartCallDataCurrent: [2, 0, 0, 0, 0, 0, 0],
    chartCallDataPrev: [1, 2, 1, 3, 1, 2, 1],

    // Chart 4: Reservation Order
    chartResCountTotal: 7,
    chartResDataCurrent: [7, 0, 0, 0, 0, 0, 0],
    chartResDataPrev: [2, 1, 2, 3, 2, 1, 2],

    // Chart 5: Revenue
    chartRevenueTotal: 395000,
    chartRevenueDataCurrent: [395000, 0, 0, 0, 0, 0, 0],
    chartRevenueDataPrev: [200000, 150000, 180000, 120000, 140000, 90000, 60000],
    
    // Inflow Rankings
    inflow1Name: "네이버지도", inflow1Count: 64,
    inflow2Name: "네이버검색", inflow2Count: 21,
    inflow3Name: "웹사이트", inflow3Count: 1,
    targetKeyword: "광화문역마사지",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, index: number) => {
      const { value } = e.target;
      setConfig(prev => {
          const newArr = [...(prev as any)[key]];
          newArr[index] = Number(value);
          return { ...prev, [key]: newArr };
      });
  };

  const handleCapture = async () => {
    if (captureRef.current) {
        const canvas = await html2canvas(captureRef.current, { 
            scale: 2, 
            useCORS: true,
            width: 1480,
            windowWidth: 1480,
            backgroundColor: '#fcfcfc'
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `smartplace_report_${new Date().toISOString().split('T')[0]}.png`;
        link.click();
    }
  };

  const calcDiff = (curr: number, prev: number) => {
    if (prev === 0) return { val: 0, isZero: true, isUp: false };
    const diff = curr - prev;
    const percent = Math.round(Math.abs(diff) / prev * 100);
    return { val: percent, isZero: diff === 0, isUp: diff > 0 };
  };

  const lineOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
        x: { grid: { display: false }, ticks: { color: '#999', font: { size: 11 } } },
        y: { display: true, grid: { color: '#f0f0f0' }, ticks: { color: '#ccc', font: {size: 10}, count: 5 } }
    },
    elements: { point: { radius: 0, hoverRadius: 5 }, line: { tension: 0.4, borderWidth: 2 } }
  };

  const createLineData = (currentData: number[], prevData: number[]) => ({
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      datasets: [
          { data: prevData, borderColor: '#cbd0da', backgroundColor: 'transparent', order: 2 },
          { data: currentData, borderColor: '#00de95', backgroundColor: 'transparent', order: 1 }
      ]
  });

  return (
    <div className="min-h-screen bg-[#eef0f3] flex font-sans">
      
      {/* --- Main Mockup Area --- */}
      <div className="flex-1 overflow-auto flex justify-center py-10">
        <div 
            ref={captureRef}
            className="flex w-[1480px] bg-[#fcfcfc] min-h-[1200px] shadow-2xl relative text-[#1c1c1c]"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', sans-serif" }}
        >
            {/* 1. Side Navigation (Sidebar) */}
            <div className="w-[240px] bg-[#232323] flex flex-col flex-shrink-0 z-50 sticky top-0 h-screen">
                <div className="h-[68px] flex items-center px-5 border-b border-white/10">
                    <div className="flex items-center gap-2 cursor-pointer w-full">
                        <div className="w-[23px] h-[23px] rounded-full overflow-hidden border-[2px] border-white flex-shrink-0">
                           <img src="https://ldb-phinf.pstatic.net/20250213_97/1739410081945k7CHI_JPEG/IMG_1022.jpeg?type=f300_300" alt="Biz" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[1.4rem] font-bold text-white/50 truncate flex-1">{config.storeName}</span>
                        <ChevronDown className="w-4 h-4 text-white/30" />
                    </div>
                </div>
                
                <div className="flex-1 py-4 overflow-y-auto no-scrollbar">
                    <SnbItem icon={Store} label="업체정보" />
                    <SnbItem icon={Calendar} label="예약" />
                    <SnbItem icon={CreditCard} label="스마트콜" />
                    <SnbItem icon={Monitor} label="마케팅" />
                    <SnbItem icon={MessageSquare} label="리뷰" />
                    <SnbItem icon={User} label="고객" />
                    <SnbItem icon={BarChart2} label="통계" active />
                    <SnbItem icon={GraduationCap} label="비즈니스 스쿨" />
                    <SnbItem icon={DollarSign} label="금융지원" />
                    <SnbItem icon={Briefcase} label="솔루션" isSolution />
                </div>

                <div className="px-5 py-6 border-t border-white/10">
                    <button className="flex items-center justify-between w-full text-white/50 text-[1.4rem]">
                        문의 채널 <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-5 py-6 bg-white/5">
                    <div className="flex border border-white/10 rounded-full overflow-hidden">
                        <button className="flex-1 py-2.5 text-white text-[1.4rem] border-r border-white/10 hover:bg-white/5">전체설정</button>
                        <button className="flex-1 py-2.5 text-white text-[1.4rem] hover:bg-white/5">내 업체</button>
                    </div>
                </div>
            </div>

            {/* 2. Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#fcfcfc]">
                
                {/* LNB (Local Navigation Bar) */}
                <div className="h-[68px] bg-white border-b border-[#3331] flex items-center px-10 flex-shrink-0 sticky top-0 z-40">
                   <div className="flex items-center gap-10 h-full">
                       <LnbTab label="리포트" active />
                       <LnbTab label="플레이스" />
                       <LnbTab label="스마트콜" />
                       <LnbTab label="예약·주문" />
                       <LnbTab label="리뷰" />
                   </div>
                   <div className="ml-auto flex items-center gap-4 text-[1.4rem] text-[#666]">
                       <span className="text-[#03aa5a] font-bold">{config.userName} 님</span>
                       <span className="w-px h-3 bg-gray-200"></span>
                       <span>로그아웃</span>
                       <Settings2 className="w-5 h-5 text-gray-400" />
                   </div>
                </div>

                {/* Main Content Dashboard */}
                <div className="p-10 max-w-[1000px] mx-auto w-full">
                    
                    {/* AD Banner Area */}
                    <div className="w-full h-[80px] bg-[#f2f3f9] rounded-xl mb-8 flex items-center justify-center border border-[#e8eaf0] relative overflow-hidden group">
                        <div className="text-gray-400 font-medium text-[1.4rem]">AD Banner Area</div>
                        <div className="absolute right-3 top-2 text-[10px] text-gray-300 border border-gray-300 px-1 rounded">AD</div>
                    </div>

                    {/* Date Selector Area */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-[89px] h-12 bg-white border border-[#e5e5e5] rounded-xl flex items-center justify-center text-[1.5rem] font-bold cursor-pointer hover:border-gray-400">주간</div>
                        <div className="flex-1 flex items-center h-12 bg-white border border-[#e5e5e5] rounded-xl px-2 relative">
                            <button className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5 text-[#03aa5a]" /></button>
                            <div className="flex-1 text-center font-bold text-[1.5rem] text-[#424242]">
                                {config.dateRange}
                            </div>
                            <button className="p-2 opacity-30 cursor-not-allowed"><ChevronRight className="w-5 h-5 text-[#03aa5a]" /></button>
                        </div>
                    </div>

                    {/* 3. Summary Sections */}
                    <div className="bg-[#fcfcfc] rounded-xl border border-[#e5e5e5] p-5 mb-8">
                        {/* Section 1: Before Visit */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between mb-4 pr-5">
                                <h3 className="text-[1.9rem] font-bold text-[#1c1c1c] flex items-center gap-1.5">
                                    방문 전 지표 <em className="text-[#03aa5a] italic not-italic font-bold">3</em>
                                    <HelpCircle className="w-4 h-4 text-[#c9c9c9] cursor-pointer" />
                                </h3>
                                <button><ChevronUp className="w-4 h-4" /></button>
                            </div>
                            <div className="flex gap-2">
                                <SummaryCard label="플레이스 유입" value={config.visitCount} prev={config.visitPrev} />
                                <SummaryCard label="예약·주문 신청" value={config.reservationCount} prev={config.reservationPrev} />
                                <SummaryCard label="스마트콜 통화" value={config.callCount} prev={config.callPrev} />
                            </div>
                        </div>

                        {/* Section 2: After Visit */}
                        <div>
                            <div className="flex items-center justify-between mb-4 pr-5">
                                <h3 className="text-[1.9rem] font-bold text-[#1c1c1c] flex items-center gap-1.5">
                                    방문 후 지표 <em className="text-[#03aa5a] italic not-italic font-bold">1</em>
                                    <HelpCircle className="w-4 h-4 text-[#c9c9c9] cursor-pointer" />
                                </h3>
                                <button><ChevronUp className="w-4 h-4" /></button>
                            </div>
                            <div className="flex gap-2">
                                <SummaryCard label="리뷰 등록" value={config.reviewCount} prev={config.reviewPrev} isHalf />
                                <div className="flex-1"></div>
                                <div className="flex-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Charts Grid (Split View) */}
                    <div className="flex gap-4">
                        {/* Left Column */}
                        <div className="flex-1 flex flex-col gap-4">
                            
                            {/* Review Chart */}
                            <ChartSection 
                                title={<>한 주간 <span className="text-[#03aa5a]">리뷰</span>는 {config.chartReviewTotal}회,<br/>일 평균 0회 입니다.</>}
                                desc={<>지난 주 대비 리뷰 작성이 <strong className="text-[#2485fe]">-100% 감소</strong> 했습니다.</>}
                                buttonText="리뷰 통계 더보기"
                            >
                                <div className="h-[150px] mt-4">
                                    <Line data={createLineData(config.chartReviewDataCurrent, config.chartReviewDataPrev)} options={lineOptions} />
                                </div>
                                <LegendArea />
                            </ChartSection>

                            {/* Smart Call Chart */}
                            <ChartSection 
                                title={<>한 주간 <span className="text-[#03aa5a]">스마트콜 통화</span>는 {config.chartCallTotal}회,<br/>일 평균 {config.chartCallTotal}회 입니다.</>}
                                desc={<>지난 주 대비 통화 수가 <strong className="text-[#2485fe]">-82% 감소</strong> 했습니다.</>}
                                buttonText="스마트콜 통계 더보기"
                            >
                                <div className="h-[150px] mt-4">
                                    <Line data={createLineData(config.chartCallDataCurrent, config.chartCallDataPrev)} options={lineOptions} />
                                </div>
                                <LegendArea />
                                <div className="mt-8 text-[1.5rem] text-gray-500 font-medium">전화 많이 온 키워드</div>
                                <div className="h-[300px] flex items-center justify-center">
                                    <div className="w-[160px] h-[160px]">
                                        <Doughnut 
                                            data={{
                                                labels: ['마사지', '기타'],
                                                datasets: [{ data: [50, 50], backgroundColor: ['#e4e4e4', '#d1d1d1'], borderWidth: 0 }]
                                            }}
                                            options={{ cutout: '70%', plugins: { legend: { display: false } } }}
                                        />
                                    </div>
                                </div>
                            </ChartSection>

                        </div>

                        {/* Right Column */}
                        <div className="flex-1 flex flex-col gap-4">
                            
                            {/* Inflow/Keyword Section */}
                            <div className="bg-white border border-[#e5e5e5] rounded-xl p-8 shadow-sm">
                                <div className="mb-6">
                                    <h3 className="text-[2rem] font-bold leading-tight mb-2">
                                        <span className="text-[#03aa5a]">{config.inflow1Name}</span>에서 많이 방문했고,<br/>
                                        <span className="text-[#03aa5a]">{config.targetKeyword}</span> 키워드를 주로 검색했어요.
                                    </h3>
                                    <p className="text-[1.4rem] text-gray-400 flex items-center gap-1">
                                        플레이스 방문 기준입니다. <HelpCircle className="w-3 h-3" />
                                    </p>
                                </div>
                                
                                <div className="flex gap-2 mb-6">
                                    <button className="px-4 py-2 bg-[#424242] text-white text-[1.5rem] font-bold rounded-full">유입채널</button>
                                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[1.5rem] rounded-full">유입키워드</button>
                                </div>

                                <div className="space-y-0">
                                    <InflowItem rank={1} name={config.inflow1Name} value={config.inflow1Count} max={config.inflow1Count} />
                                    <InflowItem rank={2} name={config.inflow2Name} value={config.inflow2Count} max={config.inflow1Count} />
                                    <InflowItem rank={3} name={config.inflow3Name} value={config.inflow3Count} max={config.inflow1Count} />
                                </div>

                                <div className="mt-10 text-center flex flex-col items-center gap-4">
                                    <button className="px-6 py-2.5 border border-gray-200 rounded-full text-[1.6rem] text-gray-500 font-medium hover:bg-gray-50 transition-colors flex items-center gap-1">
                                        유입 더보기 <ChevronRight className="w-4 h-4" />
                                    </button>
                                    <div className="relative group">
                                         <div className="bg-[#03aa5a] text-white text-[1.3rem] px-4 py-2 rounded-lg font-bold shadow-lg animate-bounce">
                                            우리 가게를 검색한 고객이 궁금하다면?
                                         </div>
                                         <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#03aa5a] rotate-45"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Place Visit Chart */}
                            <ChartSection 
                                title={<>한 주간 <span className="text-[#03aa5a]">플레이스 유입</span>은 {config.chartVisitTotal}회,<br/>일 평균 {config.chartVisitTotal}회 입니다. <HelpCircle className="inline-block w-4 h-4 text-gray-300" /></>}
                                desc={<>지난 주 대비 유입 수가 <strong className="text-[#2485fe]">-71% 감소</strong> 했습니다.</>}
                            >
                                <div className="h-[150px] mt-4">
                                    <Line data={createLineData(config.chartVisitDataCurrent, config.chartVisitDataPrev)} options={lineOptions} />
                                </div>
                                <LegendArea />
                            </ChartSection>

                        </div>
                    </div>

                    {/* Floating Help Button (Green Circle) */}
                    <div className="fixed right-10 bottom-10 z-[100] flex flex-col gap-4">
                        {[1,2,3,4,5,6,7,8,9].map(i => (
                            <div key={i} className="w-[52px] h-[52px] bg-[#00c73c] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl cursor-pointer hover:scale-110 transition-transform">
                                ?
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- Data Editor Panel (Right) --- */}
      {showEditor && (
          <div className="w-[350px] bg-white border-l border-gray-200 h-screen overflow-y-auto p-6 fixed right-0 top-0 shadow-2xl z-[200]">
              <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Settings className="w-5 h-5"/> Mockup Editor</h2>
                  <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-400" /></button>
              </div>

              <div className="space-y-8 pb-24">
                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-2">기본 정보</h3>
                      <EditorInput label="업체명" name="storeName" value={config.storeName} onChange={handleChange} />
                      <EditorInput label="사용자명" name="userName" value={config.userName} onChange={handleChange} />
                      <EditorInput label="기간 텍스트" name="dateRange" value={config.dateRange} onChange={handleChange} />
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-2">방문 전 지표</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <EditorInput label="유입 수" name="visitCount" type="number" value={config.visitCount} onChange={handleChange} />
                        <EditorInput label="지난 주" name="visitPrev" type="number" value={config.visitPrev} onChange={handleChange} />
                        <EditorInput label="예약 수" name="reservationCount" type="number" value={config.reservationCount} onChange={handleChange} />
                        <EditorInput label="지난 주" name="reservationPrev" type="number" value={config.reservationPrev} onChange={handleChange} />
                        <EditorInput label="통화 수" name="callCount" type="number" value={config.callCount} onChange={handleChange} />
                        <EditorInput label="지난 주" name="callPrev" type="number" value={config.callPrev} onChange={handleChange} />
                      </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-2">유입 랭킹</h3>
                      <EditorInput label="1위 채널" name="inflow1Name" value={config.inflow1Name} onChange={handleChange} />
                      <EditorInput label="1위 수치" name="inflow1Count" type="number" value={config.inflow1Count} onChange={handleChange} />
                      <EditorInput label="타겟 키워드" name="targetKeyword" value={config.targetKeyword} onChange={handleChange} />
                  </div>
              </div>
              
              <div className="fixed bottom-0 right-0 w-[350px] bg-white p-4 border-t shadow-lg">
                  <button 
                      onClick={handleCapture}
                      className="w-full bg-[#03aa5a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#02964e] transition-colors shadow-lg"
                  >
                      <Download className="w-5 h-5" /> 이미지로 캡쳐 저장
                  </button>
              </div>
          </div>
      )}

      {!showEditor && (
        <button 
            onClick={() => setShowEditor(true)}
            className="fixed top-24 right-8 bg-white p-4 rounded-full shadow-2xl border border-gray-200 z-[150] hover:bg-gray-50 transition-all hover:scale-110"
        >
            <Settings className="w-7 h-7 text-gray-600" />
        </button>
      )}

    </div>
  );
};

// --- Sub Components (Matching Naver Classes) ---

const SnbItem = ({ icon: Icon, label, active = false, isSolution = false }: any) => (
    <div className={`px-[25px] py-[12px] flex items-center gap-[13px] cursor-pointer transition-colors group ${active ? 'bg-black/50' : 'hover:bg-black/50'}`}>
        <Icon className={`w-5 h-5 ${active ? 'text-white opacity-100' : 'text-white/50 group-hover:opacity-100'}`} />
        <span className={`text-[1.4rem] tracking-[-0.38px] ${active ? 'text-white font-bold' : 'text-white/50 group-hover:text-white'}`}>{label}</span>
    </div>
);

const LnbTab = ({ label, active = false }: any) => (
    <div className={`h-full flex items-center relative cursor-pointer px-4 ${active ? 'text-black font-bold' : 'text-gray-500 font-medium hover:text-black'}`}>
        <span className="text-[1.7rem] tracking-[-0.34px]">{label}</span>
        {active && <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black"></div>}
    </div>
);

const SummaryCard = ({ label, value, prev, isHalf = false }: any) => {
    const diff = value - prev;
    const isDown = diff < 0;
    const isZero = diff === 0;
    const percent = prev === 0 ? 0 : Math.round(Math.abs(diff) / prev * 100);

    return (
        <div className={`${isHalf ? 'w-1/3' : 'flex-1'} bg-[#fcfcfc] border border-transparent rounded-lg p-4 hover:border-black transition-colors cursor-pointer group`}>
            <div className="flex flex-wrap items-baseline gap-1 mb-1">
                <span className="text-[1.5rem] font-semibold text-[#595959]">{label}</span>
                {!isZero && (
                    <span className={`text-[1.4rem] font-bold flex items-center ${isDown ? 'text-[#2485fe]' : 'text-[#fc4c4e]'}`}>
                        <span className="text-[1rem] mr-0.5">{isDown ? '▼' : '▲'}</span>{percent}%
                    </span>
                )}
                {isZero && <span className="text-[1.4rem] font-bold text-gray-400">-</span>}
                <div className="ml-auto">
                    <strong className="text-[2.4rem] font-bold leading-none">{value.toLocaleString()}</strong>
                    <span className="text-[1.4rem] text-gray-800 ml-0.5">회</span>
                </div>
            </div>
            <div className="text-right">
                <span className="text-[1.4rem] text-[#737373]">전주 {prev.toLocaleString()}회</span>
            </div>
        </div>
    );
};

const ChartSection = ({ title, desc, children, buttonText }: any) => (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-8 shadow-sm flex flex-col h-full">
        <div className="mb-4">
            <h3 className="text-[2rem] font-medium leading-snug mb-1 text-[#1c1c1c] break-keep">{title}</h3>
            <p className="text-[1.4rem] text-[#737373]">{desc}</p>
        </div>
        <div className="flex-1 relative">
            {children}
        </div>
        {buttonText && (
            <div className="mt-8 text-center">
                <button className="px-6 py-2.5 border border-[#e3e3e3] rounded-full text-[1.6rem] text-[#737373] hover:bg-gray-50 flex items-center gap-1 mx-auto">
                    {buttonText} <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        )}
    </div>
);

const LegendArea = () => (
    <div className="flex justify-center gap-4 mt-6">
        <div className="flex items-center gap-1.5 text-[1.3rem] text-[#6f7173]">
            <div className="w-3 h-[3px] bg-[#cbd0da] rounded-full"></div> 지난 주
        </div>
        <div className="flex items-center gap-1.5 text-[1.3rem] text-[#6f7173]">
            <div className="w-3 h-[3px] bg-[#00de95] rounded-full"></div> 이번 주
        </div>
    </div>
);

const InflowItem = ({ rank, name, value, max }: any) => {
    const barWidth = (value / max) * 100;
    return (
        <div className="relative flex items-center h-[52px] border-b border-[#e8ebee]/70 overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 z-0 opacity-40 ${rank === 1 ? 'bg-[#e0f0e9]' : 'bg-[#e8ebee]'}`} style={{ width: `${barWidth}%` }}></div>
            <span className="relative z-10 w-[60px] text-center text-[1.8rem] font-bold">{rank}</span>
            <span className={`relative z-10 flex-1 text-[1.6rem] ${rank === 1 ? 'font-bold' : ''}`}>{name}</span>
            <span className="relative z-10 font-bold text-[1.6rem] mr-4">{value}회</span>
        </div>
    );
};

const EditorInput = ({ label, ...props }: any) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
        <input className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-accent outline-none" {...props} />
    </div>
);

export default SmartPlaceMockup;