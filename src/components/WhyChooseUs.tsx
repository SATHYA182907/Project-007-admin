import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, ClipboardCheck, Smile, Network, CheckCircle, WalletCards } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const WhyChooseUs: React.FC = () => {
  const { whyChooseUs } = siteContent;

  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-6 h-6 text-brand-gold" />,
    Sparkles: <Sparkles className="w-6 h-6 text-brand-gold" />,
    ClipboardCheck: <ClipboardCheck className="w-6 h-6 text-brand-gold" />,
    Smile: <Smile className="w-6 h-6 text-brand-gold" />,
    Network: <Network className="w-6 h-6 text-brand-gold" />,
    CheckCircle: <CheckCircle className="w-6 h-6 text-brand-gold" />,
    WalletCards: <WalletCards className="w-6 h-6 text-brand-gold" />
  };

  return (
    <section id="why-us" className="relative py-24 sm:py-32 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            Our Unmatched Commitment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-4"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light"
          >
            At Offscreen Hub, we believe every event should be meaningful, engaging, and memorable. We are a professional team committed to creating unique experiences tailored to your needs.
          </motion.p>
        </div>

        {/* 7 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all duration-300 shadow-xl group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-gold/30 flex items-center justify-center mb-6 transition-colors">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-mutedIvory font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> Proven Excellence
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
