import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Car, ArrowRight } from 'lucide-react';

export default function QuickBookingBar({ onOpenBooking }) {
  const [pickupPlace, setPickupPlace] = useState('');
  const [dropPlace, setDropPlace] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [carType, setCarType] = useState('Toyota Innova Crysta (7+1 Seats)');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const text = `Hello Nithamudayar Tours & Travels Pvt Ltd,
I would like to book a cab with the following details:

📍 *Pickup Place:* ${pickupPlace.trim() || 'Not specified'}
🎯 *Drop Place:* ${dropPlace.trim() || 'Not specified'}
📅 *Travel Date:* ${travelDate || 'Flexible'}
⏰ *Pickup Time:* ${travelTime || 'Flexible'}
🚗 *Car Type:* ${carType}

Please share tariff quotation & confirm vehicle availability. Thank you!`;

    const whatsappUrl = `https://wa.me/919894116405?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    if (onOpenBooking) {
      onOpenBooking({
        pickupCity: pickupPlace,
        destinationCity: dropPlace,
        fromLocation: pickupPlace,
        toLocation: dropPlace,
        travelDate,
        travelTime,
        vehicle: carType
      });
    }
  };

  return (
    <section className="relative z-20 py-3.5 sm:py-8 px-3 sm:px-10 bg-[#FAF8F5] border-b border-neutral-200">
      <div className="max-w-md lg:max-w-7xl mx-auto">
        <div className="bg-[#1b203d] rounded-xl sm:rounded-2xl border border-brand-gold/35 p-3 sm:p-6 shadow-xl relative overflow-hidden">
          
          {/* Subtle Top Gold Shimmer Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80"></div>
          
          {/* Header Row */}
          <div className="pb-2 mb-2.5 sm:pb-3.5 sm:mb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-brand-gold block">
                Instant Fare & Availability Calculator
              </span>
              <h2 className="text-xs sm:text-base font-bold font-heading text-white">
                Enter Trip Details & Reserve on WhatsApp
              </h2>
            </div>
            <span className="text-[10px] sm:text-xs text-[#FCF6BA]/90 font-medium">
              24/7 Doorstep Service Across South India
            </span>
          </div>

          {/* Booking Inputs Grid (Compact 2-col on mobile, 6-col on desktop) */}
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 items-end">
            
            {/* 1. Pickup Place (Manually Typed) */}
            <div className="col-span-1">
              <label className="block text-[10px] sm:text-xs font-semibold text-neutral-300 mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" /> 
                <span className="truncate">Pickup Place</span>
              </label>
              <input
                type="text"
                required
                placeholder="Type pickup place"
                value={pickupPlace}
                onChange={(e) => setPickupPlace(e.target.value)}
                className="w-full bg-[#12162b] border border-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* 2. Drop Place (Manually Typed) */}
            <div className="col-span-1">
              <label className="block text-[10px] sm:text-xs font-semibold text-neutral-300 mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" /> 
                <span className="truncate">Drop Place</span>
              </label>
              <input
                type="text"
                required
                placeholder="Type drop place"
                value={dropPlace}
                onChange={(e) => setDropPlace(e.target.value)}
                className="w-full bg-[#12162b] border border-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* 3. Travel Date (Date Selected) */}
            <div className="col-span-1">
              <label className="block text-[10px] sm:text-xs font-semibold text-neutral-300 mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" /> 
                <span className="truncate">Travel Date</span>
              </label>
              <input
                type="date"
                min={todayStr}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-[#12162b] border border-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* 4. Travel Time (Time Selected) */}
            <div className="col-span-1">
              <label className="block text-[10px] sm:text-xs font-semibold text-neutral-300 mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" /> 
                <span className="truncate">Pickup Time</span>
              </label>
              <input
                type="time"
                value={travelTime}
                onChange={(e) => setTravelTime(e.target.value)}
                className="w-full bg-[#12162b] border border-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* 5. Car Type (Selected from Options without Prices) */}
            <div className="col-span-2 md:col-span-2 lg:col-span-1">
              <label className="block text-[10px] sm:text-xs font-semibold text-neutral-300 mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                <Car className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" /> 
                <span className="truncate">Car Type</span>
              </label>
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="w-full bg-[#12162b] border border-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold transition-colors truncate"
              >
                <option value="Sedan (Dzire / Etios - 4+1 Seats)">Sedan (Dzire / Etios - 4+1)</option>
                <option value="SUV (Ertiga / Carens - 6+1 Seats)">SUV (Ertiga / Carens - 6+1)</option>
                <option value="Toyota Innova Crysta (7+1 Seats)">Innova Crysta (7+1 Seats)</option>
                <option value="Force Tempo Traveller (12 to 14 Seats)">Tempo Traveller (12/14 Seats)</option>
                <option value="Force Urbania Luxury Van (12 to 17 Seats)">Force Urbania Luxury (12/17)</option>
              </select>
            </div>

            {/* 6. Submit Button (Direct to WhatsApp) */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1 pt-0.5 sm:pt-0">
              <button
                type="submit"
                className="w-full btn-gold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-md hover:shadow-brand-gold/30 active:scale-95 transition-all group/btn"
              >
                <span>Book on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
