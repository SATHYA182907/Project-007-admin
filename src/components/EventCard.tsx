import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, ArrowUpRight, Building2, Handshake, Clock } from 'lucide-react';
import type { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  index?: number;
  className?: string;
  onSelectEvent: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index: _index, className, onSelectEvent }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => onSelectEvent(event)}
      className={`group cursor-pointer rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 overflow-hidden shadow-xl hover:shadow-[0_16px_36px_rgba(212,175,55,0.14)] transition-all duration-300 flex flex-col bg-brand-card/90 select-none ${className || ''}`}
    >
      {/* Event Photograph with Subtle Gradient Overlay */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden bg-black/40 shrink-0">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/25 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges (Category & Target Audience) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
          <div className="flex flex-wrap gap-1">
            {event.categories && event.categories.length > 0 ? (
              event.categories.slice(0, 2).map((cat, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-brand-dark/90 backdrop-blur-md text-[9px] font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30"
                >
                  {cat}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-brand-dark/90 backdrop-blur-md text-[9px] font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30">
                {event.category}
              </span>
            )}
          </div>

          {event.targetAudiences && event.targetAudiences.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[9px] font-medium text-brand-ivory border border-white/20">
              {event.targetAudiences[0]}
            </span>
          )}
        </div>

        {/* Number Watermark */}
        <span className="absolute bottom-1.5 right-2.5 text-xl sm:text-2xl font-serif font-extrabold text-white/25 group-hover:text-brand-gold/40 transition-colors">
          #{event.number}
        </span>
      </div>

      {/* Card Information Body */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-brand-gold/90 font-medium mb-1">
            <MapPin className="w-3 h-3 shrink-0 text-brand-gold" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* Event Title */}
          <h3 className="text-sm sm:text-base font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors mb-1 leading-snug line-clamp-1">
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="text-[11px] sm:text-xs text-brand-mutedIvory font-light leading-relaxed line-clamp-2 mb-2.5">
            {event.description}
          </p>
        </div>

        {/* Sponsor, Collaborators & Participant Meta */}
        <div className="pt-2 border-t border-white/10 space-y-1.5">
          {/* Metrics Row: Participants & Engagement */}
          <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-[11px]">
            <div className="flex items-center gap-1.5 text-brand-mutedIvory">
              <Users className="w-3 h-3 text-brand-gold shrink-0" />
              <span className="font-semibold text-brand-ivory font-mono truncate">
                {event.participantCount ? `${event.participantCount.toLocaleString()} engaged` : event.audience}
              </span>
            </div>

            {event.screenTimeValue ? (
              <div className="flex items-center gap-1.5 text-brand-mutedIvory justify-end">
                <Clock className="w-3 h-3 text-brand-gold/80 shrink-0" />
                <span className="font-medium text-brand-ivory/90 truncate font-mono">
                  {event.screenTimeValue.toLocaleString()} hrs
                </span>
              </div>
            ) : <div />}
          </div>

          {/* Sponsor & Partner (one concise line if present) */}
          {(event.sponsor || event.collaborators) && (
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-brand-mutedIvory gap-2">
              {event.sponsor ? (
                <span className="flex items-center gap-1 text-brand-gold/90 truncate max-w-[50%]">
                  <Building2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">{event.sponsor}</span>
                </span>
              ) : <span />}
              {event.collaborators && (
                <span className="flex items-center gap-1 text-brand-lavender/90 truncate max-w-[50%] ml-auto">
                  <Handshake className="w-3 h-3 shrink-0" />
                  <span className="truncate">{event.collaborators}</span>
                </span>
              )}
            </div>
          )}

          {/* View Details Action Button */}
          <div className="pt-1.5 flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-brand-gold group-hover:underline flex items-center gap-1">
              View Details
            </span>
            <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300 flex items-center justify-center text-brand-ivory">
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
