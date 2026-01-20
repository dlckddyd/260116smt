import React, { useState } from 'react';
import { Search, TrendingUp, Monitor, Smartphone, AlertCircle, BarChart2, Loader2, ArrowRight } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

interface KeywordData {
  relKeyword: string;
  monthlyPcQc: number | string;
  monthlyMobileQc: number | string;
  monthlyAvePcClkCnt?: number | string;
  monthlyAveMobileClkCnt?: number | string;
  compIdx?: string;
}

const SearchAnalysis: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<KeywordData | null>(null);
  const [relatedKeywords, setRelatedKeywords] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    setRelatedKeywords([]);

    try {
      const response = await fetch(`/api/keywords?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '검색에 실패했습니다.');
      }

      if (data.keywordList && data.keywordList.length > 0) {
        // The first exact match or first result is the main keyword
        const main = data.keywordList[0];
        setResult(main);
        // Others are related
        setRelatedKeywords(data.keywordList.slice(1, 11)); // Show top 10 related
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
    if (typeof num === 'undefined') return '-';
    if (typeof num === 'string') return num; // '< 10' case
    return num.toLocaleString();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-32 bg-brand-black text-white flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0"></div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl w-full">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent mb-6 font-bold text-sm">
                <BarChart2 className="w-4 h-4" /> 빅데이터 분석
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">키워드 검색량 조회</h1>
            <p className="text-gray-400 mb-10 text-lg">
              네이버 광고 API 데이터를 기반으로 정확한 검색량을 분석합니다.<br/>
              고객이 찾는 키워드를 발굴하여 상위노출 전략을 수립하세요.
            </p>

            <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="분석할 키워드를 입력하세요 (예: 강남맛집)"
                className="w-full py-5 pl-8 pr-16 rounded-full bg-white text-gray-900 placeholder-gray-400 text-lg font-medium shadow-2xl focus:ring-4 focus:ring-brand-accent/50 outline-none transition-all"
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
      <div className="max-w-6xl mx-auto px-6 py-20 min-h-[400px]">
        {error && (
          <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 text-red-600 font-medium animate-fade-in-up">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            {error}
          </div>
        )}

        {result && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
               <h2 className="text-3xl font-bold text-gray-900">
                  '<span className="text-brand-accent">{result.relKeyword}</span>' 분석 결과
               </h2>
               <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold">
                  경쟁정도: <span className={result.compIdx === '높음' ? 'text-red-500' : 'text-green-500'}>{result.compIdx || '보통'}</span>
               </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* PC Volume */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Monitor className="w-8 h-8" />
                </div>
                <p className="text-gray-500 font-medium mb-1">월간 PC 검색량</p>
                <p className="text-4xl font-bold text-gray-900">{formatNumber(result.monthlyPcQc)}</p>
              </div>

              {/* Mobile Volume */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Smartphone className="w-8 h-8" />
                </div>
                <p className="text-gray-500 font-medium mb-1">월간 모바일 검색량</p>
                <p className="text-4xl font-bold text-gray-900">{formatNumber(result.monthlyMobileQc)}</p>
              </div>

              {/* Total Volume */}
              <div className="bg-brand-black p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 right-0 p-3">
                   <TrendingUp className="w-6 h-6 text-brand-accent" />
                </div>
                <p className="text-gray-400 font-medium mb-1">총 검색 합계</p>
                <p className="text-4xl font-bold text-white">
                  {formatNumber(Number(result.monthlyPcQc) + Number(result.monthlyMobileQc))}
                </p>
                <div className="mt-4 text-sm bg-white/10 px-3 py-1 rounded-full text-gray-300">
                   최근 30일 기준
                </div>
              </div>
            </div>

            {/* Related Keywords */}
            {relatedKeywords.length > 0 && (
              <div>
                 <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gray-400" /> 연관 키워드 TOP 10
                 </h3>
                 <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="grid grid-cols-12 bg-gray-50 p-4 font-bold text-gray-500 text-sm border-b border-gray-200">
                       <div className="col-span-4 pl-4">키워드</div>
                       <div className="col-span-3 text-right">PC 검색수</div>
                       <div className="col-span-3 text-right">모바일 검색수</div>
                       <div className="col-span-2 text-center">클릭률(PC/Mo)</div>
                    </div>
                    {relatedKeywords.map((item, idx) => (
                       <div key={idx} className="grid grid-cols-12 p-4 border-b border-gray-100 last:border-0 hover:bg-blue-50/50 transition-colors items-center text-sm">
                          <div className="col-span-4 pl-4 font-bold text-gray-800">{item.relKeyword}</div>
                          <div className="col-span-3 text-right text-gray-600">{formatNumber(item.monthlyPcQc)}</div>
                          <div className="col-span-3 text-right text-gray-600">{formatNumber(item.monthlyMobileQc)}</div>
                          <div className="col-span-2 text-center text-gray-400 text-xs">
                             {item.monthlyAvePcClkCnt || '-'} / {item.monthlyAveMobileClkCnt || '-'}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        )}
        
        {!result && !loading && !error && (
            <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
               <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
               <p>키워드를 입력하여 검색량을 조회해보세요.</p>
            </div>
        )}
      </div>

      <div className="bg-gray-50 py-16 px-6">
         <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">검색량 데이터, 어떻게 활용할까요?</h3>
            <p className="text-gray-600 mb-8">
               조회수가 높다고 무조건 좋은 키워드는 아닙니다.<br/>
               내 브랜드의 규모와 예산에 맞는 '황금 키워드'를 찾아내는 것이 핵심입니다.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-full font-bold hover:border-brand-accent hover:text-brand-accent transition-all shadow-sm">
               전문가에게 키워드 컨설팅 받기 <ArrowRight className="w-4 h-4" />
            </a>
         </div>
      </div>
    </div>
  );
};

export default SearchAnalysis;