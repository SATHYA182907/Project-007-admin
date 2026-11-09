import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ExploreJourney } from '../components/ExploreJourney';
import { EventsPortfolio } from '../components/EventsPortfolio';
import { KomagalAwardsSection } from '../components/KomagalAwardsSection';
import { StatsSection } from '../components/StatsSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { GallerySection } from '../components/GallerySection';
import { SponsorsSection } from '../components/SponsorsSection';
import { Collaboration } from '../components/Collaboration';
import { JoinTeamSection } from '../components/JoinTeamSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { EventModal } from '../components/EventModal';

import type { EventItem } from '../types';
import logoImg from '../assets/logo/offscreen_logo.jpg';

export const PortfolioPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory font-sans selection:bg-brand-gold selection:text-brand-dark overflow-x-hidden">
      {/* Short Editorial Brand Entry Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center text-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold shadow-glow-gold mb-6"
            >
              <img src={logoImg} alt="Offscreen Hub" className="w-full h-full object-cover" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl font-serif font-bold text-brand-ivory tracking-widest uppercase mb-2"
            >
              OFFSCREEN HUB
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-serif italic text-brand-gold tracking-wider"
            >
              Beyond the Screen, Into the Real World
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Sticky Responsive Navbar */}
          <Navbar />

          {/* Main Storytelling Page Layout — Strict Sequence */}
          <main>
            {/* 01: Hero Section */}
            <Hero />

            {/* 02: About Us (Repositioned ABOVE Explore Our Journey) */}
            <AboutSection />

            {/* 03: Explore Our Journey (Immediately AFTER About Us) */}
            <ExploreJourney />

            {/* 04 & 05: Event Categories & Complete 21-Event Portfolio */}
            <EventsPortfolio onSelectEvent={(evt) => setSelectedEvent(evt)} />

            {/* 06: Awards & Recognition (Dedicated Komagal Awards Feature) */}
            <KomagalAwardsSection />

            {/* 07: Our Screen-Free Impact (Counters & Standards) */}
            <StatsSection />

            {/* 08: Screen-Free Philosophy */}
            <PhilosophySection />

            {/* 09: Gallery (Categorized Masonry with Nana Nani Events) */}
            <GallerySection />

            {/* 10: Sponsors & Partners (Dedicated 22+ Verified Partners) */}
            <SponsorsSection />

            {/* 11: Collaborate With Us */}
            <Collaboration />

            {/* 12: Join Our Team (Application Form with CV Upload) */}
            <JoinTeamSection />

            {/* 13: Why Choose Us */}
            <WhyChooseUs />

            {/* 14: Contact & Inquiries */}
            <ContactSection />
          </main>

          {/* 15: Footer */}
          <Footer />

          {/* Interactive Event Detail Modal */}
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </>
      )}
    </div>
  );
};
