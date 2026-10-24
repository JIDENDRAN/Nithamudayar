import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutHero from '../components/AboutHero';
import MobileAboutHero from '../components/mobile/MobileAboutHero';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

function AnimatedCounter({ end, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  return (
    <span className="tabular-nums inline-block">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function AboutPage({ onOpenBooking }) {
  const stats = [
    { target: 15, suffix: '+', label: 'Years Experience', desc: 'Serving travelers across South India' },
    { target: 10000, suffix: '+', label: 'Happy Journeys', desc: 'Families, tourists & groups served' },
    { target: 50, suffix: '+', label: 'Verified Vehicles', desc: 'From budget sedans to luxury coaches' },
    { target: 24, suffix: '/7', label: 'Local Support', desc: 'Always available on call & WhatsApp' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Pick Route & Vehicle',
      desc: 'Choose your pickup city, dates, and vehicle size—from a 4-seater sedan to a 49-seater coach.',
    },
    {
      step: '02',
      title: 'Get Clear Price on WhatsApp',
      desc: 'We instantly share confirmed availability, clear tariffs, and driver details with no hidden costs.',
    },
    {
      step: '03',
      title: 'Relax & Enjoy The Trip',
      desc: 'Our courteous chauffeur arrives on time with a clean, fully air-conditioned vehicle at your doorstep.',
    },
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Clean & Sanitized Vehicles',
      desc: 'Every car and bus is thoroughly cleaned, mechanically checked, and AC-tested before every pickup.',
      highlight: 'Spotless AC Interiors',
    },
    {
      icon: Award,
      title: 'Courteous, Route-Expert Drivers',
      desc: 'Our chauffeurs know local temple schedules, smooth highway routes, and safe family dining spots.',
      highlight: 'Local Route Masters',
    },
    {
      icon: Users,
      title: 'Honest & Transparent Tariffs',
      desc: 'Zero hidden fees. You get clear per-km rates, driver allowances, and toll guidelines up front.',
      highlight: 'No Surprise Charges',
    },
    {
      icon: Clock,
      title: 'Always Punctual & 24/7 Ready',
      desc: 'We value your schedule. Doorstep pickups are prompt, with round-the-clock desk support throughout.',
      highlight: 'On-Time Guaranteed',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-neutral-800 pb-16 md:pb-0">
      
      {/* 1. Dedicated Mobile Hero View (< 768px) */}
      <div className="block md:hidden">
        <MobileAboutHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Dedicated Desktop Hero View (>= 768px) with fitted fleet background */}
      <div className="hidden md:block">
        <AboutHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 3. Company Overview - Simple, Neat & Elegant */}
      <section className="py-10 sm:py-20 px-4 sm:px-10 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Story & Editorial Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1 sm:mb-2">
                  About Our Operations
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900 leading-tight">
                  Reliable Chauffeured Road Travel Across South India
                </h2>
              </div>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                <strong className="text-neutral-900 font-semibold">Nithamudayar Tours and Travels</strong> has operated dedicated tourist passenger vehicles across Tamil Nadu and South India for over fifteen years.
              </p>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We specialize in family temple pilgrimages, holiday trips, and group transportation. From early-morning Navagraha darshans around Kumbakonam to multi-day hill station tours and large wedding bus charters, our focus is consistent: clean, mechanically dependable vehicles, seasoned chauffeurs who understand local routes, and clear, transparent pricing.
              </p>

              {/* Clean Editorial Standards - Simple & Elegant */}
              <div className="pt-3 sm:pt-4 border-t border-neutral-200 grid grid-cols-3 gap-3 sm:gap-6">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-brand-gold-dark font-mono block mb-0.5 sm:mb-1">01</span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-0.5 sm:mb-1">Fleet Care</h4>
                  <p className="text-[10px] sm:text-xs text-neutral-500 leading-snug sm:leading-relaxed">
                    Sanitized, AC-checked before every trip.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-brand-gold-dark font-mono block mb-0.5 sm:mb-1">02</span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-0.5 sm:mb-1">Chauffeurs</h4>
                  <p className="text-[10px] sm:text-xs text-neutral-500 leading-snug sm:leading-relaxed">
                    Thorough knowledge of temple timings & routes.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-brand-gold-dark font-mono block mb-0.5 sm:mb-1">03</span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-0.5 sm:mb-1">Clear Rates</h4>
                  <p className="text-[10px] sm:text-xs text-neutral-500 leading-snug sm:leading-relaxed">
                    Honest per-km billing with zero surprise fees.
                  </p>
                </div>
              </div>

            </div>

            {/* Clean Photographic Frame - Pure Elegance, No Floating Badges */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden shadow-md border border-neutral-200 bg-neutral-100">
                <img
                  src="/images/about-story.jpg"
                  alt="Nithamudayar Commercial Fleet and Chauffeur Service"
                  className="w-full h-56 sm:h-96 object-cover block"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 px-1">
                <span>Fleet Operations • South India</span>
                <span className="font-semibold text-brand-gold-dark">Verified Chauffeurs</span>
              </div>
            </div>

          </div>

          {/* Animated Running Numbers Metric Counters */}
          <div className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((item, idx) => (
              <div key={idx} className="border-l-2 border-brand-gold pl-2.5 sm:pl-4 group hover:border-brand-gold-dark transition-colors">
                <p className="text-base sm:text-xl font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors">
                  <AnimatedCounter end={item.target} suffix={item.suffix} duration={1600 + idx * 150} />
                </p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">{item.label}</p>
                <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 leading-snug sm:leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. How It Works - Luxury Dark Themed 3-Step Journey */}
      <section className="relative py-12 sm:py-24 px-4 sm:px-10 bg-gradient-to-b from-[#201512] via-[#291b17] to-[#180e0c] text-white overflow-hidden">
        {/* Golden ambient radial light aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-2.5">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold block">
              Effortless Booking
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              How Easy It Is to Travel With Us
            </h2>
            <p className="text-[11px] sm:text-sm text-neutral-300">
              No long forms or confusing steps. We get you on the road in 3 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {steps.map((st, i) => (
              <div
                key={i}
                className={`bg-[#2a1c18] border border-brand-gold/30 rounded-xl p-3.5 sm:p-7 md:p-8 hover:border-brand-gold transition-colors flex flex-col justify-between shadow-lg ${
                  i === 2 
                    ? 'col-span-2 md:col-span-1 w-full max-w-xs md:max-w-none mx-auto' 
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
                      Step {st.step}
                    </span>
                    <span className="text-lg sm:text-2xl font-bold font-heading text-brand-gold/30">
                      {st.step}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-base md:text-lg font-bold font-heading text-white mb-1.5 sm:mb-2.5">
                    {st.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs md:text-sm text-neutral-300 leading-snug sm:leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. What You Always Get - Our 4 Core Commitments */}
      <section className="py-10 sm:py-20 px-4 sm:px-10 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 border-b border-neutral-200 pb-4 sm:pb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Our Guarantee
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900">
                What Makes Every Journey Special
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-neutral-500 max-w-md">
              Every vehicle and trip is managed with strict quality standards to ensure your family's safety and comfort.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="glow-border-card group cursor-default transition-all duration-300 active:scale-95 hover:-translate-y-1 h-full"
                >
                  <div className="glow-border-card-inner !p-3.5 sm:!p-6 flex flex-col justify-between h-full bg-white">
                    <div>
                      <div className="text-brand-gold-dark mb-2.5 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                      </div>

                      <h3 className="text-xs sm:text-base font-bold font-heading text-neutral-900 mb-1 sm:mb-1.5 group-hover:text-brand-gold-dark transition-colors">
                        {val.title}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-snug sm:leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Clean, Elegant Bottom Callout */}
      <section className="py-10 sm:py-16 px-4 sm:px-10 bg-white border-t border-neutral-200">
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <span className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-gold-dark uppercase block">
            We Are Here To Help
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900">
            Have Questions or Need a Custom Itinerary?
          </h2>
          <p className="text-neutral-600 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            Our customer desk is open 24/7. Connect directly with our friendly travel team for immediate quotes and route suggestions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
            >
              <span>Enquire on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <a
              href="tel:+919894116405"
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold bg-[#FAF8F5] border border-neutral-300 text-neutral-800 hover:border-brand-gold-dark hover:text-brand-gold-dark transition-colors shadow-sm flex items-center gap-1.5 sm:gap-2"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold-dark" />
              <span>Call 98941 16405</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
