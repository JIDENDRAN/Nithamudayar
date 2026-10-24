import React from 'react';
import { Shield, Clock, Award, Users, CheckCircle } from 'lucide-react';

export default function AboutSection({ onOpenBooking }) {
  return (
    <section id="about" className="py-20 px-6 sm:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Composite */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
              <img
                src="/images/destinations/thanjavur.jpg"
                alt="Thanjavur Temple Heritage and Nithamudayar Travels"
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </div>

            {/* Experience badge overlay */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#342521] text-white p-5 rounded-xl border border-brand-gold/30 shadow-2xl max-w-[220px]">
              <p className="text-3xl font-black font-heading text-brand-gold">15+ Years</p>
              <p className="text-xs text-neutral-300 font-medium mt-1">
                Trusted travel operations across South India
              </p>
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                About Nithamudayar Tours and Travels
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900 leading-tight">
                Reliable Travel Partner for Temple Tours, Family Holidays & Bus Charters
              </h2>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              <strong className="text-neutral-900">Nithamudayar Tours and Travels</strong> provides comprehensive passenger transport and holiday tour services across Tamil Nadu and South India. Whether you require a comfortable sedan for family temple darshan, an Innova Crysta for outstation journeys, or a 49-seater luxury coach for a marriage or college excursion, our fleet is ready to serve you.
            </p>

            {/* 4 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                <Shield className="w-5 h-5 text-brand-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Verified & Sanitized Fleet</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Every vehicle undergoes regular safety checks, AC service, and deep interior cleaning.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                <Award className="w-5 h-5 text-brand-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Route-Expert Drivers</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Courteous, licensed chauffeurs with deep familiarity of temple timings and bypass routes.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Punctual Pickups</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    On-time arrival at railway stations, airports, and doorstep residences guaranteed.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Transparent Billing</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Clear per-kilometer tariffs, driver bata, and toll estimates with zero hidden fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-gold px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer"
              >
                Request Custom Itinerary
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
