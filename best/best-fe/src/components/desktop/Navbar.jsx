import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
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
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300">
      <nav
        className={`transition-all duration-300 px-4 sm:px-10 ${
          isScrolled
            ? 'bg-[#241815]/95 backdrop-blur-md shadow-xl py-3 border-b border-brand-gold/20'
            : 'bg-gradient-to-b from-[#180e0c]/90 via-[#241815]/50 to-transparent py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#1b203d] rounded-2xl p-0.5 shadow-lg flex items-center justify-center shrink-0 border border-brand-gold/40 overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Nithamudayar Tours & Travels Pvt Ltd Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base sm:text-lg lg:text-xl tracking-wider text-white block leading-tight">
                NITHAMUDAYAR
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold tracking-widest text-brand-gold uppercase block mt-0.5">
                Tours & Travels Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-gold border-b-2 border-brand-gold pb-0.5 font-semibold'
                      : 'text-neutral-300 hover:text-brand-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Call Icon Button */}
            <a
              href="tel:+919894116405"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-brand-gold/40 hover:border-brand-gold hover:bg-brand-gold/20 text-brand-gold hover:text-white flex items-center justify-center transition-all shadow-sm group"
              aria-label="Call +91 98941 16405"
              title="Call +91 98941 16405"
            >
              <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:block btn-gold px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold cursor-pointer hover:shadow-lg transition-all"
            >
              Book Now
            </button>

            {/* Admin Button - Visible on Phone & Desktop */}
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-brand-gold/20 border border-brand-gold/40 text-brand-gold hover:text-white transition-all shadow-xs shrink-0"
              title="Admin Dashboard"
              aria-label="Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold" />
              <span className="text-[10px] sm:text-xs font-bold">Admin</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#241815] border-b border-brand-gold/30 px-6 py-5 space-y-3 shadow-2xl">
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

          <div className="pt-3 border-t border-white/10 space-y-2.5">
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-white/5 border border-brand-gold/30 text-brand-gold text-xs font-bold hover:bg-brand-gold/15 transition-all"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Admin Dashboard</span>
              </div>
              <span className="text-[10px] text-neutral-400">Manage Bookings →</span>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="tel:+919894116405"
                className="w-10 h-10 rounded-full bg-white/5 border border-brand-gold/40 text-brand-gold flex items-center justify-center shrink-0 hover:bg-brand-gold hover:text-[#241815] transition-all"
                aria-label="Call +91 98941 16405"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBooking) onOpenBooking();
                }}
                className="flex-1 btn-gold py-2.5 rounded-lg text-sm font-bold text-center cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
