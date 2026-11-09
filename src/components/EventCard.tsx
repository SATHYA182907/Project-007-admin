import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, ArrowUpRight, Building2, Handshake, Clock } from 'lucide-react';
import type { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelectEvent }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      onClick={() => onSelectEvent(event)}
      className="group cursor-pointer rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] transition-all duration-300 flex flex-col bg-brand-card/90"
    >
      {/* Event Photograph with Subtle Gradient Overlay */}
      <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-black/40">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

        {/* Top Badges (Category & Target Audience) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap gap-1.5">
            {event.categories && event.categories.length > 0 ? (
              event.categories.slice(0, 2).map((cat, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md text-[10px] font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30"
                >
                  {cat}
                </span>
              ))
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md text-[10px] font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30">
                {event.category}
              </span>
            )}
          </div>

          {event.targetAudiences && event.targetAudiences.length > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-medium text-brand-ivory border border-white/20">
              {event.targetAudiences[0]}
            </span>
          )}
        </div>

        {/* Number Watermark */}
        <span className="absolute bottom-3 right-3 text-3xl font-serif font-extrabold text-white/20 group-hover:text-brand-gold/35 transition-colors">
          #{event.number}
        </span>
      </div>

      {/* Card Information Body */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-brand-gold/90 font-medium mb-2.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-brand-gold" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* Event Title */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors mb-2.5 leading-snug">
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed mb-4 line-clamp-3">
            {event.description}
          </p>
        </div>

        {/* Sponsor, Collaborators & Participant Meta */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          {/* Participants */}
          <div className="flex items-center justify-between text-xs text-brand-ivory/80">
            <span className="flex items-center gap-1.5 text-brand-mutedIvory">
              <Users className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>Participants:</span>
            </span>
            <span className="font-semibold text-brand-ivory font-mono">
              {event.participantCount ? `${event.participantCount.toLocaleString()} engaged` : event.audience}
            </span>
          </div>

          {/* Sponsor (where available) */}
          {event.sponsor && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-brand-mutedIvory">
                <Building2 className="w-3.5 h-3.5 text-brand-gold/80 shrink-0" />
                <span>Sponsor:</span>
              </span>
              <span className="font-medium text-brand-gold line-clamp-1 max-w-[170px] text-right">
                {event.sponsor}
              </span>
            </div>
          )}

          {/* Collaborator (where available) */}
          {event.collaborators && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-brand-mutedIvory">
                <Handshake className="w-3.5 h-3.5 text-brand-lavender shrink-0" />
                <span>Partner:</span>
              </span>
              <span className="font-medium text-brand-mutedIvory line-clamp-1 max-w-[170px] text-right">
                {event.collaborators}
              </span>
            </div>
          )}

          {/* Screen Time Engagement Value */}
          {event.screenTimeValue && (
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="flex items-center gap-1.5 text-brand-mutedIvory">
                <Clock className="w-3.5 h-3.5 text-brand-gold/80 shrink-0" />
                <span>Engagement:</span>
              </span>
              <span className="font-medium text-brand-ivory/90 text-right">
                {event.screenTimeValue.toLocaleString()} participant-hrs
              </span>
            </div>
          )}

          {/* View Details Action Button */}
          <div className="pt-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold group-hover:underline flex items-center gap-1">
              View Details
            </span>
            <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300 flex items-center justify-center text-brand-ivory">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
