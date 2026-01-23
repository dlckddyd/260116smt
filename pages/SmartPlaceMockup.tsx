import React, { useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Settings, Download, X, HelpCircle, ChevronUp, ChevronDown, RefreshCw, MoreHorizontal, Home, Calendar, MessageSquare, BarChart2, Store } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const SmartPlaceMockup: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showEditor, setShowEditor] = useState(true);

  // --- State for Editable Data ---
  const [config, setConfig] = useState({
    storeName: "스마트마케팅 플레이스", // Added Store Name
    dateRange: "25. 12. 22. 월 - 12. 28. 일",
    // Top Summary
    visitCount: 12222,
    visitPrev: 700,
    reservationCount: 7,
    reservationPrev: 13,
    callCount: 2,
    callPrev: 8,
    reviewCount: 9,
    reviewPrev: 9,
    
    // Chart 1: Reviews
    chartReviewTotal: 0,
    chartReviewPrev: 0, // Decrease % calc
    chartReviewDataCurrent: [0, 0, 0, 0, 0, 0, 0],
    chartReviewDataPrev: [1, 0, 2, 0, 1, 0, 0],

    // Chart 2: Place Visits
    chartVisitTotal: 304,
    chartVisitPrevTotal: 390,
    chartVisitDataCurrent: [40, 65, 45, 35, 55, 38, 36],
    chartVisitDataPrev: [50, 40, 60, 55, 70, 45, 50],

    // Chart 3: Smart Call
    chartCallTotal: 2,
    chartCallPrevTotal: 8,
    chartCallDataCurrent: [0, 2, 0, 0, 0, 0, 0],
    chartCallDataPrev: [1, 2, 1, 0, 2, 1, 1],
    
    // Chart 4: Inflow Channels (Rankings)
    inflow1Name: "네이버지도", inflow1Count: 188,
    inflow2Name: "네이버검색", inflow2Count: 108,
    inflow3Name: "네이버 블로그", inflow3Count: 5,
    inflow4Name: "웹사이트", inflow4Count: 3,
    targetKeyword: "종로마사지",

    // Chart 5: Reservation/Order (Count)
    chartResCountTotal: 7,
    chartResCountPrevTotal: 13,
    chartResCountDataCurrent: [0, 3, 1, 0, 0, 1, 2],
    chartResCountDataPrev: [2, 1, 4, 3, 2, 0, 1],

    // Chart 6: Revenue
    chartRevenueTotal: 600000,
    chartRevenuePrevTotal: 940000,
    chartRevenueDataCurrent: [180000, 120000, 240000, 0, 0, 0, 60000],
    chartRevenueDataPrev: [200000, 150000, 180000, 220000, 100000, 50000, 40000],
  });

  // --- Handlers ---
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
            width: 1280, // Fixed width for sidebar + content
            windowWidth: 1280
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "smartplace_stats.png";
        link.click();
    }
  };

  // --- Calculations for Display ---
  const calcPercent = (curr: number, prev: number) => {
      if (prev === 0) return { val: 0, text: '-', isUp: false, isZero: true };
      const diff = curr - prev;
      const percent = Math.round(Math.abs(diff) / prev * 100);
      return { 
          val: percent, 
          text: `${percent}% ${diff >= 0 ? '증가' : '감소'}`, 
          isUp: diff >= 0,
          isZero: false
      };
  };

  const formatCurrency = (val: number) => val.toLocaleString();

  // --- Chart Config Generators ---
  const lineOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false } 
    },
    scales: {
        x: { 
            grid: { display: false, drawBorder: false },
            ticks: { display: true, color: '#999', font: { size: 10 }, padding: 5 },
            border: { display: false }
        },
        y: { 
            display: true, 
            grid: { color: '#f0f0f0', drawBorder: false },
            ticks: { display: true, count: 5, color: '#ccc', font: {size: 10} },
            border: { display: false }
        }
    },
    elements: {
        point: { radius: 0, hitRadius: 10 },
        line: { tension: 0.4, borderWidth: 2 }
    },
    layout: { padding: 0 }
  };

  const createLineData = (currentData: number[], prevData: number[]) => ({
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      datasets: [
          {
              label: '이번주',
              data: currentData,
              borderColor: '#00de95', // Naver Green
              backgroundColor: 'transparent',
              order: 1
          },
          {
              label: '지난주',
              data: prevData,
              borderColor: '#cbd0da', // Light Gray
              backgroundColor: 'transparent',
              order: 2,
              borderDash: [0, 0]
          }
      ]
  });
  
  const doughnutData = {
      labels: ['안마(50%)', '포유마사지안마원(50%)'],
      datasets: [{
          data: [50, 50],
          backgroundColor: ['#e4e4e4', '#d1d1d1'],
          borderWidth: 0,
          cutout: '70%'
      }]
  };

  return (
    <div className="min-h-screen bg-[#eef0f3] flex">
      
      {/* --- Main Preview Area --- */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center">
        {/* Capture Container: Sidebar + Content */}
        <div 
            ref={captureRef}
            id="smartplace-preview"
            className="flex w-[1280px] bg-[#f4f6f8] min-h-screen relative font-sans text-[#1c1c1c] overflow-hidden"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', sans-serif" }}
        >
            {/* Left Sidebar (LNB) */}
            <div className="w-[220px] bg-white border-r border-[#d3d5d7] flex flex-col flex-shrink-0 z-20">
                {/* Store Name Dropdown Mockup */}
                <div className="h-[60px] flex items-center justify-between px-5 border-b border-[#e2e5e8]">
                    <span className="font-bold text-[#333] truncate max-w-[150px]" title={config.storeName}>{config.storeName}</span>
                    <ChevronDown className="w-4 h-4 text-[#999]" />
                </div>
                
                {/* Menu Items */}
                <div className="flex-1 py-4 overflow-y-auto">
                    <div className="px-5 py-2.5 flex items-center gap-3 text-[#333] font-bold text-[15px] hover:bg-[#f4f6f8] cursor-pointer">
                        <Home className="w-5 h-5 text-[#333]" />
                        <span>홈</span>
                    </div>
                    <div className="px-5 py-2.5 flex items-center gap-3 text-[#333] font-bold text-[15px] hover:bg-[#f4f6f8] cursor-pointer">
                        <Calendar className="w-5 h-5 text-[#333]" />
                        <span>예약·주문</span>
                    </div>
                    <div className="px-5 py-2.5 flex items-center gap-3 text-[#333] font-bold text-[15px] hover:bg-[#f4f6f8] cursor-pointer">
                        <MessageSquare className="w-5 h-5 text-[#333]" />
                        <span>리뷰</span>
                    </div>
                    {/* Active Menu */}
                    <div className="px-5 py-2.5 flex items-center gap-3 text-[#03aa5a] font-bold text-[15px] bg-[#e9fbf2] cursor-pointer relative">
                        <BarChart2 className="w-5 h-5 text-[#03aa5a]" />
                        <span>통계</span>
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#03aa5a]"></div>
                    </div>
                    <div className="pl-12 pr-5 py-2 text-[#666] text-[14px] hover:text-[#03aa5a] cursor-pointer">요약</div>
                    <div className="pl-12 pr-5 py-2 text-[#666] text-[14px] hover:text-[#03aa5a] cursor-pointer">보고서</div>
                    
                    <div className="px-5 py-2.5 flex items-center gap-3 text-[#333] font-bold text-[15px] hover:bg-[#f4f6f8] cursor-pointer mt-2">
                        <Store className="w-5 h-5 text-[#333]" />
                        <span>업체정보</span>
                    </div>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Top Global Nav (GNB) Mockup */}
                <div className="h-[60px] bg-white border-b border-[#d3d5d7] flex items-center justify-between px-8 flex-shrink-0">
                    <h1 className="text-[20px] font-bold text-[#333]">통계</h1>
                    <div className="flex items-center gap-4 text-xs text-[#888]">
                        <span className="flex items-center gap-1 cursor-pointer hover:text-[#333]">
                            <span className="w-6 h-6 bg-[#03aa5a] rounded-full text-white flex items-center justify-center font-bold">N</span>
                            <span className="font-bold text-[#333]">{config.storeName} 님</span>
                        </span>
                        <span>로그아웃</span>
                    </div>
                </div>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    
                    {/* Ad Banner Placeholder */}
                    <div className="w-full h-[80px] bg-[#f2f3f9] rounded-xl mb-[30px] flex items-center justify-center text-[#ccc] text-sm">
                        AD Banner Area
                    </div>

                    {/* Date Filter */}
                    <div className="flex justify-between items-center mb-[20px]">
                        <div className="flex gap-2">
                            <div className="bg-white border border-[#e5e5e5] rounded-lg px-4 py-2 text-[14px] flex items-center gap-2 min-w-[100px] text-[#333] cursor-pointer shadow-sm">
                                주간 <ChevronDown className="w-4 h-4 text-[#999]" />
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center bg-white border border-[#e5e5e5] rounded-xl px-5 py-2.5 gap-6 shadow-sm">
                                <ChevronDown className="rotate-90 w-4 h-4 text-[#999] cursor-pointer" />
                                <span className="font-bold text-[15px] text-[#333]">{config.dateRange}</span>
                                <ChevronDown className="-rotate-90 w-4 h-4 text-[#999] cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Top Summary Cards Container */}
                    <div className="space-y-4 mb-8">
                        {/* Before Visit */}
                        <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[19px] font-bold text-[#1e1e23] flex items-center gap-2">
                                    방문 전 지표 <span className="text-[#03aa5a]">3</span>
                                    <HelpCircle className="w-4 h-4 text-[#c9c9c9] cursor-pointer" />
                                </h3>
                                <button className="text-[#999] hover:text-[#333]"><ChevronUp className="w-5 h-5" /></button>
                            </div>
                            
                            {/* Improved Grid Layout for Metrics */}
                            <div className="flex divide-x divide-[#f0f0f0]">
                                <SummaryItem 
                                    label="플레이스 유입" 
                                    value={config.visitCount} 
                                    prev={config.visitPrev} 
                                />
                                <SummaryItem 
                                    label="예약·주문 신청" 
                                    value={config.reservationCount} 
                                    prev={config.reservationPrev} 
                                />
                                <SummaryItem 
                                    label="스마트콜 통화" 
                                    value={config.callCount} 
                                    prev={config.callPrev} 
                                />
                            </div>
                        </div>

                        {/* After Visit */}
                        <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[19px] font-bold text-[#1e1e23] flex items-center gap-2">
                                    방문 후 지표 <span className="text-[#03aa5a]">1</span>
                                    <HelpCircle className="w-4 h-4 text-[#c9c9c9] cursor-pointer" />
                                </h3>
                                <button className="text-[#999] hover:text-[#333]"><ChevronUp className="w-5 h-5" /></button>
                            </div>
                            <div className="flex">
                                <SummaryItem 
                                    label="리뷰 등록" 
                                    value={config.reviewCount} 
                                    prev={config.reviewPrev} 
                                    isLast 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid - Masonry-like Layout */}
                    <div className="flex gap-5 items-start">
                        {/* Left Column */}
                        <div className="flex-1 flex flex-col gap-5">
                            
                            {/* Card 1: Reviews */}
                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">리뷰</span>는 {formatCurrency(config.chartReviewTotal)}회,<br/>일 평균 {Math.round(config.chartReviewTotal/7)}회 입니다.</>
                                }
                                desc={`지난 기간 대비 리뷰 작성이 ${calcPercent(config.chartReviewTotal, config.chartReviewPrev).text} 했습니다.`}
                                percentData={calcPercent(config.chartReviewTotal, config.chartReviewPrev)}
                            >
                                <div className="h-[180px] w-full">
                                    <Line data={createLineData(config.chartReviewDataCurrent, config.chartReviewDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                                <div className="mt-4 text-center">
                                    <button className="border border-[#e5e5e5] rounded-full px-6 py-2.5 text-[14px] text-[#737373] bg-white flex items-center justify-center mx-auto gap-1 hover:bg-[#f9f9f9]">
                                        리뷰 통계 더보기 <span className="text-[#c9c9c9]">&gt;</span>
                                    </button>
                                </div>
                            </ChartCard>

                            {/* Card 3: Smart Call */}
                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">스마트콜 통화</span>는 {formatCurrency(config.chartCallTotal)}회,<br/>일 평균 {Math.round(config.chartCallTotal/7)}회 입니다.</>
                                }
                                desc={`지난 기간 대비 통화 수가 ${calcPercent(config.chartCallTotal, config.chartCallPrevTotal).text} 했습니다.`}
                                percentData={calcPercent(config.chartCallTotal, config.chartCallPrevTotal)}
                            >
                                <div className="h-[180px] w-full mb-6">
                                    <Line data={createLineData(config.chartCallDataCurrent, config.chartCallDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                                
                                <div className="mt-6 border-t border-[#f0f0f0] pt-6">
                                    <h4 className="text-[15px] text-[#737373] mb-4">전화 많이 온 키워드</h4>
                                    <div className="h-[200px] flex items-center justify-center relative">
                                        <div className="w-[160px]">
                                            <Doughnut data={doughnutData} options={{ cutout: '70%', plugins: { legend: { display: false } } }} />
                                        </div>
                                        <div className="absolute flex gap-4 bottom-0 text-[11px] text-[#8c8c8c]">
                                            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e4e4e4]"></span>안마(50%)</div>
                                            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#d1d1d1]"></span>상호명(50%)</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 text-center">
                                    <button className="border border-[#e5e5e5] rounded-full px-6 py-2.5 text-[14px] text-[#737373] bg-white flex items-center justify-center mx-auto gap-1 hover:bg-[#f9f9f9]">
                                        스마트콜 통계 더보기 <span className="text-[#c9c9c9]">&gt;</span>
                                    </button>
                                </div>
                            </ChartCard>

                            {/* Card 5: Revenue */}
                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">예약·주문 매출액</span>은 {formatCurrency(config.chartRevenueTotal)}원,<br/>일 평균 {formatCurrency(Math.round(config.chartRevenueTotal/7))}원 입니다.</>
                                }
                                desc={`지난 기간 대비 매출액이 ${calcPercent(config.chartRevenueTotal, config.chartRevenuePrevTotal).text} 했습니다.`}
                                percentData={calcPercent(config.chartRevenueTotal, config.chartRevenuePrevTotal)}
                            >
                                <div className="text-right text-xs text-[#737373] mb-2">단위:원</div>
                                <div className="h-[180px] w-full">
                                    <Line data={createLineData(config.chartRevenueDataCurrent, config.chartRevenueDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                                <div className="mt-4 text-center">
                                    <button className="border border-[#e5e5e5] rounded-full px-6 py-2.5 text-[14px] text-[#737373] bg-white flex items-center justify-center mx-auto gap-1 hover:bg-[#f9f9f9]">
                                        예약·주문 통계 더보기 <span className="text-[#c9c9c9]">&gt;</span>
                                    </button>
                                </div>
                            </ChartCard>

                        </div>

                        {/* Right Column */}
                        <div className="flex-1 flex flex-col gap-5">
                            
                            {/* Card 2: Place Visits */}
                            <ChartCard 
                                title={
                                    <>한 주간 <span className="text-[#03aa5a]">플레이스 유입</span>은 {formatCurrency(config.chartVisitTotal)}회,<br/>일 평균 {Math.round(config.chartVisitTotal/7)}회 입니다.</>
                                }
                                desc={`지난 기간 대비 유입 수가 ${calcPercent(config.chartVisitTotal, config.chartVisitPrevTotal).text} 했습니다.`}
                                percentData={calcPercent(config.chartVisitTotal, config.chartVisitPrevTotal)}
                            >
                                <div className="h-[180px] w-full">
                                    <Line data={createLineData(config.chartVisitDataCurrent, config.chartVisitDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                            </ChartCard>

                            {/* Card 4: Inflow Channels (Rankings) */}
                            <div className="bg-white border border-[#e5e5e5] rounded-xl p-0 overflow-hidden shadow-sm">
                                <div className="p-8 pb-5 border-b border-[#f0f0f0]">
                                    <h3 className="text-[20px] font-bold leading-snug mb-2">
                                        <span className="text-[#03aa5a]">네이버지도</span>에서 많이 방문했고,<br/>
                                        <span className="text-[#03aa5a]">{config.targetKeyword}</span> 키워드를 주로 검색했어요.
                                    </h3>
                                    <p className="text-[14px] text-[#737373]">
                                        플레이스 방문 기준입니다. <HelpCircle className="w-3 h-3 inline text-[#c9c9c9] align-top" />
                                    </p>
                                </div>
                                <div className="flex border-b border-[#f0f0f0]">
                                    <button className="flex-1 py-3 text-[15px] font-bold text-white bg-[#424242]">유입채널</button>
                                    <button className="flex-1 py-3 text-[15px] text-[#424242] bg-white">유입키워드</button>
                                </div>
                                <div className="p-0">
                                    <ul className="flex flex-col">
                                        <InflowItem rank={1} name={config.inflow1Name} count={config.inflow1Count} total={config.chartVisitTotal} />
                                        <InflowItem rank={2} name={config.inflow2Name} count={config.inflow2Count} total={config.chartVisitTotal} />
                                        <InflowItem rank={3} name={config.inflow3Name} count={config.inflow3Count} total={config.chartVisitTotal} />
                                        <InflowItem rank={4} name={config.inflow4Name} count={config.inflow4Count} total={config.chartVisitTotal} />
                                    </ul>
                                </div>
                                <div className="py-6 text-center">
                                    <button className="border border-[#e5e5e5] rounded-full px-6 py-2.5 text-[14px] text-[#737373] bg-white flex items-center justify-center mx-auto gap-1 hover:bg-[#f9f9f9]">
                                        유입 더보기 <span className="text-[#c9c9c9]">&gt;</span>
                                    </button>
                                </div>
                            </div>

                            {/* Card 6: Reservation Count */}
                            <div className="relative">
                                <div className="absolute top-0 right-0 transform -translate-y-full -translate-x-full mb-2 mr-2">
                                    <div className="bg-[#03aa5a] text-white text-xs px-2 py-1 rounded-full animate-bounce">
                                        ?
                                    </div>
                                </div>
                                <ChartCard 
                                    title={
                                        <>한 주간 <span className="text-[#03aa5a]">예약·주문 신청</span>은 {config.chartResCountTotal}회,<br/>일 평균 {Math.round(config.chartResCountTotal/7)}회 입니다.</>
                                    }
                                    desc={`지난 기간 대비 신청이 ${calcPercent(config.chartResCountTotal, config.chartResCountPrevTotal).text} 했습니다.`}
                                    percentData={calcPercent(config.chartResCountTotal, config.chartResCountPrevTotal)}
                                >
                                    <div className="h-[180px] w-full">
                                        <Line data={createLineData(config.chartResCountDataCurrent, config.chartResCountDataPrev)} options={lineOptions} />
                                    </div>
                                    <StatsLegend />
                                </ChartCard>
                            </div>
                        </div>
                    </div>

                    {/* Floating Help Button */}
                    <div className="fixed bottom-10 right-10 z-50">
                        <div className="bg-[#03aa5a] w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xl cursor-pointer">
                            ?
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- Editor Panel (Right Side) --- */}
      {showEditor && (
          <div className="w-[350px] bg-white border-l border-[#e5e5e5] h-screen overflow-y-auto p-5 fixed right-0 top-0 shadow-xl z-50">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Settings className="w-5 h-5"/> 데이터 편집기</h2>
                  <button onClick={() => setShowEditor(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>

              <div className="space-y-6">
                  <Section title="기본 정보">
                      <Input name="storeName" label="업체명 (좌측 사이드바)" value={config.storeName} onChange={handleChange} />
                      <Input name="dateRange" label="날짜 범위" value={config.dateRange} onChange={handleChange} />
                  </Section>

                  <Section title="상단 요약 (방문 전/후)">
                      <div className="grid grid-cols-2 gap-2">
                          <Input name="visitCount" label="플레이스 유입" type="number" value={config.visitCount} onChange={handleChange} />
                          <Input name="visitPrev" label="지난 기간" type="number" value={config.visitPrev} onChange={handleChange} />
                          <Input name="reservationCount" label="예약/주문" type="number" value={config.reservationCount} onChange={handleChange} />
                          <Input name="reservationPrev" label="지난 기간" type="number" value={config.reservationPrev} onChange={handleChange} />
                          <Input name="callCount" label="스마트콜" type="number" value={config.callCount} onChange={handleChange} />
                          <Input name="callPrev" label="지난 기간" type="number" value={config.callPrev} onChange={handleChange} />
                          <Input name="reviewCount" label="리뷰 등록" type="number" value={config.reviewCount} onChange={handleChange} />
                          <Input name="reviewPrev" label="지난 기간" type="number" value={config.reviewPrev} onChange={handleChange} />
                      </div>
                  </Section>

                  <Section title="차트 1: 리뷰">
                      <Input name="chartReviewTotal" label="총 리뷰수" type="number" value={config.chartReviewTotal} onChange={handleChange} />
                      <Input name="chartReviewPrev" label="지난주 리뷰수" type="number" value={config.chartReviewPrev} onChange={handleChange} />
                      <ArrayInput label="이번주 데이터 (월~일)" values={config.chartReviewDataCurrent} onChange={(e, i) => handleArrayChange(e, 'chartReviewDataCurrent', i)} />
                      <ArrayInput label="지난주 데이터 (월~일)" values={config.chartReviewDataPrev} onChange={(e, i) => handleArrayChange(e, 'chartReviewDataPrev', i)} />
                  </Section>

                  <Section title="차트 2: 플레이스 유입">
                      <Input name="chartVisitTotal" label="총 유입수" type="number" value={config.chartVisitTotal} onChange={handleChange} />
                      <Input name="chartVisitPrevTotal" label="지난주 유입수" type="number" value={config.chartVisitPrevTotal} onChange={handleChange} />
                      <ArrayInput label="이번주 데이터" values={config.chartVisitDataCurrent} onChange={(e, i) => handleArrayChange(e, 'chartVisitDataCurrent', i)} />
                      <ArrayInput label="지난주 데이터" values={config.chartVisitDataPrev} onChange={(e, i) => handleArrayChange(e, 'chartVisitDataPrev', i)} />
                  </Section>

                  <Section title="차트 3: 스마트콜">
                      <Input name="chartCallTotal" label="총 통화수" type="number" value={config.chartCallTotal} onChange={handleChange} />
                      <Input name="chartCallPrevTotal" label="지난주 통화수" type="number" value={config.chartCallPrevTotal} onChange={handleChange} />
                      <ArrayInput label="이번주 데이터" values={config.chartCallDataCurrent} onChange={(e, i) => handleArrayChange(e, 'chartCallDataCurrent', i)} />
                  </Section>

                  <Section title="차트 4: 유입 채널">
                      <Input name="targetKeyword" label="메인 검색 키워드" value={config.targetKeyword} onChange={handleChange} />
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input name="inflow1Name" label="1위 채널명" value={config.inflow1Name} onChange={handleChange} />
                        <Input name="inflow1Count" label="수치" type="number" value={config.inflow1Count} onChange={handleChange} />
                        <Input name="inflow2Name" label="2위 채널명" value={config.inflow2Name} onChange={handleChange} />
                        <Input name="inflow2Count" label="수치" type="number" value={config.inflow2Count} onChange={handleChange} />
                        <Input name="inflow3Name" label="3위 채널명" value={config.inflow3Name} onChange={handleChange} />
                        <Input name="inflow3Count" label="수치" type="number" value={config.inflow3Count} onChange={handleChange} />
                        <Input name="inflow4Name" label="4위 채널명" value={config.inflow4Name} onChange={handleChange} />
                        <Input name="inflow4Count" label="수치" type="number" value={config.inflow4Count} onChange={handleChange} />
                      </div>
                  </Section>
                  
                  <Section title="차트 5: 예약/주문 건수">
                      <Input name="chartResCountTotal" label="총 건수" type="number" value={config.chartResCountTotal} onChange={handleChange} />
                      <Input name="chartResCountPrevTotal" label="지난주 건수" type="number" value={config.chartResCountPrevTotal} onChange={handleChange} />
                      <ArrayInput label="이번주 데이터" values={config.chartResCountDataCurrent} onChange={(e, i) => handleArrayChange(e, 'chartResCountDataCurrent', i)} />
                      <ArrayInput label="지난주 데이터" values={config.chartResCountDataPrev} onChange={(e, i) => handleArrayChange(e, 'chartResCountDataPrev', i)} />
                  </Section>

                  <Section title="차트 6: 매출액">
                      <Input name="chartRevenueTotal" label="총 매출" type="number" value={config.chartRevenueTotal} onChange={handleChange} />
                      <Input name="chartRevenuePrevTotal" label="지난주 매출" type="number" value={config.chartRevenuePrevTotal} onChange={handleChange} />
                      <ArrayInput label="이번주 데이터" values={config.chartRevenueDataCurrent} onChange={(e, i) => handleArrayChange(e, 'chartRevenueDataCurrent', i)} />
                      <ArrayInput label="지난주 데이터" values={config.chartRevenueDataPrev} onChange={(e, i) => handleArrayChange(e, 'chartRevenueDataPrev', i)} />
                  </Section>
              </div>
              
              <div className="sticky bottom-0 bg-white pt-4 pb-0 mt-4 border-t border-gray-100">
                  <button 
                      onClick={handleCapture}
                      className="w-full bg-[#03aa5a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#02964e] transition-colors shadow-lg"
                  >
                      <Download className="w-5 h-5" /> 이미지 저장하기
                  </button>
              </div>
          </div>
      )}

      {!showEditor && (
        <button 
            onClick={() => setShowEditor(true)}
            className="fixed top-20 right-5 bg-white p-3 rounded-full shadow-lg border border-gray-200 z-50 hover:bg-gray-50"
        >
            <Settings className="w-6 h-6 text-gray-600" />
        </button>
      )}

    </div>
  );
};

// --- Components ---

const SummaryItem = ({ label, value, prev, isLast = false }: any) => {
    const diff = value - prev;
    const isDown = diff < 0;
    const percent = prev === 0 ? 0 : Math.round(Math.abs(diff) / prev * 100);

    // Layout based on specific request: 
    // Top Row: [Label] [Percent]
    // Bottom Row: [Prev] [Current Value]
    return (
        <div className={`flex-1 flex flex-col justify-between h-[84px] px-6 ${!isLast ? 'border-r border-[#f0f0f0]' : ''}`}>
            {/* Top Row: Label and Percent */}
            <div className="flex justify-between items-start mb-1">
                <span className="text-[15px] font-bold text-[#424242] tracking-tight">{label}</span>
                {prev !== 0 ? (
                     <span className={`text-[13px] font-bold ${isDown ? 'text-[#2485fe]' : 'text-[#f03e3e]'}`}>
                         {isDown ? 'down' : 'up'} <span className="blind">{isDown ? '▼' : '▲'}</span> {percent}%
                     </span>
                ) : (
                    <span className="text-[13px] text-[#ccc]">-</span>
                )}
            </div>
            
            {/* Bottom Row: Prev count and Current Value */}
            <div className="flex justify-between items-end mt-auto">
                <span className="text-[13px] text-[#929294] tracking-tight">지난 기간 {prev.toLocaleString()}회</span>
                <strong className="text-[24px] font-bold text-[#1e1e23] leading-none">
                    {value.toLocaleString()}<span className="text-[15px] font-normal ml-0.5">회</span>
                </strong>
            </div>
        </div>
    );
};

const ChartCard = ({ title, desc, children, percentData }: any) => {
    return (
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-8 shadow-sm">
            <div className="mb-6">
                <h3 className="text-[20px] font-bold leading-snug mb-2 text-[#1c1c1c]">
                    {title}
                </h3>
                <div className="relative inline-block">
                    <p className="text-[14px] text-[#737373]">
                        {desc.split(percentData.text).map((part: string, i: number) => (
                            <React.Fragment key={i}>
                                {i === 1 ? <strong className={percentData.isUp ? 'text-[#fc4c4e]' : 'text-[#2485fe]'}>{percentData.text}</strong> : ''}
                                {part}
                            </React.Fragment>
                        ))}
                         {!percentData.isZero && (
                             <>
                                {percentData.isUp ? 
                                    <strong className="text-[#fc4c4e]"> {percentData.val}% 증가</strong> : 
                                    <strong className="text-[#2485fe]"> -{percentData.val}% 감소</strong>
                                }
                             </>
                         )}
                         {percentData.isZero && <strong>변동 없음</strong>}
                         <span> 했습니다.</span>
                    </p>
                </div>
            </div>
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

const StatsLegend = () => (
    <div className="flex justify-center gap-4 mt-4 text-[13px] text-[#6f7173]">
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 bg-[#cbd0da] rounded-full"></div>
            12월 3주차
        </div>
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 bg-[#00de95] rounded-full"></div>
            12월 4주차
        </div>
    </div>
);

const InflowItem = ({ rank, name, count, total }: any) => {
    const percent = ((count / total) * 100).toFixed(2);
    return (
        <li className="flex items-center h-[52px] border-b border-[rgba(232,235,238,0.7)] relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 bg-[rgba(232,235,238,0.4)] z-0" style={{ width: `${percent}%` }}></div>
            <span className="relative z-10 w-[50px] text-center text-[18px] font-bold text-[#1c1c1c]">{rank}</span>
            <span className={`relative z-10 flex-1 font-bold text-[16px] truncate ${rank === 1 ? 'text-[#03aa5a]' : 'text-[#232324]'}`}>{name}</span>
            <span className="relative z-10 font-bold text-[14px] text-[#636566] mr-4">{count}회</span>
        </li>
    );
};

// --- Editor Components ---

const Section = ({ title, children }: any) => (
    <div className="mb-6 border-b border-gray-100 pb-6">
        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">{title}</h3>
        {children}
    </div>
);

const Input = ({ label, ...props }: any) => (
    <div className="mb-3">
        <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
        <input className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:border-blue-500 outline-none" {...props} />
    </div>
);

const ArrayInput = ({ label, values, onChange }: any) => (
    <div className="mb-4">
        <label className="block text-xs font-bold text-gray-500 mb-2">{label}</label>
        <div className="flex gap-1">
            {values.map((val: number, i: number) => (
                <input 
                    key={i} 
                    type="number" 
                    value={val} 
                    onChange={(e) => onChange(e, i)}
                    className="w-full border border-gray-300 rounded px-1 py-1 text-xs text-center focus:border-blue-500 outline-none" 
                />
            ))}
        </div>
    </div>
);

export default SmartPlaceMockup;