import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ 
  title, 
  bgImage, 
  breadcrumb, 
  overlayClassName = "bg-[#241815]/75 backdrop-blur-[1px]",
  bgPosition = "bg-center",
  className = "pt-32 pb-16 sm:pt-36 sm:pb-20"
}) {
  return (
    <div 
      className={`relative ${className} px-6 sm:px-10 bg-cover ${bgPosition} overflow-hidden`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Opacity Overlay */}
      <div className={`absolute inset-0 ${overlayClassName}`}></div>

      {/* Decorative Golden Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 mb-2">
          <Link to="/" className="hover:text-brand-gold transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-brand-gold">{breadcrumb || title}</span>
        </div>

        {/* Title Only - No Body Paragraph as requested */}
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
}
