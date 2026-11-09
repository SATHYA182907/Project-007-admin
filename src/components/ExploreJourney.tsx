import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Users, ChevronRight, Award, Compass } from 'lucide-react';

import jWalkathon from '../assets/events/portfolio_p10_img1.jpeg';
import jDiwali from '../assets/events/portfolio_p11_img4.jpeg';
import jMomMe from '../assets/events/portfolio_p12_img1.jpeg';
import jKomagal from '../assets/events/portfolio_p13_img1.jpeg';
import jNanaNani from '../assets/events/portfolio_p13_img6.jpeg';
import jMarathon from '../assets/events/portfolio_p14_img1.jpeg';
import jBrainGym from '../assets/events/portfolio_p10_img3.jpeg';

interface Milestone {
  id: string;
  year: string;
  chapter: string;
  title: string;
  location: string;
  participants: string;
  screenTime: string;
  story: string;
  image: string;
  keyTakeaway: string;
}

export const ExploreJourney: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: 'genesis',
      year: 'Phase 1',
      chapter: 'The Spark',
      title: 'Brain Gym Foundations in Schools',
      location: 'Shrishti & Vasavi Vidyala, Selvapuram',
      participants: '100+ Students',
      screenTime: '300 Screen-Free Hours',
      story: 'Offscreen Hub began with a vital realization: modern classrooms and homes are saturated with glowing rectangles. We introduced physical neuro-drills, bilateral coordination puzzles, and tactile challenges directly to schools to reignite natural curiosity and focus.',
      image: jBrainGym,
      keyTakeaway: 'Proving that hands-on physical engagement elevates attention spans faster than passive screen instruction.',
    },
    {
      id: 'walkathon',
      year: 'Phase 2',
      chapter: 'Community Wellness',
      title: 'Kovaipudur Walkathon',
      location: 'Kovaipudur, Coimbatore',
      participants: '300 Participants',
      screenTime: '1,500 Participant-Hours',
      story: 'Taking our mission into open streets, we rallied 300 citizens and senior residents for a 5-hour screen-free walkathon sponsored by Vedanta. Neighbors reconnected, children paced beside grandparents, and screen fatigue was replaced by brisk outdoor vigor.',
      image: jWalkathon,
      keyTakeaway: 'The beginning of multi-generational outdoor mobilization across Coimbatore neighborhoods.',
    },
    {
      id: 'carnival',
      year: 'Phase 3',
      chapter: 'The Mega Convergence',
      title: 'Diwali Carnival Festival',
      location: 'Kovaipudur Grounds',
      participants: '2,000+ Floating Crowd',
      screenTime: '6,000 Participant-Hours',
      story: 'A signature breakthrough. Over 2,000 residents gathered for traditional folk games, screen-free music, craft stalls, and spontaneous cultural dance. Families spent the entire evening immersed in laughter without glancing at smartphones.',
      image: jDiwali,
      keyTakeaway: 'Validated that communities crave real-world festive connection when given rich, interactive offline alternatives.',
    },
    {
      id: 'inclusive',
      year: 'Phase 4',
      chapter: 'Unconditional Dignity',
      title: 'Mom & Me — Inclusive Ramp Walk',
      location: 'Sri Maruti Gana Sabha, RS Puram',
      participants: '900 Participants',
      screenTime: '4,500 Participant-Hours',
      story: 'Partnering with Abhirami Hospital and Koumaram Prashanti, we created a compassionate stage where children on the autism spectrum walked with their mothers. It redefined what public celebration means: courage, tearful applause, and total social inclusion.',
      image: jMomMe,
      keyTakeaway: 'Demonstrated that screen-free spaces cultivate deep empathy and break social barriers with grace.',
    },
    {
      id: 'komagal',
      year: 'Phase 5',
      chapter: 'Honoring Leaders',
      title: 'Komagal Awards Ceremony',
      location: 'Srinivasa Art & Gallery, Peelamedu',
      participants: '400 Dignitaries & Awardees',
      screenTime: '1,600 Participant-Hours',
      story: 'Instituted to honor extraordinary women making quiet, monumental differences in society. Supported by Southern Bank and Lions Club, the 4-hour ceremony celebrated educators, healthcare pillars, and social reformers on an inspiring physical stage.',
      image: jKomagal,
      keyTakeaway: 'Anchoring Offscreen Hub as a patron of social changemakers and women empowerment.',
    },
    {
      id: 'nananani',
      year: 'Phase 6',
      chapter: 'Elder Fellowship',
      title: 'Onam & Senior Sangamam Celebrations',
      location: 'Ananya’s Nana Nani & Grand Regent',
      participants: '1,300+ Senior Citizens',
      screenTime: '4,900 Participant-Hours',
      story: 'Elder isolation is a silent crisis in the digital age. Our grand Onam pookalam and Senior Sangamam brought over a thousand senior citizens together for music, storytelling circles, memory games, and warm companionship in a dignified atmosphere.',
      image: jNanaNani,
      keyTakeaway: 'Showing that screen-free experiences nourish emotional wellness and vitality for older adults.',
    },
    {
      id: 'marathon',
      year: 'Phase 7',
      chapter: 'City-Wide Movement',
      title: 'Komagal Marathon at Racecourse',
      location: 'Racecourse Road, Coimbatore',
      participants: '1,800+ Runners',
      screenTime: '7,200 Participant-Hours',
      story: 'In collaboration with Decathlon, Nirmala College, and Thai Ullam Trust, 1,800 runners took to the streets in early dawn. The marathon proved that Offscreen Hub’s message of vitality and mindful living has become a celebrated regional institution.',
      image: jMarathon,
      keyTakeaway: 'A city-scale demonstration of collective stamina and real-world health.',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(2); // Diwali Carnival default
  const activeMilestone = milestones[activeIdx];

  return (
    <section id="explore-journey" className="relative py-24 sm:py-32 bg-brand-dark text-brand-ivory overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-brand-lavender/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card border border-brand-gold/30 mb-4"
          >
            <Compass className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Our Evolution
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory leading-tight mb-4"
          >
            Explore Our Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            From quiet classroom brain gym experiments to city-scale movements with thousands of participants, experience the story of Offscreen Hub through real photographs and measurable milestones.
          </motion.p>
        </div>

        {/* Interactive Chronological Milestone Selector */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[700px] relative border-b border-white/10 px-4">
            {milestones.map((m, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex flex-col items-center pb-4 relative transition-all duration-300 group focus:outline-none ${
                    isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-gold mb-1">
                    {m.year}
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-medium text-brand-ivory whitespace-nowrap">
                    {m.chapter}
                  </span>
                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeJourneyIndicator"
                      className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-gold-gradient shadow-glow-gold"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Spotlight Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl glass-card border border-white/10 p-6 sm:p-10 shadow-2xl bg-brand-card/90"
          >
            {/* Left: Authentic Event Image */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] shadow-xl group border border-white/10">
              <img
                src={activeMilestone.image}
                alt={activeMilestone.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-brand-ivory">
                <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  {activeMilestone.location}
                </span>
                <span className="bg-brand-gold/90 text-brand-dark px-3 py-1 rounded-full font-bold text-[11px] shadow-sm">
                  {activeMilestone.participants}
                </span>
              </div>
            </div>

            {/* Right: Milestone Story & Impact */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-brand-gold/20 text-xs text-brand-gold font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeMilestone.year} • {activeMilestone.chapter}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-ivory leading-snug">
                {activeMilestone.title}
              </h3>

              <p className="text-sm sm:text-base text-brand-mutedIvory leading-relaxed font-light">
                {activeMilestone.story}
              </p>

              {/* Impact Metric Chips */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-brand-gold font-semibold mb-0.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Audience</span>
                  </div>
                  <span className="text-sm font-serif font-bold text-brand-ivory">
                    {activeMilestone.participants}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-brand-gold font-semibold mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Screen-Free Value</span>
                  </div>
                  <span className="text-sm font-serif font-bold text-brand-ivory">
                    {activeMilestone.screenTime}
                  </span>
                </div>
              </div>

              {/* Key Takeaway Box */}
              <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/30">
                <span className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider block mb-1">
                  Historical Significance
                </span>
                <p className="text-xs text-brand-ivory/90 leading-relaxed italic">
                  “{activeMilestone.keyTakeaway}”
                </p>
              </div>

              {/* Next Milestone Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setActiveIdx((prev) => (prev + 1) % milestones.length)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold hover:text-brand-goldLight transition-colors"
                >
                  <span>Explore Next Milestone</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
