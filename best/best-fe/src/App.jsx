// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopLayout from './components/desktop/DesktopLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Logo from './assets/logo.png';

const AppContent = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Dynamic Route-Based Metadata (SEO) for client-side navigation
  useEffect(() => {
    const routeTitles = {
      '/': 'Nithamudayar Tours and Travels | Premium Travel Across Tamil Nadu',
      '/about': 'About Us | Nithamudayar Tours and Travels | Reliable South India Travel',
      '/packages': 'Tour Packages & Regional Circuits | Nithamudayar Tours and Travels',
      '/fleet': 'Our Fleet & Tariffs - Sedans, Innova, Tempo & Buses | Nithamudayar Tours and Travels',
      '/vehicles': 'Our Fleet & Tariffs - Sedans, Innova, Tempo & Buses | Nithamudayar Tours and Travels',
      '/destinations': 'Key Travel Hubs & Destinations in Tamil Nadu | Nithamudayar Tours and Travels',
      '/contact': 'Contact Desk & Booking | Nithamudayar Tours and Travels | 24/7 Service',
      '/gallery': 'Journey Highlights & Gallery | Nithamudayar Tours and Travels',
      '/privacy-policy': 'Privacy Policy | Nithamudayar Tours and Travels',
      '/terms-and-conditions': 'Terms & Conditions | Nithamudayar Tours and Travels',
    };

    const routeDescriptions = {
      '/': 'Explore Tamil Nadu with Nithamudayar Tours and Travels. Premium bus charter, tempo traveller, and luxury cab services across Thanjavur, Trichy, Kumbakonam, Madurai, Coimbatore, and Chennai.',
      '/about': 'Learn about Nithamudayar Tours and Travels. Over 15 years of dedicated tourist operations across Tamil Nadu and South India with verified chauffeurs and transparent per-km billing.',
      '/packages': 'Book customized regional tour packages for Thanjavur Royal Palace, Trichy Kaveri Riverway, Kumbakonam silk and bronze delta, Madurai food walks, and Western Ghats tea trails.',
      '/fleet': 'Choose from our clean, sanitized commercial fleet: Maruti Suzuki Dzire, Toyota Innova Crysta, Force Tempo Traveller, and 36/49 seater luxury AC coach buses.',
      '/vehicles': 'Choose from our clean, sanitized commercial fleet: Maruti Suzuki Dzire, Toyota Innova Crysta, Force Tempo Traveller, and 36/49 seater luxury AC coach buses.',
      '/destinations': 'Discover the cultural and scenic hubs of Tamil Nadu: Thanjavur, Kumbakonam, Trichy, Madurai, Coimbatore, and Chennai with Nithamudayar Tours and Travels.',
      '/contact': 'Contact Nithamudayar Tours and Travels 24/7. Call +91 98941 16405 or chat via WhatsApp for instant quotation and transparent booking confirmation.',
      '/gallery': 'View travel memories, heritage monuments, and fleet journeys across Tamil Nadu with Nithamudayar Tours and Travels.',
      '/privacy-policy': 'Read the privacy policy of Nithamudayar Tours and Travels regarding customer information and trip enquiries.',
      '/terms-and-conditions': 'Review the terms and conditions for booking tourist cabs, tempo travellers, and bus charters with Nithamudayar Tours and Travels.'
    };

    const title = routeTitles[location.pathname] || routeTitles['/'];
    const desc = routeDescriptions[location.pathname] || routeDescriptions['/'];

    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#241815] text-white select-none overflow-hidden"
          >
            {/* Ambient golden glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative mb-6"
              >
                <div className="relative z-10 w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-[#342521] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-brand-gold/40 p-2 flex items-center justify-center overflow-hidden">
                  <img src={Logo} alt="Nithamudayar Tours and Travels" className="w-full h-full object-contain" />
                </div>
                {/* Animated golden ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-2.5 rounded-3xl border border-transparent border-t-brand-gold/60 border-r-brand-gold/20 pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="flex flex-col items-center text-center px-6"
              >
                <h2 className="font-heading font-black text-xl lg:text-2xl tracking-wider text-white">
                  NITHAMUDAYAR
                </h2>
                <div className="flex items-center gap-2 mt-2 opacity-80">
                  <span className="w-5 h-px bg-brand-gold" />
                  <p className="text-[10px] tracking-[0.25em] font-bold uppercase text-brand-gold">Tours & Travels</p>
                  <span className="w-5 h-px bg-brand-gold" />
                </div>
              </motion.div>

              {/* Minimal Loading Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-brand-gold"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E1E1E]">
        <main className="flex-grow">
          {isAdminRoute ? (
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          ) : (
            <DesktopLayout />
          )}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
