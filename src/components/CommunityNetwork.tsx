import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Heart, Sparkles, Building, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo/offscreen_logo.jpg';

export const CommunityNetwork: React.FC = () => {
  const nodes = [
    { title: 'Children', desc: 'Active Creators & Explorers', icon: <Sparkles className="w-5 h-5 text-brand-gold" /> },
    { title: 'Parents', desc: 'Bonding & Mindful Guides', icon: <Heart className="w-5 h-5 text-brand-gold" /> },
    { title: 'Schools', desc: 'Educational Co-creators', icon: <GraduationCap className="w-5 h-5 text-brand-gold" /> },
    { title: 'Volunteers', desc: 'Community Facilitators', icon: <Users className="w-5 h-5 text-brand-gold" /> },
    { title: 'Educators', desc: 'Pedagogical Champions', icon: <ShieldCheck className="w-5 h-5 text-brand-gold" /> },
    { title: 'Communities', desc: 'Vibrant Local Ecosystems', icon: <Building className="w-5 h-5 text-brand-gold" /> },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            The Movement
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-6"
          >
            A Community, Not Just Workshops
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            Offscreen Hub is building a movement where children, parents, volunteers, educators, and communities come together to create a healthier balance between technology and real life.
          </motion.p>
        </div>

        {/* Orbiting Community Node Graphic */}
        <div className="relative my-12 max-w-4xl mx-auto min-h-[420px] flex items-center justify-center">
          {/* Central OSH Hub Node */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full glass-card border-2 border-brand-gold p-2 shadow-glow-gold flex flex-col items-center justify-center text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 border border-brand-gold">
              <img src={logoImg} alt="OSH Hub" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-xs sm:text-sm font-bold text-brand-gold uppercase tracking-wider">
              OFFSCREEN HUB
            </span>
          </motion.div>

          {/* Connected Outer Orbit Nodes Grid */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 pointer-events-none items-center">
            {nodes.map((node, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="pointer-events-auto p-4 sm:p-5 rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 shadow-xl transition-all duration-300 flex items-center gap-3 bg-brand-dark/90"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  {node.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-serif font-bold text-brand-ivory">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-brand-mutedIvory/80">
                    {node.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
