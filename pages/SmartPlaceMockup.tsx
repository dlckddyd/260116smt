import React, { useState, useRef, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend as ChartLegend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { 
  Settings, Download, X, ChevronDown, ChevronLeft, ChevronRight, 
  HelpCircle, RefreshCw
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ChartLegend, Filler, ArcElement);

// --- Custom Naver-style Icons (Replica of Sprites) ---
const NaverIcon = ({ name, className = "", active = false }: { name: string, className?: string, active?: boolean }) => {
    const color = active ? "#ffffff" : "#999999"; // Active white, Inactive gray
    
    switch (name) {
        case 'home': // Info icon (Box with i)
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/><path d="M12 7V9" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M12 11V17" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>;
        case 'booking': // Calendar check
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={color} strokeWidth="2"/><path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M3 10H21" stroke={color} strokeWidth="2"/><path d="M9 14L11 16L15 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'smartcall': // Phone with signal
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 16.92V19.92C22.0011 20.1986 21.9213 20.4715 21.7695 20.7093C21.6177 20.9472 21.4001 21.1407 21.1412 21.2687C20.8823 21.3967 20.5924 21.4542 20.3045 21.4348C20.0166 21.4155 19.7421 21.3201 19.51 21.159C14.5492 18.6669 10.3331 14.4508 7.84102 9.49005C7.67989 9.25789 7.58448 8.98344 7.56509 8.69552C7.54571 8.4076 7.60312 8.11772 7.73111 7.8588C7.85909 7.59989 8.05263 7.38228 8.29048 7.23049C8.52834 7.07869 8.80126 6.99893 9.08002 7.00005H12.08C12.5647 6.99544 13.0336 7.1724 13.3986 7.49755C13.7635 7.8227 13.9992 8.27376 14.06 8.76505C14.1738 9.68339 14.3983 10.5846 14.73 11.45C14.8625 11.8009 14.8345 12.1906 14.6521 12.5204C14.4697 12.8501 14.1504 13.0886 13.78 13.175L12.51 13.495C13.9455 16.033 16.0125 18.069 18.52 19.485L18.84 18.215C18.9264 17.8446 19.1649 17.5253 19.4947 17.3429C19.8244 17.1605 20.2141 17.1325 20.565 17.265C21.4304 17.5967 22.3317 17.8212 23.25 17.935C23.7461 17.9968 24.199 18.2359 24.5241 18.6053C24.8493 18.9747 25.0219 19.4475 25.01 19.935V22.935" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'marketing': // Loudspeaker
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8L8 11H3V17H8L12 20V8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.54 8.46C16.4774 9.39764 17.0041 10.6692 17.0041 11.995C17.0041 13.3208 16.4774 14.5924 15.54 15.53" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.07 4.93C20.9447 6.80527 21.9981 9.34838 21.9981 12C21.9981 14.6516 20.9447 17.1947 19.07 19.07" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'review': // Pencil
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 20H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.3032 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93096 19.9598 4.18838C20.0665 4.4458 20.1213 4.72165 20.1213 5C20.1213 5.27835 20.0665 5.5542 19.9598 5.81162C19.8532 6.06904 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'user': // User outline
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'stats': // Bar chart
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 20V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'bizschool': // Graduation cap
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 10V18C22 18 19 20 12 20C5 20 2 18 2 18V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 10L12 4L2 10L12 16L22 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12.4V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'finance': // Currency sign
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2"/><path d="M12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 16C16 16 15.5 15 14 15C12.5 15 11.5 15 10 15C8.5 15 8 16 8 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'solution': // Briefcase
            return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth="2"/><path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        default: 
            return <div className={`w-5 h-5 bg-gray-400 ${className}`} />;
    }
}

const SmartPlaceMockup: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showEditor, setShowEditor] = useState(true);

  // --- State for Dates & Period ---
  const [periodType, setPeriodType] = useState<'weekly' | 'monthly'>('weekly');
  const [baseDate, setBaseDate] = useState(new Date("2026-01-26")); // Current date for simulation

  // --- Configuration State ---
  const [config, setConfig] = useState({
    storeName: "포유마사지안마원",
    userName: "유경짱",
    
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
    salesPrev: 607000,

    // Chart Data (Mocking arrays for simplicity in editor)
    reviewChartData: [0, 0, 0, 0, 0, 0, 0],
    reviewChartPrev: [1, 0, 0, 0, 0, 0, 0],

    callChartData: [2, 0, 0, 0, 0, 0, 0],
    callChartPrev: [1, 2, 1, 3, 1, 2, 1],

    placeChartData: [86, 0, 0, 0, 0, 0, 0],
    placeChartPrev: [42, 55, 38, 41, 39, 43, 40],

    resChartData: [7, 0, 0, 0, 0, 0, 0],
    resChartPrev: [2, 1, 2, 3, 2, 1, 2],

    salesChartData: [395000, 0, 0, 0, 0, 0, 0],
    salesChartPrev: [200000, 150000, 180000, 120000, 140000, 90000, 60000],

    // Inflow Ranking
    inflowRank1Name: "네이버지도", inflowRank1Value: 64,
    inflowRank2Name: "네이버검색", inflowRank2Value: 21,
    inflowRank3Name: "웹사이트", inflowRank3Value: 1,
    targetKeyword: "광화문역마사지",
  });

  // --- Date Logic ---
  const handlePrevDate = () => {
      const newDate = new Date(baseDate);
      if (periodType === 'weekly') {
          newDate.setDate(newDate.getDate() - 7);
      } else {
          newDate.setMonth(newDate.getMonth() - 1);
      }
      setBaseDate(newDate);
  };

  const handleNextDate = () => {
      const newDate = new Date(baseDate);
      if (periodType === 'weekly') {
          newDate.setDate(newDate.getDate() + 7);
      } else {
          newDate.setMonth(newDate.getMonth() + 1);
      }
      setBaseDate(newDate);
  };

  const formatDateRange = () => {
      if (periodType === 'monthly') {
          const year = baseDate.getFullYear().toString().slice(2);
          const month = baseDate.getMonth() + 1;
          return `${year}. ${month}.`;
      } else {
          // Weekly: Show Mon - Sun or User's specific Mon-Tue range?
          // Based on screenshot "26. 1. 26. 월 - 1. 27. 화" (This looks like a custom short range, but standard weekly is 7 days)
          // Let's implement standard weekly logic relative to baseDate
          const start = new Date(baseDate); // Assume baseDate is start
          const end = new Date(baseDate);
          end.setDate(end.getDate() + 1); // Mockup specifically requested "1. 26 - 1. 27" style

          const sy = start.getFullYear().toString().slice(2);
          const sm = start.getMonth() + 1;
          const sd = start.getDate();
          const em = end.getMonth() + 1;
          const ed = end.getDate();
          const sDay = ['일','월','화','수','목','금','토'][start.getDay()];
          const eDay = ['일','월','화','수','목','금','토'][end.getDay()];

          return `${sy}. ${sm}. ${sd}. ${sDay} - ${em}. ${ed}. ${eDay}`;
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleCapture = async () => {
    if (captureRef.current) {
        const canvas = await html2canvas(captureRef.current, { 
            scale: 2, // High resolution
            useCORS: true,
            width: 1480, 
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
              borderColor: '#03aa5a', // Naver Green
              borderWidth: 2,
              pointBackgroundColor: '#03aa5a',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: (ctx: any) => {
                  const index = ctx.dataIndex;
                  return (index === 0 && curr[0] > 0) ? 6 : 0; 
              },
              fill: {
                  target: 'origin',
                  above: 'rgba(3, 170, 90, 0.05)', 
              },
              order: 1
          }
      ]
  });

  const callDoughnutData = {
    labels: ['마사지', '기타'],
    datasets: [{
        data: [50, 50],
        backgroundColor: ['#d5dbe2', '#e4e8eb'], 
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
                        <img src="https://ldb-phinf.pstatic.net/20250213_97/1739410081945k7CHI_JPEG/IMG_1022.jpeg?type=f300_300" alt="profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[#ffffff80] font-bold text-[14px] flex-1 truncate">{config.storeName}</span>
                    <ChevronDown className="w-4 h-4 text-[#ffffff80]" />
                </div>

                {/* Menu List */}
                <ul className="flex-1 py-3 overflow-y-auto no-scrollbar">
                    <SidebarItem icon="home" label="업체정보" />
                    <SidebarItem icon="booking" label="예약" />
                    <SidebarItem icon="smartcall" label="스마트콜" />
                    <SidebarItem icon="marketing" label="마케팅" />
                    <SidebarItem icon="review" label="리뷰" />
                    <SidebarItem icon="user" label="고객" />
                    <SidebarItem icon="stats" label="통계" active />
                    <SidebarItem icon="bizschool" label="비즈니스 스쿨" />
                    <SidebarItem icon="finance" label="금융지원" />
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
                       <span className="text-[#000] font-bold mr-1">{config.userName} 님</span>
                       <span className="w-[1px] h-3 bg-[#e5e5e5] mx-3"></span>
                       <span className="cursor-pointer">로그아웃</span>
                       <button className="ml-4 p-1"><Settings className="w-5 h-5 text-[#b0b0b0]" /></button>
                   </div>
                </div>

                {/* Dashboard Content */}
                <div className="w-[880px] mx-auto pt-[30px] pb-[100px]">
                    
                    {/* AD Removed */}

                    {/* Date Filter */}
                    <div className="flex items-center mb-[30px]">
                        <div className="relative mr-[6px] group">
                            <button className="w-[89px] h-[52px] border border-[#e5e5e5] bg-white rounded-xl text-[15px] text-[#424242] font-medium flex items-center justify-center relative">
                                {periodType === 'weekly' ? '주간' : '월간'}
                                {/* Simple dropdown mimic */}
                                <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
                            </button>
                            {/* Hover Dropdown */}
                            <div className="hidden group-hover:block absolute top-full left-0 w-full bg-white border border-[#e5e5e5] rounded-lg shadow-lg mt-1 z-10 overflow-hidden">
                                <button onClick={() => setPeriodType('weekly')} className="w-full py-2 hover:bg-gray-50 text-sm text-[#424242]">주간</button>
                                <button onClick={() => setPeriodType('monthly')} className="w-full py-2 hover:bg-gray-50 text-sm text-[#424242]">월간</button>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-between h-[52px] border border-[#e5e5e5] bg-white rounded-xl px-2">
                            <button onClick={handlePrevDate} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="w-5 h-5 text-[#03aa5a]" />
                            </button>
                            <span className="text-[15px] font-bold text-[#424242]">{formatDateRange()}</span>
                            <button onClick={handleNextDate} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
                                <ChevronRight className="w-5 h-5 text-[#03aa5a]" />
                            </button>
                        </div>
                    </div>

                    {/* Summary Card Group */}
                    <div className="bg-[#fcfcfc] rounded-xl border border-[#e5e5e5] p-[30px] mb-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
                        {/* Row 1 */}
                        <div className="mb-[40px]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[19px] font-bold text-[#1c1c1c] flex items-center tracking-[-0.5px]">
                                    방문 전 지표 <span className="text-[#03aa5a] ml-1.5 font-bold">3</span>
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
                                <h3 className="text-[19px] font-bold text-[#1c1c1c] flex items-center tracking-[-0.5px]">
                                    방문 후 지표 <span className="text-[#03aa5a] ml-1.5 font-bold">1</span>
                                    <HelpCircle className="w-[18px] h-[18px] text-[#c9c9c9] ml-[5px]" />
                                </h3>
                                <button><ChevronDown className="w-5 h-5 text-[#c9c9c9] rotate-180" /></button>
                            </div>
                            <div className="flex gap-2">
                                <SummaryItem label="리뷰 등록" value={config.reviewTotal} prev={config.reviewPrev} width="33.3%" />
                                <div className="flex-1"></div>
                                <div className="flex-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Layout */}
                    <div className="flex flex-wrap gap-3">
                        
                        {/* Left Column */}
                        <div className="w-[calc(50%-6px)] flex flex-col gap-3">
                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a] font-bold">리뷰</span>는 {config.reviewTotal}회,<br/>일 평균 {Math.round(config.reviewTotal/7)}회 입니다.</>
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
                                    <>한 주간 <span className="text-[#03aa5a] font-bold">스마트콜 통화</span>는 {config.callTotal}회,<br/>일 평균 {Math.round(config.callTotal/7)}회 입니다.</>
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
                                
                                <div className="mt-8 mb-2 text-[15px] text-[#737373] tracking-[-0.5px]">전화 많이 온 키워드</div>
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
                                    <>한 주간 <span className="text-[#03aa5a] font-bold">예약·주문 매출액</span>은 {config.salesTotal.toLocaleString()}원,<br/>일 평균 {Math.round(config.salesTotal/7).toLocaleString()}원 입니다.</>
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

                        {/* Right Column (Swapped Order) */}
                        <div className="w-[calc(50%-6px)] flex flex-col gap-3">
                            
                            {/* Inflow List Box (Moved to Top) */}
                            <div className="bg-white rounded-xl border border-[#e5e5e5] p-[30px] flex flex-col h-full shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
                                <h3 className="text-[20px] font-normal leading-[29px] text-[#1c1c1c] tracking-[-0.5px] mb-2">
                                    <span className="font-bold text-[#03aa5a]">{config.inflowRank1Name}</span>에서 많이 방문했고,<br/>
                                    <span className="font-bold text-[#03aa5a]">{config.targetKeyword}</span> 키워드를 주로 검색했어요.
                                </h3>
                                <p className="text-[14px] text-[#737373] mb-5 flex items-center tracking-[-0.3px]">
                                    플레이스 방문 기준입니다. 
                                    <span className="bg-[#03aa5a] text-white text-[10px] px-1 ml-2 rounded opacity-0">?</span>
                                    <HelpCircle className="w-[18px] h-[18px] text-[#c9c9c9] ml-1" />
                                </p>

                                <div className="flex gap-2 mb-6">
                                    <button className="h-[39px] px-3 bg-[#424242] text-white text-[15px] font-bold rounded-[20px] tracking-[-0.3px]">유입채널</button>
                                    <button className="h-[39px] px-3 bg-white border border-[#e5e5e5] text-[#424242] text-[15px] rounded-[20px] tracking-[-0.3px]">유입키워드</button>
                                </div>

                                <div className="flex-1">
                                    <InflowRow rank={1} name={config.inflowRank1Name} value={config.inflowRank1Value} total={config.inflowRank1Value} />
                                    <InflowRow rank={2} name={config.inflowRank2Name} value={config.inflowRank2Value} total={config.inflowRank1Value} />
                                    <InflowRow rank={3} name={config.inflowRank3Name} value={config.inflowRank3Value} total={config.inflowRank1Value} />
                                </div>

                                <div className="mt-8 text-center relative">
                                    <button className="inline-flex items-center justify-center px-6 py-[11px] border border-[#e3e3e3] rounded-[25px] text-[16px] text-[#737373] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] tracking-[-0.5px]">
                                        유입 더보기 <span className="ml-[3px] border-t border-r border-[#888] w-[7px] h-[7px] transform rotate-45 inline-block mb-[2px]"></span>
                                    </button>
                                    
                                    {/* Green Tooltip */}
                                    <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 bg-[#03aa5a] text-white text-[13px] px-3 py-2 rounded-lg font-medium shadow-lg whitespace-nowrap z-10 tracking-[-0.3px]">
                                        우리 가게를 검색한 고객이 궁금하다면?
                                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#03aa5a] rotate-45"></div>
                                    </div>
                                </div>
                            </div>

                             {/* Place Visit Chart (Moved to Bottom) */}
                             <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a] font-bold">플레이스 유입</span>은 {config.visitTotal}회,<br/>일 평균 {Math.round(config.visitTotal/7)}회 입니다. <HelpCircle className="inline-block w-[18px] h-[18px] text-[#c9c9c9] ml-1 align-sub" /></>
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

const SidebarItem = ({ icon, label, active = false, hasBorder = false }: any) => (
    <li className={`relative ${hasBorder ? 'mt-[10px] pt-[10px] border-t border-[#ffffff1a] mx-[25px] px-0' : ''}`}>
        <a className={`flex items-center px-[25px] py-[12px] text-[14px] font-medium tracking-[-0.38px] transition-colors ${active ? 'text-white' : 'text-[#ffffff80] hover:bg-[#00000080]'}`}>
            <span className={`mr-[13px] opacity-${active ? '100' : '50'}`}>
                <NaverIcon name={icon} active={active} />
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
    // Naver logic: Red (#fc4c4e) for UP, Blue (#2485fe) for DOWN in statistics
    // 0 is usually gray or hyphen
    const c = Number(value);
    const p = Number(prev);
    let diffPercent = 0;
    let colorClass = 'text-gray-400';
    let icon = null;
    let diffText = '-';

    if (p !== 0 && c !== p) {
        const diff = c - p;
        diffPercent = Math.round(Math.abs(diff) / p * 100);
        const isUp = diff > 0;
        // Reversed colors for metrics where lower is better? No, standard is Red=Increase
        // For visits: Up is Good (Red)
        colorClass = isUp ? 'text-[#fc4c4e]' : 'text-[#2485fe]';
        icon = isUp ? <span className="text-[10px] mr-0.5">▲</span> : <span className="text-[10px] mr-0.5">▼</span>;
        diffText = `${diffPercent}%`;
    }

    return (
        <div className="bg-[#fcfcfc] border border-transparent hover:border-[#1c1c1c] rounded-[7px] p-[15px_16px] cursor-pointer group transition-all" style={{ width }}>
            <div className="flex flex-wrap items-baseline gap-1 mb-1">
                <span className="text-[15px] font-semibold text-[#595959] tracking-[-0.3px]">{label}</span>
                
                <span className={`text-[14px] font-bold flex items-center ml-1 ${colorClass}`}>
                    {icon}{diffText}
                </span>
                
                <div className="ml-auto text-right">
                    <strong className="text-[24px] font-bold text-[#1c1c1c] leading-none tracking-[-0.5px]">{value.toLocaleString()}</strong>
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
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-[30px_20px_24px] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col h-full relative">
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
        <div className="flex items-center text-[13px] text-[#6f7173] tracking-[-0.3px]">
            <span className="w-[12px] h-[3px] bg-[#cbd0da] mr-[6px] rounded-full"></span> 지난 주
        </div>
        <div className="flex items-center text-[13px] text-[#6f7173] tracking-[-0.3px]">
            <span className="w-[12px] h-[3px] bg-[#00de95] mr-[6px] rounded-full"></span> 이번 주
        </div>
    </div>
);

const InflowRow = ({ rank, name, value, total }: any) => {
    // Relative to the top item's value
    const percent = Math.round((value / total) * 100); 
    
    return (
        <div className="relative flex items-center h-[52px] border-t border-[#f2f2f2] last:border-b text-[16px] text-[#232323]">
            {/* Background Bar */}
            <div 
                className={`absolute top-0 bottom-0 left-0 z-0 ${rank === 1 ? 'bg-[#e0f0e9]' : 'bg-[#fff]'}`} 
                style={{ width: `${percent}%` }}
            ></div>
            
            <div className="relative z-10 flex items-center w-full px-4">
                <span className="w-[18px] font-semibold text-center mr-[17px] tracking-[-0.4px]">{rank}</span>
                <span className={`flex-1 truncate tracking-[-0.4px] ${rank === 1 ? 'font-bold' : ''}`}>{name}</span>
                <span className="font-bold mr-2 tracking-[-0.4px]">{value}회</span>
            </div>
            
            {rank !== 1 && (
                 <div className="absolute top-0 bottom-0 left-0 z-0 bg-[#e8ebee] opacity-40" style={{ width: `${percent}%` }}></div>
            )}
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