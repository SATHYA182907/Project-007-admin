import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Target, Zap, Palette, Heart, Smile, Users } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import aboutImg from '../assets/events/portfolio_p10_img4.jpeg'; // Brain Gym & activity photo

export const AboutSection: React.FC = () => {
  const { about } = siteContent;

  const iconMap: Record<string, React.ReactNode> = {
    Brain: <Brain className="w-5 h-5 text-brand-gold" />,
    Sparkles: <Sparkles className="w-5 h-5 text-brand-gold" />,
    Target: <Target className="w-5 h-5 text-brand-gold" />,
    Zap: <Zap className="w-5 h-5 text-brand-gold" />,
    Palette: <Palette className="w-5 h-5 text-brand-gold" />,
    Heart: <Heart className="w-5 h-5 text-brand-gold" />,
    Smile: <Smile className="w-5 h-5 text-brand-gold" />
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-lavender/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Statement & Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory leading-tight">
              {about.heading}
            </h2>
            <p className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed">
              {about.statement}
            </p>
            <p className="text-sm sm:text-base text-brand-mutedIvory/80 leading-relaxed">
              {about.subtext}
            </p>

            {/* Intergenerational Participation Card */}
            <div className="p-6 rounded-2xl glass-card border border-brand-gold/20 flex items-start gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h4 className="text-base font-serif font-semibold text-brand-ivory mb-1">
                  All Generations Together
                </h4>
                <p className="text-xs sm:text-sm text-brand-mutedIvory">
                  From toddlers to senior citizens, OSH events build bonds where families and communities participate side-by-side.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Skill Development Chips & Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden glass-card border border-white/10 p-2 shadow-2xl">
              <img
                src={aboutImg}
                alt="Offscreen Hub Activities"
                className="w-full h-56 sm:h-64 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent rounded-xl" />
              <span className="absolute bottom-4 left-6 text-xs font-semibold text-brand-gold uppercase tracking-widest">
                Brain Gym & Active Learning
              </span>
            </div>

            {/* Skill Cards Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-3">
                Core Cognitive & Emotional Development Focus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl glass-card border border-white/5 hover:border-brand-gold/30 flex items-center gap-3 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {iconMap[skill.icon]}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-brand-ivory">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
