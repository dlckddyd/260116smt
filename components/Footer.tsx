import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10 text-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          
          {/* Left Side: Company Info */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center">
                 <BarChart className="w-4 h-4 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight">스마트마케팅 플레이스</span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-500 mb-8 font-medium">
               <p>상호 : 스마트마케팅 플레이스</p>
               <p>사업자등록번호 : 414-05-23978 <span className="mx-2 text-gray-300">|</span> 대표이사 : 박성민</p>
               <p>주소 : 서울특별시 강서구 양천로 547 마스터밸류 805호</p>
               <p>이메일 : yonging@kakao.com</p>
            </div>

            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-brand-accent transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-red-600 transition-all"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
          
          {/* Right Side: Links */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
               <h4 className="font-bold text-lg mb-4 text-gray-900">회사소개</h4>
               <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
                  <li><Link to="/reviews" className="hover:text-brand-accent transition-colors">고객후기</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="font-bold text-lg mb-4 text-gray-900">마케팅 서비스</h4>
               <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link to="/services/place" className="hover:text-brand-accent transition-colors">플레이스 마케팅</Link></li>
                  <li><Link to="/services/clip" className="hover:text-brand-accent transition-colors">네이버 클립</Link></li>
                  <li><Link to="/services/youtube" className="hover:text-brand-accent transition-colors">유튜브 관리</Link></li>
                  <li><Link to="/services/instagram" className="hover:text-brand-accent transition-colors">인스타그램</Link></li>
                  <li><Link to="/services/experience" className="hover:text-brand-accent transition-colors">체험단 마케팅</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="font-bold text-lg mb-4 text-gray-900">고객지원</h4>
               <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link to="/faq" className="hover:text-brand-accent transition-colors">자주묻는질문</Link></li>
                  <li><Link to="/contact" className="hover:text-brand-accent transition-colors">문의하기</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="font-bold text-lg mb-4 text-gray-900">Contact</h4>
               <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                     <Mail className="w-4 h-4 text-brand-accent" />
                     <span>yonging@kakao.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-brand-accent" />
                     <span>서울 강서구 양천로 547</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; 2024 Smart Marketing Place. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-accent transition-colors">이용약관</a>
            <a href="#" className="hover:text-brand-accent transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;