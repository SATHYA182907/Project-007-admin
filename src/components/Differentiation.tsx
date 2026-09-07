import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Palette, Brain, Users, Compass, Target, HeartHandshake } from 'lucide-react';
import { differentiationData } from '../data/differentiation';

export const Differentiation: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    UserCheck: <UserCheck className="w-6 h-6 text-brand-gold" />,
    Palette: <Palette className="w-6 h-6 text-brand-gold" />,
    Brain: <Brain className="w-6 h-6 text-brand-gold" />,
    Users: <Users className="w-6 h-6 text-brand-gold" />,
    Compass: <Compass className="w-6 h-6 text-brand-gold" />,
    Target: <Target className="w-6 h-6 text-brand-gold" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-brand-gold" />
  };

  return (
    <section className="relative py-24 sm:py-32 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            Our Core Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-4"
          >
            What Makes Offscreen Hub Different?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light"
          >
            Seven foundational pillars that transform simple leisure into intentional, life-changing growth.
          </motion.p>
        </div>

        {/* 7 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all duration-300 shadow-xl group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl group-hover:bg-brand-gold/15 transition-all pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-gold/30 transition-colors">
                    {iconMap[item.icon]}
                  </div>
                  <span className="text-3xl font-serif font-bold text-white/20 group-hover:text-brand-gold/40 transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-brand-mutedIvory font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> OSH Core Pillar
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
