import React from 'react';
import { Users, Briefcase, Wind, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FleetSection({ onSelectVehicle }) {
  const fleet = [
    {
      id: 'innova-crysta',
      name: 'Toyota Innova Crysta',
      category: 'Premium SUV',
      image: '/images/vehicles/innova.jpg',
      seats: '6 + 1 Passengers',
      luggage: '4 Large Bags',
      ac: 'Dual Zone Automatic AC',
      rate: '₹18 / km (or ₹3,500/day)',
      features: ['Reclining Captain Seats', 'Pushback Comfort', 'High Ground Clearance', 'Ideal for Families & Pilgrimage'],
    },
    {
      id: 'sedan-dzire',
      name: 'Swift Dzire / Toyota Etios',
      category: 'Comfort Sedan',
      image: '/images/vehicles/sedan.jpg',
      seats: '4 + 1 Passengers',
      luggage: '2 Large Bags',
      ac: 'Climate Control AC',
      rate: '₹13 / km (or ₹2,400/day)',
      features: ['Compact & Quiet Ride', 'Economical Fuel Tariff', 'Spacious Boot Space', 'Perfect for Couples & Small Groups'],
    },
    {
      id: 'tempo-traveller',
      name: 'Force Tempo Traveller',
      category: 'Mini Van / Group Traveller',
      image: '/images/vehicles/tempo.jpg',
      seats: '12 / 17 Passengers',
      luggage: '10 Large Bags',
      ac: 'Individual Overhead AC Vents',
      rate: '₹24 / km (or ₹5,500/day)',
      features: ['2x1 Pushback Luxury Seats', 'Ample Legroom & Headroom', 'Music & LED Screen', 'Ideal for Navagraha Family Circuits'],
    },
    {
      id: 'luxury-coach',
      name: 'Luxury AC Tourist Coach Bus',
      category: 'Bus Charter',
      image: '/images/vehicles/bus.jpg',
      seats: '36 / 49 Passengers',
      luggage: 'Underbody Cargo Compartment',
      ac: 'Centralized Climate Cooling',
      rate: 'Custom Charter Tariff',
      features: ['Air Suspension Smooth Ride', 'PA Microphone & Sound System', 'Emergency First Aid & Fire Safety', 'Ideal for Marriages, Colleges & Corporates'],
    },
  ];

  return (
    <section id="fleet" className="py-20 px-6 sm:px-10 bg-[#241815] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-brand-gold/20 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">
              Our Fleet & Charter Vehicles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Vehicles & Services
            </h2>
          </div>
          <p className="text-sm text-neutral-300 max-w-md mt-3 md:mt-0">
            Sanitized, well-maintained commercial vehicles with verified tourist permits across Tamil Nadu and South India.
          </p>
        </div>

        {/* Fleet Cards Grid (Dario Trans style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#2e1f1c] border border-brand-gold/20 rounded-xl overflow-hidden flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300"
            >
              <div>
                {/* Vehicle Image */}
                <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-brand-gold">
                    {vehicle.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-base font-bold font-heading text-white">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-brand-gold-bright font-semibold mt-1">
                      {vehicle.rate}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 pt-1 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{vehicle.seats}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{vehicle.luggage}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <Wind className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{vehicle.ac}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-white/5">
                    {vehicle.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-brand-gold shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectVehicle(vehicle)}
                  className="w-full btn-gold py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book {vehicle.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
