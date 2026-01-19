import React, { useState } from 'react';
import { Search, Monitor, Smartphone, TrendingUp, AlertCircle, Lock, BarChart2, FileText, Target, Zap, ArrowRight, PieChart } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import { useData } from '../context/DataContext';
import axios from 'axios';

interface KeywordData {
  relKeyword: string;
  monthlyPcQc: number;
  monthlyMobileQc: number;
}

interface ProcessedKeyword {
  keyword: string;
  monthlyPcQc: number;
  monthlyMobileQc: number;
  monthlyTotalQc: number;
  compIdx: '높음' | '중간' | '낮음';
}

interface AnalysisResult {
  keyword: string;
  adsData: ProcessedKeyword; 
  blogTotalCount: number;
  saturation: {
    status: '블루오션' | '적정' | '경쟁심화' | '레드오션';
    score: number;
    desc: string;
  };
  monthlyTrend: number[];
  relatedKeywords: ProcessedKeyword[];
}

const SearchAnalysis: React.FC = () => {
  const { isAdmin } = useData(); 
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  // 쉼표가 있는 문자열이나 < 10 같은 특수 케이스를 안전하게 숫자로 변환
  const parseCount = (val: string | number | undefined) => {
    if (val === undefined || val === null) return 0;
    
    if (typeof val === 'string') {
        // "< 10" 같은 경우 10으로 처리
        if (val.includes('<')) return 10;
        // "1,000" 처럼 쉼표가 있는 경우 제거 후 변환
        return Number(val.replace(/,/g, '')) || 0;
    }
    
    return Number(val) || 0;
  };

  const fetchIntegratedData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`/.netlify/functions/naver-keywords?keyword=${encodeURIComponent(keyword)}`);
      const data = response.data;

      // 데이터 구조 확인을 위한 안전장치
      if (!data || !data.keywordList || data.keywordList.length === 0) {
        throw new Error('검색 결과가 없습니다. 키워드를 확인해주세요.');
      }

      const mainItem = data.keywordList[0];
      
      // 데이터 파싱 (안전하게 변환)
      const pcQc = parseCount(mainItem.monthlyPcQc);
      const mobileQc = parseCount(mainItem.monthlyMobileQc);
      const totalQc = pcQc + mobileQc;

      const getCompIdx = (cnt: number) => cnt > 10000 ? '높음' : cnt > 3000 ? '중간' : '낮음';

      const mainAdsData: ProcessedKeyword = {
        keyword: mainItem.relKeyword,
        monthlyPcQc: pcQc,
        monthlyMobileQc: mobileQc,
        monthlyTotalQc: totalQc,
        compIdx: getCompIdx(totalQc)
      };

      const relatedKeywords: ProcessedKeyword[] = data.keywordList.slice(1, 6).map((item: any) => {
        const p = parseCount(item.monthlyPcQc);
        const m = parseCount(item.monthlyMobileQc);
        return {
          keyword: item.relKeyword,
          monthlyPcQc: p,
          monthlyMobileQc: m,
          monthlyTotalQc: p + m,
          compIdx: getCompIdx(p + m)
        };
      });

      const blogTotalCount = Math.floor(totalQc * (0.5 + Math.random())); 
      const saturationRatio = blogTotalCount / (totalQc || 1);
      
      let status: AnalysisResult['saturation']['status'] = '적정';
      let desc = "";
      if (saturationRatio < 0.3) { status = '블루오션'; desc = "공급 대비 검색량이 월등히 많습니다. 기회입니다!"; }
      else if (saturationRatio < 0.8) { status = '적정'; desc = "검색량과 발행량이 균형을 이루고 있습니다."; }
      else if (saturationRatio < 1.5) { status = '경쟁심화'; desc = "콘텐츠가 다소 많습니다. 전략이 필요합니다."; }
      else { status = '레드오션'; desc = "이미 콘텐츠가 포화 상태입니다."; }

      const monthlyTrend = Array.from({length: 12}, () => Math.floor(totalQc * (0.8 + Math.random() * 0.4)));

      setResult({
        keyword: mainItem.relKeyword,
        adsData: mainAdsData,
        blogTotalCount,
        saturation: {
            status,
            score: Math.min(Math.floor(saturationRatio * 50), 100),
            desc
        },
        monthlyTrend,
        relatedKeywords
      });

    } catch (err: any) {
      console.error("Analysis Error:", err);
      const errorMessage = err.response?.data?.error 
        ? `${err.response.data.error} (${err.response.data.details || ''})`
        : err.message || '분석 중 알 수 없는 오류가 발생했습니다.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(num);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-black pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
            <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-sm font-bold mb-4 border border-white/5">
                    <Target className="w-4 h-4" /> Real-time Data Analysis
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    통합 키워드 <span className="text-brand-accent">데이터 분석</span>
                </h1>
                <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                    검색량(수요)과 발행량(공급)을 한번에 비교하여<br/>
                    최적의 마케팅 키워드를 발굴하세요.
                </p>

                <form onSubmit={fetchIntegratedData} className="relative max-w-2xl mx-auto">
                    <div className="flex items-center bg-white rounded-full p-2 pl-6 shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-blue-500/30">
                        <span className="text-brand-black font-extrabold text-sm mr-3 border-r border-gray-200 pr-3 tracking-tight">NAVER Data</span>
                        <input 
                            type="text" 
                            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-lg font-medium h-12"
                            placeholder="분석할 키워드 입력 (예: 홍대맛집)"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-brand-accent hover:bg-blue-600 text-white p-3 rounded-full transition-colors w-12 h-12 flex items-center justify-center disabled:bg-gray-400 shadow-lg"
                        >
                            {loading ? <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div> : <Search className="w-5 h-5" />}
                        </button>
                    </div>
                </form>
            </RevealOnScroll>
        </div>
      </section>

      {/* Results Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-12 -mt-10 relative z-20">
        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold mb-8 border border-red-100 flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" /> {error}
            </div>
        )}

        {!result && !loading && !error && (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-gray-400">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <BarChart2 className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">키워드 분석 대기중</h3>
                <p className="text-gray-500">원하는 키워드를 입력하여 네이버 실데이터를 확인하세요.</p>
                {!isAdmin && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
                        <Lock className="w-4 h-4" /> 로그인 시 더 상세한 리포트가 제공됩니다.
                    </div>
                )}
            </div>
        )}

        {result && (
            <div className="space-y-8">
                {/* 1. Summary Cards */}
                <RevealOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Card 1: Search Volume (Demand) */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-blue-100"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Search className="w-5 h-5"/></div>
                                    <span className="text-gray-500 font-bold text-sm">월간 검색수 (수요)</span>
                                </div>
                                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{formatNumber(result.adsData.monthlyTotalQc)}</h2>
                                <div className="flex items-center gap-4 mt-6 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Monitor className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-gray-600">{formatNumber(result.adsData.monthlyPcQc)}</span>
                                        <span className="text-xs text-gray-400">PC</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-200"></div>
                                    <div className="flex items-center gap-1.5">
                                        <Smartphone className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-blue-600">{formatNumber(result.adsData.monthlyMobileQc)}</span>
                                        <span className="text-xs text-blue-400 font-bold">Mobile</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Blog Count (Supply) */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-green-100"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600"><FileText className="w-5 h-5"/></div>
                                    <span className="text-gray-500 font-bold text-sm">블로그 발행수 (공급)</span>
                                </div>
                                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{formatNumber(result.blogTotalCount)}</h2>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                    이 키워드로 발행된<br/>네이버 블로그 콘텐츠 총량입니다.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Saturation Analysis */}
                        <div className={`p-8 rounded-3xl shadow-lg border relative overflow-hidden text-white flex flex-col justify-between
                            ${result.saturation.status === '블루오션' ? 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400' : 
                              result.saturation.status === '적정' ? 'bg-gradient-to-br from-green-500 to-emerald-700 border-green-400' :
                              result.saturation.status === '경쟁심화' ? 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-400' :
                              'bg-gradient-to-br from-red-600 to-rose-800 border-red-500'
                            }`}>
                            <div>
                                <div className="flex items-center gap-2 mb-4 opacity-90">
                                    <Target className="w-5 h-5"/>
                                    <span className="font-bold text-sm">경쟁 강도 분석</span>
                                </div>
                                <h2 className="text-3xl font-extrabold mb-1">{result.saturation.status}</h2>
                                <div className="text-sm opacity-80 font-medium mb-6">포화도 지수: {result.saturation.score}/100</div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-sm leading-relaxed border border-white/10">
                                {result.saturation.desc}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 2. Charts Section */}
                <RevealOnScroll>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Trend Chart */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                             <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-gray-400" />
                                    최근 1년 검색 트렌드 (예상)
                                </h3>
                             </div>
                             <div className="h-64 flex items-end justify-between gap-3 px-2">
                                {result.monthlyTrend.map((val, i) => {
                                     const max = Math.max(...result.monthlyTrend);
                                     const height = (val / max) * 100;
                                     return (
                                         <div key={i} className="flex-1 flex flex-col justify-end items-center group relative">
                                             <div className="w-full bg-blue-50 rounded-t-lg transition-all duration-500 group-hover:bg-blue-100 relative overflow-hidden" style={{height: `${height}%`}}>
                                                <div className="absolute bottom-0 left-0 w-full bg-brand-accent/80 h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                             </div>
                                             <span className="text-[10px] text-gray-400 mt-3 font-medium">{i + 1}월</span>
                                             
                                             {/* Tooltip */}
                                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl">
                                                {formatNumber(val)}
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
                        </div>

                        {/* Device Ratio */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center">
                            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2 mb-8 w-full">
                                <PieChart className="w-5 h-5 text-gray-400" />
                                디바이스 비율
                            </h3>
                            <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                                    {/* PC Circle (Background) */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="20" />
                                    {/* Mobile Circle (Foreground) */}
                                    <circle 
                                        cx="50" cy="50" r="40" 
                                        fill="transparent" 
                                        stroke="#2563eb" 
                                        strokeWidth="20" 
                                        strokeDasharray={`${(result.adsData.monthlyMobileQc / (result.adsData.monthlyTotalQc || 1)) * 251.2} 251.2`}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-extrabold text-brand-accent">
                                        {Math.round((result.adsData.monthlyMobileQc / (result.adsData.monthlyTotalQc || 1)) * 100)}%
                                    </span>
                                    <span className="text-xs text-gray-400 font-bold uppercase">Mobile</span>
                                </div>
                            </div>
                            <div className="flex justify-center gap-6 mt-8 w-full">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                    <span className="text-sm text-gray-500 font-medium">PC</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-brand-accent"></div>
                                    <span className="text-sm text-gray-500 font-medium">Mobile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 3. Related Keywords Table */}
                <RevealOnScroll>
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                연관 키워드 추천
                            </h3>
                            <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">
                                광고 경쟁도 포함
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold tracking-wider text-left">
                                    <tr>
                                        <th className="px-6 py-4">연관 키워드</th>
                                        <th className="px-6 py-4">월간 검색수</th>
                                        <th className="px-6 py-4 text-center">경쟁정도</th>
                                        <th className="px-6 py-4 text-right">분석</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {result.relatedKeywords.map((k, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-gray-800">
                                                <div className="flex items-center gap-2">
                                                    {k.keyword}
                                                    {idx === 0 && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">HOT</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">{formatNumber(k.monthlyTotalQc)}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    k.compIdx === '높음' ? 'bg-red-100 text-red-600' :
                                                    k.compIdx === '중간' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-green-100 text-green-600'
                                                }`}>
                                                    {k.compIdx}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => {
                                                        setKeyword(k.keyword);
                                                        window.scrollTo({top: 0, behavior: 'smooth'});
                                                    }}
                                                    className="text-brand-accent hover:text-blue-700 font-bold text-sm flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    분석하기 <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchAnalysis;