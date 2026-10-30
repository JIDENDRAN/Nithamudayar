import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUp, Clock } from 'lucide-react';

export default function Footer({ onOpenPrivacyPolicy, onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    }
  ];

  return (
    <footer className="bg-[#241815] text-neutral-300 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 pt-8 sm:pt-16 pb-4 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-4">
            <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white rounded-2xl p-1.5 shadow-lg flex items-center justify-center shrink-0 border border-white/25 overflow-hidden transition-transform duration-200 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Nithamudayar Tours & Travels Pvt Ltd Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg sm:text-xl lg:text-2xl tracking-wider text-white">
                  NITHAMUDAYAR
                </span>
                <p className="text-[10px] sm:text-xs tracking-wider text-brand-gold uppercase font-semibold">
                  Tours & Travels Pvt Ltd
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-xs leading-relaxed text-neutral-400 pr-0 sm:pr-6">
              Registered tourist vehicle operator across Tamil Nadu and South India. Providing reliable luxury bus charters, tempo travellers, and tourist cabs for temple circuits, family holidays, and group travel.
            </p>

            <div className="pt-1">
              <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Connect With Us
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-brand-gold hover:border-brand-gold transition-colors"
                  >
                    {React.cloneElement(social.icon, { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current' })}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation & Key Locations */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            {/* Navigation Links */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold font-heading text-white border-b border-brand-gold/30 pb-1 sm:pb-1.5 inline-block">
                Navigation
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li>
                  <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/packages" className="hover:text-brand-gold transition-colors">Tour Packages</Link>
                </li>
                <li>
                  <Link to="/fleet" className="hover:text-brand-gold transition-colors">Vehicles & Fleet</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-brand-gold transition-colors">Destinations</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Key Locations */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold font-heading text-white border-b border-brand-gold/30 pb-1 sm:pb-1.5 inline-block">
                Key Locations
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li>
                  <Link to="/destinations" className="hover:text-white transition-colors">Thanjavur</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-white transition-colors">Kumbakonam</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-white transition-colors">Trichy</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-white transition-colors">Madurai</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-white transition-colors">Coimbatore</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-white transition-colors">Chennai</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Office Contact */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-bold font-heading text-white border-b border-brand-gold/30 pb-1 sm:pb-1.5 inline-block">
              Contact Desk
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                <span>Melavasthachavadi, Abinaya Grand Air force, Pudukkottai Road, Thanjavur - 613005</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919894116405" className="hover:text-white transition-colors font-semibold text-neutral-200">
                    +91 98941 16405
                  </a>
                  <a href="tel:+919626116405" className="hover:text-white transition-colors font-semibold text-neutral-200">
                    +91 96261 16405
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <a href="mailto:booking@nithamudayartravels.com" className="hover:text-white transition-colors">
                  booking@nithamudayartravels.com
                </a>
              </div>
              <div className="flex items-center gap-2 pt-0.5 text-brand-gold">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>24/7 Service Available</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 bg-[#1a110e] py-3 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Nithamudayar Tours & Travels Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link
              to="/privacy-policy"
              className="hover:text-neutral-300 underline cursor-pointer"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/terms-and-conditions"
              className="hover:text-neutral-300 underline cursor-pointer"
            >
              Terms
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-brand-gold flex items-center gap-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
