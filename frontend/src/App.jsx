
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Process from './pages/Process';
import FaqPage from './pages/FaqPage';
import Contact from './pages/Contact';
import Legal from './pages/Legal';

import {
  FloatingButtons,
  CookieBanner,
} from './components/Extras';

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // No cleanup required
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/process" element={<Process />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/privacy-policy"
            element={<Legal type="privacy" />}
          />

          <Route
            path="/terms-and-conditions"
            element={<Legal type="terms" />}
          />

          <Route
            path="/disclosures"
            element={<Legal type="disclosures" />}
          />

          <Route
            path="*"
            element={
              <div className="section text-center">
                <h1 className="h2">Page not found</h1>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
      <FloatingButtons />
      <CookieBanner />
    </div>
  );
}
