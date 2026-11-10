import { useState } from 'react';
import { Star, User, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ReviewCard Component
 * Displays individual user feedback, ratings, and Google verification markers.
 * Client photos are intentionally omitted in favor of clean initials badge and verified Google markers.
 */
const ReviewCard = ({ review }) => {
  const {
    authorName,
    rating = 5,
    text,
    relativeTime,
    languageCode
  } = review;

  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = text && text.length > 140;
  const displayedText = isExpanded ? text : (isLongText ? `${text.slice(0, 140)}...` : text);

  // Extract clean initial for avatar badge
  const initial = authorName ? authorName.trim().charAt(0).toUpperCase() : 'T';

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="bg-[#171c35]/90 backdrop-blur-sm border border-brand-gold/20 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between w-[280px] sm:w-[320px] md:w-auto shrink-0 snap-center md:snap-align-none transition-all duration-300 shadow-lg relative overflow-hidden group"
    >
      <div>
        {/* Top bar: Clean Initials Badge (No Client Photos) + Name & Location */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold font-extrabold flex items-center justify-center shrink-0 shadow-xs text-sm font-heading">
              {initial}
            </div>
            <div className="text-left">
              <h4 className="font-heading font-bold text-white text-xs sm:text-sm tracking-wide line-clamp-1 group-hover:text-brand-gold transition-colors">
                {authorName}
              </h4>
              <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest mt-0.5 block">
                {relativeTime || 'Verified Traveler'}
              </span>
            </div>
          </div>

          {/* Verification Icon (Google) */}
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/15 shadow-2xs" title="Verified Google Business Review">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.72 5.72 0 0 1 8.24 12.8a5.72 5.72 0 0 1 5.751-5.8 5.6 5.6 0 0 1 3.931 1.6l3.11-3.1A10.027 10.027 0 0 0 13.99 2C8.47 2 4 6.47 4 12s4.47 10 9.99 10c5.75 0 9.77-4.04 9.77-9.92 0-.67-.06-1.3-.17-1.8H12.24Z"
              />
            </svg>
          </div>
        </div>

        {/* Rating Star Row */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, idx) => (
            <Star
              key={idx}
              className={`w-3.5 h-3.5 ${
                idx < rating ? 'text-[#E8C148] fill-[#E8C148]' : 'text-white/20'
              }`}
            />
          ))}
          <span className="text-[10px] font-bold text-brand-gold ml-1.5 font-mono">5.0</span>
        </div>

        {/* Text Content */}
        <p className="text-neutral-200 text-xs sm:text-[13px] leading-relaxed mb-3 text-left">
          "{displayedText}"
          {isLongText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-brand-gold hover:text-white ml-1.5 font-bold cursor-pointer outline-none inline-block text-[11px]"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>
      </div>

      {/* Optional review language translation info */}
      {languageCode && languageCode !== 'en' && (
        <div className="flex items-center gap-1 mt-auto self-start bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[9px] text-white/50">
          <Languages className="w-3 h-3" />
          <span>Translated from {languageCode.toUpperCase()}</span>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewCard;
