import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText, PhoneCall } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#241815] border border-brand-gold/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-brand-gold rounded-full hover:bg-brand-espresso transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-brand-gold/20 pb-4">
          <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl text-brand-gold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading text-white">Privacy Policy</h2>
            <p className="text-sm text-neutral-400">Nithamudayar Tours and Travels • Updated October 2026</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-5 text-sm leading-relaxed text-neutral-300">
          <p>
            Welcome to <strong className="text-brand-gold">Nithamudayar Tours and Travels</strong>. We respect your privacy and are committed to protecting the personal information you share with us while planning and booking your journeys across Tamil Nadu.
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
              <li>To send you trip itineraries, route plans, driver details, and tariff quotes.</li>
              <li>To provide instant WhatsApp updates and 24/7 customer assistance.</li>
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
              If you have any questions about this Privacy Policy or wish to update your details, please reach out to us at <a href="mailto:contact@nithamudayartravels.com" className="text-brand-gold underline">contact@nithamudayartravels.com</a> or call our customer desk.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-brand-gold/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg btn-gold text-sm font-semibold cursor-pointer"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
