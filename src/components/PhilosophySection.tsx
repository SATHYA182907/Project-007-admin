import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MonitorX, Sparkles, CheckCircle2 } from 'lucide-react';
import realWorldImg from '../assets/events/portfolio_p10_img2.jpeg'; // Children's Day joyful real-world moment

export const PhilosophySection: React.FC = () => {
  const [toggleState, setToggleState] = useState<'screen' | 'real'>('real');

  const pillars = [
    'Imagine & Dream Freely',
    'Build Hands-On Realities',
    'Communicate with Confidence',
    'Collaborate in Teams',
    'Discover Unique Human Potential'
  ];

  return (
    <section id="philosophy" className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            The Problem / The Purpose
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-6 leading-tight"
          >
            What Childhood Are We Building?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            In a world where screens occupy more time than playgrounds, and scrolling often replaces exploring, children deserve spaces that help them reconnect with creativity, curiosity, confidence, and real human connection.
          </motion.p>
        </div>

        {/* Split Visual Interactive Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Philosophical Breakdown & Key Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="p-8 rounded-2xl glass-card border border-brand-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-brand-gold mb-4">
                Beyond Digital Overload
              </h3>
              <p className="text-sm sm:text-base text-brand-mutedIvory leading-relaxed mb-6">
                Offscreen Hub creates meaningful offline experiences thoughtfully designed to support every child’s creativity, life skills, emotional well-being, and overall development.
              </p>
              
              <ul className="space-y-3">
                {pillars.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-brand-ivory font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlight Banner Statement */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-brand-gold/15 via-brand-gold/5 to-transparent border-l-4 border-brand-gold">
              <p className="text-base sm:text-lg font-serif italic text-brand-ivory">
                “The best childhood memories are made through experiences — not screens.”
              </p>
            </div>
          </motion.div>

          {/* Right Column: Screen Time vs Real-World Interactive Visual Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            {/* Toggle Controls */}
            <div className="flex items-center gap-2 p-1.5 rounded-full glass-card border border-white/10 mb-6 shadow-lg">
              <button
                onClick={() => setToggleState('screen')}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  toggleState === 'screen'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
                    : 'text-brand-mutedIvory hover:text-white'
                }`}
              >
                Screen Time (Passive)
              </button>
              <button
                onClick={() => setToggleState('real')}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  toggleState === 'real'
                    ? 'bg-gold-gradient text-brand-dark font-bold shadow-glow-gold'
                    : 'text-brand-mutedIvory hover:text-white'
                }`}
              >
                Real-World Time (OSH)
              </button>
            </div>

            {/* Visual Display Card */}
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden glass-card relative border border-white/10 shadow-2xl">
              {toggleState === 'screen' ? (
                <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-8 text-center relative">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6 animate-pulse">
                    <MonitorX className="w-10 h-10 text-red-400" />
                  </div>
                  <h4 className="text-xl font-serif text-red-200 mb-2">Screen Addiction & Isolation</h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
                    Endless scrolling, reduced attention span, lack of physical movement, emotional fatigue, and social isolation.
                  </p>
                </div>
              ) : (
                <div className="w-full h-full relative group">
                  <img
                    src={realWorldImg}
                    alt="Real-World Offscreen Activity"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3 h-3" /> Offscreen Experience
                    </div>
                    <h4 className="text-xl font-serif text-brand-ivory font-bold mb-1">
                      Active Hands-On Exploration
                    </h4>
                    <p className="text-xs text-brand-mutedIvory">
                      Laughter, teamwork, tactile creativity, real friendships, and lasting confidence.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-brand-gold/80 font-medium uppercase tracking-widest mt-4">
              SCREEN TIME → REAL-WORLD TIME
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
