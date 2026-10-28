import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Download,
  Car,
  User,
  MapPin,
  Calculator,
  Check,
  Phone,
  Building2,
  Image as ImageIcon,
  Compass,
  Gauge,
  Receipt,
  Calendar,
  Clock,
  ShieldCheck,
  Eye,
  Edit3,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { downloadVectorBillPdf, numberToWords } from '../../utils/billPdfGenerator';

export default function TripBillModal({ isOpen, onClose, booking, settings }) {
  const billRef = useRef(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Mobile responsiveness controls
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'
  const [mobileFit, setMobileFit] = useState(true);   // true = scale to fit phone screen

  // Form State initialized from booking (or defaults)
  const [billData, setBillData] = useState({
    billNo: `NTT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    tripType: 'Outstation Round Trip',
    cabServiceName: 'Nithamudayar Tours Pvt Ltd',
    customerName: '',
    phone: '',
    fromLocation: '',
    toLocation: '',
    vehicleNo: 'TN 49 AB 2026',
    vehicleModel: 'Toyota Innova Crysta',
    driverName: 'S. Murugesan (Chauffeur)',
    driverPhone: '+91 98941 16405',
    openingKm: 14500,
    closingKm: 14850,
    distanceKm: 350,
    ratePerKm: 22,
    driverBataDays: 1,
    driverBata: 600,
    nightBataDays: 0,
    nightBataRate: 400,
    waitingDetails: '0 hrs',
    waitingAmt: 0,
    tollParking: 0,
    permitAmt: 0,
    advancePaid: 0,
    paymentMode: 'UPI', // 'UPI' | 'Cash' | 'Bank'
    upiId: '9894116405@okaxis'
  });

  // Automatically update bill data when booking changes
  useEffect(() => {
    if (booking) {
      let initialRate = 14;
      let initialBata = 400;
      let initialKm = 250;
      const vName = (booking.vehicle || '').toLowerCase();

      if (vName.includes('suv') || vName.includes('ertiga')) {
        initialRate = 19;
        initialBata = 500;
        initialKm = 300;
      } else if (vName.includes('innova') || vName.includes('crysta')) {
        initialRate = 22;
        initialBata = 600;
        initialKm = 350;
      } else if (vName.includes('tempo') || vName.includes('traveller')) {
        initialRate = 25;
        initialBata = 700;
        initialKm = 300;
      } else if (vName.includes('urbania')) {
        initialRate = 33;
        initialBata = 800;
        initialKm = 300;
      }

      const opKm = 14500;
      const clKm = opKm + initialKm;

      setBillData(prev => ({
        ...prev,
        billNo: booking.id ? `NTT-${new Date().getFullYear()}-${String(booking.id).padStart(4, '0')}` : prev.billNo,
        customerName: booking.name || '',
        phone: booking.phone || '',
        fromLocation: booking.fromLocation || '',
        toLocation: booking.toLocation || '',
        vehicleModel: booking.vehicle || 'Toyota Innova Crysta',
        openingKm: opKm,
        closingKm: clKm,
        distanceKm: initialKm,
        ratePerKm: initialRate,
        driverBata: initialBata,
        tripType: booking.packageType || 'Outstation Round Trip',
        cabServiceName: settings?.name && settings.name !== 'admin' ? settings.name : 'Nithamudayar Tours Pvt Ltd'
      }));
    }
  }, [booking, settings]);

  // Real-time Calculations
  const distanceFare = (Number(billData.distanceKm) || 0) * (Number(billData.ratePerKm) || 0);
  const totalBata = (Number(billData.driverBataDays) || 1) * (Number(billData.driverBata) || 0);
  const nightBata = (Number(billData.nightBataDays) || 0) * (Number(billData.nightBataRate) || 0);
  const waitingAmt = Number(billData.waitingAmt) || 0;
  const tollAmt = Number(billData.tollParking) || 0;
  const permitAmt = Number(billData.permitAmt) || 0;
  const totalFare = distanceFare + totalBata + nightBata + waitingAmt + tollAmt + permitAmt;
  const advance = Number(billData.advancePaid) || 0;
  const balanceAmount = Math.max(0, totalFare - advance);

  const handleInputChange = (field, value) => {
    setBillData(prev => {
      const updated = { ...prev, [field]: value };
      // Sync distance if opening or closing KM edited
      if (field === 'openingKm' || field === 'closingKm') {
        const op = Number(field === 'openingKm' ? value : prev.openingKm) || 0;
        const cl = Number(field === 'closingKm' ? value : prev.closingKm) || 0;
        updated.distanceKm = Math.max(0, cl - op);
      } else if (field === 'distanceKm') {
        const op = Number(prev.openingKm) || 0;
        const dist = Number(value) || 0;
        updated.closingKm = op + dist;
      }
      return updated;
    });
  };

  // Direct Vector PDF Download
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      downloadVectorBillPdf(
        billData,
        {
          distanceFare,
          totalBata,
          nightBata,
          waitingAmt,
          tollAmt,
          permitAmt,
          totalFare,
          advance,
          balanceAmount
        },
        settings
      );
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating vector PDF:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // PNG Image Export Handler
  const handleDownloadImage = async () => {
    if (!billRef.current) return;
    setIsGeneratingImg(true);

    try {
      const element = billRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${billData.billNo || 'TRIP_BILL'}_${(billData.customerName || 'Customer').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 500);
    } catch (err) {
      console.error('Error exporting image:', err);
      alert('Could not export image. Please use Download PDF or Print.');
    } finally {
      setIsGeneratingImg(false);
    }
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-6 bg-black/80 backdrop-blur-xs overflow-hidden">
          
          {/* Printable CSS Hook */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @media print {
                body * { visibility: hidden !important; }
                #printable-bill, #printable-bill * { visibility: visible !important; }
                #printable-bill {
                  position: fixed !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  margin: 0 !important;
                  padding: 8mm !important;
                  box-shadow: none !important;
                  border: none !important;
                }
              }
            `
          }} />

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="bg-[#1e1310] border-0 sm:border border-[#d4af37]/40 sm:rounded-3xl w-full max-w-7xl h-full sm:h-auto sm:max-h-[96vh] shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Top Modal Navigation Header */}
            <div className="p-3.5 sm:p-5 border-b border-white/10 bg-[#150d0a] shrink-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold font-heading text-white flex items-center gap-1.5 sm:gap-2">
                      <span>Trip Duty Slip & Invoice</span>
                      <span className="text-[9px] sm:text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Official</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 truncate max-w-[200px] sm:max-w-none">
                      Nithamudayar Tours Pvt Ltd • Travel Bill
                    </p>
                  </div>
                </div>

                {/* Desktop Action Buttons (hidden on mobile header, placed in sticky bottom bar on mobile) */}
                <div className="hidden lg:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="bg-[#241815] hover:bg-[#342521] text-[#f8e7a2] border border-[#d4af37]/40 py-2 px-3 sm:px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    title="Print or Save as PDF via browser"
                  >
                    <Printer className="w-4 h-4 text-[#d4af37]" />
                    <span>Print</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isGeneratingImg}
                    className="bg-[#1b4382] hover:bg-[#2356a5] text-white py-2 px-3 sm:px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 transition-colors"
                    title="Save Bill as PNG image for WhatsApp sharing"
                  >
                    <ImageIcon className="w-4 h-4 text-[#c2d7f2]" />
                    <span>{isGeneratingImg ? 'Exporting...' : 'Save PNG (WhatsApp)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 sm:px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50 transition-colors"
                    title="Download razor-sharp vector PDF"
                  >
                    {downloadSuccess ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4" />}
                    <span>{isGeneratingPdf ? 'Generating...' : downloadSuccess ? 'Downloaded!' : 'Download Official PDF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile View Tab Switcher (Visible only on screens below lg) */}
              <div className="flex lg:hidden w-full bg-[#18110f] p-1 rounded-xl border border-white/10 mt-3">
                <button
                  type="button"
                  onClick={() => setMobileTab('form')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    mobileTab === 'form'
                      ? 'bg-[#d4af37] text-neutral-900 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>1. Trip Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    mobileTab === 'preview'
                      ? 'bg-[#d4af37] text-neutral-900 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>2. Bill Preview</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Left Inputs (5 Cols on Desktop), Right Preview (7 Cols on Desktop) */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 bg-[#18110f]">
              
              {/* LEFT COLUMN: Input Controls */}
              <div className={`${mobileTab === 'form' ? 'block' : 'hidden'} lg:block lg:col-span-5 space-y-4 text-xs`}>
                
                {/* 1. Trip Meta Box */}
                <div className="bg-[#241815] border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Invoice & Trip Nature
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Step 1</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Bill / Invoice No.</label>
                      <input
                        type="text"
                        value={billData.billNo}
                        onChange={(e) => handleInputChange('billNo', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Trip Type</label>
                      <select
                        value={billData.tripType}
                        onChange={(e) => handleInputChange('tripType', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                      >
                        <option value="Outstation Round Trip">Outstation Round Trip</option>
                        <option value="One Way Drop">One Way Drop</option>
                        <option value="Local Package (8hr / 80km)">Local Package</option>
                        <option value="Airport Pickup / Drop">Airport Pickup / Drop</option>
                        <option value="Tamil Nadu Temple Tour">Temple Pilgrimage Tour</option>
                        <option value="Hill Station Tour">Hill Station Tour</option>
                        <option value="Corporate Fleet Trip">Corporate Fleet Trip</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Invoice Date</label>
                      <input
                        type="text"
                        value={billData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Time</label>
                      <input
                        type="text"
                        value={billData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Customer & Route Information */}
                <div className="bg-[#241815] border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Passenger & Journey Route
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Step 2</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Customer Name</label>
                      <input
                        type="text"
                        value={billData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none font-semibold"
                        placeholder="e.g. Murugan Swamy"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Phone Number</label>
                      <input
                        type="text"
                        value={billData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Pickup Location</label>
                      <input
                        type="text"
                        value={billData.fromLocation}
                        onChange={(e) => handleInputChange('fromLocation', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                        placeholder="e.g. Madurai Meenakshi Temple"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Drop / Route</label>
                      <input
                        type="text"
                        value={billData.toLocation}
                        onChange={(e) => handleInputChange('toLocation', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                        placeholder="e.g. Rameswaram Temple"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Vehicle & Chauffeur Particulars */}
                <div className="bg-[#241815] border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5" />
                      Vehicle & Chauffeur Details
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Step 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Vehicle Model</label>
                      <select
                        value={billData.vehicleModel}
                        onChange={(e) => {
                          const val = e.target.value;
                          let r = 14, b = 400, km = 250;
                          if (val.includes('SUV')) { r = 19; b = 500; km = 300; }
                          else if (val.includes('Innova')) { r = 22; b = 600; km = 350; }
                          else if (val.includes('Tempo')) { r = 25; b = 700; km = 300; }
                          else if (val.includes('Urbania')) { r = 33; b = 800; km = 300; }
                          setBillData(prev => ({
                            ...prev,
                            vehicleModel: val,
                            ratePerKm: r,
                            driverBata: b,
                            distanceKm: km,
                            closingKm: Number(prev.openingKm) + km
                          }));
                        }}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                      >
                        <option value="Sedan (Dzire / Etios)">Sedan (Dzire/Etios) - ₹14/km</option>
                        <option value="SUV (Ertiga / Marazzo)">SUV (Ertiga/Marazzo) - ₹19/km</option>
                        <option value="Toyota Innova Crysta">Innova Crysta - ₹22/km</option>
                        <option value="Tempo Traveller (14-Seater)">Tempo Traveller - ₹25/km</option>
                        <option value="Force Urbania Luxury Van">Force Urbania - ₹33/km</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Vehicle Number</label>
                      <input
                        type="text"
                        value={billData.vehicleNo}
                        onChange={(e) => handleInputChange('vehicleNo', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none font-mono"
                        placeholder="TN 49 AB 2026"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Chauffeur / Driver Name</label>
                      <input
                        type="text"
                        value={billData.driverName}
                        onChange={(e) => handleInputChange('driverName', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                        placeholder="S. Murugesan"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Driver Mobile No.</label>
                      <input
                        type="text"
                        value={billData.driverPhone}
                        onChange={(e) => handleInputChange('driverPhone', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white text-xs focus:border-[#d4af37] outline-none"
                        placeholder="+91 98941 16405"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Odometer / Meter Duty Log */}
                <div className="bg-[#241815] border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5" />
                      Duty Slip Odometer Readings & Rates
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Step 4</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Opening KM</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.openingKm}
                        onChange={(e) => handleInputChange('openingKm', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Closing KM</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.closingKm}
                        onChange={(e) => handleInputChange('closingKm', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Total Run</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.distanceKm}
                        onChange={(e) => handleInputChange('distanceKm', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono font-bold text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Rate / KM (₹)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.ratePerKm}
                        onChange={(e) => handleInputChange('ratePerKm', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono font-bold text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Driver Bata (₹)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.driverBata}
                        onChange={(e) => handleInputChange('driverBata', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Duty Days</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.driverBataDays}
                        onChange={(e) => handleInputChange('driverBataDays', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Additional Charges & Settlement */}
                <div className="bg-[#241815] border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5" />
                      Tolls, Advance & Settlement
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Step 5</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Toll / Parking (₹)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.tollParking}
                        onChange={(e) => handleInputChange('tollParking', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Permit / Extra (₹)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.permitAmt}
                        onChange={(e) => handleInputChange('permitAmt', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold truncate">Advance Paid (₹)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={billData.advancePaid}
                        onChange={(e) => handleInputChange('advancePaid', e.target.value)}
                        className="w-full bg-[#18110f] border border-emerald-500/40 rounded-lg px-2 py-2 text-emerald-400 font-mono font-bold text-xs focus:border-[#d4af37] outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Payment Mode</label>
                      <div className="grid grid-cols-3 gap-1">
                        {['UPI', 'Cash', 'Bank'].map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleInputChange('paymentMode', mode)}
                            className={`py-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                              billData.paymentMode === mode
                                ? 'bg-[#d4af37] text-neutral-900 border-[#d4af37]'
                                : 'bg-[#18110f] text-neutral-400 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1 font-semibold">Company UPI ID</label>
                      <input
                        type="text"
                        value={billData.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                        className="w-full bg-[#18110f] border border-white/15 rounded-lg px-2.5 py-2 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                        placeholder="9894116405@okaxis"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Proceed to Preview Button */}
                <div className="lg:hidden pt-2 pb-16">
                  <button
                    type="button"
                    onClick={() => setMobileTab('preview')}
                    className="w-full bg-[#d4af37] hover:bg-[#b57a15] text-neutral-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-sm cursor-pointer"
                  >
                    <span>View Bill Preview & Download</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: Realistic Live Tours & Travels Invoice Preview */}
              <div className={`${mobileTab === 'preview' ? 'block' : 'hidden'} lg:block lg:col-span-7 flex flex-col items-center pb-20 lg:pb-0`}>
                
                {/* Mobile Zoom / Switch Controls Bar (Only on mobile) */}
                <div className="w-full flex items-center justify-between gap-2 mb-3 bg-[#241815] p-2.5 rounded-xl border border-white/10 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileTab('form')}
                    className="text-xs text-neutral-300 hover:text-white flex items-center gap-1 font-semibold py-1 px-2 rounded-lg bg-white/5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Edit Form</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neutral-400 font-medium">Zoom:</span>
                    <button
                      type="button"
                      onClick={() => setMobileFit(true)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                        mobileFit ? 'bg-[#d4af37] text-neutral-900 border-[#d4af37]' : 'bg-[#18110f] text-neutral-400 border-white/10'
                      }`}
                    >
                      Fit Phone
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileFit(false)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                        !mobileFit ? 'bg-[#d4af37] text-neutral-900 border-[#d4af37]' : 'bg-[#18110f] text-neutral-400 border-white/10'
                      }`}
                    >
                      100% Zoom
                    </button>
                  </div>
                </div>

                {/* Invoice Container with Responsive View Scaling */}
                <div className="w-full overflow-x-auto flex justify-center py-1">
                  <div
                    className={`transition-transform duration-200 origin-top ${
                      mobileFit ? 'scale-[0.52] sm:scale-75 md:scale-90 lg:scale-100' : 'scale-100'
                    }`}
                    style={{
                      // Reduce dead space when scaled on phone screens
                      marginBottom: mobileFit ? '-370px' : '0'
                    }}
                  >
                    <div
                      id="printable-bill"
                      ref={billRef}
                      className="w-[640px] shrink-0 bg-white text-neutral-900 rounded-xl shadow-2xl overflow-hidden font-sans border-2 border-[#1a3c34]"
                      style={{ minHeight: '840px' }}
                    >
                      {/* Outer Frame Inset */}
                      <div className="p-3 bg-white">
                        <div className="border border-[#1a3c34] p-4 sm:p-5 space-y-3.5">
                          
                          {/* 1. TOP HEADER BANNER */}
                          <div className="bg-[#1a3c34] text-white p-3.5 rounded-lg flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-12 h-12 object-contain rounded-full bg-white/10 p-0.5 border border-white/20 shrink-0"
                              />
                              <div className="space-y-0.5">
                                <h1 className="text-base sm:text-lg font-black tracking-wide font-heading text-white">
                                  {billData.cabServiceName.toUpperCase()}
                                </h1>
                                <p className="text-[10px] text-[#f8e7a2] font-semibold">
                                  Luxury Commercial Fleet • Force Urbania • Innova Crysta • Tempo Traveller
                                </p>
                                <p className="text-[9px] text-neutral-300">
                                  Trichy • Madurai • Thanjavur • Chennai • All South India | Call: +91 {settings?.phone || '9894116405'}
                                </p>
                              </div>
                            </div>

                            {/* Top-Right Badge */}
                            <div className="bg-[#d4af37] text-[#1a3c34] px-3 py-2 rounded-md shrink-0 text-right">
                              <span className="block text-[11px] font-black uppercase tracking-wider">
                                TRIP DUTY SLIP & INVOICE
                              </span>
                              <span className="block text-[10px] font-mono font-bold mt-0.5">
                                {billData.billNo}
                              </span>
                              <span className="block text-[9px] font-medium">
                                {billData.date}
                              </span>
                            </div>
                          </div>

                          {/* 2. CUSTOMER & VEHICLE ASSIGNMENT (Dual Cards) */}
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            
                            {/* Customer Box */}
                            <div className="border border-[#edeae1] rounded-lg overflow-hidden bg-[#faf8f5]">
                              <div className="bg-[#1a3c34] text-white px-2.5 py-1 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                                <User className="w-3 h-3 text-[#d4af37]" />
                                <span>CUSTOMER / PASSENGER</span>
                              </div>
                              <div className="p-2 space-y-1">
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Name:</span>
                                  <span className="font-bold text-neutral-900 truncate">{billData.customerName || 'Walk-in Guest'}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Contact:</span>
                                  <span className="font-semibold text-neutral-800 font-mono">{billData.phone || '+91 98941 16405'}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Pickup:</span>
                                  <span className="font-semibold text-neutral-800 truncate">{billData.fromLocation || 'Pickup Point'}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Route/Drop:</span>
                                  <span className="font-bold text-neutral-900 truncate">{billData.toLocation || 'Destination'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Vehicle Box */}
                            <div className="border border-[#edeae1] rounded-lg overflow-hidden bg-[#faf8f5]">
                              <div className="bg-[#1a3c34] text-white px-2.5 py-1 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                                <Car className="w-3 h-3 text-[#d4af37]" />
                                <span>VEHICLE & CHAUFFEUR</span>
                              </div>
                              <div className="p-2 space-y-1">
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Vehicle:</span>
                                  <span className="font-bold text-neutral-900 truncate">{billData.vehicleModel}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Reg. No:</span>
                                  <span className="font-mono font-bold text-neutral-900">{billData.vehicleNo}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Chauffeur:</span>
                                  <span className="font-semibold text-neutral-800 truncate">{billData.driverName}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-neutral-500 w-20 shrink-0 text-[10px]">Trip Nature:</span>
                                  <span className="font-semibold text-[#1a3c34] truncate">{billData.tripType}</span>
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* 3. TRIP METER ODOMETER DUTY LOG */}
                          <div className="bg-[#f5f1e9] border border-[#e2dcce] rounded-lg p-2.5 grid grid-cols-5 text-center text-xs">
                            <div className="border-r border-[#ded8cb]">
                              <span className="block text-[9px] text-neutral-500 font-bold uppercase">Opening KM</span>
                              <span className="font-mono font-bold text-neutral-900 text-xs">{(Number(billData.openingKm) || 0).toLocaleString()}</span>
                            </div>
                            <div className="border-r border-[#ded8cb]">
                              <span className="block text-[9px] text-neutral-500 font-bold uppercase">Closing KM</span>
                              <span className="font-mono font-bold text-neutral-900 text-xs">{(Number(billData.closingKm) || 0).toLocaleString()}</span>
                            </div>
                            <div className="border-r border-[#ded8cb]">
                              <span className="block text-[9px] text-neutral-500 font-bold uppercase">Total Run</span>
                              <span className="font-mono font-bold text-[#1a3c34] text-xs">{billData.distanceKm} KM</span>
                            </div>
                            <div className="border-r border-[#ded8cb]">
                              <span className="block text-[9px] text-neutral-500 font-bold uppercase">Billed KM</span>
                              <span className="font-mono font-bold text-neutral-900 text-xs">{billData.distanceKm} KM</span>
                            </div>
                            <div>
                              <span className="block text-[9px] text-neutral-500 font-bold uppercase">Rate / KM</span>
                              <span className="font-mono font-bold text-[#d4af37] text-xs">₹ {billData.ratePerKm}</span>
                            </div>
                          </div>

                          {/* 4. ITEMIZED CHARGES TABLE */}
                          <div>
                            <table className="w-full border-collapse border border-[#edeae1] text-xs">
                              <thead>
                                <tr className="bg-[#1a3c34] text-white text-[10px] uppercase font-bold tracking-wider">
                                  <th className="p-2 text-center w-10 border-r border-white/20">S.No</th>
                                  <th className="p-2 text-left border-r border-white/20">Particulars / Description</th>
                                  <th className="p-2 text-center border-r border-white/20">Details / Qty</th>
                                  <th className="p-2 text-right border-r border-white/20">Rate (₹)</th>
                                  <th className="p-2 text-right">Amount (₹)</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#edeae1]">
                                <tr>
                                  <td className="p-2 text-center font-mono text-neutral-500 border-r border-[#edeae1]">1</td>
                                  <td className="p-2 font-semibold text-neutral-800 border-r border-[#edeae1]">Base Kilometre Running Charges</td>
                                  <td className="p-2 text-center font-mono text-neutral-700 border-r border-[#edeae1]">{billData.distanceKm} KM</td>
                                  <td className="p-2 text-right font-mono text-neutral-700 border-r border-[#edeae1]">₹ {Number(billData.ratePerKm || 0).toFixed(2)}</td>
                                  <td className="p-2 text-right font-bold font-mono text-neutral-900">₹ {distanceFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                </tr>
                                <tr className="bg-[#faf8f5]">
                                  <td className="p-2 text-center font-mono text-neutral-500 border-r border-[#edeae1]">2</td>
                                  <td className="p-2 font-semibold text-neutral-800 border-r border-[#edeae1]">Driver Daily Bata / Allowance (Day Duty)</td>
                                  <td className="p-2 text-center font-mono text-neutral-700 border-r border-[#edeae1]">{billData.driverBataDays || 1} Day(s)</td>
                                  <td className="p-2 text-right font-mono text-neutral-700 border-r border-[#edeae1]">₹ {Number(billData.driverBata || 0).toFixed(2)}</td>
                                  <td className="p-2 text-right font-bold font-mono text-neutral-900">₹ {totalBata.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                </tr>
                                <tr>
                                  <td className="p-2 text-center font-mono text-neutral-500 border-r border-[#edeae1]">3</td>
                                  <td className="p-2 font-semibold text-neutral-800 border-r border-[#edeae1]">Night Halting Bata (10 PM to 6 AM)</td>
                                  <td className="p-2 text-center font-mono text-neutral-700 border-r border-[#edeae1]">{billData.nightBataDays || 0} Night(s)</td>
                                  <td className="p-2 text-right font-mono text-neutral-700 border-r border-[#edeae1]">₹ {Number(billData.nightBataRate || 0).toFixed(2)}</td>
                                  <td className="p-2 text-right font-bold font-mono text-neutral-900">₹ {nightBata.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                </tr>
                                <tr className="bg-[#faf8f5]">
                                  <td className="p-2 text-center font-mono text-neutral-500 border-r border-[#edeae1]">4</td>
                                  <td className="p-2 font-semibold text-neutral-800 border-r border-[#edeae1]">Toll Plaza & Parking Charges (At Actuals)</td>
                                  <td className="p-2 text-center font-mono text-neutral-700 border-r border-[#edeae1]">Actuals</td>
                                  <td className="p-2 text-right font-mono text-neutral-500 border-r border-[#edeae1]">-</td>
                                  <td className="p-2 text-right font-bold font-mono text-neutral-900">₹ {tollAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                </tr>
                                <tr>
                                  <td className="p-2 text-center font-mono text-neutral-500 border-r border-[#edeae1]">5</td>
                                  <td className="p-2 font-semibold text-neutral-800 border-r border-[#edeae1]">Permit / Hill Station / Extra Allowance</td>
                                  <td className="p-2 text-center font-mono text-neutral-700 border-r border-[#edeae1]">{billData.waitingDetails || '-'}</td>
                                  <td className="p-2 text-right font-mono text-neutral-500 border-r border-[#edeae1]">-</td>
                                  <td className="p-2 text-right font-bold font-mono text-neutral-900">₹ {(waitingAmt + permitAmt).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* 5. AMOUNT IN WORDS BANNER */}
                          <div className="bg-[#faf8f5] border border-[#edeae1] rounded-lg px-3 py-2 text-xs flex items-center justify-between">
                            <div>
                              <span className="font-bold text-[#1a3c34] uppercase text-[10px] mr-2">Amount in Words:</span>
                              <span className="font-semibold text-neutral-800 italic">{numberToWords(totalFare)}</span>
                            </div>
                          </div>

                          {/* 6. PAYMENT SUMMARY & SETTLEMENT */}
                          <div className="grid grid-cols-2 border border-[#edeae1] rounded-lg overflow-hidden text-xs">
                            
                            {/* Left: Mode & UPI ID */}
                            <div className="p-3 bg-[#faf8f5] border-r border-[#edeae1] space-y-1.5">
                              <span className="font-bold text-[#1a3c34] block uppercase text-[10px]">Payment Settlement:</span>
                              <div className="flex items-center gap-2 font-semibold text-neutral-800 text-[11px]">
                                <span className={billData.paymentMode === 'UPI' ? 'font-bold text-[#1a3c34]' : 'text-neutral-400'}>
                                  [{billData.paymentMode === 'UPI' ? '✓' : ' '}] UPI / GPay
                                </span>
                                <span className={billData.paymentMode === 'Cash' ? 'font-bold text-[#1a3c34]' : 'text-neutral-400'}>
                                  [{billData.paymentMode === 'Cash' ? '✓' : ' '}] Cash
                                </span>
                                <span className={billData.paymentMode === 'Bank' ? 'font-bold text-[#1a3c34]' : 'text-neutral-400'}>
                                  [{billData.paymentMode === 'Bank' ? '✓' : ' '}] Bank
                                </span>
                              </div>
                              <div className="pt-1 text-[10px]">
                                <span className="text-neutral-500 block">Official UPI ID for Payment:</span>
                                <span className="font-mono font-bold text-[#1a3c34] bg-white px-2 py-0.5 rounded border border-[#edeae1] inline-block mt-0.5">
                                  {billData.upiId || '9894116405@okaxis'}
                                </span>
                              </div>
                            </div>

                            {/* Right: Totals */}
                            <div className="p-3 bg-white space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-neutral-600">Total Trip Fare:</span>
                                <span className="font-mono font-bold text-neutral-800">₹ {totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-neutral-600">Advance Paid:</span>
                                <span className="font-mono font-bold text-neutral-800">₹ {advance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs pb-1 border-b border-[#edeae1]">
                                <span className="text-neutral-600 font-semibold">Balance Due:</span>
                                <span className="font-mono font-bold text-red-600">₹ {balanceAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                              </div>

                              {/* Solid Net Amount Banner */}
                              <div className="bg-[#1a3c34] text-white p-2 rounded-lg flex justify-between items-center mt-1">
                                <span className="font-extrabold uppercase tracking-wide text-[11px]">Net Amount:</span>
                                <span className="text-sm font-extrabold font-mono text-[#f8e7a2]">
                                  ₹ {totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                            </div>

                          </div>

                          {/* 7. TERMS & SIGNATURES */}
                          <div className="pt-1">
                            <span className="block text-[9px] font-bold uppercase text-[#1a3c34] mb-1">Standard Travel Terms:</span>
                            <ul className="text-[8px] text-neutral-500 space-y-0.5 list-disc list-inside">
                              <li>Tolls, parking fees, and interstate permits are payable as per actuals.</li>
                              <li>Kilometer and duty hours calculated garage-to-garage as per commercial travel regulations.</li>
                              <li>AC will be switched off on steep ghat roads and during vehicle idling.</li>
                            </ul>
                          </div>

                          <div className="grid grid-cols-2 gap-8 pt-4 pb-1 text-center text-xs">
                            <div>
                              <div className="w-3/4 mx-auto border-b border-neutral-400 mb-1"></div>
                              <span className="text-neutral-700 font-bold uppercase text-[9px] block">Customer Signature</span>
                              <span className="text-[8px] text-neutral-400 italic">(Service Satisfactory)</span>
                            </div>
                            <div>
                              <div className="w-3/4 mx-auto border-b border-neutral-400 mb-1"></div>
                              <span className="text-[#1a3c34] font-bold uppercase text-[9px] block">For NITHAMUDAYAR TOURS PVT LTD</span>
                              <span className="text-[8px] text-neutral-400 italic">(Authorized Signatory / Chauffeur)</span>
                            </div>
                          </div>

                          {/* 8. FOOTER BANNER */}
                          <div className="bg-[#1a3c34] text-white text-[10px] text-center py-2 px-3 rounded-lg leading-tight space-y-0.5">
                            <p className="font-bold text-[#f8e7a2]">
                              Thank you for traveling with Nithamudayar Tours Pvt Ltd! Wish you a pleasant journey.
                            </p>
                            <p className="text-[8.5px] text-neutral-300">
                              Computer Generated Travel Duty Slip & Invoice • Customer Copy • 24x7 Customer Care: +91 {settings?.phone || '9894116405'}
                            </p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Mobile Sticky Bottom Action Bar (Fixed at bottom on phones) */}
            <div className="lg:hidden p-3 bg-[#150d0a] border-t border-white/10 flex items-center gap-2 shrink-0 z-20 shadow-2xl">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 transition-colors cursor-pointer"
              >
                {downloadSuccess ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4" />}
                <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isGeneratingImg}
                className="bg-[#1b4382] hover:bg-[#2356a5] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 transition-colors cursor-pointer"
                title="Save PNG for WhatsApp"
              >
                <ImageIcon className="w-4 h-4 text-[#c2d7f2]" />
                <span>PNG</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#241815] text-[#f8e7a2] border border-[#d4af37]/40 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                title="Print"
              >
                <Printer className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
