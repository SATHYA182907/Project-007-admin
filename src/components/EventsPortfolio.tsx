import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventsData } from '../data/events';
import { EventCard } from './EventCard';
import type { EventItem } from '../types';
import { Layers } from 'lucide-react';

interface EventsPortfolioProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventsPortfolio: React.FC<EventsPortfolioProps> = ({ onSelectEvent }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Children',
    'Women',
    'Families',
    'Community',
    'Schools',
    'Fitness',
    'Awards',
    'Inclusive'
  ];

  const filteredEvents = activeCategory === 'All'
    ? eventsData
    : eventsData.filter((evt) => evt.category === activeCategory);

  return (
    <section id="events" className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            Verified Track Record
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-4"
          >
            Our Successful Projects & Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light"
          >
            A comprehensive portfolio of 17 impactful offline programs, carnivals, inclusive walks, and school initiatives across Coimbatore.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12">
          <div className="flex items-center gap-2 p-1.5 rounded-full glass-card border border-white/10 shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold-gradient text-brand-dark shadow-glow-gold'
                    : 'text-brand-mutedIvory hover:text-brand-ivory hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onSelectEvent={onSelectEvent} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto">
            <Layers className="w-10 h-10 text-brand-gold mx-auto mb-4" />
            <p className="text-brand-mutedIvory text-sm">No events found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
