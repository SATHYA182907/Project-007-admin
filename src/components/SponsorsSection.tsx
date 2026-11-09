import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Handshake, ArrowUpRight, Sparkles, Shield, Heart } from 'lucide-react';

interface Partner {
  name: string;
  category: 'Corporate & Real Estate' | 'Healthcare & Wellness' | 'Education & Youth' | 'Civic & Community' | 'Retail & Hospitality' | 'Arts & Culture';
  role: string;
}

export const SponsorsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const partnersList: Partner[] = [
    { name: 'Vedanta', category: 'Corporate & Real Estate', role: 'Sponsor (Walkathon, Community Projects & Senior Sangamam)' },
    { name: 'Ananya’s Nana Nani', category: 'Corporate & Real Estate', role: 'Sponsor (Women’s Day 2025 & 2026, Onam Celebrations)' },
    { name: 'Abhirami Hospital', category: 'Healthcare & Wellness', role: 'Lead Sponsor (“Mom & Me” Inclusive Ramp Walk)' },
    { name: 'Alveal Mall', category: 'Retail & Hospitality', role: 'Sponsor (Workshops, Ramp Walk & Let’s Dance)' },
    { name: 'Ganapathi Silks', category: 'Retail & Hospitality', role: 'Sponsor (Public Brain Gym Workshops in Townhall)' },
    { name: 'Kids.com', category: 'Education & Youth', role: 'Sponsor (Children’s Day Celebration, Kuniyamuthur)' },
    { name: 'Decathlon', category: 'Healthcare & Wellness', role: 'Collaborating Partner (Komagal Marathon at Racecourse)' },
    { name: 'Adissia', category: 'Civic & Community', role: 'Partner (Mom & Me, Komagal Awards & Pet Ramp Walk)' },
    { name: 'Southern Bank', category: 'Corporate & Real Estate', role: 'Collaborating Partner (Komagal Awards Ceremony)' },
    { name: 'Lions Club', category: 'Civic & Community', role: 'Collaborating Partner (Komagal Awards Ceremony)' },
    { name: 'Koumaram Prashanti', category: 'Healthcare & Wellness', role: 'Partner (Autism & Special Needs Support)' },
    { name: 'Annabrahma', category: 'Retail & Hospitality', role: 'Collaborating Partner (Kovaipudur Walkathon)' },
    { name: 'SADC', category: 'Arts & Culture', role: 'Collaborating Partner (Diwali Carnival)' },
    { name: 'Strumps & Hums', category: 'Arts & Culture', role: 'Collaborating Partner (Diwali Carnival Music)' },
    { name: 'Flying Moves', category: 'Arts & Culture', role: 'Collaborating Partner (Diwali Carnival Dance)' },
    { name: 'KSA Sports Academy', category: 'Healthcare & Wellness', role: 'Sponsor (Women’s Badminton Tournament)' },
    { name: 'Bow Bow Bliss', category: 'Civic & Community', role: 'Collaborating Partner (Pet Ramp Walk, Kalapatti)' },
    { name: 'NPR Jewelry', category: 'Retail & Hospitality', role: 'Sponsor (Republic Day Drawing Competition)' },
    { name: 'Thoorigai Academy', category: 'Education & Youth', role: 'Collaborating Partner (Art & Drawing Competition)' },
    { name: 'Ashram School', category: 'Education & Youth', role: 'Collaborating Partner (Dhandiya Event, Kovaipudur)' },
    { name: 'Nirmala College', category: 'Education & Youth', role: 'Collaborating Partner (Komagal Marathon)' },
    { name: 'Thai Ullam Trust', category: 'Civic & Community', role: 'Collaborating Partner (Komagal Marathon)' },
    { name: 'Mudcups', category: 'Retail & Hospitality', role: 'Sponsor (Valentine’s Day Youth Session)' },
  ];

  const categories = [
    'All',
    'Corporate & Real Estate',
    'Healthcare & Wellness',
    'Education & Youth',
    'Civic & Community',
    'Retail & Hospitality',
    'Arts & Culture',
  ];

  const filteredPartners = selectedCategory === 'All'
    ? partnersList
    : partnersList.filter((p) => p.category === selectedCategory);

  return (
    <section id="sponsors" className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-lavender/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card border border-brand-gold/30 mb-4"
          >
            <Handshake className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Partners in Purpose
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory leading-tight mb-4"
          >
            Our Sponsors & Partners
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            We are proud to collaborate with esteemed institutions, visionary brands, healthcare leaders, and educational pillars who champion screen-free community vitality.
          </motion.p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-card border border-white/10 shadow-lg max-w-4xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-brand-dark shadow-glow-gold'
                    : 'text-brand-mutedIvory hover:text-brand-ivory hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Elegant Typography-First Partner Grid (Strictly No Fake Logos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="p-6 rounded-2xl glass-card border border-white/10 hover:border-brand-gold/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group bg-brand-card/75"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-gold/90">
                    {partner.category}
                  </span>
                  <Building2 className="w-4 h-4 text-brand-gold/60 group-hover:text-brand-gold transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors leading-tight mb-2">
                  {partner.name}
                </h3>
              </div>

              <div className="pt-3 border-t border-white/5 mt-3">
                <p className="text-xs text-brand-mutedIvory/80 font-light leading-relaxed">
                  {partner.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sponsor Call-To-Action Banner */}
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-brand-gold/30 bg-brand-card/90 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-gold">
              CSR & Brand Partnerships
            </span>
            <h4 className="text-2xl font-serif font-bold text-brand-ivory">
              Partner With Offscreen Hub
            </h4>
            <p className="text-xs sm:text-sm text-brand-mutedIvory font-light max-w-lg">
              Amplify your social impact by supporting authentic, screen-free experiences for families, students, and senior citizens.
            </p>
          </div>

          <a
            href="#collaborate"
            className="px-6 py-3.5 rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs tracking-wider uppercase shadow-glow-gold hover:scale-105 transition-all duration-300 whitespace-nowrap flex items-center gap-2 shrink-0"
          >
            <span>Start a Partnership</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
