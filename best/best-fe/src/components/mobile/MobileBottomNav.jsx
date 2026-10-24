import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, Car, MapPin, PhoneCall } from 'lucide-react';

export default function MobileBottomNav({ onOpenBooking }) {
  const items = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Packages', path: '/packages', icon: Package },
    { label: 'Fleet', path: '/fleet', icon: Car },
    { label: 'Places', path: '/destinations', icon: MapPin },
  ];

  return (
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-[#241815]/98 border-t border-brand-gold/30 backdrop-blur-md md:hidden px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-brand-gold' : 'text-neutral-400 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold text-[#241815] bg-gradient-to-r from-brand-gold to-amber-500 shadow-md"
        >
          <PhoneCall className="w-5 h-5 mb-0.5 text-[#241815]" />
          <span>Book</span>
        </button>
      </div>
    </nav>
  );
}
