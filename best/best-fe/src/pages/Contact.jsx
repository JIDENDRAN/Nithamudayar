import React, { useState } from 'react';
import ContactHero from '../components/ContactHero';
import MobileContactHero from '../components/mobile/MobileContactHero';
import API_BASE_URL from '../apiConfig';
import { 
  MapPin, 
  Phone, 
  PhoneCall, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  ShieldCheck, 
  ChevronDown, 
  Navigation, 
  ArrowRight 
} from 'lucide-react';

export default function Contact({ onOpenBooking }) {
  const [tripType, setTripType] = useState('Round Trip');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickup: 'Thanjavur',
    destination: '',
    date: '',
    returnDate: '',
    passengers: '4-7 Persons',
    vehicle: 'Toyota Innova Crysta (6+1)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const tripTypes = [
    { id: 'Round Trip', label: 'Round Trip' },
    { id: 'One-Way Drop', label: 'One-Way Drop' },
    { id: 'Temple Circuit', label: 'Temple Pilgrimage' },
    { id: 'Group Charter', label: 'Bus / Group Charter' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Save to backend database for Admin Dashboard
    try {
      await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || 'N/A',
          phone: formData.phone,
          message: `[${tripType}] Route: ${formData.pickup} to ${formData.destination}, Date: ${formData.date}${formData.returnDate ? ` to ${formData.returnDate}` : ''}, Passengers: ${formData.passengers}, Vehicle: ${formData.vehicle}, Notes: ${formData.message || 'Standard Request'}`
        })
      }).catch(err => console.warn('Offline contact sync:', err));
    } catch (err) {
      console.warn('Backend sync failed, continuing to WhatsApp:', err);
    }

    const text = `*New Travel Enquiry - Nithamudayar Tours & Travels Pvt Ltd*%0A` +
      `• Trip Type: ${tripType}%0A` +
      `• Name: ${formData.name}%0A` +
      `• Phone: ${formData.phone}%0A` +
      `• Email: ${formData.email || 'N/A'}%0A` +
      `• Pickup City: ${formData.pickup}%0A` +
      `• Destination: ${formData.destination}%0A` +
      `• Travel Date: ${formData.date}${formData.returnDate ? ` to ${formData.returnDate}` : ''}%0A` +
      `• Passengers: ${formData.passengers}%0A` +
      `• Vehicle: ${formData.vehicle}%0A` +
      `• Notes: ${formData.message || 'Standard Request'}`;

    setTimeout(() => {
      window.open(`https://wa.me/919894116405?text=${text}`, '_blank');
      setSubmitted(false);
    }, 800);
  };

  return (
    <div className="bg-[#FAF8F5] pb-16 md:pb-0">
      {/* 1. Dedicated Mobile Hero View (< 768px) */}
      <div className="block md:hidden">
        <MobileContactHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Dedicated Desktop Hero View (>= 768px) with fitted map pin hero */}
      <div className="hidden md:block">
        <ContactHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 3. Four Elegant Concierge Cards */}
      <section className="relative -mt-6 sm:-mt-10 z-30 px-4 sm:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: 24/7 Phone Hotline */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-brand-gold/25 shadow-lg shadow-black/5 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between group active:scale-[0.98]">
            <div>
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-brand-gold-dark via-brand-gold to-brand-gold-bright text-[#241815] flex items-center justify-center shadow-md mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark block">
                Direct Reservation
              </span>
              <h3 className="text-xs sm:text-base font-extrabold font-heading text-neutral-900 mt-0.5">
                24/7 Hotline
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed">
                Immediate vehicle dispatch & on-call assistance.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-3 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <a
                  href="tel:+919894116405"
                  className="text-[10px] sm:text-xs font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1 transition-colors"
                >
                  <span>98941 16405</span>
                  <ArrowRight className="w-2.5 h-2.5 text-brand-gold-dark" />
                </a>
                <a
                  href="tel:+919626116405"
                  className="text-[10px] sm:text-xs font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1 transition-colors"
                >
                  <span>96261 16405</span>
                  <ArrowRight className="w-2.5 h-2.5 text-brand-gold-dark" />
                </a>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                Live
              </span>
            </div>
          </div>

          {/* Card 2: Instant WhatsApp Desk */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-brand-gold/25 shadow-lg shadow-black/5 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between group active:scale-[0.98]">
            <div>
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-brand-gold-dark via-brand-gold to-brand-gold-bright text-[#241815] flex items-center justify-center shadow-md mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark block">
                Instant Chat
              </span>
              <h3 className="text-xs sm:text-base font-extrabold font-heading text-neutral-900 mt-0.5">
                WhatsApp Desk
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed">
                Vehicle photos, quotes & live driver tracking.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-3 border-t border-neutral-100 flex items-center justify-between">
              <a
                href="https://wa.me/919894116405?text=Hello%20Nithamudayar%20Tours%20and%20Travels,%20I%20would%20like%20to%20enquire%20about%20a%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1 transition-colors"
              >
                <span>Chat Now</span>
                <ArrowRight className="w-3 h-3 text-brand-gold-dark" />
              </a>
              <span className="text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Online
              </span>
            </div>
          </div>

          {/* Card 3: Official Email */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-brand-gold/25 shadow-lg shadow-black/5 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between group active:scale-[0.98]">
            <div>
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-brand-gold-dark via-brand-gold to-brand-gold-bright text-[#241815] flex items-center justify-center shadow-md mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark block">
                Written Quotation
              </span>
              <h3 className="text-xs sm:text-base font-extrabold font-heading text-neutral-900 mt-0.5">
                Email Desk
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed">
                Send itineraries, bus charters & billing specs.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-3 border-t border-neutral-100 flex items-center justify-between">
              <a
                href="mailto:booking@nithamudayartravels.com"
                className="text-[10px] sm:text-xs font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1 transition-colors"
              >
                <span>Email Team</span>
                <ArrowRight className="w-3 h-3 text-brand-gold-dark shrink-0" />
              </a>
            </div>
          </div>

          {/* Card 4: Operating Hub */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-brand-gold/25 shadow-lg shadow-black/5 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between group active:scale-[0.98]">
            <div>
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-brand-gold-dark via-brand-gold to-brand-gold-bright text-[#241815] flex items-center justify-center shadow-md mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark block">
                Primary Depot
              </span>
              <h3 className="text-xs sm:text-base font-extrabold font-heading text-neutral-900 mt-0.5">
                Depot & Hubs
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed">
                Trichy, Kumbakonam, Madurai, Coimbatore & Chennai.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold text-neutral-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-gold-dark shrink-0" />
                <span>24/7 Dispatch</span>
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold-dark">
                TN
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Main Section: Reservation Studio + Operational Information & Map */}
      <section id="contact-form-section" className="py-10 sm:py-16 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column (7 Cols): Elegant Travel Reservation Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-9 border border-neutral-200/80 shadow-xl shadow-black/[0.03]">
              
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-neutral-100">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900">
                    Book or Request a Tariff Quote
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-[11px] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
                  <span>5-15 Min Response</span>
                </div>
              </div>

              {submitted ? (
                <div className="py-14 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-heading text-neutral-900">Enquiry Prepared!</h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto">
                      Opening WhatsApp to send your complete travel plan directly to our dispatch desk...
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block px-4 py-2 bg-[#241815] text-brand-gold text-xs font-bold rounded-lg">
                      Connecting with Desk...
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Trip Type Selector Pills */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                      Select Journey Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {tripTypes.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTripType(t.id)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                            tripType === t.id
                              ? 'bg-[#241815] text-brand-gold border-2 border-brand-gold shadow-sm font-bold'
                              : 'bg-neutral-50 text-neutral-700 border border-neutral-200 hover:border-brand-gold/60'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Your Full Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Mobile Number (WhatsApp Preferred) <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors"
                      />
                    </div>
                  </div>

                  {/* Pickup & Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Pickup City / Location <span className="text-amber-600">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.pickup}
                          onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors appearance-none cursor-pointer"
                        >
                          <option value="Thanjavur">Thanjavur (Headquarters Hub)</option>
                          <option value="Trichy">Trichy (Airport / Central Railway)</option>
                          <option value="Kumbakonam">Kumbakonam (Temple Precinct)</option>
                          <option value="Madurai">Madurai (Junction / Airport)</option>
                          <option value="Coimbatore">Coimbatore (Airport / City)</option>
                          <option value="Chennai">Chennai (Airport / Central)</option>
                          <option value="Rameswaram">Rameswaram</option>
                          <option value="Other Tamil Nadu Location">Other Tamil Nadu Location</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Destination / Pilgrimage Route <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Navagraha Circuit / Ooty / Rameswaram"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors"
                      />
                    </div>
                  </div>

                  {/* Dates & Passengers */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Travel Start Date <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Return Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Total Passenger Count
                      </label>
                      <div className="relative">
                        <select
                          value={formData.passengers}
                          onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors appearance-none cursor-pointer"
                        >
                          <option value="1-4 Persons (Sedan)">1 - 4 Persons (Sedan)</option>
                          <option value="4-7 Persons (Innova)">4 - 7 Persons (Innova)</option>
                          <option value="8-14 Persons (Tempo)">8 - 14 Persons (Tempo 14S)</option>
                          <option value="15-20 Persons (Tempo)">15 - 20 Persons (Tempo 20S)</option>
                          <option value="25-36 Persons (Mini Coach)">25 - 36 Persons (Mini Coach)</option>
                          <option value="40-54 Persons (Luxury Bus)">40 - 54 Persons (Luxury Bus)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Choice */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Preferred Vehicle Category <span className="text-amber-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors appearance-none cursor-pointer"
                      >
                        <option value="Toyota Innova Crysta (6+1 • Premium SUV)">
                          Toyota Innova Crysta (6+1 Seater • Captain Seats • Dual AC) - Recommended
                        </option>
                        <option value="Maruti Suzuki Dzire (4+1 • Comfort Sedan)">
                          Maruti Suzuki Dzire (4+1 Seater • Budget Sedan • Climate Control)
                        </option>
                        <option value="Force Tempo Traveller (12/17 Seater • AC)">
                          Force Tempo Traveller (12/17 Seater • Pushback Seats • Group Travel)
                        </option>
                        <option value="Force Urbania Luxury Van (10/13 Seater • Executive)">
                          Force Urbania Luxury Van (10/13 Seater • Plush VIP Interiors)
                        </option>
                        <option value="Luxury Coach Tourist Bus (36/49 Seater • Air Suspension)">
                          Luxury Coach Tourist Bus (36/49 Seater • Air Suspension • Long Haul)
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Notes / Itinerary */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Itinerary Notes, Pickup Time or Special Requests
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Specify flight/train number, number of days, senior citizen requirements, temple sequence..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-brand-gold focus:bg-white text-xs transition-colors"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn-gold py-3.5 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit & Enquire via WhatsApp Desk</span>
                    </button>
                    <p className="text-[11px] text-neutral-500 text-center mt-2.5 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>No advance required to receive an itemized transparent quotation.</span>
                    </p>
                  </div>

                </form>
              )}

            </div>

            {/* Right Column (5 Cols): Executive Information, Operational Network & Live Map */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Executive Contact Card */}
              <div className="bg-[#241815] text-white rounded-3xl p-6 sm:p-7 border border-brand-gold/30 shadow-2xl relative overflow-hidden">
                
                {/* Subtle decorative glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                        Direct Operator
                      </span>
                      <h3 className="text-lg font-black font-heading text-white">
                        Nithamudayar Tours & Travels Pvt Ltd
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-brand-gold/40 p-0.5 bg-[#342521]">
                      <img src="/logo.png" alt="Emblem" className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Operations Headquarters</p>
                        <p className="text-neutral-300 mt-0.5 leading-relaxed font-medium">
                          Melavasthachavadi, Abinaya Grand Air force, Pudukkottai Road, Thanjavur - 613005
                        </p>
                        <p className="text-neutral-400 text-[11px] mt-0.5">
                          Depot & garage network covering all 38 districts & South India.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Phone & WhatsApp Hotline</p>
                        <div className="flex flex-col sm:flex-row sm:gap-3 text-neutral-300 mt-0.5 font-semibold">
                          <a href="tel:+919894116405" className="hover:text-brand-gold transition-colors">
                            +91 98941 16405
                          </a>
                          <span className="hidden sm:inline text-neutral-500">•</span>
                          <a href="tel:+919626116405" className="hover:text-brand-gold transition-colors">
                            +91 96261 16405
                          </a>
                        </div>
                        <p className="text-[11px] text-neutral-400">Available 24 hours / 7 days</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Email Reservations</p>
                        <p className="text-neutral-300 mt-0.5">
                          <a href="mailto:booking@nithamudayartravels.com" className="hover:text-brand-gold transition-colors">
                            booking@nithamudayartravels.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Dispatch & Service Hours</p>
                        <p className="text-neutral-400 mt-0.5 leading-relaxed">
                          Round-the-clock driver availability for early morning 4:00 AM darshans and late-night highway transfers.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Highlights tag strip */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px]">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-brand-gold border border-brand-gold/30">
                      ✓ Zero Hidden Charges
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-brand-gold border border-brand-gold/30">
                      ✓ Sanitized Fleet
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-brand-gold border border-brand-gold/30">
                      ✓ Verified Chauffeurs
                    </span>
                  </div>

                </div>
              </div>

              {/* Service Coverage Map */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-brand-gold-dark" />
                    <h3 className="text-sm font-bold font-heading text-neutral-900">
                      Service Coverage Map
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Tamil Nadu & South India
                  </span>
                </div>

                {/* Google Maps Embed with clean curved container */}
                <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-inner h-64 bg-neutral-100">
                  <iframe
                    title="Nithamudayar Tours & Travels Pvt Ltd Regional Map Coverage"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4013446.541399479!2d76.51659929291176!3d10.78673030249219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63933!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Urgent Dispatch Callout Banner */}
      <section className="py-8 sm:py-12 px-4 sm:px-10 bg-gradient-to-r from-[#241815] via-[#342521] to-[#241815] text-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
              Need A Cab Within 30–45 Minutes?
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              Emergency Dispatch & Immediate Pickups
            </h3>
            <p className="text-xs text-neutral-300 max-w-md">
              Call our central controller directly for immediate station transfers or urgent outstation journeys.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+919894116405"
              className="btn-gold py-3 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 98941 16405</span>
            </a>
            <a
              href="https://wa.me/919894116405?text=Hello%20Nithamudayar%20Travels,%20I%20need%20an%20urgent%20vehicle%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              Quick WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
