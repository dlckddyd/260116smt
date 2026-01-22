import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Activity, MapPin, Video, Camera, Users, BarChart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: '플레이스 마케팅', path: '/services/place', icon: MapPin },
    { name: '네이버 클립', path: '/services/clip', icon: Video },
    { name: '유튜브 관리', path: '/services/youtube', icon: Activity },
    { name: '인스타그램', path: '/services/instagram', icon: Camera },
    { name: '체험단 마케팅', path: '/services/experience', icon: Users },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const isScrolled = scrolled;
  const isRewardPage = location.pathname === '/reward';
  
  // 리워드 페이지이거나 스크롤이 된 경우 네비게이션 스타일 변경 (흰 배경, 검은 글씨)
  const useDarkNav = isScrolled || isRewardPage;
  
  const navClass = useDarkNav 
    ? 'glass-nav py-4 border-gray-200 text-slate-900 shadow-sm' 
    : 'bg-transparent py-6 border-transparent text-white';

  const logoBgClass = useDarkNav 
    ? 'bg-brand-accent text-white' 
    : 'bg-white text-brand-accent';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${navClass}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-lg ${logoBgClass}`}>
             <BarChart className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight transition-colors">SMART PLACE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <Link 
            to="/about" 
            className={`text-[15px] font-semibold hover:text-brand-accent transition-colors ${location.pathname === '/about' ? 'text-brand-accent' : ''}`}
          >
            회사소개
          </Link>

          {/* Service Dropdown */}
          <div 
            className="relative group h-full flex items-center"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className={`flex items-center gap-1 text-[15px] font-semibold hover:text-brand-accent transition-colors ${location.pathname.includes('/services') ? 'text-brand-accent' : ''}`}>
              마케팅 서비스
              <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180`} />
            </button>
            
            {/* Mega Menu Dropdown */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl p-2 transition-all duration-300 origin-top ${dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="flex flex-col gap-1">
                {services.map((service) => (
                  <Link 
                    key={service.path}
                    to={service.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-brand-accent transition-all group/item"
                  >
                    <service.icon className="w-4 h-4 text-gray-400 group-hover/item:text-brand-accent" />
                    <span className="text-sm font-medium">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            {/* Bridge to prevent closing */}
            <div className="absolute top-full w-full h-4 bg-transparent"></div>
          </div>

          <Link 
            to="/search-analysis" 
            className={`text-[15px] font-semibold hover:text-brand-accent transition-colors ${location.pathname === '/search-analysis' ? 'text-brand-accent' : ''}`}
          >
            키워드 분석
          </Link>

          <Link 
            to="/reward" 
            className={`text-[15px] font-semibold hover:text-brand-accent transition-colors ${location.pathname === '/reward' ? 'text-brand-accent' : ''}`}
          >
            리워드
          </Link>

          <Link 
            to="/reviews" 
            className={`text-[15px] font-semibold hover:text-brand-accent transition-colors ${location.pathname === '/reviews' ? 'text-brand-accent' : ''}`}
          >
            고객후기
          </Link>

          <Link 
            to="/faq" 
            className={`text-[15px] font-semibold hover:text-brand-accent transition-colors ${location.pathname === '/faq' ? 'text-brand-accent' : ''}`}
          >
            자주묻는질문
          </Link>
        </div>

        {/* Contact Button */}
        <div className="hidden md:block">
           <Link to="/contact" className="px-6 py-2.5 bg-brand-accent text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
             문의하기
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 flex flex-col space-y-6">
          <Link to="/about" className="text-lg font-bold text-gray-800" onClick={closeMenu}>회사소개</Link>
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Services</p>
            {services.map(service => (
              <Link key={service.path} to={service.path} className="block text-base text-gray-600 pl-4 border-l-2 border-gray-100 hover:border-brand-accent hover:text-brand-accent transition-colors font-medium" onClick={closeMenu}>
                {service.name}
              </Link>
            ))}
          </div>
          <Link to="/search-analysis" className="text-lg font-bold text-gray-800" onClick={closeMenu}>키워드 분석</Link>
          <Link to="/reward" className="text-lg font-bold text-gray-800" onClick={closeMenu}>리워드</Link>
          <Link to="/reviews" className="text-lg font-bold text-gray-800" onClick={closeMenu}>고객후기</Link>
          <Link to="/faq" className="text-lg font-bold text-gray-800" onClick={closeMenu}>자주묻는질문</Link>
          <Link to="/contact" className="text-lg font-bold text-brand-accent" onClick={closeMenu}>문의하기</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;