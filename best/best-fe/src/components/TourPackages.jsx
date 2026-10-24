import React from 'react';
import { Clock, Users, ArrowRight, Check } from 'lucide-react';

export default function TourPackages({ onSelectPackage }) {
  const packages = [
    {
      id: 'kumbakonam-navagraha',
      title: 'Kumbakonam Navagraha Temple Circuit',
      location: 'Kumbakonam & Surrounding',
      duration: '3 Days / 2 Nights',
      groupSize: 'Family / Group',
      image: '/images/destinations/kumbakonam.jpg',
      price: 'From ₹11,500',
      highlights: [
        'Complete 9 Navagraha temples coverage',
        'Experienced driver familiar with temple timings',
        'AC Sedan, Innova or Tempo Traveller options',
      ],
    },
    {
      id: 'thanjavur-heritage',
      title: 'Thanjavur Chola Heritage Tour',
      location: 'Thanjavur & Gangaikonda Cholapuram',
      duration: '2 Days / 1 Night',
      groupSize: 'All Group Sizes',
      image: '/images/destinations/thanjavur.jpg',
      price: 'From ₹7,500',
      highlights: [
        'Brihadisvara Temple (Big Temple) & Royal Palace',
        'Dharasuram & Gangaikonda Cholapuram heritage sites',
        'Local art, bronze casting & Tanjore painting visits',
      ],
    },
    {
      id: 'madurai-rameswaram',
      title: 'Madurai & Rameswaram Spiritual Tour',
      location: 'Madurai, Rameswaram & Dhanushkodi',
      duration: '3 Days / 2 Nights',
      groupSize: 'Family / Group',
      image: '/images/destinations/madurai.jpg',
      price: 'From ₹13,900',
      highlights: [
        'Madurai Meenakshi Amman Temple & Thirumalai Nayakkar Palace',
        'Ramanathaswamy Temple, Agni Theertham & Pamban Bridge',
        'Dhanushkodi ghost town & Ram Setu viewpoint',
      ],
    },
    {
      id: 'trichy-srirangam',
      title: 'Trichy Srirangam Heritage Day Tour',
      location: 'Trichy & Srirangam',
      duration: '1 Day Full Tour',
      groupSize: '1 to 20 Persons',
      image: '/images/destinations/trichy.jpg',
      price: 'From ₹3,800',
      highlights: [
        'Sri Ranganathaswamy Temple (largest active temple complex)',
        'Uchchi Pillayar Rockfort Temple & panoramic city view',
        'Thiruvanaikaval Jambukeswarar Water Element Temple',
      ],
    },
    {
      id: 'coimbatore-ooty',
      title: 'Coimbatore & Nilgiris Hill Tour',
      location: 'Coimbatore & Ooty',
      duration: '3 Days / 2 Nights',
      groupSize: 'Couples / Families',
      image: '/images/destinations/coimbatore.jpg',
      price: 'From ₹14,500',
      highlights: [
        'Isha Yoga Center & Adiyogi Shiva Statue',
        'Botanical Gardens, Ooty Lake & Doddabetta Peak',
        'Comfortable hill-driving certified chauffeurs',
      ],
    },
    {
      id: 'chennai-coastal',
      title: 'Chennai & Mahabalipuram Coastal Tour',
      location: 'Chennai & ECR Coastal Belt',
      duration: '2 Days / 1 Night',
      groupSize: 'All Group Sizes',
      image: '/images/destinations/chennai.jpg',
      price: 'From ₹8,200',
      highlights: [
        'Mahabalipuram UNESCO Shore Temple & Pancha Rathas',
        'Kapaleeshwarar Temple & San Thome Basilica',
        'Marina Beach & East Coast Road sightseeing',
      ],
    },
  ];

  return (
    <section id="packages" className="py-20 px-6 sm:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
              Curated Itineraries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900">
              Popular Tour Packages
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md mt-3 md:mt-0">
            Customizable travel packages with dedicated chauffeurs, flexible stopovers, and verified hotel options across Tamil Nadu.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#241815]/90 text-brand-gold text-xs font-bold px-3 py-1 rounded-md">
                  {pkg.price}
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-brand-gold-dark" />
                      {pkg.groupSize}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-neutral-900 mb-2">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-neutral-500 mb-3 font-medium">
                    {pkg.location}
                  </p>

                  <ul className="space-y-1.5 text-xs text-neutral-600">
                    {pkg.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">Includes AC vehicle & fuel</span>
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="btn-gold px-4 py-2 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Enquire Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
