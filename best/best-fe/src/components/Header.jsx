import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

export default function Header({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Tour Packages', path: '/packages' },
    { label: 'Vehicles & Fleet', path: '/fleet' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300">
      <nav
        className={`transition-all duration-300 px-6 sm:px-10 ${
          isScrolled
            ? 'bg-[#342521]/95 backdrop-blur-md shadow-xl py-3 border-b border-brand-gold/20'
            : 'bg-transparent py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo - Updated with official emblem */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img
              src="/logo.png"
              alt="Nithamudayar Tours and Travels Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105"
            />
            <div>
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-white block leading-none">
                NITHAMUDAYAR
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-brand-gold uppercase block mt-0.5">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-gold border-b-2 border-brand-gold pb-1 font-semibold'
                      : 'text-neutral-300 hover:text-brand-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Call Icon Button */}
            <a
              href="tel:+919894116405"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-brand-gold/40 hover:border-brand-gold hover:bg-brand-gold/20 text-brand-gold hover:text-white flex items-center justify-center transition-all shadow-sm group"
              aria-label="Call +91 98941 16405"
              title="Call +91 98941 16405"
            >
              <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>

            <button
              onClick={onOpenBooking}
              className="hidden sm:block btn-gold px-5 py-2.5 rounded-lg text-sm font-bold cursor-pointer"
            >
              Book Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#241815] border-b border-brand-gold/30 px-6 py-5 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium ${
                  isActive ? 'text-brand-gold font-bold' : 'text-neutral-200 hover:text-brand-gold'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-white/10 flex items-center gap-3">
            <a
              href="tel:+919894116405"
              className="w-10 h-10 rounded-full bg-white/5 border border-brand-gold/40 text-brand-gold flex items-center justify-center shrink-0 hover:bg-brand-gold hover:text-[#241815] transition-all"
              aria-label="Call +91 98941 16405"
              title="Call +91 98941 16405"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="flex-1 btn-gold py-2.5 rounded-lg text-sm font-bold text-center"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
