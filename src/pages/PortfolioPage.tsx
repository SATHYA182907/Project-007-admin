import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PhilosophySection } from '../components/PhilosophySection';
import { AboutSection } from '../components/AboutSection';
import { MissionVision } from '../components/MissionVision';
import { StatsSection } from '../components/StatsSection';
import { EventsPortfolio } from '../components/EventsPortfolio';
import { EventModal } from '../components/EventModal';
import { FeaturedStories } from '../components/FeaturedStories';
import { GallerySection } from '../components/GallerySection';
import { Differentiation } from '../components/Differentiation';
import { CommunityNetwork } from '../components/CommunityNetwork';
import { Collaboration } from '../components/Collaboration';
import { JoinSection } from '../components/JoinSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

import type { EventItem } from '../types';
import logoImg from '../assets/logo/offscreen_logo.jpg';

export const PortfolioPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [preselectedRole, setPreselectedRole] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenJoinModal = (role?: string) => {
    setPreselectedRole(role);
    setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
    setPreselectedRole(undefined);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory font-sans selection:bg-brand-gold selection:text-brand-dark overflow-x-hidden">
      {/* Short Editorial Brand Entry Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center text-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold shadow-glow-gold mb-6"
            >
              <img src={logoImg} alt="Offscreen Hub" className="w-full h-full object-cover" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-serif font-bold text-brand-ivory tracking-widest uppercase mb-2"
            >
              OFFSCREEN HUB
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xs font-serif italic text-brand-gold tracking-wider"
            >
              Beyond the Screen, Into the World
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Sticky Navbar */}
          <Navbar onOpenJoinModal={() => handleOpenJoinModal()} />

          {/* Main Storytelling Page Layout */}
          <main>
            {/* 01: Hero Slideshow */}
            <Hero />

            {/* 02: Philosophy — What Childhood Are We Building? */}
            <PhilosophySection />

            {/* 03: About Us & Skill Development */}
            <AboutSection />

            {/* 04: Mission & Vision */}
            <MissionVision />

            {/* 05: Impact Statistics */}
            <StatsSection />

            {/* 06: Complete 17-Event Portfolio Grid */}
            <EventsPortfolio onSelectEvent={(evt) => setSelectedEvent(evt)} />

            {/* 07: Featured Stories (Mom & Me & Komagal Awards) */}
            <FeaturedStories />

            {/* 08: Gallery — Moments Beyond the Screen */}
            <GallerySection />

            {/* 09: What Makes Offscreen Hub Different (7 Principles) */}
            <Differentiation />

            {/* 10: A Community, Not Just Workshops (Orbiting Node Graph) */}
            <CommunityNetwork />

            {/* 11: Why Collaborate With Us (3 Paths) */}
            <Collaboration onOpenJoinModal={(role) => handleOpenJoinModal(role)} />

            {/* 12: Join the Movement (3 Tracks & Form) */}
            <JoinSection
              isOpenModal={isJoinModalOpen}
              preselectedRole={preselectedRole}
              onCloseModal={handleCloseJoinModal}
              onOpenModal={(role) => handleOpenJoinModal(role)}
            />

            {/* 13: Why Choose Us (7 Key Advantages) */}
            <WhyChooseUs />

            {/* 14: Contact & Final CTA */}
            <ContactSection onOpenJoinModal={() => handleOpenJoinModal()} />
          </main>

          {/* 15: Footer */}
          <Footer />

          {/* Event Detail Modal */}
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </>
      )}
    </div>
  );
};

