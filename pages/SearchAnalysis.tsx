import React, { useState } from 'react';
import { Search, AlertCircle, BarChart2, Loader2, FileText, PieChart, Activity, Info, ShoppingBag, Newspaper, HelpCircle, Image as ImageIcon, MousePointer2, TrendingUp, Layers, Calendar, ArrowDown } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

interface KeywordData {
  relKeyword: string;
  monthlyPcQc: number | string;
  monthlyMobileQc: number | string;
  monthlyAvePcClkCnt?: number | string;
  monthlyAveMobileClkCnt?: number | string;
  compIdx?: string;
}

interface DailyData {
    date: string;
    keyword: string;
    pc: number;
    mobile: number;
    total: number;
}

interface AnalysisResult {
    mainKeyword: KeywordData;
    relatedKeywords: KeywordData[];
    content: {
        blog: number;
        cafe: number;
        news: number;
        shop: number;
        kin: number;
        web: number;
        image: number;
    };
    dailyTrend?: DailyData[];
}

const SearchAnalysis: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch(`/api/keywords?keyword=${encodeURIComponent(keyword)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '검색에 실패했습니다.');
      }

      if (result.mainKeyword) {
        setData(result);
      } else {
        setError('검색 결과가 없습니다.');
      }
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number | string | undefined) => {
    if (typeof num === 'undefined' || num === null) return '0';
    if (typeof num === 'string') return num;
    return num.toLocaleString();
  };

  const safeParseInt = (val: string | number | undefined): number => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      if (val.includes('<')) return 5;
      return parseInt(val.replace(/,/g, ''), 10);
  };

  // Helper to calculate percentages for the bar chart
  const renderContentChart = (content: AnalysisResult['content']) => {
    const items = [
        { key: 'blog', label: '블로그', icon: FileText, count: content.blog, color: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50' },
        { key: 'cafe', label: '카페', icon: Activity, count: content.cafe, color: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50' },
        { key: 'shop', label: '쇼핑', icon: ShoppingBag, count: content.shop, color: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50' },
        { key: 'news', label: '뉴스', icon: Newspaper, count: content.news, color: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50' },
        { key: 'kin', label: '지식iN', icon: HelpCircle, count: content.kin, color: 'bg-teal-500', text: 'text-teal-600', bg: 'bg-teal-50' },
        { key: 'image', label: '이미지', icon: ImageIcon, count: content.image, color: 'bg-pink-500', text: 'text-pink-600', bg: 'bg-pink-50' },
    ].sort((a, b) => b.count - a.count); // Sort by count desc

    const maxCount = Math.max(...items.map(i => i.count)) || 1;

    return (
        <div className="space-y-4">
            {items.map((item, idx) => {
                const percentage = Math.round((item.count / maxCount) * 100);
                const isDominant = idx === 0;

                return (
                    <div key={item.key} className="relative">
                        <div className="flex items-center gap-3 mb-1">
                            <div className={`p-1.5 rounded-lg ${item.bg}`}>
                                <item.icon className={`w-4 h-4 ${item.text}`} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 w-16">{item.label}</span>
                            <div className="flex-1">
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                            <span className={`text-sm font-bold min-w-[60px] text-right ${isDominant ? 'text-brand-black' : 'text-gray-500'}`}>
                                {formatNumber(item.count)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-brand-black text-white flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0"></div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl w-full">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent mb-6 font-bold text-sm">
                <Activity className="w-4 h-4" /> 키워드 종합 분석
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">데이터로 보는 키워드의 가치</h1>
            <p className="text-gray-400 mb-10 text-lg">
              네이버 빅데이터(검색, 쇼핑, 뉴스, 지식iN)를 실시간으로 분석합니다.
            </p>

            <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="키워드를 입력하세요 (예: 강남맛집)"
                className="w-full py-4 pl-8 pr-16 rounded-full bg-white text-gray-900 placeholder-gray-400 text-lg font-medium shadow-2xl focus:ring-4 focus:ring-brand-accent/50 outline-none transition-all"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-brand-accent hover:bg-blue-600 text-white rounded-full px-6 transition-all flex items-center justify-center disabled:bg-gray-400"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </section>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 min-h-[400px]">
        {error && (
          <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 text-red-600 font-medium animate-fade-in-up">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            {error}
          </div>
        )}

        {data && (
          <div className="animate-fade-in-up space-y-12">
            {/* 1. Header & Summary */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <div className="flex items-center gap-4 mb-4 md:mb-0">
                   <h2 className="text-3xl font-bold text-gray-900">
                      <span className="text-brand-accent">{data.mainKeyword.relKeyword}</span>
                   </h2>
                   <div className={`px-3 py-1 rounded-lg text-sm font-bold border ${data.mainKeyword.compIdx === '높음' ? 'bg-red-50 border-red-200 text-red-600' : data.mainKeyword.compIdx === '중간' ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
                      경쟁강도: {data.mainKeyword.compIdx || '보통'}
                   </div>
               </div>
               <div className="text-sm text-gray-400 flex items-center gap-2">
                   <Info className="w-4 h-4" /> 최근 30일 평균 데이터 (Naver Official API)
               </div>
            </div>

            {/* 2. Key Metrics Grid (Search & Content) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Search Volume */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold">월간 총 검색량</span>
                        <Search className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {formatNumber(safeParseInt(data.mainKeyword.monthlyPcQc as string | number) + safeParseInt(data.mainKeyword.monthlyMobileQc as string | number))}
                    </div>
                    <div className="flex gap-2 text-xs font-medium">
                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">PC {formatNumber(data.mainKeyword.monthlyPcQc)}</span>
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded">Mo {formatNumber(data.mainKeyword.monthlyMobileQc)}</span>
                    </div>
                </div>

                {/* Total Content Volume */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold">총 콘텐츠 발행량</span>
                        <FileText className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {formatNumber((Object.values(data.content) as number[]).reduce((a, b) => a + b, 0))}
                    </div>
                    <div className="flex gap-2 text-xs font-medium text-gray-400">
                        블로그, 뉴스, 쇼핑, 카페 등 합계
                    </div>
                </div>

                {/* Saturation Index */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold">콘텐츠 포화지수</span>
                        <PieChart className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {(() => {
                            const totalSearch = safeParseInt(data.mainKeyword.monthlyPcQc as string | number) + safeParseInt(data.mainKeyword.monthlyMobileQc as string | number);
                            const totalContent = (Object.values(data.content) as number[]).reduce((a, b) => a + b, 0);
                            if (totalSearch === 0) return '-';
                            const index = (totalContent / totalSearch * 100).toFixed(1);
                            return index + '%';
                        })()}
                    </div>
                    <div className="text-xs text-gray-400">
                        (총 발행량 / 총 검색량) * 100
                    </div>
                </div>

                {/* Click Rate (Est) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold">예상 클릭수</span>
                        <MousePointer2 className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {formatNumber(safeParseInt(data.mainKeyword.monthlyAvePcClkCnt as string | number | undefined) + safeParseInt(data.mainKeyword.monthlyAveMobileClkCnt as string | number | undefined))}
                    </div>
                    <div className="flex gap-2 text-xs font-medium">
                         <span className="text-gray-400">평균 클릭률을 기반으로 함</span>
                    </div>
                </div>
            </div>

            {/* 3. Content Volume Distribution Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-brand-accent" /> 채널별 콘텐츠 발행량 순위
                    </h3>
                    <div className="min-h-[250px] flex flex-col justify-center">
                        {renderContentChart(data.content)}
                    </div>
                </div>
                
                {/* Insight / Dominant Channel Card */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-brand-black to-gray-800 p-8 rounded-2xl text-white shadow-xl h-full flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-400" /> 분석 인사이트
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">가장 활발한 마케팅 채널</p>
                                <p className="text-3xl font-bold text-white">
                                    {Object.entries(data.content).sort(([,a], [,b]) => (b as number) - (a as number))[0][0] === 'blog' ? '블로그 (Blog)' :
                                     Object.entries(data.content).sort(([,a], [,b]) => (b as number) - (a as number))[0][0] === 'cafe' ? '카페 (Cafe)' :
                                     Object.entries(data.content).sort(([,a], [,b]) => (b as number) - (a as number))[0][0] === 'shop' ? '네이버 쇼핑' :
                                     Object.entries(data.content).sort(([,a], [,b]) => (b as number) - (a as number))[0][0] === 'news' ? '뉴스 기사' : '웹 문서'}
                                </p>
                            </div>
                            <div className="h-px bg-white/10 w-full"></div>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                현재 <span className="text-brand-accent font-bold">'{data.mainKeyword.relKeyword}'</span> 키워드는 
                                <span className="font-bold text-white"> {Object.entries(data.content).sort(([,a], [,b]) => (b as number) - (a as number))[0][0] === 'blog' ? '블로그' : '해당 채널'}</span> 영역에서 
                                가장 많은 콘텐츠가 생성되고 있습니다. 경쟁 우위를 점하기 위해서는 해당 채널의 상위 노출 전략이 필수적입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. NEW: Daily Search Volume Trend Table */}
            {data.dailyTrend && data.dailyTrend.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-brand-accent" /> 일별 검색량 추이 (최근 7일)
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                                    <th className="py-4 px-6 text-center w-32">날짜</th>
                                    <th className="py-4 px-6 text-left">키워드</th>
                                    <th className="py-4 px-6 text-right">PC 검색수</th>
                                    <th className="py-4 px-6 text-right">모바일 검색수</th>
                                    <th className="py-4 px-6 text-right">총 검색수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.dailyTrend.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors text-sm">
                                        <td className="py-4 px-6 text-center text-gray-500 font-medium">
                                            {item.date}
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-800">
                                            {item.keyword.replace(/\s/g, '')}
                                        </td>
                                        <td className="py-4 px-6 text-right text-gray-600">{formatNumber(item.pc)}</td>
                                        <td className="py-4 px-6 text-right text-gray-600">{formatNumber(item.mobile)}</td>
                                        <td className="py-4 px-6 text-right font-bold text-blue-600">
                                            {formatNumber(item.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 text-right">* 월간 검색량을 기준으로 추산된 일별 데이터입니다.</div>
                </div>
            )}
            
            <div className="flex justify-center text-gray-300">
               <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* 5. Related Keywords Table */}
            <div>
                 <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-gray-400" /> 연관 키워드 상세 분석
                 </h3>
                 <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                                <th className="py-4 px-6 text-left">연관 키워드</th>
                                <th className="py-4 px-6 text-center">경쟁강도</th>
                                <th className="py-4 px-6 text-right">PC 검색수</th>
                                <th className="py-4 px-6 text-right">모바일 검색수</th>
                                <th className="py-4 px-6 text-right">총 검색수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.relatedKeywords.map((item, idx) => (
                               <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/50 transition-colors text-sm">
                                  <td className="py-4 px-6 font-bold text-gray-800">
                                      {item.relKeyword.replace(/\s/g, '')}
                                  </td>
                                  <td className="py-4 px-6 text-center">
                                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${item.compIdx === '높음' ? 'bg-red-50 border-red-100 text-red-500' : item.compIdx === '중간' ? 'bg-yellow-50 border-yellow-100 text-yellow-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                                          {item.compIdx}
                                      </span>
                                  </td>
                                  <td className="py-4 px-6 text-right text-gray-600">{formatNumber(item.monthlyPcQc)}</td>
                                  <td className="py-4 px-6 text-right text-gray-600">{formatNumber(item.monthlyMobileQc)}</td>
                                  <td className="py-4 px-6 text-right font-bold text-brand-accent">
                                      {formatNumber(safeParseInt(item.monthlyPcQc as string | number) + safeParseInt(item.monthlyMobileQc as string | number))}
                                  </td>
                               </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
          </div>
        )}
        
        {!data && !loading && !error && (
            <div className="text-center py-32 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
               <Search className="w-16 h-16 mx-auto mb-6 opacity-20" />
               <h3 className="text-xl font-bold text-gray-500 mb-2">키워드를 입력해보세요</h3>
               <p>네이버 빅데이터(검색/뉴스/쇼핑/지식iN)를 실시간으로 분석해드립니다.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchAnalysis;