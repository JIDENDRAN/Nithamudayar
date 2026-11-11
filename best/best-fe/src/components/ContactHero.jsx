import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

export default function ContactHero({ onOpenBooking }) {
  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="contact-hero" 
      className="relative w-full pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#1b203d] text-white overflow-hidden bg-cover bg-[position:75%_center] sm:bg-right lg:bg-center bg-no-repeat min-h-[480px] sm:min-h-[540px] flex items-center"
      style={{
        backgroundImage: `url('/images/backgrounds/hero-tiruchendur-car.jpg')`,
      }}
    >
      {/* Soft royal navy gradient blend for crisp text readability while showcasing Tiruchendur Temple & car */}
      <div className="absolute inset-0 sm:inset-y-0 sm:left-0 sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#1b203d]/90 via-[#1b203d]/70 to-transparent pointer-events-none z-10"></div>

      {/* Subtle top/bottom framing */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#1b203d]/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#1b203d]/80 to-transparent pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 w-full">
        {/* Left Content */}
        <div className="max-w-lg lg:max-w-xl space-y-3.5 sm:space-y-4 py-4 sm:py-8">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-gold uppercase block">
            24/7 Reservations & Travel Assistance • South India
          </span>

          <h1 className="font-black font-heading leading-tight tracking-tight drop-shadow-md">
            <span className="text-white block text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase">
              CONTACT OUR TRAVEL DESK
            </span>
            <span className="text-[#E8C148] block text-xl sm:text-2xl lg:text-3xl font-extrabold mt-0.5 sm:mt-1">
              BOOKINGS, QUOTATIONS & ROUTES
            </span>
          </h1>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
            <button
              onClick={() => onOpenBooking ? onOpenBooking() : scrollToForm()}
              className="btn-gold px-5 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>Enquire on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <a
              href="tel:+919894116405"
              className="px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-black/60 hover:bg-black/80 border border-brand-gold/40 text-brand-gold hover:text-white transition-all backdrop-blur-sm flex items-center gap-2 shadow-md"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold" />
              <span>Call Hotline</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
