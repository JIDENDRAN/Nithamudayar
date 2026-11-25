import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MapPin, Calendar, Clock, Users, PhoneCall, Car, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

export default function BookingModal({ isOpen, onClose, initialData, defaultVehicle, defaultPackage }) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    date: '',
    time: '08:00',
    vehicle: 'Toyota Innova Crysta (7+1 Seats)',
    packageType: 'Custom Itinerary',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        pickup: initialData.pickupCity || initialData.pickup || prev.pickup || '',
        destination: initialData.destinationCity || initialData.destination || initialData.title || initialData.city || initialData.name || prev.destination || '',
        date: initialData.travelDate || initialData.date || prev.date || '',
        time: initialData.travelTime || initialData.time || prev.time || '08:00',
        vehicle: (initialData.vehicle || initialData.name || prev.vehicle || 'Toyota Innova Crysta (7+1 Seats)').replace(/\s*-\s*₹\d+\/km/g, ''),
        packageType: initialData.packageType || initialData.title || prev.packageType
      }));
    } else if (defaultVehicle || defaultPackage) {
      setFormData(prev => ({
        ...prev,
        vehicle: (defaultVehicle || prev.vehicle).replace(/\s*-\s*₹\d+\/km/g, ''),
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
    if (!formData.name.trim() || !formData.phone.trim() || !formData.pickup.trim() || !formData.destination.trim()) {
      alert('Please fill in your name, phone number, pickup place, and drop place.');
      return;
    }

    setIsSubmitting(true);

    // 1. Non-blocking backend database sync for admin desk
    try {
      fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromLocation: formData.pickup.trim(),
          toLocation: formData.destination.trim(),
          date: formData.date || 'Flexible',
          time: formData.time || 'Flexible',
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          vehicle: formData.vehicle,
          packageType: formData.packageType,
          notes: formData.notes.trim()
        }),
      }).catch(err => console.warn('Backend API booking sync (offline/silent):', err));
    } catch (err) {
      console.warn('Backend sync failed, continuing to WhatsApp:', err);
    }

    // 2. Format detailed message for WhatsApp
    const message = `Hello Nithamudayar Tours & Travels Pvt Ltd,
I would like to book a cab with the following details:

👤 *Name:* ${formData.name.trim()}
📞 *Phone:* ${formData.phone.trim()}
📍 *Pickup Place:* ${formData.pickup.trim()}
🎯 *Drop Place / Destination:* ${formData.destination.trim()}
📅 *Travel Date:* ${formData.date || 'Flexible'}
⏰ *Pickup Time:* ${formData.time || 'Flexible'}
🚗 *Vehicle Type:* ${formData.vehicle}
🗺️ *Trip / Service Type:* ${formData.packageType}
📝 *Special Requests:* ${formData.notes.trim() || 'None'}

Please share tariff quotation & confirm vehicle availability. Thank you!`;

    const whatsappUrl = `https://wa.me/919626116405?text=${encodeURIComponent(message)}`;

    // 3. Directly open WhatsApp with filled data and close modal immediately
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#10194E] border border-brand-gold/40 rounded-2xl shadow-2xl p-5 sm:p-8 text-white max-h-[90vh] overflow-y-auto">

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
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold text-xs transition-colors"
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
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold text-xs transition-colors"
              />
            </div>
          </div>

          {/* Pickup & Destination (Both typed) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
                <span>Pickup Place / Location <span className="text-brand-gold">*</span></span>
              </label>
              <input
                type="text"
                name="pickup"
                required
                placeholder="Type pickup place / city"
                value={formData.pickup}
                onChange={handleInputChange}
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold text-xs transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
                <span>Drop Place / Destination <span className="text-brand-gold">*</span></span>
              </label>
              <input
                type="text"
                name="destination"
                required
                placeholder="Type drop place / city"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold text-xs transition-colors"
              />
            </div>
          </div>

          {/* Travel Date & Pickup Time (Selected via native pickers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-brand-gold shrink-0" />
                <span>Travel Date <span className="text-brand-gold">*</span></span>
              </label>
              <input
                type="date"
                name="date"
                required
                min={todayStr}
                value={formData.date}
                onChange={handleInputChange}
                onClick={(e) => e.target.showPicker?.()}
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors cursor-pointer [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-gold shrink-0" />
                <span>Pickup Time</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                onClick={(e) => e.target.showPicker?.()}
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Vehicle Type (Selected without prices) & Trip Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <Car className="w-3 h-3 text-brand-gold shrink-0" />
                <span>Vehicle Type</span>
              </label>
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors cursor-pointer truncate"
              >
                <option value="Sedan (Dzire / Etios - 4+1 Seats)">Sedan (Dzire / Etios - 4+1 Seats)</option>
                <option value="SUV (Ertiga / Carens - 6+1 Seats)">SUV (Ertiga / Carens - 6+1 Seats)</option>
                <option value="Toyota Innova Crysta (7+1 Seats)">Toyota Innova Crysta (7+1 Seats)</option>
                <option value="Force Tempo Traveller (12 to 14 Seats)">Force Tempo Traveller (12 to 14 Seats)</option>
                <option value="Force Urbania Luxury Van (12 to 17 Seats)">Force Urbania Luxury Van (12 to 17 Seats)</option>
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
                className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold text-xs transition-colors cursor-pointer truncate"
              >
                <option value="Airport pickup and drop">Airport pickup and drop</option>
                <option value="Local trip">Local trip</option>
                <option value="Outstation Trip">Outstation Trip</option>
                <option value="Corporation trip">Corporation trip</option>
                <option value="Family trip">Family trip</option>
                <option value="Honeymoon trip">Honeymoon trip</option>
                <option value="TamilNadu Heritage Circuit">TamilNadu Heritage Circuit</option>
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
              className="w-full bg-[#0B1138] border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold text-xs transition-colors"
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
              <span>Confirm & Send to WhatsApp Desk</span>
            </button>
            <p className="text-[10px] text-neutral-400 text-center mt-2">
              ✓ Free instant quotation • Direct booking on WhatsApp
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
