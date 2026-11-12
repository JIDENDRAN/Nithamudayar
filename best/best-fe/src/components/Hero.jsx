import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ onOpenBooking }) {
  return (
    <section 
      id="home" 
      className="relative w-full pt-20 sm:pt-24 pb-8 sm:pb-12 bg-[#10194E] text-white overflow-hidden bg-cover bg-[position:75%_bottom] sm:bg-[position:right_bottom] lg:bg-[position:right_bottom] bg-no-repeat min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] xl:min-h-[560px] flex items-center"
      style={{
        backgroundImage: `url('/hero-thanjavur-car.png')`,
      }}
    >
      {/* Soft gradient blend for readability while keeping the car & temple vibrant on the right */}
      <div className="absolute inset-0 sm:inset-y-0 sm:left-0 sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#10194E]/90 via-[#10194E]/60 to-transparent pointer-events-none z-10"></div>
      
      {/* Subtle top edge shading */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#10194E]/80 to-transparent pointer-events-none z-10"></div>
      {/* Very soft bottom blend so car wheels and ground are 100% visible */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#10194E]/30 to-transparent pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 w-full">
        <div className="max-w-lg lg:max-w-xl space-y-3 py-2 sm:py-3">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0B1138]/80 border border-brand-gold/40 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FCF6BA] uppercase">
              Tamil Nadu Tour & Travel Services
            </span>
          </div>

          {/* Main Brand Title */}
          <div>
            <h1 className="font-black font-heading leading-tight tracking-tight drop-shadow-md">
              <span className="text-white block text-2xl sm:text-3xl lg:text-3xl tracking-wide uppercase">
                NITHAMUDAYAR
              </span>
              <span className="text-[#E8C148] block text-lg sm:text-xl lg:text-2xl font-extrabold mt-0.5">
                TOURS & TRAVELS PVT LTD
              </span>
            </h1>

            {/* Best Single Business Slogan */}
            <p className="text-sm sm:text-base lg:text-lg font-bold text-[#E8C148] drop-shadow mt-1.5">
              “Your Royal Journey Across Tamil Nadu”
            </p>
          </div>

          {/* Clean, Short Subtitle */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md drop-shadow">
            Luxury commercial fleet & pilgrimage tours at transparent rates from ₹14/km. 24/7 on-time service guaranteed.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-0.5">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gold px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book A Vehicle</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/packages"
              className="px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-black/50 hover:bg-black/80 border border-brand-gold/40 text-brand-gold hover:text-white transition-all backdrop-blur-sm shadow-md"
            >
              Explore Packages
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
