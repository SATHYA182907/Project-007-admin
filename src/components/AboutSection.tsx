import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Puzzle,
  Hourglass,
  Focus,
  Palette,
  HeartHandshake,
  Smile,
  Users,
  Sparkles,
} from 'lucide-react';

import aboutImg1 from '../assets/events/portfolio_p10_img4.jpeg'; // Brain gym & cognitive workshop
import aboutImg2 from '../assets/events/portfolio_p12_img7.jpeg'; // Intergenerational community
import aboutImg3 from '../assets/events/portfolio_p13_img5.jpeg'; // Nana Nani elderly bonding

export const AboutSection: React.FC = () => {
  const coreCompetencies = [
    {
      icon: <Brain className="w-5 h-5 text-brand-gold" />,
      title: 'Cognitive & Problem-Solving',
      description: 'Physical puzzles and tactical brain games that awaken lateral thinking without screens.',
    },
    {
      icon: <Puzzle className="w-5 h-5 text-brand-gold" />,
      title: 'Memory Agility',
      description: 'Neuro-gym drills and recall challenges that sharpen short- and long-term memory retrieval.',
    },
    {
      icon: <Hourglass className="w-5 h-5 text-brand-gold" />,
      title: 'Patience & Stillness',
      description: 'Countering the instant-gratification loop with mindful offline crafts and deliberate activities.',
    },
    {
      icon: <Focus className="w-5 h-5 text-brand-gold" />,
      title: 'Concentration & Focus',
      description: 'Building sustained attention spans through tactile manipulation and deep offline involvement.',
    },
    {
      icon: <Palette className="w-5 h-5 text-brand-gold" />,
      title: 'Boundless Creativity',
      description: 'Hands-on art, drawing, performing, and impromptu expression free from digital filters.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-brand-gold" />,
      title: 'Emotional Balance',
      description: 'Restoring real interpersonal warmth, empathy, and emotional resilience through human fellowship.',
    },
    {
      icon: <Smile className="w-5 h-5 text-brand-gold" />,
      title: 'Healthy, Stress-Free Lifestyles',
      description: 'Gentle physical movement, laughter, and community bonding that naturally melts stress away.',
    },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-32 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-lavender/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-brand-gold/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-brand-card border border-brand-gold/30 mb-3 sm:mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-brand-gold uppercase">
              About Offscreen Hub
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory leading-tight mb-4 sm:mb-6"
          >
            A Platform for Living Fully, <br />
            <span className="text-gradient-gold">Beyond the Glass.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-lg text-brand-mutedIvory leading-relaxed font-light"
          >
            Offscreen Entertainment Hub (OSH) is a unique platform created for all age groups, blending fun, learning and mental wellness through games, workshops and brain gym challenges in a screen-free environment.
          </motion.p>
        </div>

        {/* Editorial Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* Left Column: Authentic Photography Collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl relative group">
                <img
                  src={aboutImg1}
                  alt="Cognitive Brain Gym Drill"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                  <span className="text-[11px] sm:text-xs font-semibold text-brand-ivory">Cognitive Brain Drills</span>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl glass-card border border-brand-gold/30 bg-brand-card/80">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5 text-brand-gold" />
                  <span className="text-[11px] sm:text-xs font-serif font-semibold text-brand-ivory uppercase tracking-wider">
                    All Generations
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-brand-mutedIvory leading-relaxed">
                  From playful toddlers to cherished senior citizens, OSH unites generations in shared laughter and presence.
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-5 sm:pt-8">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-square border border-white/10 shadow-2xl relative group">
                <img
                  src={aboutImg2}
                  alt="Senior Sangamam Fellowship"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                  <span className="text-[11px] sm:text-xs font-semibold text-brand-ivory">Elders & Senior Sangamam</span>
                </div>
              </div>

              <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl relative group">
                <img
                  src={aboutImg3}
                  alt="Intergenerational Joy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                  <span className="text-[11px] sm:text-xs font-semibold text-brand-ivory">Nana Nani Fellowship</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 7 Pillar Competencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-gold block mb-2">
                What We Nurture
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-ivory">
                Seven Pillars of Human Agility & Wellness
              </h3>
            </div>

            <div className="space-y-3">
              {coreCompetencies.map((comp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="p-4 rounded-xl glass-card border border-white/5 hover:border-brand-gold/40 hover:bg-white/[0.04] transition-all flex items-start gap-3.5 group"
                >
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-gold/40 shrink-0">
                    {comp.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-ivory group-hover:text-brand-gold transition-colors mb-0.5">
                      {comp.title}
                    </h4>
                    <p className="text-xs text-brand-mutedIvory leading-relaxed font-light">
                      {comp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
