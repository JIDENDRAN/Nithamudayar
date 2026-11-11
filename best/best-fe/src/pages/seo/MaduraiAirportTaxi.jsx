import React, { useState } from 'react';
import { 
  Plane, 
  Clock, 
  ShieldCheck, 
  Users, 
  Luggage, 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  PhoneCall, 
  MessageCircle,
  MapPin,
  CheckCircle2,
  Car
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MaduraiAirportTaxi({ onOpenBooking }) {
  const [openFaq, setOpenFaq] = useState(null);

  const airportFleet = [
    {
      name: 'Swift Dzire / Etios',
      category: 'Comfort Sedan',
      image: '/images/vehicles/sedan.png',
      seats: '4 Passengers',
      luggage: '2 Standard Bags',
      rate: 'From ₹14/km',
      desc: 'Quick, economical city & outstation transfers for solo flyers and couples.',
    },
    {
      name: 'Toyota Innova Crysta',
      category: 'Premium SUV',
      image: '/images/vehicles/innova.png',
      seats: '7 Passengers',
      luggage: '4 Large Bags',
      rate: 'From ₹20/km',
      desc: 'Captain chairs, extra boot space, and dual AC for family & executive arrivals.',
      badge: 'Most Popular'
    },
    {
      name: 'Force Tempo Traveller & Urbania',
      category: 'Luxury Group Vans',
      image: '/images/vehicles/urbania.png',
      seats: '12 - 17 Passengers',
      luggage: 'Group Luggage',
      rate: 'From ₹25/km',
      desc: 'Pushback luxury seats, high roof, and ample luggage space for wedding & tour groups.',
    }
  ];

  const popularDrops = [
    {
      route: 'Madurai Airport ➔ Meenakshi Temple / City',
      distance: '15 km',
      duration: '30 mins',
      image: '/images/destinations/madurai.jpg',
      tagline: 'Direct doorstep hotel drop',
      badge: 'City Transfer'
    },
    {
      route: 'Madurai Airport ➔ Rameswaram Island',
      distance: '175 km',
      duration: '3.5 hrs',
      image: '/images/destinations/rameswaram.jpg',
      tagline: 'Via 4-lane highway & Pamban Bridge',
      badge: 'Pilgrimage Drop'
    },
    {
      route: 'Madurai Airport ➔ Kodaikanal Hills',
      distance: '135 km',
      duration: '3.5 hrs',
      image: '/images/destinations/kodaikanal.jpg',
      tagline: 'Smooth Ghat road to your hill resort',
      badge: 'Scenic Hill Drop'
    },
    {
      route: 'Madurai Airport ➔ Trichy / Delta Shrines',
      distance: '140 km',
      duration: '2.5 hrs',
      image: '/images/destinations/trichy-airport.jpg',
      tagline: 'Direct connector to Central TN & Srirangam',
      badge: 'Intercity Hub'
    }
  ];

  const perks = [
    {
      icon: Clock,
      title: 'Flight Delay Guarantee',
      desc: 'We track your flight number in real time. Never pay waiting charges for delayed landings.'
    },
    {
      icon: Users,
      title: 'Arrival Placard Greeting',
      desc: 'Chauffeur welcomes you at arrivals terminal with your name board and assists with luggage.'
    },
    {
      icon: ShieldCheck,
      title: 'Fixed Transparent Rates',
      desc: 'No airport surcharge surprises. Toll, parking, and driver allowance confirmed upfront.'
    },
    {
      icon: Plane,
      title: '24/7 Door-to-Terminal',
      desc: 'Midnight arrivals or early 4 AM departures, our fleet operates around the clock.'
    }
  ];

  const faqs = [
    {
      q: 'How far is Madurai Airport (IXM) from the city center?',
      a: 'Madurai Airport is situated approximately 15 km from Meenakshi Amman Temple and the central railway junction. The drive takes around 30 to 40 minutes via Ring Road.'
    },
    {
      q: 'Do you charge extra if my flight lands late?',
      a: 'No. We monitor flight schedules live. If your flight is delayed or rescheduled, your chauffeur adjusts pickup time with zero waiting penalty.'
    },
    {
      q: 'Can I book a direct outstation cab from the airport?',
      a: 'Yes. Over 60% of our airport travelers head straight to Rameswaram, Kodaikanal, Palani, or Kumbakonam without having to enter city traffic.'
    },
    {
      q: 'Where will the driver meet me at the airport?',
      a: 'Your driver will be waiting just outside the baggage exit / arrivals gate holding a placard with your name.'
    }
  ];

  const handleBooking = (targetRoute = 'Madurai Airport Taxi') => {
    if (onOpenBooking) {
      onOpenBooking({
        destinationCity: targetRoute,
        pickupCity: 'Madurai Airport (IXM)'
      });
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900">
      
      {/* ─── Hero Section ──────────────────────────────────────────────── */}
      <section 
        className="relative py-16 sm:py-24 px-4 sm:px-10 bg-[#1b203d] text-white overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/destinations/madurai-airport.jpg')`
        }}
      >
        {/* Soft dark royal blend for pristine text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b203d] via-[#1b203d]/90 to-[#1b203d]/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-[#FCF6BA] backdrop-blur-xs">
            <Plane className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              24/7 Airport Chauffeur Transfers
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight max-w-3xl">
            <span className="text-white block sm:inline">MADURAI AIRPORT TAXI </span>
            <span className="text-[#E8C148] block sm:inline">& OUTSTATION DROPS</span>
          </h1>

          <p className="text-xs sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            Doorstep arrivals greeting, flight delay tracking with zero extra waiting charge, and direct outstation transfers to Rameswaram, Kodaikanal, and temple circuits.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleBooking('Madurai Airport Taxi')}
              className="btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Book Airport Cab</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919894116405?text=Hello%2C%20I%20need%20an%20airport%20taxi%20booking"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Quote</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 4 Pillars of Airport Reliability ─────────────────────────── */}
      <section className="py-8 sm:py-12 px-4 sm:px-10 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold font-heading text-neutral-900">
                  {perk.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Airport Fleet Options (Visual Cards with Car Images) ────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-10 max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
            Verified Airport Vehicles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900 tracking-tight">
            Airport Transfer Fleet & Tariffs
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Choose the right vehicle size for your luggage and passenger count.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {airportFleet.map((car, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-brand-gold/50 transition-all group relative"
            >
              {car.badge && (
                <span className="absolute top-3 right-3 bg-brand-gold text-[#1b203d] font-bold text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  {car.badge}
                </span>
              )}

              <div>
                <span className="text-[10px] font-bold text-brand-gold-dark uppercase tracking-wider block">
                  {car.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-heading text-neutral-900">
                  {car.name}
                </h3>

                {/* Car Image Preview */}
                <div className="h-32 sm:h-36 w-full flex items-center justify-center p-2 my-3 bg-[#F5EFEB]/60 rounded-xl overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-600 py-1 border-b border-neutral-100">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{car.seats}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Luggage className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{car.luggage}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                  {car.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">Outstation Tariff</span>
                  <span className="text-base font-extrabold text-neutral-900 font-heading">{car.rate}</span>
                </div>
                <button
                  onClick={() => handleBooking(car.name)}
                  className="btn-gold py-1.5 px-3.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Direct Outstation Drops (Visual Destination Cards) ────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-10 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-200 pb-4 gap-3">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Direct Airport-to-Destination
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900 tracking-tight">
                Popular Outstation Drops
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm">
              Skip city traffic. Catch direct 4-lane highway transfers straight from the airport terminal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularDrops.map((drop, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-32 w-full overflow-hidden bg-neutral-100">
                    <img 
                      src={drop.image} 
                      alt={drop.route} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                    <span className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-[#FCF6BA] border border-brand-gold/40 text-[9px] font-bold px-2 py-0.5 rounded">
                      {drop.badge}
                    </span>
                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold flex justify-between">
                      <span>{drop.distance}</span>
                      <span>~{drop.duration}</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors line-clamp-1">
                      {drop.route.split('➔')[1] || drop.route}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      {drop.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0">
                  <button
                    onClick={() => handleBooking(drop.route)}
                    className="w-full btn-gold py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all shadow-2xs"
                  >
                    <span>Book Route</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions (Accordion) ───────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-10 max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
            Airport Taxi Queries
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-neutral-900 cursor-pointer hover:text-brand-gold-dark transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-brand-gold-dark shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 bg-neutral-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom Callout Banner ────────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-10 bg-[#1b203d] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1 text-[#FCF6BA] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-brand-gold" />
            <span>Guaranteed On-Time Chauffeur Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
            Need an Airport Taxi for Today or Tomorrow?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Connect directly with our 24/7 airport desk. Get instant vehicle confirmation and chauffeur details on WhatsApp.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleBooking('Madurai Airport Taxi')}
              className="w-full sm:w-auto btn-gold px-7 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer active:scale-95 transition-all"
            >
              Book Chauffeur Online
            </button>
            <a
              href="tel:+919894116405"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all inline-flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-brand-gold" />
              <span>Call: +91 98941 16405</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
