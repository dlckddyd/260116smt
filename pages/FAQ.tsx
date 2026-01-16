import React from 'react';
import AccordionItem from '../components/Accordion';
import RevealOnScroll from '../components/RevealOnScroll';

const faqs = [
  {
    question: "마케팅 비용은 어떻게 산정되나요?",
    answer: "업종, 지역, 경쟁 강도, 그리고 목표하시는 키워드에 따라 비용은 상이합니다.\n무조건 비싼 광고보다는 예산 범위 내에서 가장 효율적인 믹스를 제안해드립니다. 자세한 견적은 무료 상담을 통해 받아보실 수 있습니다."
  },
  {
    question: "계약 기간은 최소 얼마인가요?",
    answer: "마케팅 효과가 가시화되는 데에는 알고리즘 반영 등의 시간이 필요하므로 기본 3개월 계약을 권장드립니다.\n단, 체험단의 경우 1회성 진행도 가능합니다."
  },
  {
    question: "성과 보고는 어떻게 이루어지나요?",
    answer: "매월 말 상세 리포트를 PDF 형태로 제공해드립니다.\n유입량, 순위 변화, 클릭률 등 주요 지표를 시각화하여 보여드리며, 다음 달 전략 방향성까지 함께 제안드립니다."
  },
  {
    question: "지방에 있는 업체도 가능한가요?",
    answer: "네, 가능합니다. 서울/경기권은 방문 미팅이 가능하며, 그 외 지역은 화상 회의나 유선을 통해 원활하게 소통하고 있습니다.\n지역에 관계없이 플레이스 상위노출 로직은 동일하게 적용됩니다."
  },
  {
    question: "어떤 업종이 마케팅 효과가 가장 좋은가요?",
    answer: "요식업, 뷰티/미용, 병의원, 법률/세무 등 지역 기반 서비스업의 효과가 가장 즉각적입니다.\n하지만 쇼핑몰이나 B2B 기업 또한 채널 전략만 다를 뿐 충분한 성과를 낼 수 있습니다."
  }
];

const FAQ: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Fullscreen Hero */}
      <section className="relative w-full h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2000&auto=format&fit=crop" 
            alt="FAQ Hero" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/70"></div>
         <div className="relative z-10 text-center px-6">
            <RevealOnScroll>
               <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">FAQ</h1>
               <p className="text-xl text-gray-300">궁금하신 점을 빠르게 확인해보세요.</p>
            </RevealOnScroll>
         </div>
      </section>

      <div className="py-24 px-6 min-h-screen max-w-3xl mx-auto">
        <RevealOnScroll className="bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl">
           {faqs.map((faq, index) => (
             <AccordionItem key={index} question={faq.question} answer={faq.answer} />
           ))}
        </RevealOnScroll>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6">원하시는 답변을 찾지 못하셨나요?</p>
          <button className="px-10 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1">
            1:1 문의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;