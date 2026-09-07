import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Building2, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { collaborationData } from '../data/collaboration';

interface CollaborationProps {
  onOpenJoinModal: (role?: string) => void;
}

export const Collaboration: React.FC<CollaborationProps> = ({ onOpenJoinModal }) => {
  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-7 h-7 text-brand-gold" />,
    Heart: <Heart className="w-7 h-7 text-brand-gold" />,
    Building2: <Building2 className="w-7 h-7 text-brand-gold" />
  };

  return (
    <section id="collaborate" className="relative py-24 sm:py-32 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            Partnerships & Synergies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-4"
          >
            Why Collaborate With Offscreen Hub?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light"
          >
            Together, let’s create more meaningful childhoods and stronger communities through tailored offline engagement programs.
          </motion.p>
        </div>

        {/* 3 Collaboration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collaborationData.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all duration-300 shadow-2xl flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-brand-gold/30 flex items-center justify-center transition-colors">
                    {iconMap[path.icon]}
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full">
                    {path.pathNumber}
                  </span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-brand-mutedIvory/70 block mb-2">
                  FOR {path.targetAudience.toUpperCase()}
                </span>

                <h3 className="text-2xl font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors mb-4">
                  {path.title}
                </h3>

                <p className="text-sm text-brand-mutedIvory font-light leading-relaxed mb-6">
                  {path.description}
                </p>

                {/* Question Callouts for Parents */}
                {path.id === 'parents' && (
                  <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-brand-gold font-serif italic">
                    <p className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 shrink-0" /> “How do I reduce my child’s screen time?”</p>
                    <p className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 shrink-0" /> “What activities can we enjoy together?”</p>
                    <p className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 shrink-0" /> “How can I help my child discover interests?”</p>
                  </div>
                )}

                {/* Programs List */}
                <div className="space-y-2 mb-8">
                  <h4 className="text-xs font-semibold text-brand-ivory uppercase tracking-wider mb-3">
                    Collaborative Offerings:
                  </h4>
                  {path.programs.map((prog, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-brand-mutedIvory">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <button
                onClick={() => onOpenJoinModal(path.title)}
                className="w-full py-3.5 rounded-full bg-white/5 hover:bg-gold-gradient hover:text-brand-dark text-brand-ivory font-semibold text-xs tracking-wider uppercase border border-white/15 hover:border-brand-gold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-glow-gold"
              >
                <span>{path.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
