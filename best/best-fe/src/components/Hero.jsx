import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ onOpenBooking }) {
  return (
    <section 
      id="home" 
      className="relative w-full pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#241815] text-white overflow-hidden bg-cover bg-[position:70%_center] sm:bg-right lg:bg-center bg-no-repeat min-h-[480px] sm:min-h-[540px] flex items-center"
      style={{
        backgroundImage: `url('/hero-bg-full.png')`,
      }}
    >
      {/* Soft gradient blend for readability while keeping the car & temple vibrant on the right */}
      <div className="absolute inset-0 sm:inset-y-0 sm:left-0 sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#241815]/90 via-[#241815]/60 to-transparent pointer-events-none z-10"></div>
      
      {/* Subtle top & bottom edge shading */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#241815]/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#241815]/80 to-transparent pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 w-full">
        <div className="max-w-lg lg:max-w-xl space-y-4 py-4 sm:py-8">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18110f]/80 border border-brand-gold/40 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#FCF6BA] uppercase">
              Tamil Nadu Tour & Travel Services
            </span>
          </div>

          {/* Main Brand Title */}
          <div>
            <h1 className="font-black font-heading leading-tight tracking-tight drop-shadow-md">
              <span className="text-white block text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase">
                NITHAMUDAYAR
              </span>
              <span className="text-gold-shine block text-xl sm:text-2xl lg:text-3xl font-extrabold mt-0.5">
                TOURS PVT LTD
              </span>
            </h1>

            {/* Best Single Business Slogan */}
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#FCF6BA] drop-shadow mt-2">
              “Your Royal Journey Across Tamil Nadu”
            </p>
          </div>

          {/* Clean, Short Subtitle */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md drop-shadow">
            Luxury commercial fleet & pilgrimage tours at transparent rates from ₹14/km. 24/7 on-time service guaranteed.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gold px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book A Vehicle</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/packages"
              className="px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold bg-black/50 hover:bg-black/80 border border-brand-gold/40 text-brand-gold hover:text-white transition-all backdrop-blur-sm shadow-md"
            >
              Explore Packages
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
