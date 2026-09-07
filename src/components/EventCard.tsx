import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import type { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelectEvent }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      onClick={() => onSelectEvent(event)}
      className={`group cursor-pointer rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
        event.featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Event Image */}
      <div
        className={`relative overflow-hidden ${
          event.featured ? 'md:w-1/2 h-64 md:h-auto' : 'w-full h-56'
        }`}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md text-[10px] font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30">
            {event.category}
          </span>
          {event.featured && (
            <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider shadow-glow-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured Story
            </span>
          )}
        </div>

        {/* Number Badge */}
        <span className="absolute bottom-4 right-4 text-4xl font-serif font-extrabold text-white/20 group-hover:text-brand-gold/40 transition-colors">
          {event.number}
        </span>
      </div>

      {/* Card Content */}
      <div
        className={`p-6 sm:p-8 flex flex-col justify-between flex-grow ${
          event.featured ? 'md:w-1/2' : ''
        }`}
      >
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-brand-gold/90 font-medium mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{event.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors mb-3 leading-snug">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed mb-6 line-clamp-3">
            {event.description}
          </p>
        </div>

        <div>
          {/* Audience / Duration Stats */}
          {(event.audience || event.duration) && (
            <div className="pt-4 mb-6 border-t border-white/10 flex flex-wrap gap-4 text-xs text-brand-ivory/80">
              {event.audience && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>{event.audience}</span>
                </div>
              )}
              {event.duration && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>{event.duration}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Link */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold group-hover:underline flex items-center gap-1">
              View Event Story
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300 flex items-center justify-center text-brand-ivory">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
