import React, { useState } from 'react';
import { Search, TrendingUp, Monitor, Smartphone, AlertCircle, BarChart2, Loader2, ArrowRight, FileText, Coffee, Percent, PieChart, Activity, Info } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

interface KeywordData {
  relKeyword: string;
  monthlyPcQc: number | string;
  monthlyMobileQc: number | string;
  monthlyAvePcClkCnt?: number | string;
  monthlyAveMobileClkCnt?: number | string;
  compIdx?: string;
}

interface TrendData {
    period: string;
    ratio: number;
}

interface AnalysisResult {
    mainKeyword: KeywordData;
    relatedKeywords: KeywordData[];
    content: {
        blogTotal: number;
        cafeTotal: number;
    };
    trend: TrendData[];
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

  // Helper to safely parse string numbers like "< 10"
  const safeParseInt = (val: string | number | undefined): number => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      if (val.includes('<')) return 5; // Treat < 10 as 5
      return parseInt(val.replace(/,/g, ''), 10);
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
              검색량부터 콘텐츠 발행량, 경쟁 강도까지 한눈에 확인하세요.
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
          <div className="animate-fade-in-up space-y-8">
            {/* 1. Header & Summary */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <div className="flex items-center gap-4 mb-4 md:mb-0">
                   <h2 className="text-3xl font-bold text-gray-900">
                      <span className="text-brand-accent">{data.mainKeyword.relKeyword}</span>
                   </h2>
                   <div className={`px-3 py-1 rounded-lg text-sm font-bold border ${data.mainKeyword.compIdx === '높음' ? 'bg-red-50 border-red-200 text-red-600' : data.mainKeyword.compIdx === '중간' ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
                      경쟁강도: {data.mainKeyword.compIdx || '보통'}
                   </div>
                   <div className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg text-sm font-bold border border-gray-300">
                      월간 조회수 기준
                   </div>
               </div>
               <div className="text-sm text-gray-400 flex items-center gap-2">
                   <Info className="w-4 h-4" /> 최근 30일 평균 데이터 (Naver Official API)
               </div>
            </div>

            {/* 2. Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Search Volume */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold">총 검색량</span>
                        <Search className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {formatNumber(safeParseInt(data.mainKeyword.monthlyPcQc) + safeParseInt(data.mainKeyword.monthlyMobileQc))}
                    </div>
                    <div className="flex gap-2 text-xs font-medium">
                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">PC {formatNumber(data.mainKeyword.monthlyPcQc)}</span>
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded">Mo {formatNumber(data.mainKeyword.monthlyMobileQc)}</span>
                    </div>
                </div>

                {/* Content Volume */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold">콘텐츠 발행량</span>
                        <FileText className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {formatNumber(data.content.blogTotal + data.content.cafeTotal)}
                    </div>
                    <div className="flex gap-2 text-xs font-medium">
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded">블로그 {formatNumber(data.content.blogTotal)}</span>
                        <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded">카페 {formatNumber(data.content.cafeTotal)}</span>
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
                            const totalSearch = safeParseInt(data.mainKeyword.monthlyPcQc) + safeParseInt(data.mainKeyword.monthlyMobileQc);
                            const totalContent = data.content.blogTotal + data.content.cafeTotal;
                            if (totalSearch === 0) return '-';
                            const index = (totalContent / totalSearch * 100).toFixed(1);
                            return index + '%';
                        })()}
                    </div>
                    <div className="text-xs text-gray-400">
                        (발행량 / 검색량) * 100
                    </div>
                </div>

                {/* Click Rate (Est) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold">예상 클릭수</span>
                        <MousePointer className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {formatNumber(safeParseInt(data.mainKeyword.monthlyAvePcClkCnt) + safeParseInt(data.mainKeyword.monthlyAveMobileClkCnt))}
                    </div>
                    <div className="flex gap-2 text-xs font-medium">
                         <span className="text-gray-400">평균 클릭률을 기반으로 함</span>
                    </div>
                </div>
            </div>

            {/* 3. Trend Graph */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-brand-accent" /> 최근 1년 검색 트렌드 (DataLab)
                </h3>
                {data.trend && data.trend.length > 0 ? (
                    <div className="h-64 w-full flex items-end justify-between gap-1 px-4">
                        {data.trend.map((t, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center group relative">
                                <div 
                                    className="w-full bg-blue-100 rounded-t-sm hover:bg-brand-accent transition-colors relative"
                                    style={{ height: `${t.ratio}%` }}
                                >
                                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                       {t.ratio.toFixed(1)}
                                   </div>
                                </div>
                                <div className="text-[10px] text-gray-400 mt-2 -rotate-45 origin-top-left translate-y-2">
                                    {t.period.slice(2, 7)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-40 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">
                        트렌드 데이터가 부족하거나 제공되지 않는 키워드입니다.
                    </div>
                )}
            </div>

            {/* 4. Limitations Info Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-4 text-sm text-gray-600">
                <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                    <p className="font-bold mb-1">데이터 제공 안내</p>
                    <p>
                        본 서비스는 네이버 공식 API(검색광고, 데이터랩, 검색)를 사용하여 데이터를 제공합니다.<br/>
                        * <strong>성별/연령별 비율, 섹션 배치 순서</strong>는 네이버 API에서 제공하지 않아 표시되지 않습니다.<br/>
                        * 콘텐츠 발행량은 네이버 뷰(블로그+카페) 탭의 검색 결과 수치입니다.
                    </p>
                </div>
            </div>

            {/* 5. Related Keywords Table */}
            <div>
                 <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-gray-400" /> 연관 키워드 ({data.relatedKeywords.length}개)
                 </h3>
                 <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                                <th className="py-4 px-6 text-left">키워드</th>
                                <th className="py-4 px-6 text-right">총 검색수</th>
                                <th className="py-4 px-6 text-right">PC 검색</th>
                                <th className="py-4 px-6 text-right">모바일 검색</th>
                                <th className="py-4 px-6 text-center">경쟁정도</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.relatedKeywords.map((item, idx) => (
                               <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/50 transition-colors text-sm">
                                  <td className="py-4 px-6 font-bold text-gray-800">{item.relKeyword}</td>
                                  <td className="py-4 px-6 text-right font-bold text-gray-900">
                                      {formatNumber(safeParseInt(item.monthlyPcQc) + safeParseInt(item.monthlyMobileQc))}
                                  </td>
                                  <td className="py-4 px-6 text-right text-gray-600">{formatNumber(item.monthlyPcQc)}</td>
                                  <td className="py-4 px-6 text-right text-gray-600">{formatNumber(item.monthlyMobileQc)}</td>
                                  <td className="py-4 px-6 text-center">
                                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.compIdx === '높음' ? 'text-red-600 bg-red-50' : item.compIdx === '중간' ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'}`}>
                                          {item.compIdx}
                                      </span>
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
               <p>네이버 빅데이터를 실시간으로 분석해드립니다.</p>
            </div>
        )}
      </div>
    </div>
  );
};

// Simple icon wrapper
const MousePointer = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
);

export default SearchAnalysis;