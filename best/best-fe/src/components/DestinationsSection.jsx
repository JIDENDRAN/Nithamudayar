import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export default function DestinationsSection({ onSelectCity }) {
  const destinations = [
    {
      city: 'Thanjavur',
      tagline: 'Heart of Chola Architecture',
      image: '/images/destinations/thanjavur.jpg',
      attractions: ['Brihadisvara Temple', 'Maratha Palace & Saraswathi Mahal', 'Schwartz Church'],
    },
    {
      city: 'Kumbakonam',
      tagline: 'The Temple Town & Navagraha Hub',
      image: '/images/destinations/kumbakonam.jpg',
      attractions: ['Navagraha Circuit', 'Adi Kumbeswarar Temple', 'Mahamaham Tank'],
    },
    {
      city: 'Trichy',
      tagline: 'Rockfort & Island of Srirangam',
      image: '/images/destinations/trichy.jpg',
      attractions: ['Rockfort Ucchi Pillayar', 'Sri Ranganathaswamy Temple', 'Samayapuram Mariamman'],
    },
    {
      city: 'Madurai',
      tagline: 'The Historic Cultural Capital',
      image: '/images/destinations/madurai.jpg',
      attractions: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Mahal', 'Gandhi Memorial Museum'],
    },
    {
      city: 'Coimbatore',
      tagline: 'Gateway to the Western Ghats & Nilgiris',
      image: '/images/destinations/coimbatore.jpg',
      attractions: ['Isha Yoga & Adiyogi', 'Marudhamalai Murugan', 'En route to Ooty & Valparai'],
    },
    {
      city: 'Chennai',
      tagline: 'Metropolitan Gateway & Coastal Heritage',
      image: '/images/destinations/chennai.jpg',
      attractions: ['Marina & Besant Nagar Beach', 'Kapaleeshwarar Temple', 'Mahabalipuram UNESCO Sites'],
    },
  ];

  return (
    <section id="destinations" className="py-20 px-6 sm:px-10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-300 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
              Destinations Across Tamil Nadu
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900">
              Popular Travel Destinations
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md mt-3 md:mt-0">
            Direct airport and railway station pickups, intercity round-trips, and local sightseeing packages across all key tourist regions.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.city}
              className="group relative h-80 rounded-xl overflow-hidden shadow-md cursor-pointer border border-neutral-200"
              onClick={() => onSelectCity(dest.city)}
            >
              {/* Background Image */}
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

              {/* Text Information */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-brand-gold font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.tagline}</span>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white">
                  {dest.city}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {dest.attractions.join(' • ')}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-gold-bright group-hover:translate-x-1 transition-transform">
                  <span>Enquire Trips to {dest.city}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
