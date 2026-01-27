import React, { useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend as ChartLegend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { 
  Settings, Download, X, ChevronDown, ChevronLeft, ChevronRight, 
  HelpCircle, MoreHorizontal, RefreshCw
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ChartLegend, Filler, ArcElement);

// --- Custom Icons (Simulating Naver Sprites) ---
const NaverIcon = ({ name, className = "" }: { name: string, className?: string }) => {
    // Mapping Lucide icons or SVG paths to simulate Naver's sprite icons
    switch (name) {
        case 'home': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
        case 'chart': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
        case 'store': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8z"></path><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2"></path></svg>;
        case 'calendar': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
        case 'review': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.38 0 0 1 8 8v.5z"></path></svg>;
        case 'user': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
        case 'support': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;
        case 'solution': return <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
        case 'arrow-up': return <svg className={`w-3 h-3 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;
        case 'arrow-down': return <svg className={`w-3 h-3 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
        default: return <div className={`w-5 h-5 bg-gray-400 ${className}`} />;
    }
}

const SmartPlaceMockup: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showEditor, setShowEditor] = useState(true);

  // --- Configuration State ---
  const [config, setConfig] = useState({
    storeName: "포유마사지안마원",
    userName: "유경짱",
    currentDateRange: "26. 1. 26. 월 - 1. 27. 화",
    
    // Visit Stats
    visitTotal: 86,
    visitPrev: 298,
    
    // Reservation Stats
    resTotal: 7,
    resPrev: 13,
    
    // Call Stats
    callTotal: 2,
    callPrev: 11,

    // Review Stats
    reviewTotal: 3,
    reviewPrev: 3,

    // Sales Stats
    salesTotal: 395000,
    salesPrev: 607000, // Derived from -35% roughly

    // Chart Data (Mocking arrays for simplicity in editor)
    // 1. Review Chart (Empty currently)
    reviewChartData: [0, 0, 0, 0, 0, 0, 0],
    reviewChartPrev: [1, 0, 0, 0, 0, 0, 0],

    // 2. Call Chart
    callChartData: [2, 0, 0, 0, 0, 0, 0],
    callChartPrev: [1, 2, 1, 3, 1, 2, 1],

    // 3. Place Inflow Chart
    placeChartData: [86, 0, 0, 0, 0, 0, 0],
    placeChartPrev: [42, 55, 38, 41, 39, 43, 40],

    // 4. Reservation Chart
    resChartData: [7, 0, 0, 0, 0, 0, 0],
    resChartPrev: [2, 1, 2, 3, 2, 1, 2],

    // 5. Sales Chart
    salesChartData: [395000, 0, 0, 0, 0, 0, 0],
    salesChartPrev: [200000, 150000, 180000, 120000, 140000, 90000, 60000],

    // Inflow Ranking
    inflowRank1Name: "네이버지도", inflowRank1Value: 64,
    inflowRank2Name: "네이버검색", inflowRank2Value: 21,
    inflowRank3Name: "웹사이트", inflowRank3Value: 1,
    targetKeyword: "광화문역마사지",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleCapture = async () => {
    if (captureRef.current) {
        // Hide scrollbar style for capture
        const canvas = await html2canvas(captureRef.current, { 
            scale: 2, 
            useCORS: true,
            width: 1480, // Fixed width for high res
            windowWidth: 1480,
            backgroundColor: '#fcfcfc',
            logging: false,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `smartplace_report_${new Date().toISOString().split('T')[0]}.png`;
        link.click();
    }
  };

  // --- Helper to calculate percentage diff ---
  const getDiff = (curr: any, prev: any) => {
    const c = Number(curr);
    const p = Number(prev);
    if (p === 0) return { percent: 0, isDown: false, isZero: true };
    const diff = c - p;
    const isDown = diff < 0;
    const percent = Math.round(Math.abs(diff) / p * 100);
    return { percent, isDown, isZero: diff === 0 };
  };

  // --- Chart Config Generators ---
  const getLineOptions = (maxTicks = 5): any => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    layout: { padding: { top: 10, bottom: 0, left: 0, right: 0 } },
    scales: {
        x: { 
            grid: { display: false }, 
            ticks: { color: '#999', font: { size: 11, family: "'Apple SD Gothic Neo', sans-serif" } },
            border: { display: false }
        },
        y: { 
            display: true, 
            grid: { color: '#f0f0f0', drawBorder: false }, 
            ticks: { color: '#ccc', font: {size: 10}, maxTicksLimit: maxTicks, padding: 10 },
            border: { display: false }
        }
    },
    elements: { 
        point: { radius: 0, hoverRadius: 0 }, 
        line: { tension: 0.4, borderWidth: 2 } 
    }
  });

  const getChartData = (curr: number[], prev: number[]) => ({
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      datasets: [
          { 
              data: prev, 
              borderColor: '#cbd0da', 
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false,
              order: 2 
          },
          { 
              data: curr, 
              borderColor: '#00de95', // Bright green for line
              borderWidth: 2,
              pointBackgroundColor: '#00de95',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: (ctx: any) => {
                  const index = ctx.dataIndex;
                  // Show point only on the first non-zero value for "Current" (Simulating "Today" or specific logic)
                  // For mockup, let's just put it on the first point if it exists
                  return (index === 0 && curr[0] > 0) ? 5 : 0; 
              },
              fill: {
                  target: 'origin',
                  above: 'rgba(0, 222, 149, 0.05)', // Very light green fill
              },
              order: 1
          }
      ]
  });

  // Doughnut for "Call Keywords"
  const callDoughnutData = {
    labels: ['마사지', '기타'],
    datasets: [{
        data: [50, 50],
        backgroundColor: ['#d5dbe2', '#e4e8eb'], // Mockup colors
        borderWidth: 0,
        cutout: '75%',
    }]
  };

  return (
    <div className="min-h-screen bg-[#eef0f3] flex font-sans text-[#1c1c1c]">
      
      {/* 1. Main Preview Area */}
      <div className="flex-1 overflow-auto flex justify-center py-10">
        <div 
            ref={captureRef}
            className="w-[1480px] bg-[#fcfcfc] min-h-[1500px] shadow-2xl relative flex"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', Helvetica, Arial, sans-serif" }}
        >
            {/* Sidebar (240px) */}
            <aside className="w-[240px] bg-[#232323] flex flex-col flex-shrink-0 relative z-20">
                {/* Biz Selector */}
                <div className="h-[68px] flex items-center px-5 border-b border-[#ffffff1a] cursor-pointer hover:bg-[#ffffff0d] transition-colors">
                    <div className="w-[23px] h-[23px] rounded-full border-2 border-white overflow-hidden mr-[9px] flex-shrink-0">
                        {/* Placeholder for Profile Image */}
                        <img src="https://ldb-phinf.pstatic.net/20250213_97/1739410081945k7CHI_JPEG/IMG_1022.jpeg?type=f300_300" alt="profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[#ffffff80] font-bold text-[14px] flex-1 truncate">{config.storeName}</span>
                    <ChevronDown className="w-4 h-4 text-[#ffffff80]" />
                </div>

                {/* Menu List */}
                <ul className="flex-1 py-3 overflow-y-auto">
                    <SidebarItem icon="store" label="업체정보" />
                    <SidebarItem icon="calendar" label="예약" />
                    <SidebarItem icon="chart" label="스마트콜" />
                    <SidebarItem icon="solution" label="마케팅" />
                    <SidebarItem icon="review" label="리뷰" />
                    <SidebarItem icon="user" label="고객" />
                    <SidebarItem icon="chart" label="통계" active />
                    <SidebarItem icon="support" label="비즈니스 스쿨" />
                    <SidebarItem icon="support" label="금융지원" />
                    <SidebarItem icon="solution" label="솔루션" hasBorder />
                </ul>

                {/* Bottom Info */}
                <div className="px-5 py-6">
                    <button className="flex items-center justify-between w-full text-[#ffffff80] text-[14px] mb-6">
                        문의 채널 <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="flex border border-[#ffffff1a] rounded-[21px] overflow-hidden">
                        <button className="flex-1 py-[10px] text-white text-[14px] border-r border-[#ffffff1a] hover:bg-[#ffffff0d]">전체설정</button>
                        <button className="flex-1 py-[10px] text-white text-[14px] hover:bg-[#ffffff0d]">내 업체</button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#fcfcfc]">
                
                {/* LNB (Local Navigation Bar) */}
                <div className="h-[68px] bg-white border-b border-[#3333331a] flex items-center justify-between px-10 sticky top-0 z-10">
                   <div className="flex h-full">
                       <LnbItem label="리포트" active />
                       <LnbItem label="플레이스" />
                       <LnbItem label="스마트콜" />
                       <LnbItem label="예약·주문" />
                       <LnbItem label="리뷰" />
                   </div>
                   <div className="flex items-center text-[14px] text-[#74787f]">
                       <span className="text-[#03aa5a] font-bold mr-1">{config.userName} 님</span>
                       <span className="w-[1px] h-3 bg-[#e5e5e5] mx-3"></span>
                       <span className="cursor-pointer">로그아웃</span>
                       <button className="ml-4 p-1"><Settings className="w-5 h-5 text-[#b0b0b0]" /></button>
                   </div>
                </div>

                {/* Dashboard Content */}
                <div className="w-[880px] mx-auto pt-[30px] pb-[100px]">
                    
                    {/* Banner AD */}
                    <div className="w-full h-[80px] bg-[#f2f3f9] rounded-xl mb-[30px] border border-[#f2f3f9] relative overflow-hidden flex items-center justify-center">
                        {/* Mockup Ad Content */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xs">AD</div>
                            <div className="text-[#424242]">
                                <p className="text-[16px] font-bold">연 평균 부가세, 125만원 줄였어요</p>
                                <p className="text-[13px] text-[#8c8c8c]">월 3만원 세무기장으로 시작</p>
                            </div>
                            <button className="bg-[#5c7cfa] text-white text-[12px] px-3 py-1 rounded hover:bg-blue-600">더 알아보기</button>
                        </div>
                        <span className="absolute right-2 top-2 text-[9px] border border-[#ccc] text-[#ccc] px-1 rounded-sm">AD</span>
                    </div>

                    {/* Date Filter */}
                    <div className="flex items-center mb-[30px]">
                        <div className="relative mr-[6px]">
                            <button className="w-[89px] h-[52px] border border-[#e5e5e5] bg-white rounded-xl text-[15px] text-[#424242] font-medium flex items-center justify-center">
                                주간
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-between h-[52px] border border-[#e5e5e5] bg-white rounded-xl px-2">
                            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="w-5 h-5 text-[#03aa5a]" />
                            </button>
                            <span className="text-[15px] font-bold text-[#424242]">{config.currentDateRange}</span>
                            <button className="w-8 h-8 flex items-center justify-center opacity-30 cursor-default">
                                <ChevronRight className="w-5 h-5 text-[#03aa5a]" />
                            </button>
                        </div>
                    </div>

                    {/* Summary Card Group (Before/After Visit) */}
                    <div className="bg-[#fcfcfc] rounded-xl border border-[#e5e5e5] p-[30px] mb-5 shadow-sm">
                        {/* Row 1 */}
                        <div className="mb-[40px]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[19px] font-bold text-[#1c1c1c] flex items-center">
                                    방문 전 지표 <span className="text-[#03aa5a] ml-1">3</span>
                                    <HelpCircle className="w-[18px] h-[18px] text-[#c9c9c9] ml-[5px]" />
                                </h3>
                                <button><ChevronDown className="w-5 h-5 text-[#c9c9c9] rotate-180" /></button>
                            </div>
                            <div className="flex gap-2">
                                <SummaryItem label="플레이스 유입" value={config.visitTotal} prev={config.visitPrev} />
                                <SummaryItem label="예약·주문 신청" value={config.resTotal} prev={config.resPrev} />
                                <SummaryItem label="스마트콜 통화" value={config.callTotal} prev={config.callPrev} />
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[19px] font-bold text-[#1c1c1c] flex items-center">
                                    방문 후 지표 <span className="text-[#03aa5a] ml-1">1</span>
                                    <HelpCircle className="w-[18px] h-[18px] text-[#c9c9c9] ml-[5px]" />
                                </h3>
                                <button><ChevronDown className="w-5 h-5 text-[#c9c9c9] rotate-180" /></button>
                            </div>
                            <div className="flex gap-2">
                                <SummaryItem label="리뷰 등록" value={config.reviewTotal} prev={config.reviewPrev} width="33.3%" />
                                {/* Empty placeholders to maintain grid if needed, or flex handles it */}
                            </div>
                        </div>
                    </div>

                    {/* Charts Layout (Grid) */}
                    <div className="flex flex-wrap gap-3">
                        
                        {/* 1. Review Chart (Left) */}
                        <div className="w-[calc(50%-6px)] flex flex-col gap-3">
                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">리뷰</span>는 {config.reviewTotal}회,<br/>일 평균 {Math.round(config.reviewTotal/7)}회 입니다.</>
                                }
                                subText={
                                    getDiff(config.reviewTotal, config.reviewPrev).isZero 
                                    ? "지난 주와 동일합니다."
                                    : <>지난 주 대비 리뷰 작성이 <span className={getDiff(config.reviewTotal, config.reviewPrev).isDown ? "text-[#2485fe] font-bold" : "text-[#fc4c4e] font-bold"}>{getDiff(config.reviewTotal, config.reviewPrev).percent}% {getDiff(config.reviewTotal, config.reviewPrev).isDown ? '감소' : '증가'}</span> 했습니다.</>
                                }
                                btnText="리뷰 통계 더보기"
                            >
                                <div className="h-[150px] w-full mt-5">
                                    <Line data={getChartData(config.reviewChartData, config.reviewChartPrev)} options={getLineOptions(5)} />
                                </div>
                                <Legend />
                            </ChartCard>

                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">스마트콜 통화</span>는 {config.callTotal}회,<br/>일 평균 {Math.round(config.callTotal/7)}회 입니다.</>
                                }
                                subText={
                                    <>지난 주 대비 통화 수가 <span className={getDiff(config.callTotal, config.callPrev).isDown ? "text-[#2485fe] font-bold" : "text-[#fc4c4e] font-bold"}>{getDiff(config.callTotal, config.callPrev).percent}% {getDiff(config.callTotal, config.callPrev).isDown ? '감소' : '증가'}</span> 했습니다.</>
                                }
                                btnText="스마트콜 통계 더보기"
                            >
                                <div className="h-[150px] w-full mt-5">
                                    <Line data={getChartData(config.callChartData, config.callChartPrev)} options={getLineOptions(5)} />
                                </div>
                                <Legend />
                                
                                <div className="mt-8 mb-2 text-[15px] text-[#737373]">전화 많이 온 키워드</div>
                                <div className="h-[160px] flex items-center justify-center relative">
                                    <div className="w-[160px] h-[160px]">
                                        <Doughnut data={callDoughnutData} options={{ maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center text-[13px] text-[#8c8c8c] flex-col leading-tight">
                                       <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#d5dbe2]"></span> 마사지 (50%)</div>
                                       <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e4e8eb]"></span> 기타 (50%)</div>
                                    </div>
                                </div>
                            </ChartCard>
                            
                             <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">예약·주문 매출액</span>은 {config.salesTotal.toLocaleString()}원,<br/>일 평균 {Math.round(config.salesTotal/7).toLocaleString()}원 입니다.</>
                                }
                                subText={
                                    <>지난 주 대비 매출액이 <span className={getDiff(config.salesTotal, config.salesPrev).isDown ? "text-[#2485fe] font-bold" : "text-[#fc4c4e] font-bold"}>{getDiff(config.salesTotal, config.salesPrev).percent}% {getDiff(config.salesTotal, config.salesPrev).isDown ? '감소' : '증가'}</span> 했습니다.</>
                                }
                                btnText="예약·주문 통계 더보기"
                            >
                                <div className="text-[12px] text-[#737373] mt-4 mb-1 pl-1">단위:만원</div>
                                <div className="h-[150px] w-full">
                                    <Line data={getChartData(config.salesChartData, config.salesChartPrev)} options={getLineOptions(5)} />
                                </div>
                                <Legend />
                            </ChartCard>
                        </div>

                        {/* 2. Place/Inflow Chart (Right) */}
                        <div className="w-[calc(50%-6px)] flex flex-col gap-3">
                             <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">플레이스 유입</span>은 {config.visitTotal}회,<br/>일 평균 {Math.round(config.visitTotal/7)}회 입니다. <HelpCircle className="inline-block w-[18px] h-[18px] text-[#c9c9c9] ml-1 align-sub" /></>
                                }
                                subText={
                                    <>지난 주 대비 유입 수가 <span className={getDiff(config.visitTotal, config.visitPrev).isDown ? "text-[#2485fe] font-bold" : "text-[#fc4c4e] font-bold"}>{getDiff(config.visitTotal, config.visitPrev).percent}% {getDiff(config.visitTotal, config.visitPrev).isDown ? '감소' : '증가'}</span> 했습니다.</>
                                }
                            >
                                <div className="h-[150px] w-full mt-5">
                                    <Line data={getChartData(config.placeChartData, config.placeChartPrev)} options={getLineOptions(5)} />
                                </div>
                                <Legend />
                            </ChartCard>

                            {/* Inflow List Box */}
                            <div className="bg-white rounded-xl border border-[#e5e5e5] p-[30px] flex flex-col h-full shadow-sm">
                                <h3 className="text-[20px] font-normal leading-[29px] text-[#1c1c1c] tracking-[-0.5px] mb-2">
                                    <span className="font-bold text-[#03aa5a]">{config.inflowRank1Name}</span>에서 많이 방문했고,<br/>
                                    <span className="font-bold text-[#03aa5a]">{config.targetKeyword}</span> 키워드를 주로 검색했어요.
                                </h3>
                                <p className="text-[14px] text-[#737373] mb-5 flex items-center">
                                    플레이스 방문 기준입니다. 
                                    <span className="inline-block bg-[#03aa5a] text-white text-[10px] px-1 ml-2 rounded opacity-0">?</span> {/* Hidden trigger area for tooltip if needed */}
                                    <HelpCircle className="w-[18px] h-[18px] text-[#c9c9c9] ml-1" />
                                </p>

                                <div className="flex gap-2 mb-6">
                                    <button className="h-[39px] px-3 bg-[#424242] text-white text-[15px] font-bold rounded-[20px]">유입채널</button>
                                    <button className="h-[39px] px-3 bg-white border border-[#e5e5e5] text-[#424242] text-[15px] rounded-[20px]">유입키워드</button>
                                </div>

                                <div className="flex-1">
                                    <InflowRow rank={1} name={config.inflowRank1Name} value={config.inflowRank1Value} total={config.inflowRank1Value} />
                                    <InflowRow rank={2} name={config.inflowRank2Name} value={config.inflowRank2Value} total={config.inflowRank1Value} />
                                    <InflowRow rank={3} name={config.inflowRank3Name} value={config.inflowRank3Value} total={config.inflowRank1Value} />
                                </div>

                                <div className="mt-8 text-center relative">
                                    <button className="inline-flex items-center justify-center px-6 py-[11px] border border-[#e3e3e3] rounded-[25px] text-[16px] text-[#737373] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05)]">
                                        유입 더보기 <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                    
                                    {/* Green Tooltip */}
                                    <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 bg-[#03aa5a] text-white text-[13px] px-3 py-2 rounded-lg font-medium shadow-lg whitespace-nowrap z-10">
                                        우리 가게를 검색한 고객이 궁금하다면?
                                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#03aa5a] rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">예약·주문 신청</span>은 {config.resTotal}회,<br/>일 평균 {Math.round(config.resTotal/7)}회 입니다.</>
                                }
                                subText={
                                    <>지난 주 대비 신청이 <span className={getDiff(config.resTotal, config.resPrev).isDown ? "text-[#2485fe] font-bold" : "text-[#fc4c4e] font-bold"}>{getDiff(config.resTotal, config.resPrev).percent}% {getDiff(config.resTotal, config.resPrev).isDown ? '감소' : '증가'}</span> 했습니다.</>
                                }
                            >
                                <div className="h-[150px] w-full mt-5">
                                    <Line data={getChartData(config.resChartData, config.resChartPrev)} options={getLineOptions(5)} />
                                </div>
                                <Legend />
                            </ChartCard>
                        </div>
                    </div>
                    
                    {/* Floating Help Button List */}
                    <div className="fixed right-10 bottom-10 z-[100] flex flex-col gap-3">
                         {Array.from({length: 6}).map((_,i) => (
                             <div key={i} className="w-[52px] h-[52px] bg-[#00c73c] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                ?
                             </div>
                         ))}
                    </div>

                </div>
            </main>
        </div>
      </div>

      {/* --- Data Editor Panel (Right) --- */}
      {showEditor && (
          <div className="w-[320px] bg-white border-l border-gray-200 h-screen overflow-y-auto p-5 fixed right-0 top-0 shadow-xl z-[200]">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800"><Settings className="w-5 h-5"/> 데이터 편집</h2>
                  <button onClick={() => setShowEditor(false)} className="p-1 hover:bg-gray-100 rounded text-gray-500"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-6 pb-20">
                  <EditorSection title="기본 정보">
                      <EditorInput label="업체명" name="storeName" value={config.storeName} onChange={handleChange} />
                      <EditorInput label="사용자명" name="userName" value={config.userName} onChange={handleChange} />
                      <EditorInput label="기간 텍스트" name="currentDateRange" value={config.currentDateRange} onChange={handleChange} />
                  </EditorSection>

                  <EditorSection title="지표 데이터 (현재/지난주)">
                      <div className="grid grid-cols-2 gap-2">
                        <EditorInput label="유입(현)" name="visitTotal" type="number" value={config.visitTotal} onChange={handleChange} />
                        <EditorInput label="유입(전)" name="visitPrev" type="number" value={config.visitPrev} onChange={handleChange} />
                        
                        <EditorInput label="예약(현)" name="resTotal" type="number" value={config.resTotal} onChange={handleChange} />
                        <EditorInput label="예약(전)" name="resPrev" type="number" value={config.resPrev} onChange={handleChange} />
                        
                        <EditorInput label="통화(현)" name="callTotal" type="number" value={config.callTotal} onChange={handleChange} />
                        <EditorInput label="통화(전)" name="callPrev" type="number" value={config.callPrev} onChange={handleChange} />
                        
                        <EditorInput label="리뷰(현)" name="reviewTotal" type="number" value={config.reviewTotal} onChange={handleChange} />
                        <EditorInput label="리뷰(전)" name="reviewPrev" type="number" value={config.reviewPrev} onChange={handleChange} />

                        <EditorInput label="매출(현)" name="salesTotal" type="number" value={config.salesTotal} onChange={handleChange} />
                        <EditorInput label="매출(전)" name="salesPrev" type="number" value={config.salesPrev} onChange={handleChange} />
                      </div>
                  </EditorSection>
                  
                   <EditorSection title="유입 순위">
                      <EditorInput label="1위 이름" name="inflowRank1Name" value={config.inflowRank1Name} onChange={handleChange} />
                      <EditorInput label="1위 수치" name="inflowRank1Value" type="number" value={config.inflowRank1Value} onChange={handleChange} />
                      <EditorInput label="2위 이름" name="inflowRank2Name" value={config.inflowRank2Name} onChange={handleChange} />
                      <EditorInput label="2위 수치" name="inflowRank2Value" type="number" value={config.inflowRank2Value} onChange={handleChange} />
                      <EditorInput label="3위 이름" name="inflowRank3Name" value={config.inflowRank3Name} onChange={handleChange} />
                      <EditorInput label="3위 수치" name="inflowRank3Value" type="number" value={config.inflowRank3Value} onChange={handleChange} />
                      <EditorInput label="타겟 키워드" name="targetKeyword" value={config.targetKeyword} onChange={handleChange} />
                  </EditorSection>
              </div>
              
              <div className="fixed bottom-0 right-0 w-[320px] bg-white p-4 border-t shadow-lg z-10">
                  <button 
                      onClick={handleCapture}
                      className="w-full bg-[#03aa5a] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#02964e] transition-colors shadow-md text-sm"
                  >
                      <Download className="w-4 h-4" /> 캡쳐 다운로드
                  </button>
              </div>
          </div>
      )}

      {!showEditor && (
        <button 
            onClick={() => setShowEditor(true)}
            className="fixed top-24 right-8 bg-white p-3 rounded-full shadow-lg border border-gray-200 z-[150] hover:bg-gray-50 transition-all text-gray-600"
            title="편집기 열기"
        >
            <Settings className="w-6 h-6" />
        </button>
      )}

    </div>
  );
};

// --- Child Components ---

const SidebarItem = ({ icon, label, active = false, hasBorder = false, isSolution = false }: any) => (
    <li className={`relative ${hasBorder ? 'mt-[10px] pt-[10px] border-t border-[#ffffff1a] mx-[25px] px-0' : ''}`}>
        <a className={`flex items-center px-[25px] py-[12px] text-[14px] font-medium tracking-[-0.38px] transition-colors ${active ? 'text-white' : 'text-[#ffffff80] hover:bg-[#00000080]'}`}>
            <span className={`mr-[13px] opacity-${active ? '100' : '50'}`}>
                <NaverIcon name={icon} className="fill-current" />
            </span>
            {label}
        </a>
    </li>
);

const LnbItem = ({ label, active = false }: any) => (
    <div className={`relative h-full flex items-center px-[20px] cursor-pointer text-[17px] tracking-[-0.34px] ${active ? 'text-[#000] font-bold' : 'text-[#74787f]'}`}>
        <span>{label}</span>
        {active && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />}
    </div>
);

const SummaryItem = ({ label, value, prev, width = "100%" }: any) => {
    const diff = getDiff(value, prev);
    const colorClass = diff.isDown ? 'text-[#2485fe]' : 'text-[#fc4c4e]';
    
    return (
        <div className="bg-[#fcfcfc] border border-transparent hover:border-[#1c1c1c] rounded-[7px] p-[15px_16px] cursor-pointer group transition-all" style={{ width }}>
            <div className="flex flex-wrap items-baseline gap-1 mb-1">
                <span className="text-[15px] font-semibold text-[#595959]">{label}</span>
                
                {!diff.isZero ? (
                    <span className={`text-[14px] font-bold flex items-center ml-1 ${colorClass}`}>
                        {diff.isDown ? <NaverIcon name="arrow-down" /> : <NaverIcon name="arrow-up" />} {diff.percent}%
                    </span>
                ) : (
                    <span className="text-[14px] font-bold text-gray-400 ml-1">-</span>
                )}
                
                <div className="ml-auto text-right">
                    <strong className="text-[24px] font-bold text-[#1c1c1c] leading-none">{value.toLocaleString()}</strong>
                    <span className="text-[14px] text-[#1c1c1c] ml-1">회</span>
                </div>
            </div>
            <div className="text-right">
                <span className="text-[14px] text-[#737373] tracking-[-0.3px]">전주 {prev.toLocaleString()}회</span>
            </div>
        </div>
    );
};

const getDiff = (curr: any, prev: any) => {
    const c = Number(curr);
    const p = Number(prev);
    if (p === 0) return { percent: 0, isDown: false, isZero: true };
    const diff = c - p;
    const isDown = diff < 0;
    const percent = Math.round(Math.abs(diff) / p * 100);
    return { percent, isDown, isZero: diff === 0 };
};

const ChartCard = ({ title, subText, children, btnText }: any) => (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-[30px_20px_24px] shadow-sm flex flex-col h-full relative">
        <div className="mb-2 pl-[10px] border-l-0">
             <h3 className="text-[20px] leading-[29px] text-[#1c1c1c] tracking-[-0.5px] font-normal mb-[7px]">
                 {title}
             </h3>
             <p className="text-[14px] text-[#737373] leading-[18px] tracking-[-0.3px] relative">
                 {subText}
             </p>
        </div>
        
        <div className="flex-1 relative">
            {children}
        </div>
        
        {btnText && (
             <div className="mt-5 text-center">
                <button className="inline-flex items-center justify-center px-[26px] py-[11px] border border-[#e3e3e3] rounded-[25px] text-[16px] text-[#737373] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] tracking-[-0.5px]">
                    {btnText} <span className="ml-[3px] border-t border-r border-[#888] w-[7px] h-[7px] transform rotate-45 inline-block mb-[2px]"></span>
                </button>
             </div>
        )}
    </div>
);

const Legend = () => (
    <div className="flex justify-center gap-[18px] mt-3">
        <div className="flex items-center text-[13px] text-[#6f7173]">
            <span className="w-[12px] h-[3px] bg-[#cbd0da] mr-[6px] rounded-full"></span> 지난 주
        </div>
        <div className="flex items-center text-[13px] text-[#6f7173]">
            <span className="w-[12px] h-[3px] bg-[#00de95] mr-[6px] rounded-full"></span> 이번 주
        </div>
    </div>
);

const InflowRow = ({ rank, name, value, total }: any) => {
    const percent = Math.round((value / total) * 100); // Relative to rank 1 for bar width
    
    return (
        <div className="relative flex items-center h-[52px] border-t border-[#f2f2f2] last:border-b text-[16px] text-[#232323]">
            {/* Background Bar */}
            <div 
                className={`absolute top-0 bottom-0 left-0 z-0 ${rank === 1 ? 'bg-[#e0f0e9]' : 'bg-[#fff]'}`} 
                style={{ width: rank === 1 ? '100%' : `${(value/total)*100}%`, opacity: rank === 1 ? 1 : 0.4 }}
            ></div>
            
            <div className="relative z-10 flex items-center w-full px-4">
                <span className="w-[18px] font-semibold text-center mr-[17px]">{rank}</span>
                <span className={`flex-1 truncate ${rank === 1 ? 'font-bold' : ''}`}>{name}</span>
                <span className="font-bold mr-2">{value}회</span>
            </div>
        </div>
    );
};

const EditorSection = ({ title, children }: any) => (
    <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2 mb-3">{title}</h3>
        {children}
    </div>
);

const EditorInput = ({ label, ...props }: any) => (
    <div className="mb-3">
        <label className="block text-[12px] font-medium text-gray-500 mb-1">{label}</label>
        <input className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-sm focus:border-[#03aa5a] outline-none transition-colors" {...props} />
    </div>
);

export default SmartPlaceMockup;