
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, ChevronUp, ChevronDown } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export const SectionTitle = ({ title, sub, color = "text-gray-900", align = "center" }: { title: React.ReactNode, sub: string, color?: string, align?: "left" | "center" }) => (
    <div className={`mb-16 md:mb-24 ${align === "center" ? "text-center" : "text-left"}`}>
        <span className={`font-bold tracking-widest uppercase text-sm mb-3 block ${color.replace('text-gray-900', 'text-brand-accent')}`}>{sub}</span>
        <h2 className={`text-3xl md:text-5xl font-bold leading-tight ${color}`}>{title}</h2>
    </div>
);

export const FaqSection = ({ items, color = "text-blue-600" }: { items: {q:string, a:string}[], color?: string }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
                <RevealOnScroll>
                    <h2 className="text-3xl font-bold mb-12 text-center">자주 묻는 질문 (FAQ)</h2>
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-gray-400 transition-colors">
                                <button 
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
                                    className="w-full py-6 px-6 flex justify-between items-center text-left font-bold text-lg hover:bg-gray-50 transition-colors"
                                >
                                    <span className="flex items-center gap-4">
                                        <span className={`text-2xl ${color}`}>Q.</span> {item.q}
                                    </span>
                                    {openIndex === idx ? <ChevronUp className={`w-5 h-5 ${color}`} /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-8 text-[15px] border-t border-gray-100">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export const CtaSection = ({ title, subTitle, colorFrom, colorTo, buttonColor, textClass = "text-yellow-300" }: any) => (
    <section className="py-24 px-6">
        <div className={`max-w-6xl mx-auto bg-gradient-to-r ${colorFrom} ${colorTo} rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl group`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 text-white">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    {title}<br/>
                    <span className={textClass}>{subTitle}</span>
                </h2>
                <p className="text-white/80 text-xl mb-12 font-light">고민하는 이 순간에도 경쟁사의 순위는 오르고 있습니다.<br/>데이터로 증명된 솔루션을 지금 바로 경험하세요.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link to="/contact" className={`inline-flex items-center justify-center gap-3 px-12 py-6 bg-white ${buttonColor} font-bold text-lg rounded-full hover:bg-gray-50 transition-all shadow-xl hover:scale-105 hover:shadow-2xl`}>
                        무료 진단 및 견적 받기 <ArrowRight className="w-6 h-6" />
                    </Link>
                    <a href="tel:02-6958-9144" className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-black/20 border border-white/30 text-white font-bold text-lg rounded-full hover:bg-black/40 transition-all shadow-xl backdrop-blur-md">
                        <Smartphone className="w-6 h-6" /> 전화 문의 02-6958-9144
                    </a>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-20 animate-pulse delay-1000"></div>
        </div>
    </section>
);
