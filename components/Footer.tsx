import React from 'react';
import { BarChart, Instagram, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                 <BarChart className="w-5 h-5 text-white" />
               </div>
               <span className="text-2xl font-bold tracking-tight">GROWTH LAB</span>
            </div>
            <p className="text-gray-400 text-sm leading-7 mb-6">
              데이터에 기반한 확실한 성과.<br/>
              우리는 당신의 비즈니스 성장을 위한<br/>
              가장 확실한 파트너입니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-accent transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">서비스</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#/services/place" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>플레이스 마케팅</a></li>
              <li><a href="#/services/clip" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>네이버 클립</a></li>
              <li><a href="#/services/youtube" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>유튜브 관리</a></li>
              <li><a href="#/services/instagram" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>인스타그램</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">회사 정보</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#/about" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>회사소개</a></li>
              <li><a href="#/reviews" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>고객후기</a></li>
              <li><a href="#/contact" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>문의하기</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                 <Mail className="w-5 h-5 text-brand-accent mt-0.5" />
                 <div>
                    <span className="block text-white font-semibold">Email</span>
                    support@growthlab.kr
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <Phone className="w-5 h-5 text-brand-accent mt-0.5" />
                 <div>
                    <span className="block text-white font-semibold">Phone</span>
                    02-1234-5678
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-brand-accent mt-0.5" />
                 <div>
                    <span className="block text-white font-semibold">Location</span>
                    서울시 강남구 테헤란로 123, 4층
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 GROWTH LAB. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;