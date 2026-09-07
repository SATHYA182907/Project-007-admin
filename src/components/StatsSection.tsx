import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, Smile, Palette, Sparkles, Award, Building, Compass, Clock } from 'lucide-react';
import { statsData } from '../data/stats';

export const StatsSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-5 h-5 text-brand-gold" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-brand-gold" />,
    Smile: <Smile className="w-5 h-5 text-brand-gold" />,
    Palette: <Palette className="w-5 h-5 text-brand-gold" />,
    Sparkles: <Sparkles className="w-5 h-5 text-brand-gold" />,
    Award: <Award className="w-5 h-5 text-brand-gold" />,
    Building: <Building className="w-5 h-5 text-brand-gold" />,
    Compass: <Compass className="w-5 h-5 text-brand-gold" />,
    Clock: <Clock className="w-5 h-5 text-brand-gold" />
  };

  return (
    <section id="impact" className="relative py-24 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            Verified Proof of Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-4"
          >
            Impact Through Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light"
          >
            Real people, real communities, and thousands of hours reclaimed from screens across Coimbatore.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all duration-300 shadow-xl group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-gold/30 transition-colors">
                  {iconMap[stat.iconName]}
                </div>
                <span className="text-[10px] font-mono tracking-widest text-brand-gold/70 uppercase">
                  VERIFIED STAT
                </span>
              </div>
              
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gradient-gold mb-2">
                {stat.number}
              </div>
              <div className="text-base font-serif font-semibold text-brand-ivory mb-2">
                {stat.label}
              </div>
              <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
