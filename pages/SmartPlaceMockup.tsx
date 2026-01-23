import React, { useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Settings, Download, X, HelpCircle, ChevronUp, ChevronDown, ChevronRight, Home, Calendar, MessageSquare, BarChart2, Store, CreditCard, Monitor, User } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const SmartPlaceMockup: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showEditor, setShowEditor] = useState(true);

  // --- State for Editable Data ---
  const [config, setConfig] = useState({
    storeName: "포유마사지안마원",
    userName: "유경짱",
    dateRange: "25. 12. 22. 월 - 12. 28. 일",
    
    // 1. 방문 전 지표 (Before Visit)
    visitCount: 304,
    visitPrev: 390,
    
    reservationCount: 7,
    reservationPrev: 13,
    
    callCount: 2,
    callPrev: 8,

    // 2. 방문 후 지표 (After Visit)
    reviewCount: 9,
    reviewPrev: 9,
    
    // Chart 1: Reviews
    chartReviewTotal: 0,
    chartReviewPrev: 1, // To show -100% decrease if current is 0
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

    // Chart 4: Reservation Count (Chart 5 in logic, visual placement varies)
    chartResCountTotal: 7,
    chartResCountPrevTotal: 13,
    chartResCountDataCurrent: [1, 1, 1, 0, 2, 1, 1],
    chartResCountDataPrev: [2, 2, 2, 2, 2, 1, 2],

    // Chart 5: Revenue (Reservation/Order)
    chartRevenueTotal: 600000,
    chartRevenuePrevTotal: 940000,
    chartRevenueDataCurrent: [180000, 120000, 240000, 0, 0, 0, 60000],
    chartRevenueDataPrev: [200000, 150000, 180000, 220000, 100000, 50000, 40000],
    
    // Inflow Rankings
    inflow1Name: "네이버지도", inflow1Count: 188,
    inflow2Name: "네이버검색", inflow2Count: 108,
    inflow3Name: "네이버 블로그", inflow3Count: 5,
    inflow4Name: "웹사이트", inflow4Count: 3,
    targetKeyword: "종로마사지",
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
            width: 1480, // Wide enough to capture sidebar + content
            windowWidth: 1480,
            x: 0,
            y: 0
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
      if (prev === 0) {
          if (curr === 0) return { val: 0, text: '-', isUp: false, isZero: true };
          return { val: 100, text: '100% 증가', isUp: true, isZero: false }; // Assuming 0 -> positive is 100%
      }
      const diff = curr - prev;
      const percent = Math.round(Math.abs(diff) / prev * 100);
      
      if (diff === 0) return { val: 0, text: '-', isUp: false, isZero: true };

      return { 
          val: percent, 
          text: `${percent}%`, 
          isUp: diff > 0,
          isZero: false
      };
  };

  const formatCurrency = (val: number) => val.toLocaleString();

  // --- Chart Config ---
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
            ticks: { display: true, color: '#999', font: { size: 11, family: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" }, padding: 8 },
            border: { display: false }
        },
        y: { 
            display: true, 
            grid: { color: '#f0f0f0', drawBorder: false, tickLength: 0 },
            ticks: { display: true, count: 5, color: '#ccc', font: {size: 10}, padding: 10 },
            border: { display: false }
        }
    },
    elements: {
        point: { radius: 0, hitRadius: 10 },
        line: { tension: 0.4, borderWidth: 2 }
    },
    layout: { padding: { left: 0, right: 0, top: 10, bottom: 0 } }
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
          cutout: '65%'
      }]
  };

  return (
    <div className="min-h-screen bg-[#eef0f3] flex font-sans">
      
      {/* --- Main Capture Area --- */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center">
        <div 
            ref={captureRef}
            id="smartplace-preview"
            className="flex w-[1480px] bg-[#f0f2f5] min-h-screen relative text-[#1c1c1c]"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', sans-serif" }}
        >
            {/* 1. Left Sidebar (LNB) */}
            <div className="w-[220px] bg-white border-r border-[#d3d5d7] flex flex-col flex-shrink-0 z-20 sticky top-0 h-screen">
                {/* Store Name */}
                <div className="h-[64px] flex items-center justify-between px-5 border-b border-[#e2e5e8]">
                    <div className="flex items-center gap-2 overflow-hidden">
                        {/* Profile Image Placeholder */}
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                           <img src="https://via.placeholder.com/24" alt="Profile" className="w-full h-full object-cover opacity-50"/>
                        </div>
                        <span className="font-bold text-[#333] truncate text-[15px]">{config.storeName}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#999]" />
                </div>
                
                {/* Menu List */}
                <div className="flex-1 py-3 overflow-y-auto">
                    <MenuItem icon={Home} label="홈" />
                    <MenuItem icon={Store} label="업체정보" />
                    <MenuItem icon={Calendar} label="예약·주문" />
                    <MenuItem icon={CreditCard} label="스마트콜" />
                    <MenuItem icon={BarChart2} label="마케팅" />
                    <MenuItem icon={MessageSquare} label="리뷰" />
                    <MenuItem icon={User} label="고객" />
                    <MenuItem icon={BarChart2} label="통계" active />
                    <MenuItem icon={Monitor} label="비즈니스 스쿨" />
                </div>

                <div className="px-5 py-4 border-t border-[#f0f0f0]">
                    <span className="text-[13px] font-bold text-[#333]">문의 채널</span>
                </div>
            </div>

            {/* 2. Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Global Nav (GNB) */}
                <div className="h-[64px] bg-white border-b border-[#d3d5d7] flex items-center justify-between px-8 flex-shrink-0 sticky top-0 z-10">
                   <div className="flex items-center gap-8 h-full">
                       {/* GNB Tabs */}
                       <div className="flex h-full">
                           <GnbTab label="리포트" active />
                           <GnbTab label="플레이스" />
                           <GnbTab label="스마트콜" />
                           <GnbTab label="예약·주문" />
                           <GnbTab label="리뷰" />
                       </div>
                   </div>
                   
                   <div className="flex items-center gap-3 text-[13px] text-[#666]">
                       <span className="text-[#03aa5a] font-bold">{config.userName} 님</span>
                       <span className="w-[1px] h-3 bg-[#e2e5e8]"></span>
                       <span>로그아웃</span>
                   </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 p-8 max-w-[1100px] mx-auto w-full">
                    
                    {/* AD Banner */}
                    <div className="w-full h-[80px] bg-[#f2f3f9] rounded-xl mb-8 flex items-center justify-center border border-[#e8eaf0] overflow-hidden relative group cursor-pointer">
                        <span className="text-[#aeb1b9] text-sm font-medium group-hover:hidden">AD Banner Area</span>
                        <div className="absolute right-3 top-2 text-[10px] text-[#ccc] border border-[#ccc] px-1 rounded-sm">AD</div>
                    </div>

                    {/* Date Picker */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2">
                             <div className="bg-white border border-[#e5e5e5] rounded-lg px-4 py-2 text-[14px] font-bold text-[#333] flex items-center gap-2 cursor-pointer hover:bg-gray-50 shadow-sm">
                                주간 <ChevronDown className="w-4 h-4 text-[#999]" />
                             </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center bg-white border border-[#e5e5e5] rounded-xl pl-4 pr-4 py-2.5 shadow-sm hover:border-[#d0d0d0] transition-colors">
                                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-[#999]"><ChevronDown className="rotate-90 w-4 h-4" /></button>
                                <span className="font-bold text-[16px] text-[#333] mx-4">{config.dateRange}</span>
                                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-[#999]"><ChevronDown className="-rotate-90 w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="w-[100px]"></div>
                    </div>

                    {/* --- Summary Section (Before Visit) --- */}
                    <div className="bg-white border border-[#e5e5e5] rounded-xl mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
                        <div className="px-6 py-5 flex justify-between items-center border-b border-[#f4f6f8]">
                             <h3 className="text-[19px] font-bold text-[#1e1e23] flex items-center gap-2">
                                방문 전 지표 <span className="text-[#03aa5a]">3</span>
                                <HelpCircle className="w-[18px] h-[18px] text-[#c9c9c9] cursor-pointer" />
                             </h3>
                             <button><ChevronUp className="w-5 h-5 text-[#333]" /></button>
                        </div>
                        
                        <div className="flex divide-x divide-[#f4f6f8] py-2">
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

                    {/* --- Summary Section (After Visit) --- */}
                    <div className="bg-white border border-[#e5e5e5] rounded-xl mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
                         <div className="px-6 py-5 flex justify-between items-center border-b border-[#f4f6f8]">
                             <h3 className="text-[19px] font-bold text-[#1e1e23] flex items-center gap-2">
                                방문 후 지표 <span className="text-[#03aa5a]">1</span>
                                <HelpCircle className="w-[18px] h-[18px] text-[#c9c9c9] cursor-pointer" />
                             </h3>
                             <button><ChevronUp className="w-5 h-5 text-[#333]" /></button>
                        </div>
                        <div className="flex py-2">
                             <SummaryItem 
                                label="리뷰 등록"
                                value={config.reviewCount}
                                prev={config.reviewPrev}
                                isLast={true}
                             />
                        </div>
                    </div>

                    {/* --- Charts Grid --- */}
                    <div className="flex gap-5 items-start">
                        {/* Left Column */}
                        <div className="flex-1 flex flex-col gap-5">
                            
                            {/* 1. Review Chart */}
                            <ChartCard 
                                title={<span>한 주간 <span className="text-[#03aa5a]">리뷰</span>는 {formatCurrency(config.chartReviewTotal)}회,<br/>일 평균 {Math.round(config.chartReviewTotal/7)}회 입니다.</span>}
                                prevText="지난 기간 대비 리뷰 작성이"
                                percentData={calcPercent(config.chartReviewTotal, config.chartReviewPrev)}
                                buttonText="리뷰 통계 더보기"
                            >
                                <div className="h-[150px] w-full mt-4">
                                    <Line data={createLineData(config.chartReviewDataCurrent, config.chartReviewDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                            </ChartCard>

                            {/* 2. Smart Call Chart */}
                             <ChartCard 
                                title={<span>한 주간 <span className="text-[#03aa5a]">스마트콜 통화</span>는 {formatCurrency(config.chartCallTotal)}회,<br/>일 평균 {Math.round(config.chartCallTotal/7)}회 입니다.</span>}
                                prevText="지난 기간 대비 통화 수가"
                                percentData={calcPercent(config.chartCallTotal, config.chartCallPrevTotal)}
                                buttonText="스마트콜 통계 더보기"
                            >
                                <div className="h-[150px] w-full mt-4">
                                    <Line data={createLineData(config.chartCallDataCurrent, config.chartCallDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                                
                                <div className="mt-8">
                                    <h4 className="text-[15px] text-[#737373] mb-4">전화 많이 온 키워드</h4>
                                    <div className="h-[220px] flex items-center justify-center relative">
                                        <div className="w-[160px] h-[160px]">
                                            <Doughnut data={doughnutData} options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
                                        </div>
                                        <div className="absolute flex gap-4 bottom-0 text-[11px] text-[#8c8c8c]">
                                            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e4e4e4]"></span>안마(50%)</div>
                                            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#d1d1d1]"></span>포유마사지안마원(50%)</div>
                                        </div>
                                    </div>
                                </div>
                            </ChartCard>

                             {/* 3. Revenue Chart */}
                             <ChartCard 
                                title={<span>한 주간 <span className="text-[#03aa5a]">예약·주문 매출액</span>은 {formatCurrency(config.chartRevenueTotal)}원,<br/>일 평균 {formatCurrency(Math.round(config.chartRevenueTotal/7))}원 입니다.</span>}
                                prevText="지난 기간 대비 매출액이"
                                percentData={calcPercent(config.chartRevenueTotal, config.chartRevenuePrevTotal)}
                                buttonText="예약·주문 통계 더보기"
                            >
                                <div className="text-right text-[11px] text-[#737373] mt-2">단위:원</div>
                                <div className="h-[150px] w-full">
                                    <Line data={createLineData(config.chartRevenueDataCurrent, config.chartRevenueDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                            </ChartCard>

                        </div>

                        {/* Right Column */}
                        <div className="flex-1 flex flex-col gap-5">
                            
                            {/* 4. Place Visit Chart */}
                            <ChartCard 
                                title={<span>한 주간 <span className="text-[#03aa5a]">플레이스 유입</span>은 {formatCurrency(config.chartVisitTotal)}회,<br/>일 평균 {Math.round(config.chartVisitTotal/7)}회 입니다.</span>}
                                prevText="지난 기간 대비 유입 수가"
                                percentData={calcPercent(config.chartVisitTotal, config.chartVisitPrevTotal)}
                                buttonText=""
                            >
                                <div className="h-[150px] w-full mt-4">
                                    <Line data={createLineData(config.chartVisitDataCurrent, config.chartVisitDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                            </ChartCard>
                            
                            {/* 5. Inflow Channels */}
                            <div className="bg-white border border-[#e5e5e5] rounded-xl p-0 overflow-hidden shadow-sm relative">
                                 <div className="p-8 pb-6">
                                    <h3 className="text-[20px] font-bold leading-snug text-[#1c1c1c]">
                                        <span className="text-[#03aa5a]">네이버지도</span>에서 많이 방문했고,<br/>
                                        <span className="text-[#03aa5a]">{config.targetKeyword}</span> 키워드를 주로 검색했어요.
                                    </h3>
                                    <p className="text-[14px] text-[#737373] mt-2 flex items-center gap-1">
                                        플레이스 방문 기준입니다. <HelpCircle className="w-3 h-3 text-[#c9c9c9]" />
                                    </p>
                                </div>

                                <div className="flex border-b border-[#f0f0f0] px-6 gap-2">
                                    <button className="px-4 py-2 text-[15px] font-bold text-white bg-[#424242] rounded-full">유입채널</button>
                                    <button className="px-4 py-2 text-[15px] text-[#424242] bg-white border border-[#e5e5e5] rounded-full">유입키워드</button>
                                </div>

                                <div className="p-6">
                                    <ul className="flex flex-col">
                                        <InflowItem rank={1} name={config.inflow1Name} count={config.inflow1Count} total={config.chartVisitTotal} />
                                        <InflowItem rank={2} name={config.inflow2Name} count={config.inflow2Count} total={config.chartVisitTotal} />
                                        <InflowItem rank={3} name={config.inflow3Name} count={config.inflow3Count} total={config.chartVisitTotal} />
                                        <InflowItem rank={4} name={config.inflow4Name} count={config.inflow4Count} total={config.chartVisitTotal} />
                                    </ul>
                                </div>

                                <div className="text-center pb-8">
                                     <button className="border border-[#e5e5e5] rounded-full px-6 py-2.5 text-[14px] text-[#737373] bg-white inline-flex items-center justify-center gap-1 hover:bg-[#f9f9f9] transition-colors">
                                        유입 더보기 <ChevronRight className="w-4 h-4 text-[#c9c9c9]" />
                                    </button>
                                    <div className="mt-3">
                                         <span className="inline-block bg-[#03aa5a] text-white text-[12px] px-3 py-1.5 rounded-full font-bold shadow-lg">
                                            우리 가게를 검색한 고객이 궁금하다면?
                                         </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 6. Reservation Chart */}
                            <ChartCard 
                                title={<span>한 주간 <span className="text-[#03aa5a]">예약·주문 신청</span>은 {config.chartResCountTotal}회,<br/>일 평균 {Math.round(config.chartResCountTotal/7)}회 입니다.</span>}
                                prevText="지난 기간 대비 신청이"
                                percentData={calcPercent(config.chartResCountTotal, config.chartResCountPrevTotal)}
                                buttonText="예약·주문 통계 더보기"
                            >
                                <div className="h-[150px] w-full mt-4">
                                    <Line data={createLineData(config.chartResCountDataCurrent, config.chartResCountDataPrev)} options={lineOptions} />
                                </div>
                                <StatsLegend />
                            </ChartCard>

                        </div>
                    </div>

                    {/* Floating Help Button */}
                    <div className="fixed bottom-10 right-10 z-50">
                        <div className="bg-[#03aa5a] w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,170,90,0.3)] text-white font-bold text-xl cursor-pointer hover:scale-105 transition-transform">
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

              <div className="space-y-6 pb-20">
                  <Section title="기본 정보">
                      <Input name="storeName" label="업체명 (좌측 사이드바)" value={config.storeName} onChange={handleChange} />
                      <Input name="userName" label="사용자명" value={config.userName} onChange={handleChange} />
                      <Input name="dateRange" label="날짜 범위" value={config.dateRange} onChange={handleChange} />
                  </Section>

                  <Section title="상단 요약 1: 방문 전 지표">
                      <div className="grid grid-cols-2 gap-2">
                          <Input name="visitCount" label="플레이스 유입" type="number" value={config.visitCount} onChange={handleChange} />
                          <Input name="visitPrev" label="지난 기간" type="number" value={config.visitPrev} onChange={handleChange} />
                          <Input name="reservationCount" label="예약/주문" type="number" value={config.reservationCount} onChange={handleChange} />
                          <Input name="reservationPrev" label="지난 기간" type="number" value={config.reservationPrev} onChange={handleChange} />
                          <Input name="callCount" label="스마트콜" type="number" value={config.callCount} onChange={handleChange} />
                          <Input name="callPrev" label="지난 기간" type="number" value={config.callPrev} onChange={handleChange} />
                      </div>
                  </Section>

                  <Section title="상단 요약 2: 방문 후 지표">
                      <div className="grid grid-cols-2 gap-2">
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
                      <ArrayInput label="지난주 데이터" values={config.chartCallDataPrev} onChange={(e, i) => handleArrayChange(e, 'chartCallDataPrev', i)} />
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

// --- Sub Components ---

const MenuItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <div className={`px-5 py-2.5 flex items-center gap-3 font-bold text-[15px] cursor-pointer relative ${active ? 'text-[#03aa5a] bg-[#e9fbf2]' : 'text-[#333] hover:bg-[#f4f6f8]'}`}>
        <Icon className={`w-5 h-5 ${active ? 'text-[#03aa5a]' : 'text-[#333]'}`} />
        <span>{label}</span>
        {active && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#03aa5a]"></div>}
    </div>
);

const GnbTab = ({ label, active = false }: { label: string, active?: boolean }) => (
    <div className={`px-5 flex items-center cursor-pointer font-bold text-[16px] h-full relative ${active ? 'text-[#1c1c1c]' : 'text-[#999] hover:text-[#1c1c1c]'}`}>
        {label}
        {active && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1c1c1c]"></div>}
    </div>
);

const SummaryItem = ({ label, value, prev, isLast = false }: any) => {
    const diff = value - prev;
    const isDown = diff < 0;
    const isZero = diff === 0;
    const percent = prev === 0 ? 0 : Math.round(Math.abs(diff) / prev * 100);

    return (
        <div className={`flex-1 flex flex-col justify-between h-[86px] px-6 ${!isLast ? '' : ''}`}>
            {/* Top Row: Label and Percent */}
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-[#424242] tracking-tight">{label}</span>
                    {!isZero && prev !== 0 && (
                        <span className={`text-[13px] font-bold flex items-center ${isDown ? 'text-[#2485fe]' : 'text-[#fc4c4e]'}`}>
                            {isDown ? '↓' : '↑'}{percent}%
                        </span>
                    )}
                    {(isZero || prev === 0) && <span className="text-[13px] font-bold text-[#424242]">-</span>}
                </div>
                <strong className="text-[24px] font-bold text-[#1c1c1c] leading-none">
                    {value.toLocaleString()}<span className="text-[15px] font-normal ml-0.5">회</span>
                </strong>
            </div>
            
            {/* Bottom Row: Prev count (Right Aligned) */}
            <div className="text-right mt-auto">
                <span className="text-[13px] text-[#8c8c8c] tracking-tight">지난 기간 {prev.toLocaleString()}회</span>
            </div>
        </div>
    );
};

const ChartCard = ({ title, prevText, children, percentData, buttonText }: any) => {
    return (
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] h-full flex flex-col">
            <div className="mb-2">
                <h3 className="text-[20px] font-bold leading-snug mb-2 text-[#1c1c1c] break-keep">
                    {title}
                </h3>
                <div className="relative inline-block">
                    <p className="text-[15px] text-[#737373] flex items-center gap-1">
                        {prevText}
                        {!percentData.isZero && (
                             <>
                                {percentData.isUp ? 
                                    <strong className="text-[#fc4c4e] flex items-center ml-1">▲ {percentData.val}% 증가</strong> : 
                                    <strong className="text-[#2485fe] flex items-center ml-1">▼ {percentData.val}% 감소</strong>
                                }
                             </>
                         )}
                         {percentData.isZero && <strong className="text-[#333] ml-1">변동 없음</strong>}
                         <span className="ml-0.5">했습니다.</span>
                    </p>
                </div>
            </div>
            <div className="relative flex-1 flex flex-col">
                {children}
            </div>
            {buttonText && (
                <div className="mt-6 text-center">
                    <button className="border border-[#e5e5e5] rounded-full px-6 py-2.5 text-[14px] text-[#737373] bg-white flex items-center justify-center mx-auto gap-1 hover:bg-[#f9f9f9] transition-colors">
                        {buttonText} <ChevronRight className="w-4 h-4 text-[#c9c9c9]" />
                    </button>
                </div>
            )}
        </div>
    );
};

const StatsLegend = () => (
    <div className="flex justify-center gap-4 mt-6 text-[13px] text-[#6f7173]">
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-[#cbd0da] rounded-full"></div>
            12월 3주차
        </div>
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-[#00de95] rounded-full"></div>
            12월 4주차
        </div>
    </div>
);

const InflowItem = ({ rank, name, count, total }: any) => {
    // Visual tweak:
    const visualWidth = Math.min(100, (count / 188) * 100); // 188 is the top value in default config.

    return (
        <li className="flex items-center h-[52px] border-b border-[rgba(232,235,238,0.7)] relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 bg-[#f4f7f9] z-0 transition-all duration-500" style={{ width: `${visualWidth}%` }}></div>
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