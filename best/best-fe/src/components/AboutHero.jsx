import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutHero({ onOpenBooking }) {
  return (
    <section 
      id="about-hero" 
      className="relative w-full pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#352016] text-white overflow-hidden bg-cover bg-[position:65%_center] sm:bg-right lg:bg-center bg-no-repeat min-h-[460px] sm:min-h-[520px] flex items-center"
      style={{
        backgroundImage: `url('/images/backgrounds/about-fleet-hero.png')`,
      }}
    >
      {/* Soft gradient blend: warm brown shade on mobile view alone, rich blend on desktop */}
      <div className="absolute inset-0 sm:inset-y-0 sm:left-0 sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#352016]/65 via-[#352016]/40 to-transparent sm:from-[#352016] sm:via-[#352016]/85 sm:to-transparent pointer-events-none z-10"></div>

      {/* Subtle top/bottom vignette: warm brown framing on mobile view alone */}
      <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-[#352016]/55 sm:from-[#352016]/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-12 sm:h-14 bg-gradient-to-t from-[#352016]/50 sm:from-[#352016]/80 to-transparent pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 w-full">
        {/* Left Content */}
        <div className="max-w-lg lg:max-w-xl space-y-3.5 sm:space-y-4 py-4 sm:py-8">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-gold uppercase block">
            Tamil Nadu & South India Tour Specialists
          </span>

          <h1 className="font-black font-heading leading-tight tracking-tight drop-shadow-md">
            <span className="text-white block text-2xl sm:text-3xl lg:text-4xl">
              ABOUT NITHAMUDAYAR
            </span>
            <span className="text-gold-shine block text-xl sm:text-2xl lg:text-3xl mt-0.5 sm:mt-1">
              TOURS & TRAVELS
            </span>
          </h1>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gold px-5 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book A Vehicle</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <Link
              to="/fleet"
              className="px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-black/60 hover:bg-black/80 border border-brand-gold/40 text-brand-gold hover:text-white transition-all backdrop-blur-sm shadow-md"
            >
              Explore Commercial Fleet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
