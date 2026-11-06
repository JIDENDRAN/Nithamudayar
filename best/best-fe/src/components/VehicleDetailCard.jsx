import React, { useState } from 'react';
import { Users, Wind, Info, X, ShieldCheck } from 'lucide-react';
import { getVehicleImage } from '../utils/imageImports.js';

export default function VehicleDetailCard({ vehicle, onOpenBooking }) {
  const [showInfo, setShowInfo] = useState(false);

  // Derive specs and plans with smart defaults matching the requested structure
  const seaterLabel = vehicle.seaterLabel || vehicle.seatsMobile || (vehicle.seats ? (vehicle.seats.toLowerCase().includes('seater') ? vehicle.seats : vehicle.seats.split(' ')[0] + ' Seater') : '7 Seater');
  const name = vehicle.name || 'Innova Crysta';
  const image = getVehicleImage(vehicle.image) || '/images/vehicles/innova.png';

  // Outstation plan values
  const outstationRate = vehicle.outstationRate || vehicle.rate?.split('(')[0]?.trim() || vehicle.rate || '₹20/km';
  const minDistance = vehicle.minDistance || vehicle.minKm?.split('/')[0]?.trim() || 'Above 300 kms';
  const driverCharge = vehicle.driverCharge || vehicle.driverBata?.split('/')[0]?.trim() || 'Rs. 300 / day';

  // Day rental plan values
  const dayBaseRent = vehicle.dayBaseRent || (name.toLowerCase().includes('innova') ? 'Rs. 2500' : name.toLowerCase().includes('suv') ? 'Rs. 2800' : name.toLowerCase().includes('tempo') ? 'Rs. 5500' : name.toLowerCase().includes('urbania') ? 'Rs. 7500' : 'Rs. 2200');
  const dayPerKm = vehicle.dayPerKm || (name.toLowerCase().includes('innova') ? 'Rs. 16/km' : name.toLowerCase().includes('suv') ? 'Rs. 16/km' : name.toLowerCase().includes('tempo') ? 'Rs. 22/km' : name.toLowerCase().includes('urbania') ? 'Rs. 28/km' : 'Rs. 14/km');
  const dayDriverCharge = vehicle.dayDriverCharge || vehicle.driverCharge || 'Rs. 300 / day';

  // Starting from rate
  const startingFrom = vehicle.startingFrom || outstationRate;

  // Key specs row
  const acText = vehicle.ac ? (vehicle.ac.includes('Dual') ? 'AC' : vehicle.ac.includes('Climate') ? 'AC' : 'AC') : 'AC';

  return (
    <div className="bg-white rounded-3xl md:rounded-[28px] border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col md:flex-row items-stretch overflow-hidden">
      
      {/* ─── LEFT COLUMN: Vehicle Showcase & Specs (Cream Background) ───────── */}
      <div className="w-full md:w-[42%] lg:w-[40%] bg-[#F5EFEB] flex flex-col justify-between items-center p-6 sm:p-8 shrink-0">
        
        {/* Centered Vehicle Image */}
        <div className="w-full h-44 sm:h-56 md:h-64 flex items-center justify-center p-2 relative group my-auto">
          <img
            src={image}
            alt={name}
            className="max-h-full max-w-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Specs Row Below Vehicle (Exact: 7 Seater, AC, Luggage Suitcase) */}
        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-neutral-700 pt-3 w-full">
          {/* Seater */}
          <div className="inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-neutral-500" />
            <span>{seaterLabel}</span>
          </div>

          {/* AC */}
          <div className="inline-flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-neutral-500" />
            <span>{acText}</span>
          </div>

          {/* Blue Suitcase Luggage */}
          <div className="inline-flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#3b82f6] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 2a2 2 0 00-2 2v2H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H9zm2 2h2v2h-2V4zM5 8h14v11H5V8z" />
            </svg>
          </div>
        </div>

      </div>

      {/* ─── RIGHT COLUMN: White Detailed Plan Card ───────────────────────── */}
      <div className="w-full md:w-[58%] lg:w-[60%] bg-white p-6 sm:p-8 flex flex-col justify-between flex-1">
        
        <div>
          {/* Top Row: Seater Eyebrow & VEHICLE Badge */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#b38328] uppercase tracking-wider">
              {seaterLabel}
            </span>
            <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-neutral-200/80">
              VEHICLE
            </span>
          </div>

          {/* Vehicle Title */}
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900 tracking-tight mb-4">
            {name}
          </h3>

          {/* 1. OUTSTATION PLAN BOX */}
          <div className="border border-neutral-200/90 rounded-2xl p-3.5 sm:p-4 mb-3.5 bg-white space-y-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-neutral-500">
                OUTSTATION PLAN
              </span>
            </div>

            {/* Rate */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-neutral-600 font-medium">Rate</span>
              <span className="bg-white border border-neutral-200/90 px-3.5 py-1 rounded-lg font-bold text-neutral-900 font-mono text-xs sm:text-sm">
                {outstationRate}
              </span>
            </div>

            {/* Min Distance */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-neutral-600 font-medium">Min Distance</span>
              <span className="bg-white border border-neutral-200/90 px-3.5 py-1 rounded-lg font-bold text-neutral-900 font-mono text-xs sm:text-sm">
                {minDistance}
              </span>
            </div>

            {/* Driver Charge */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-neutral-600 font-medium">Driver Charge</span>
              <span className="bg-white border border-neutral-200/90 px-3.5 py-1 rounded-lg font-bold text-neutral-900 font-mono text-xs sm:text-sm">
                {driverCharge}
              </span>
            </div>
          </div>

          {/* 2. DAY RENTAL PLAN BOX */}
          <div className="border border-neutral-200/90 rounded-2xl p-3.5 sm:p-4 mb-5 bg-white space-y-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-neutral-500">
                DAY RENTAL PLAN
              </span>
            </div>

            {/* Base Rent */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-neutral-600 font-medium">Base Rent</span>
              <span className="bg-white border border-neutral-200/90 px-3.5 py-1 rounded-lg font-bold text-neutral-900 font-mono text-xs sm:text-sm">
                {dayBaseRent}
              </span>
            </div>

            {/* Per km Charge */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-neutral-600 font-medium">Per km Charge</span>
              <span className="bg-white border border-neutral-200/90 px-3.5 py-1 rounded-lg font-bold text-neutral-900 font-mono text-xs sm:text-sm">
                {dayPerKm}
              </span>
            </div>

            {/* Driver Charge */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-neutral-600 font-medium">Driver Charge</span>
              <span className="bg-white border border-neutral-200/90 px-3.5 py-1 rounded-lg font-bold text-neutral-900 font-mono text-xs sm:text-sm">
                {dayDriverCharge}
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Info Card */}
        {showInfo && (
          <div className="mb-4 p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-600 space-y-1 relative animate-in fade-in duration-200">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 font-bold text-neutral-800">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-dark" />
              <span>Rental Terms & Guidelines:</span>
            </div>
            <p>• Toll charges, state tax permits & parking fees are billed as per actual receipts.</p>
            <p>• Driver Bata is calculated per calendar day (6:00 AM to 10:00 PM).</p>
            <p>• AC operates throughout running; AC is switched off during long stationary idle parking.</p>
          </div>
        )}

        {/* ─── BOTTOM ACTION BAR ────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">
              STARTING FROM
            </span>
            <span className="text-2xl sm:text-3xl font-black text-neutral-950 font-heading leading-tight">
              {startingFrom}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowInfo(!showInfo)}
              title="Terms and vehicle guidelines"
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking(vehicle)}
              className="bg-[#0f172a] hover:bg-black text-white font-bold px-6 sm:px-8 py-3 rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm cursor-pointer whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
