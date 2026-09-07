import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-card border border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider">
                {event.category}
              </span>
              <span className="text-xs text-brand-mutedIvory/60 font-mono">
                EVENT #{event.number}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full glass-card text-brand-ivory hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 no-scrollbar">
            {/* Hero Image inside Modal */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-xs text-brand-gold font-semibold mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-brand-ivory leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Impact Badges */}
            {(event.audience || event.duration) && (
              <div className="flex flex-wrap gap-4 p-4 rounded-xl glass-card border border-brand-gold/20">
                {event.audience && (
                  <div className="flex items-center gap-2 text-sm text-brand-ivory">
                    <Users className="w-4 h-4 text-brand-gold" />
                    <span className="font-semibold text-brand-gold">Audience/Impact:</span>
                    <span>{event.audience}</span>
                  </div>
                )}
                {event.duration && (
                  <div className="flex items-center gap-2 text-sm text-brand-ivory">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    <span className="font-semibold text-brand-gold">Screen-Free Time:</span>
                    <span>{event.duration}</span>
                  </div>
                )}
              </div>
            )}

            {/* Full Story Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-semibold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> About This Event
              </h3>
              <p className="text-base text-brand-mutedIvory font-light leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Key Event Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-ivory">
                  Key Achievements & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs sm:text-sm text-brand-mutedIvory"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Gallery Stills (If Available) */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-ivory">
                  Event Photography Stills
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {event.galleryImages.map((gImg, idx) => (
                    <div
                      key={idx}
                      className="h-32 sm:h-40 rounded-xl overflow-hidden border border-white/10 glass-card"
                    >
                      <img
                        src={gImg}
                        alt={`${event.title} Still ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
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
