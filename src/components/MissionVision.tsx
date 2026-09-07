import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const MissionVision: React.FC = () => {
  const { mission, vision } = siteContent.missionVision;

  return (
    <section className="relative py-20 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-10 rounded-2xl glass-card border border-brand-gold/20 relative group overflow-hidden shadow-2xl hover:border-brand-gold/40 transition-colors"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-all pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-brand-gold" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-2">
              Our Core Purpose
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-ivory mb-4">
              {mission.title}
            </h3>
            <p className="text-sm sm:text-base text-brand-mutedIvory leading-relaxed font-light">
              {mission.content}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 sm:p-10 rounded-2xl glass-card border border-brand-lavender/20 relative group overflow-hidden shadow-2xl hover:border-brand-lavender/40 transition-colors"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-lavender/10 rounded-full blur-3xl group-hover:bg-brand-lavender/20 transition-all pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-brand-lavender/15 border border-brand-lavender/30 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-brand-lavender" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-brand-lavender uppercase block mb-2">
              Our Horizon
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-ivory mb-4">
              {vision.title}
            </h3>
            <p className="text-sm sm:text-base text-brand-mutedIvory leading-relaxed font-light">
              {vision.content}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
