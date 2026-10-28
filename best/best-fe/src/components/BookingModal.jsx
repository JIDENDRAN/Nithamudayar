import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MapPin, Calendar, Users, PhoneCall, Car, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

export default function BookingModal({ isOpen, onClose, initialData, defaultVehicle, defaultPackage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: 'Thanjavur',
    destination: '',
    date: '',
    time: '08:00',
    vehicle: 'Toyota Innova Crysta (6+1 SUV)',
    packageType: 'Custom Itinerary',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        pickup: initialData.pickupCity || prev.pickup,
        destination: initialData.destinationCity || initialData.title || initialData.city || initialData.name || prev.destination,
        date: initialData.travelDate || prev.date,
        vehicle: initialData.vehicle || initialData.name || prev.vehicle,
        packageType: initialData.title || prev.packageType
      }));
    } else if (defaultVehicle || defaultPackage) {
      setFormData(prev => ({
        ...prev,
        vehicle: defaultVehicle || prev.vehicle,
        packageType: defaultPackage || prev.packageType
      }));
    }
  }, [initialData, defaultVehicle, defaultPackage, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.destination) {
      alert('Please fill in your name, phone number, and destination.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save to backend database for admin dashboard
      await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromLocation: formData.pickup,
          toLocation: formData.destination,
          date: formData.date || 'Flexible',
          time: formData.time || 'Flexible',
          name: formData.name,
          phone: formData.phone,
          vehicle: formData.vehicle,
          packageType: formData.packageType
        }),
      }).catch(err => console.warn('Backend API booking sync (offline/silent):', err));
    } catch (err) {
      console.warn('Backend sync failed, continuing to WhatsApp:', err);
    }

    setIsSuccess(true);

    // 2. Open WhatsApp directly with formatted message to Nithamudayar Tours & Travels Pvt Ltd
    const msg = `*Booking Enquiry - Nithamudayar Tours & Travels Pvt Ltd*%0A` +
      `• Name: ${formData.name}%0A` +
      `• Phone: ${formData.phone}%0A` +
      `• Pickup City: ${formData.pickup}%0A` +
      `• Destination: ${formData.destination}%0A` +
      `• Travel Date: ${formData.date || 'Flexible'} (Time: ${formData.time})%0A` +
      `• Vehicle: ${formData.vehicle}%0A` +
      `• Package: ${formData.packageType}%0A` +
      `• Notes: ${formData.notes || 'None'}`;

    setTimeout(() => {
      window.open(`https://wa.me/919894116405?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#241815] border border-brand-gold/40 rounded-2xl shadow-2xl p-5 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Top Gold Shimmer Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 sm:mb-6 pr-6">
          <span className="text-[10px] sm:text-xs font-bold text-brand-gold uppercase tracking-widest block mb-1">
            Nithamudayar Tours & Travels Pvt Ltd
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Book Vehicle / Custom Tour
          </h2>
          <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
            Fill in your trip details below. Our central booking desk will respond within 5–15 minutes with verified tariff & vehicle confirmation.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Connecting to WhatsApp Desk...</h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto">
              Your travel enquiry has been recorded. Redirecting to WhatsApp to send your itinerary directly to our booking manager.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs sm:text-sm">
            
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Full Name <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Phone (WhatsApp Preferred) <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors"
                />
              </div>
            </div>

            {/* Pickup & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-gold" />
                  <span>Pickup City / Location</span>
                </label>
                <select
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors cursor-pointer"
                >
                  <option value="Thanjavur">Thanjavur (Headquarters Hub)</option>
                  <option value="Trichy">Trichy (Airport / Central Railway)</option>
                  <option value="Kumbakonam">Kumbakonam (Temple Precinct)</option>
                  <option value="Madurai">Madurai (Junction / Airport)</option>
                  <option value="Coimbatore">Coimbatore (Airport / City)</option>
                  <option value="Chennai">Chennai (Airport / Central)</option>
                  <option value="Rameswaram">Rameswaram</option>
                  <option value="Other South India Location">Other South India Location</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-gold" />
                  <span>Destination / Route <span className="text-brand-gold">*</span></span>
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  placeholder="e.g. Kumbakonam / Madurai / Ooty"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-gold" />
                  <span>Travel Date <span className="text-brand-gold">*</span></span>
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Pickup Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors"
                />
              </div>
            </div>

            {/* Vehicle & Package */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                  <Car className="w-3 h-3 text-brand-gold" />
                  <span>Vehicle Type</span>
                </label>
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors cursor-pointer"
                >
                  <option value="Sedan (Dzire / Etios) - ₹14/km">Sedan (Dzire / Etios) - ₹14/km</option>
                  <option value="SUV (Ertiga / Carens) - ₹19/km">SUV (Ertiga / Carens) - ₹19/km</option>
                  <option value="Toyota Innova Crysta - ₹22/km">Toyota Innova Crysta - ₹22/km</option>
                  <option value="Force Tempo Traveller - ₹25/km">Force Tempo Traveller - ₹25/km</option>
                  <option value="Force Urbania Luxury Van - ₹33/km">Force Urbania Luxury Van - ₹33/km</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Trip / Service Type
                </label>
                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleInputChange}
                  className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors cursor-pointer"
                >
                  <option value="Airport pickup and drop">Airport pickup and drop</option>
                  <option value="Local trip">Local trip</option>
                  <option value="Outstation Trip">Outstation Trip</option>
                  <option value="Corporation trip">Corporation trip</option>
                  <option value="Family trip">Family trip</option>
                  <option value="Honeymoon trip">Honeymoon trip</option>
                  <option value="Tamil Nadu Heritage Circuit">Tamil Nadu Heritage Circuit</option>
                  <option value="Arupadai Murugan Temple Tour">Arupadai Murugan Temple Tour</option>
                  <option value="Mountain Area Tourism">Mountain Area Tourism</option>
                  <option value="Backwater Places Explorer">Backwater Places Explorer</option>
                  <option value="Custom Itinerary">Custom Itinerary</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                Trip Details / Special Requests
              </label>
              <textarea
                name="notes"
                rows="2"
                placeholder="Number of days, flight/train timing, senior citizens, hotel stopovers..."
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full bg-[#18110f] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-brand-gold/30 active:scale-95 transition-all disabled:opacity-75"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Processing Enquiry...' : 'Confirm & Send to WhatsApp Desk'}</span>
              </button>
              <p className="text-[10px] text-neutral-400 text-center mt-2">
                ✓ Free instant quotation • Zero cancellation fee for advance bookings
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
