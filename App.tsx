import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServiceDetail from './pages/ServiceDetail';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';
import Reward from './pages/Reward';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { DataProvider } from './context/DataContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-brand-black flex flex-col font-sans selection:bg-brand-accent selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services/:type" element={<ServiceDetail />} />
              <Route path="/reward" element={<Reward />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;