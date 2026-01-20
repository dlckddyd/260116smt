import React, { useState } from 'react';
import { Search, Monitor, Smartphone, TrendingUp, AlertCircle, Lock, BarChart2, FileText, Target, Zap, ArrowRight, PieChart, Users, Calendar } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import { useData } from '../context/DataContext';
import axios from 'axios';

interface ProcessedKeyword {
  keyword: string;
  total: number;
  pc: number;
  mo: number;
  compIdx: string;
}

interface AnalysisResult {
  keyword: string;
  monthlyTotalQc: number;
  monthlyPcQc: number;
  monthlyMobileQc: number;
  relKeywords: ProcessedKeyword[];
  trend: number[];
  demographics: {
    male: number;
    female: number;
    ages: number[];
  };
  source: string;
}

const SearchAnalysis: React.FC = () => {
  const { isAdmin } = useData(); 
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const fetchIntegratedData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`/api/naver-keywords?keyword=${encodeURIComponent(keyword)}`);
      const data = response.data;

      // 만약 0이라면 에러메시지보다는 안내를 표시
      if (data.monthlyTotalQc === 0 && data.source === 'estimation') {
         setError("검색 데이터가 부족하여 분석할 수 없습니다.");
      } else {
         setResult(data);
      }

    } catch (err: any) {
      console.error("Analysis Error:", err);
      let displayMsg = '분석 중 오류가 발생했습니다.';
      
      if (err.response?.data?.details) {
          displayMsg = err.response.data.details;
      } else if (err.response?.data?.error) {
          displayMsg = err.response.data.error;
      }
      setError(displayMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(num);

  // 차트: 트렌드 (Green Line style like reference)
  const TrendChart = ({ data }: { data: number[] }) => {
     const max = Math.max(...data, 100);
     const points = data.map((val, i) => {
         const x = (i / (data.length - 1)) * 100;
         const y = 100 - (val / max) * 100;
         return `${x},${y}`;
     }).join(' ');

     return (
         <div className="relative w-full h-64 mt-8 px-4">
             <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                 {/* Background Grid */}
                 <line x1="0" y1="0" x2="100" y2="0" stroke="#f1f5f9" strokeWidth="0.5" />
                 <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                 <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                 <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                 <line x1="0" y1="100" x2="100" y2="100" stroke="#f1f5f9" strokeWidth="0.5" />
                 
                 {/* Y-Axis Labels (Approximate) */}
                 <text x="-2" y="5" fontSize="3" fill="#94a3b8" textAnchor="end">{formatNumber(max)}</text>
                 <text x="-2" y="55" fontSize="3" fill="#94a3b8" textAnchor="end">{formatNumber(Math.round(max/2))}</text>
                 <text x="-2" y="100" fontSize="3" fill="#94a3b8" textAnchor="end">0</text>

                 {/* The Line */}
                 <polyline 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="1.5" 
                    points={points} 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                 />
                 
                 {/* Dots */}
                 {data.map((val, i) => {
                     const x = (i / (data.length - 1)) * 100;
                     const y = 100 - (val / max) * 100;
                     return (
                         <circle key={i} cx={x} cy={y} r="1.5" className="fill-white stroke-[#22c55e] stroke-[1] hover:r-2 transition-all cursor-pointer" />
                     );
                 })}
             </svg>
             
             {/* X-Axis Labels */}
             <div className="flex justify-between mt-4 text-[10px] text-gray-400 border-t border-gray-100 pt-2">
                 {Array.from({length: 12}).map((_, i) => (
                     <div key={i} className="flex-1 text-center transform -rotate-45 origin-top-left translate-y-2">
                        {new Date().getFullYear()}-{String(i+1).padStart(2,'0')}
                     </div>
                 ))}
             </div>
         </div>
     );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-black pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[100px]"></div>
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
                    검색량(수요)과 트렌드를 한번에 확인하세요.
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
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100 mb-8">
                <div className="flex items-center justify-center gap-2 font-bold text-lg mb-2">
                    <AlertCircle className="w-6 h-6" /> 분석 실패
                </div>
                <p className="text-sm">{error}</p>
            </div>
        )}

        {!result && !loading && !error && (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-gray-400">
                <BarChart2 className="w-16 h-16 text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-700">키워드를 입력해주세요</h3>
                <p className="text-gray-500 mt-2">네이버 검색광고 및 데이터랩 기반의 분석 데이터를 제공합니다.</p>
            </div>
        )}

        {result && (
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        '<span className="text-brand-accent">{result.keyword}</span>' 분석 결과
                    </h2>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${result.source === 'ad_api' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {result.source === 'ad_api' ? '데이터 출처: 네이버 검색광고 API (정확)' : '데이터 출처: 오픈 API 추정 (시뮬레이션)'}
                    </span>
                </div>

                {/* 1. Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-gray-500 font-bold text-sm">
                                <Search className="w-4 h-4"/> 월간 검색수 (최근 1개월)
                            </div>
                            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">{formatNumber(result.monthlyTotalQc)}</h2>
                            <div className="flex items-center gap-4 mt-8 text-sm font-medium border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-2">
                                    <Monitor className="w-4 h-4 text-gray-400"/> 
                                    <span className="text-gray-500">{formatNumber(result.monthlyPcQc)}</span> 
                                    <span className="text-xs text-gray-400">PC</span>
                                </div>
                                <div className="w-px h-3 bg-gray-300"></div>
                                <div className="flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-blue-500"/> 
                                    <span className="text-blue-600 font-bold">{formatNumber(result.monthlyMobileQc)}</span>
                                    <span className="text-xs text-blue-400">Mobile</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2"><PieChart className="w-4 h-4 text-gray-400"/> 성별 비율</h3>
                        </div>
                        <div className="flex items-center gap-8 h-full">
                             {/* Custom Pie Chart CSS */}
                             <div className="relative w-32 h-32 flex-shrink-0">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                   <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray={`${result.demographics.male * 2.51} 251`}/>
                                   <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f472b6" strokeWidth="20" strokeDasharray={`${result.demographics.female * 2.51} 251`} strokeDashoffset={`-${result.demographics.male * 2.51}`}/>
                                </svg>
                             </div>
                             <div className="flex-1 space-y-4">
                                 <div className="flex justify-between items-center">
                                     <span className="text-sm font-bold text-gray-500 flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 남성</span>
                                     <span className="text-xl font-bold text-gray-900">{result.demographics.male}%</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                     <span className="text-sm font-bold text-gray-500 flex items-center gap-2"><div className="w-2 h-2 bg-pink-400 rounded-full"></div> 여성</span>
                                     <span className="text-xl font-bold text-gray-900">{result.demographics.female}%</span>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-6"><Users className="w-4 h-4 text-gray-400"/> 연령별 분포</h3>
                        <div className="flex items-end justify-between h-32 gap-2">
                            {result.demographics.ages.map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center group relative">
                                    <div className="w-full bg-blue-100 rounded-t-md relative transition-all group-hover:bg-blue-600" style={{height: `${val}%`}}></div>
                                    <span className="text-[10px] text-gray-400 mt-2 font-medium">{(i+1)*10}대</span>
                                    <div className="absolute -top-8 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">{val}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Trend Chart */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2 border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gray-400" /> 월간 검색수 추이 (최근 1년)
                        </h3>
                        <div className="flex gap-4 text-xs font-medium text-gray-500">
                           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Total Search</span>
                        </div>
                    </div>
                    <TrendChart data={result.trend} />
                </div>

                {/* 3. Related Keywords */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 연관 키워드 TOP 5
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold tracking-wider text-left">
                                <tr>
                                    <th className="px-6 py-4">키워드</th>
                                    <th className="px-6 py-4">총 검색수</th>
                                    <th className="px-6 py-4">PC</th>
                                    <th className="px-6 py-4">Mobile</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {result.relKeywords.map((k, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">{k.keyword}</td>
                                        <td className="px-6 py-4 font-bold text-blue-600">{formatNumber(k.total)}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{formatNumber(k.pc)}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{formatNumber(k.mo)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => {
                                                    setKeyword(k.keyword);
                                                    window.scrollTo({top: 0, behavior: 'smooth'});
                                                }}
                                                className="text-xs font-bold text-brand-accent border border-brand-accent px-3 py-1.5 rounded-full hover:bg-brand-accent hover:text-white transition-colors"
                                            >
                                                분석하기
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchAnalysis;