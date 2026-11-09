import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users,
  CalendarCheck,
  Building2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const StatsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Simple animated counter state
  const [eventsCount, setEventsCount] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Counter animations
    const duration = 1800; // ms
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutQuad
      const eased = 1 - (1 - progress) * (1 - progress);

      setEventsCount(Math.floor(eased * 21));
      setParticipantsCount(Math.floor(eased * 10300));
      setPartnersCount(Math.floor(eased * 21));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView]);

  const verifiedHighlights = [
    {
      label: 'Diwali Carnival Festival',
      value: '2,000+',
      note: 'Participants immersed in offline games & cultural dance',
    },
    {
      label: 'Komagal Public Marathon',
      value: '1,800+',
      note: 'City runners promoting health & screen-free stamina',
    },
    {
      label: 'Nana Nani Senior Fellowship',
      value: '1,900+',
      note: 'Elders celebrating Onam and Women’s Day in togetherness',
    },
    {
      label: 'Mom & Me Inclusive Walk',
      value: '900+',
      note: 'Families & children with autism stepping out with pride',
    },
  ];

  return (
    <section id="impact" ref={ref} className="relative py-24 sm:py-32 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card border border-brand-gold/30 mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Measurable Community Impact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory leading-tight mb-4"
          >
            Our Screen-Free Impact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            We measure our success not by digital likes or impressions, but by real human hours spent present in the physical world without glowing screens.
          </motion.p>
        </div>

        {/* Primary Animated Impact Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* 1. Total Events */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all text-center group bg-brand-card/80"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-6 h-6 text-brand-gold" />
            </div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory font-mono mb-2">
              {eventsCount}
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-1">
              Events Documented
            </h3>
            <p className="text-xs text-brand-mutedIvory/80">
              Across public grounds, educational schools, senior living facilities, and retail hubs.
            </p>
          </motion.div>

          {/* 2. Total Participant Entries */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl glass-card border border-brand-gold/40 shadow-glow-gold transition-all text-center group bg-brand-card/90"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-brand-gold" />
            </div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gradient-gold font-mono mb-2">
              {participantsCount.toLocaleString()}+
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-ivory mb-1">
              Participant Entries
            </h3>
            <p className="text-xs text-brand-mutedIvory/80">
              From toddlers and young parents to working professionals and senior citizens.
            </p>
          </motion.div>

          {/* 3. Verified Sponsors & Partners */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all text-center group bg-brand-card/80"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-lavender/15 border border-brand-lavender/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6 text-brand-lavender" />
            </div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory font-mono mb-2">
              {partnersCount}+
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-lavender mb-1">
              Verified Partners & Sponsors
            </h3>
            <p className="text-xs text-brand-mutedIvory/80">
              Corporate entities, hospitals, NGOs, schools, and civic associations joined in partnership.
            </p>
          </motion.div>
        </div>

        {/* The Screen-Free Calculation Formula & Validation Transparency Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-brand-gold/20 bg-brand-card/60 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-gold">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>The Measurement Standard</span>
              </div>
              <h4 className="text-xl font-serif font-bold text-brand-ivory">
                Formula: Number of participants × Event duration = Participant-hours of screen-free engagement.
              </h4>
              <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed">
                We define this metric strictly as <strong className="text-brand-ivory font-medium">participant-hours of screen-free engagement</strong> (collective human attention freed from digital interfaces during our organized activities). We do not claim unique individual hours of screen-time eliminated.
              </p>
            </div>

            <div className="lg:col-span-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5">
              <span className="font-semibold text-brand-gold uppercase tracking-wider block">
                Total Screen-Time Value:
              </span>
              <span className="text-brand-ivory font-mono text-sm block font-bold">
                Pending Verification Audit
              </span>
              <p className="text-[11px] text-brand-mutedIvory/80 leading-relaxed italic">
                *Note: Source records list stated sum of 36,550 participant-hours alongside itemized values. In adherence to strict transparency, we present verified event-level values in each event overview.
              </p>
            </div>
          </div>
        </div>

        {/* Event-Level Verified Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {verifiedHighlights.map((vh, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl glass-card border border-white/5 hover:border-brand-gold/30 transition-colors bg-white/[0.02]"
            >
              <span className="text-2xl font-serif font-bold text-brand-gold font-mono block mb-1">
                {vh.value}
              </span>
              <h5 className="text-xs font-serif font-semibold text-brand-ivory uppercase tracking-wider mb-1">
                {vh.label}
              </h5>
              <p className="text-[11px] text-brand-mutedIvory font-light leading-relaxed">
                {vh.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
