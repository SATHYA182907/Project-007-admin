import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventsData, EVENT_CATEGORIES, TARGET_AUDIENCES } from '../data/events';
import { EventCard } from './EventCard';
import type { EventItem, EventCategory, TargetAudience } from '../types';
import { Layers, Sparkles, Filter, Award } from 'lucide-react';

interface EventsPortfolioProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventsPortfolio: React.FC<EventsPortfolioProps> = ({ onSelectEvent }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeAudience, setActiveAudience] = useState<string>('All');

  const categories = ['All', ...EVENT_CATEGORIES];
  const audiences = ['All', ...TARGET_AUDIENCES];

  const filteredEvents = eventsData.filter((evt) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (evt.categories && evt.categories.includes(activeCategory as EventCategory)) ||
      evt.category === activeCategory;

    const matchesAudience =
      activeAudience === 'All' ||
      (evt.targetAudiences && evt.targetAudiences.includes(activeAudience as TargetAudience));

    return matchesCategory && matchesAudience;
  });

  return (
    <section id="events" className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-brand-lavender/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card border border-brand-gold/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Verified Event Portfolio • 21 Experiences
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory leading-tight mb-4"
          >
            Our Events & Initiatives
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            A verified chronicle of 21 offline initiatives across Coimbatore, touching 10,300+ participants with zero screen time. Filter by category or target audience.
          </motion.p>
        </div>

        {/* 8 Official Event Categories Filter Chips */}
        <div className="mb-6">
          <div className="flex items-center justify-between sm:justify-center gap-2 mb-2.5 text-xs text-brand-mutedIvory font-medium">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-brand-gold" />
              <span className="uppercase tracking-wider">Filter Category:</span>
            </div>
            <span className="text-[10px] text-brand-gold/70 sm:hidden font-mono">Swipe →</span>
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex sm:flex sm:flex-wrap items-center sm:justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl glass-card border border-white/10 shadow-lg sm:max-w-5xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
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
        </div>

        {/* Target Audience Secondary Filters */}
        <div className="mb-10 sm:mb-12">
          <div className="overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex sm:flex sm:flex-wrap items-center sm:justify-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-brand-gold/80 font-mono mr-1 whitespace-nowrap">
                Audience:
              </span>
              {audiences.map((aud) => (
                <button
                  key={aud}
                  onClick={() => setActiveAudience(aud)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all ${
                    activeAudience === aud
                      ? 'bg-white/20 text-brand-ivory border border-brand-gold/50 shadow-sm'
                      : 'bg-white/5 text-brand-mutedIvory hover:text-brand-ivory border border-white/5'
                  }`}
                >
                  {aud === 'All' ? 'All Audiences' : aud}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Awards Callout Pill if filtering by Awards */}
        {activeCategory === 'Awards' && (
          <div className="mb-8 p-4 rounded-2xl glass-card border border-brand-gold/30 bg-brand-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm text-brand-ivory">
              <Award className="w-5 h-5 text-brand-gold shrink-0" />
              <span>
                Looking for our dedicated Awards feature? Explore the full Komagal Awards presentation.
              </span>
            </div>
            <a
              href="#awards"
              className="px-4 py-1.5 rounded-full bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider whitespace-nowrap hover:bg-brand-goldLight transition-colors"
            >
              Go to Awards Feature
            </a>
          </div>
        )}

        {/* Complete 21 Events Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onSelectEvent={onSelectEvent} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto border border-white/10">
            <Layers className="w-10 h-10 text-brand-gold mx-auto mb-4" />
            <h4 className="text-base font-serif font-bold text-brand-ivory mb-1">No Matching Events</h4>
            <p className="text-brand-mutedIvory text-xs">
              No events found for "{activeCategory}" with target audience "{activeAudience}". Try clearing filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActiveAudience('All');
              }}
              className="mt-4 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-brand-ivory transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
