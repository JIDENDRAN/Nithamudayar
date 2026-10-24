import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Eye, FileText, PhoneCall } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="bg-[#241815] border border-brand-gold/30 rounded-2xl p-6 sm:p-10 shadow-2xl text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-brand-gold/20 pb-4">
          <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl text-brand-gold">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">Privacy Policy</h1>
            <p className="text-xs sm:text-sm text-neutral-400">Nithamudayar Tours and Travels • Updated October 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed text-neutral-300">
          <p>
            Welcome to <strong className="text-brand-gold">Nithamudayar Tours and Travels</strong>. We respect your privacy and are committed to protecting the personal information you share with us while planning and booking your journeys across Tamil Nadu and South India.
          </p>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-gold" /> 1. Information We Collect
            </h3>
            <p className="text-neutral-400 pl-6">
              When you submit a travel enquiry, request a customized package, or contact us via WhatsApp, we collect information such as your name, mobile phone number, email address, travel destinations, passenger count, and preferred travel dates.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-gold" /> 2. How We Use Your Information
            </h3>
            <ul className="list-disc pl-10 space-y-1 text-neutral-400">
              <li>To confirm vehicle charter and tour reservations.</li>
              <li>To send you trip itineraries, route plans, driver details, and transparent tariff quotes.</li>
              <li>To provide instant WhatsApp updates and 24/7 customer assistance during your journey.</li>
              <li>We never sell, rent, or trade your personal data to any external marketing agencies.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-gold" /> 3. Data Security & Storage
            </h3>
            <p className="text-neutral-400 pl-6">
              We implement industry-standard security safeguards to ensure your booking information is kept secure and protected against unauthorized access.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-brand-gold" /> 4. Contact Us
            </h3>
            <p className="text-neutral-400 pl-6">
              If you have any questions about this Privacy Policy or wish to update your details, please reach out to us at{' '}
              <a href="mailto:booking@nithamudayartravels.com" className="text-brand-gold underline">
                booking@nithamudayartravels.com
              </a>{' '}
              or call our central customer desk at{' '}
              <a href="tel:+919894116405" className="text-brand-gold underline font-semibold">
                +91 98941 16405
              </a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
