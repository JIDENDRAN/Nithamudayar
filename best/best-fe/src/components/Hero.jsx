import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Phone, Shield, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ onOpenBooking }) {
  return (
    <section 
      id="home" 
      className="relative w-full pt-28 sm:pt-36 pb-12 sm:pb-16 bg-[#241815] text-white overflow-hidden bg-cover bg-[position:75%_center] sm:bg-right lg:bg-center bg-no-repeat min-h-[520px] sm:min-h-[580px] flex items-center"
      style={{
        backgroundImage: `url('/hero-bg-full.png')`,
      }}
    >
      {/* Dynamic Left Backdrop Gradient: Rich Espresso & Charcoal to keep slogans 100% legible while car & temple shine on the right */}
      <div className="absolute inset-0 sm:inset-y-0 sm:left-0 sm:w-3/5 lg:w-[55%] bg-gradient-to-r from-[#241815]/95 via-[#241815]/80 to-transparent pointer-events-none z-10"></div>

      {/* Subtle top/bottom framing vignette */}
      <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-[#241815]/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-14 sm:h-16 bg-gradient-to-t from-[#241815]/80 to-transparent pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 w-full">
        {/* Left Content Column */}
        <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4 py-2 sm:py-6">
          
          {/* 1. Promotional Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18110f]/85 border border-[#D4AF37]/50 backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#FCF6BA] uppercase">
              South India's Premier Luxury Fleet & Tours
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#D4AF37]"></span>
            <span className="hidden sm:inline-block text-[11px] font-bold text-[#F3C64F]">
              From ₹14/km
            </span>
          </div>

          {/* 2. Main Brand Title */}
          <div className="space-y-1">
            <h1 className="font-black font-heading leading-tight tracking-tight drop-shadow-md">
              <span className="text-white block text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase">
                NITHAMUDAYAR
              </span>
              <span className="text-gold-shine block text-xl sm:text-2xl lg:text-3xl font-extrabold mt-0.5">
                TOURS PVT LTD
              </span>
            </h1>

            {/* 3. High-Converting Business Slogan */}
            <p className="text-sm sm:text-base lg:text-lg font-bold text-[#FCF6BA] drop-shadow-sm flex items-center gap-1.5 pt-0.5">
              <span>“Your Royal Journey Across Tamil Nadu & South India”</span>
            </p>
          </div>

          {/* 4. Business Value Proposition Paragraph */}
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-lg drop-shadow">
            Specializing in sacred <span className="text-white font-semibold">Navagraha & Temple Pilgrimages</span>, scenic hill station holidays, corporate delegations, and 24x7 airport transfers. Travel in pristine <span className="text-[#F3C64F] font-bold">Force Urbania</span>, <span className="text-[#F3C64F] font-bold">Innova Crysta</span>, <span className="text-[#F3C64F] font-bold">Tempo Traveller</span> or sedans with experienced, courteous highway chauffeurs.
          </p>

          {/* 5. Promotional Selling Points Badges */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-1 text-[11px] sm:text-xs font-medium text-neutral-200">
            <div className="flex items-center gap-1.5 bg-[#18110f]/70 backdrop-blur-sm border border-white/15 px-2.5 py-1.5 rounded-lg shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>All Luxury Cars Available</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#18110f]/70 backdrop-blur-sm border border-white/15 px-2.5 py-1.5 rounded-lg shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Zero Hidden Charges</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#18110f]/70 backdrop-blur-sm border border-white/15 px-2.5 py-1.5 rounded-lg shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Guaranteed On-Time Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#18110f]/70 backdrop-blur-sm border border-white/15 px-2.5 py-1.5 rounded-lg shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>24x7 Airport & Outstation</span>
            </div>
          </div>

          {/* 6. Promotional Action CTA Group */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gold px-5 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book A Vehicle</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <Link
              to="/packages"
              className="px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-black/60 hover:bg-black/80 border border-brand-gold/40 text-brand-gold hover:text-white transition-all backdrop-blur-sm shadow-md"
            >
              Explore Packages
            </Link>

            <a
              href="tel:+919894116405"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#1a3c34]/90 hover:bg-[#1a3c34] border border-[#25D366]/40 text-white transition-all shadow-md"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
              <span>Call: +91 98941 16405</span>
            </a>
          </div>

          {/* 7. Trust Metrics & Social Proof Bar */}
          <div className="pt-2 sm:pt-3 border-t border-white/15 flex flex-wrap items-center gap-3.5 sm:gap-6 text-[11px] sm:text-xs text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
              <span><strong className="text-white font-bold">15+</strong> Years Trust</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
              <span><strong className="text-white font-bold">50,000+</strong> Happy Pilgrims</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
              <span><strong className="text-white font-bold">24x7</strong> Support</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#F3C64F] font-bold">★ 4.9/5</span>
              <span className="text-neutral-400">(Google Reviews)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
