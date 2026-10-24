import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Vehicles from '../../pages/Vehicles';
import Packages from '../../pages/Packages';
import Destinations from '../../pages/Destinations';
import Contact from '../../pages/Contact';
import Gallery from '../../pages/Gallery';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import TermsAndConditions from '../../pages/TermsAndConditions';

import MobileBottomNav from '../mobile/MobileBottomNav';
import WhatsAppFloatingButton from '../WhatsAppFloatingButton';
import BookingModal from '../BookingModal';
import PrivacyPolicyModal from '../PrivacyPolicyModal';

export default function DesktopLayout() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  };

  return (
    <>
      {/* Top Fixed Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Pages */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
          <Route path="/about" element={<About onOpenBooking={handleOpenBooking} />} />
          <Route path="/packages" element={<Packages onOpenBooking={handleOpenBooking} />} />
          <Route path="/fleet" element={<Vehicles onOpenBooking={handleOpenBooking} />} />
          <Route path="/vehicles" element={<Vehicles onOpenBooking={handleOpenBooking} />} />
          <Route path="/destinations" element={<Destinations onOpenBooking={handleOpenBooking} />} />
          <Route path="/contact" element={<Contact onOpenBooking={handleOpenBooking} />} />
          <Route path="/gallery" element={<Gallery onOpenBooking={handleOpenBooking} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </main>

      {/* Persistent Global Footer */}
      <Footer 
        onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Mobile App Bottom Navigation Bar (< 768px) */}
      <MobileBottomNav onOpenBooking={() => handleOpenBooking()} />

      {/* WhatsApp Quick Chat Floating Button */}
      <WhatsAppFloatingButton />

      {/* Modals */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
      />

      <PrivacyPolicyModal 
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}
