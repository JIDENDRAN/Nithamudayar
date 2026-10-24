import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickup: 'Thanjavur',
    destination: '',
    date: '',
    vehicle: 'Innova Crysta (6+1)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const text = `*New Travel Enquiry - Nithamudayar Tours and Travels*%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Email: ${formData.email || 'N/A'}%0A• Pickup: ${formData.pickup}%0A• Destination: ${formData.destination}%0A• Travel Date: ${formData.date}%0A• Vehicle: ${formData.vehicle}%0A• Details: ${formData.message || 'Standard Trip'}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/919894116405?text=${text}`, '_blank');
      setSubmitted(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6 sm:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 border-b border-neutral-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900">
            Booking & Contact Enquiries
          </h2>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            Submit your trip details below for tariff estimates, customized holiday itineraries, or urgent vehicle charter reservations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-neutral-200 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-bold font-heading text-neutral-900 mb-4">
              Send Travel Enquiry
            </h3>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-neutral-900">Enquiry Processed</h4>
                <p className="text-xs text-neutral-600">
                  Redirecting your details to our travel desk via WhatsApp for immediate quote...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Pickup City *
                    </label>
                    <select
                      value={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Thanjavur">Thanjavur</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Kumbakonam">Kumbakonam</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Destination City / Circuit *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Navagraha / Rameswaram"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Vehicle Preference *
                    </label>
                    <select
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Swift Dzire / Sedan (4+1)">Swift Dzire / Sedan (4+1)</option>
                      <option value="Innova Crysta (6+1)">Toyota Innova Crysta (6+1)</option>
                      <option value="Tempo Traveller (12/17)">Force Tempo Traveller (12 / 17)</option>
                      <option value="Luxury Coach Bus (36/49)">Luxury Coach Bus (36 / 49)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Provide additional details like number of days, senior citizens, specific temples..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 focus:outline-none focus:border-brand-gold text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Booking Enquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Cards + Google Maps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F5] border border-neutral-200 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold font-heading text-neutral-900 border-b border-neutral-200 pb-2">
                Office Information
              </h3>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-900">Service Coverage</p>
                    <p className="text-neutral-600 mt-0.5">
                      All Across Tamil Nadu & South India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-900">Phone</p>
                    <p className="text-neutral-600 mt-0.5">
                      <a href="tel:+919894116405" className="hover:text-brand-gold-dark transition-colors">
                        +91 98941 16405
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-900">Email</p>
                    <p className="text-neutral-600 mt-0.5">booking@nithamudayartravels.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-900">Service Hours</p>
                    <p className="text-neutral-600 mt-0.5">24 Hours / 7 Days On-Call Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Representation */}
            <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm h-64 bg-neutral-200">
              <iframe
                title="Nithamudayar Tours and Travels Service Coverage"
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
    </section>
  );
}
