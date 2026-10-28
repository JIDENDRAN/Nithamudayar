import React, { useEffect } from 'react';
import { FileCheck, Shield, CheckCircle2, PhoneCall } from 'lucide-react';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="bg-[#241815] border border-brand-gold/30 rounded-2xl p-6 sm:p-10 shadow-2xl text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-brand-gold/20 pb-4">
          <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl text-brand-gold">
            <FileCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">Terms & Conditions</h1>
            <p className="text-xs sm:text-sm text-neutral-400">Nithamudayar Tours Pvt Ltd • Standard Tariff & Operations Guide</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed text-neutral-300">
          <p>
            Welcome to <strong className="text-brand-gold">Nithamudayar Tours Pvt Ltd</strong>. By reserving any tourist cab, tempo traveller, or luxury bus charter through our website, phone desk, or WhatsApp, you agree to the following terms and operating guidelines:
          </p>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> 1. Tariff & Kilometre Calculation
            </h3>
            <ul className="list-disc pl-10 space-y-1 text-neutral-400">
              <li>All outstation calculations are computed on a garage-to-garage basis.</li>
              <li>Standard calendar day billing applies from 6:00 AM to 10:00 PM.</li>
              <li>Minimum billing distance: 250 km/day for sedans, 300 km/day for SUVs and Tempo Travellers.</li>
              <li>Toll plaza fees, parking tickets, and interstate permits are billed as actuals.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> 2. Booking & Confirmation
            </h3>
            <p className="text-neutral-400 pl-6">
              Reservations are confirmed immediately upon sharing trip requirements with our travel desk. Driver and vehicle registration details are dispatched via SMS/WhatsApp prior to the reporting time.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> 3. Vehicle Safety & Hygiene
            </h3>
            <p className="text-neutral-400 pl-6">
              All vehicles are thoroughly sanitized, air-conditioned, and maintained under commercial tourist carrier guidelines. Smoking and consumption of alcohol inside passenger cabins is strictly prohibited.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> 4. Driver Allowances & Night Charges
            </h3>
            <p className="text-neutral-400 pl-6">
              Standard driver bata covers driver meals and operational expenses. Night driving charges apply for journeys operated after 10:00 PM or starting before 6:00 AM as per the vehicle schedule.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-brand-gold" /> 5. Contact Desk
            </h3>
            <p className="text-neutral-400 pl-6">
              For any clarification regarding billing or trip changes, reach out directly to our 24/7 travel desk at{' '}
              <a href="tel:+919894116405" className="text-brand-gold underline font-semibold">
                +91 98941 16405
              </a>{' '}
              or email{' '}
              <a href="mailto:booking@nithamudayartravels.com" className="text-brand-gold underline">
                booking@nithamudayartravels.com
              </a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
