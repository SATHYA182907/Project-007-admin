import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import bgImg from '../assets/events/portfolio_p10_img1.jpeg';

interface ContactSectionProps {
  onOpenJoinModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenJoinModal }) => {
  const { contact } = siteContent;

  return (
    <section id="contact" className="relative py-24 sm:py-36 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Background Graphic with Dark Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="Offscreen Hub Event Background"
          className="w-full h-full object-cover opacity-20 filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-brand-gold/30 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Start the Conversation
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif font-bold text-brand-ivory mb-6 leading-tight"
        >
          Let’s Build Screen-Free Time <br />
          <span className="text-gradient-gold">Together.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-brand-mutedIvory font-light leading-relaxed mb-12"
        >
          Together, let’s create more meaningful childhoods and stronger communities across schools, families, and organizations.
        </motion.p>

        {/* Contact Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {/* Phone Card */}
          <motion.a
            href={`tel:${contact.phone}`}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl glass-card border border-brand-gold/30 hover:border-brand-gold flex items-center justify-between shadow-2xl group transition-all"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center">
                <Phone className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest block">
                  CALL DIRECTLY
                </span>
                <span className="text-xl font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors">
                  {contact.phone}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>

          {/* Email Card */}
          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl glass-card border border-brand-gold/30 hover:border-brand-gold flex items-center justify-between shadow-2xl group transition-all"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center">
                <Mail className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest block">
                  EMAIL US
                </span>
                <span className="text-sm font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors truncate max-w-[180px] sm:max-w-none block">
                  {contact.email}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        {/* Action Button */}
        {onOpenJoinModal ? (
          <motion.button
            onClick={onOpenJoinModal}
            whileHover={{ scale: 1.05 }}
            className="px-10 py-5 rounded-full bg-gold-gradient text-brand-dark font-bold text-sm uppercase tracking-widest shadow-glow-gold transition-all"
          >
            Collaborate With Us Now
          </motion.button>
        ) : (
          <motion.a
            href="#collaborate"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-10 py-5 rounded-full bg-gold-gradient text-brand-dark font-bold text-sm uppercase tracking-widest shadow-glow-gold transition-all"
          >
            Collaborate With Us Now
          </motion.a>
        )}
      </div>
    </section>
  );
};
