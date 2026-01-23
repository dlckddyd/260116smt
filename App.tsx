import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DataProvider } from './context/DataContext';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Reviews = lazy(() => import('./pages/Reviews'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Reward = lazy(() => import('./pages/Reward'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const SearchAnalysis = lazy(() => import('./pages/SearchAnalysis'));
const SmartPlaceMockup = lazy(() => import('./pages/SmartPlaceMockup')); 

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <Loader2 className="w-10 h-10 text-brand-accent animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-brand-black flex flex-col font-sans selection:bg-brand-accent selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services/:type" element={<ServiceDetail />} />
                <Route path="/reward" element={<Reward />} />
                <Route path="/search-analysis" element={<SearchAnalysis />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/mockup" element={<SmartPlaceMockup />} /> 
                <Route path="/mockup" element={<SmartPlaceMockup />} /> {/* Shortcut Route */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </DataProvider>
  );
};

export default App;