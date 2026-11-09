import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Users,
  Clock,
  Sparkles,
  Building2,
  Handshake,
  CheckCircle2,
  Target,
  Image as ImageIcon,
} from 'lucide-react';
import type { EventItem } from '../types';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[94vh] glass-card border border-brand-gold/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto bg-brand-card/95"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {event.category}
              </span>
              {event.targetAudiences && event.targetAudiences.length > 0 && (
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 text-brand-ivory text-[10px] sm:text-xs font-medium border border-white/15">
                  Target: {event.targetAudiences.join(', ')}
                </span>
              )}
              <span className="text-[10px] sm:text-xs text-brand-mutedIvory/60 font-mono hidden sm:inline">
                EVENT #{event.number}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full glass-card text-brand-ivory hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-4 sm:p-8 md:p-10 overflow-y-auto space-y-6 sm:space-y-8 scrollbar-none">
            {/* Hero Image inside Modal */}
            <div className="relative w-full h-48 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="flex items-center gap-1.5 text-xs text-brand-gold font-semibold mb-1 sm:mb-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold" />
                  <span>{event.location}</span>
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-ivory leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Two-Column Layout on Desktop / Single Column on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (7 cols): Event Overview & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. EVENT OVERVIEW */}
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-gold mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Event Overview
                  </h3>
                  <p className="text-sm sm:text-base text-brand-mutedIvory font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Target Audience Detailed Note */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Target className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-serif font-semibold text-brand-ivory uppercase tracking-wider mb-0.5">
                      Target Audience
                    </h4>
                    <p className="text-xs text-brand-mutedIvory">
                      {event.audience || (event.targetAudiences && event.targetAudiences.join(', ')) || 'General Community'}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-serif font-semibold uppercase tracking-wider text-brand-ivory">
                      Key Program Achievements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {event.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-brand-mutedIvory"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (5 cols): Impact & Partners Card */}
              <div className="lg:col-span-5 space-y-6">
                {/* 2. EVENT IMPACT */}
                <div className="p-6 rounded-2xl glass-card border border-brand-gold/30 bg-brand-dark/60 space-y-4">
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    Verified Event Impact
                  </h3>

                  <div className="space-y-3 divide-y divide-white/10 text-xs">
                    {/* Number of Participants */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-brand-mutedIvory">Participants / Audience:</span>
                      <span className="font-serif font-bold text-base text-brand-ivory font-mono">
                        {event.participantCount ? `${event.participantCount.toLocaleString()} engaged` : event.audience}
                      </span>
                    </div>

                    {/* Event Duration */}
                    {event.duration && (
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-brand-mutedIvory flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Event Duration:</span>
                        </span>
                        <span className="font-semibold text-brand-ivory">{event.duration}</span>
                      </div>
                    )}

                    {/* Screen-Free Engagement Value */}
                    {event.screenTimeValue && (
                      <div className="pt-2 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-brand-mutedIvory">Screen-Free Value:</span>
                          <span className="font-serif font-bold text-brand-gold text-sm font-mono">
                            {event.screenTimeValue.toLocaleString()} participant-hours
                          </span>
                        </div>
                        <span className="text-[10px] text-brand-mutedIvory/70 italic">
                          Calculated: {event.participantCount} participants × event duration
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. PARTNERS & SPONSORS */}
                <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" />
                    Partners & Sponsors
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-brand-mutedIvory/80 block text-[11px] uppercase tracking-wider mb-0.5">
                        Sponsoring Entity:
                      </span>
                      <span className="font-medium text-brand-ivory text-sm">
                        {event.sponsor || 'Self-Organized / Community'}
                      </span>
                    </div>

                    {event.collaborators && (
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-brand-mutedIvory/80 block text-[11px] uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                          <Handshake className="w-3.5 h-3.5 text-brand-lavender" />
                          <span>Collaborating Partners:</span>
                        </span>
                        <span className="font-medium text-brand-lavender text-xs">
                          {event.collaborators}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. EVENT GALLERY */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Event Gallery Photographs
                  </h4>
                  <span className="text-[11px] text-brand-mutedIvory/60 font-mono">
                    {event.galleryImages.length} Photographs Documented
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {event.galleryImages.map((gImg, idx) => (
                    <div
                      key={idx}
                      className="h-36 sm:h-44 rounded-xl overflow-hidden border border-white/10 group relative"
                    >
                      <img
                        src={gImg}
                        alt={`${event.title} Moment ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
