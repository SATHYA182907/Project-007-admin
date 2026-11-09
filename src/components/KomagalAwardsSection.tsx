import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Users, Heart, Sparkles, Building2, MapPin, Clock } from 'lucide-react';

import stageImg from '../assets/events/portfolio_p13_img1.jpeg'; // Stage & ceremony
import trophyImg from '../assets/events/portfolio_p13_img2.jpeg'; // Trophies & citations
import recipientsImg from '../assets/events/portfolio_p13_img3.jpeg'; // Award recipients
import audienceImg from '../assets/events/portfolio_p13_img4.jpeg'; // Audience & dignitaries

export const KomagalAwardsSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<number>(0);

  const awardPhotos = [
    {
      src: stageImg,
      title: 'Grand Stage Felicitations',
      caption: 'The inspiring main stage at Srinivasa Art & Gallery, Peelamedu, honoring women changemakers.',
      tag: 'Stage Ceremony',
    },
    {
      src: trophyImg,
      title: 'Trophies & Mementos of Honor',
      caption: 'Exquisite brass mementos and citations crafted to celebrate courage, dedication, and leadership.',
      tag: 'Trophies & Citations',
    },
    {
      src: recipientsImg,
      title: 'Honoring Exceptional Recipients',
      caption: 'Educators, healthcare pillars, and social reformers receiving recognition before an appreciative audience.',
      tag: 'Award Recipients',
    },
    {
      src: audienceImg,
      title: 'Distinguished Gathering & Audience',
      caption: 'Over 400 citizens, community leaders, and family members cheering in screen-free fellowship.',
      tag: 'Audience & Fellowship',
    },
  ];

  return (
    <section id="awards" className="relative py-24 sm:py-32 bg-brand-darker border-t border-brand-gold/20 overflow-hidden">
      {/* Background Lighting & Radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-brand-lavender/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card border border-brand-gold/40 shadow-glow-gold mb-4"
          >
            <Trophy className="w-4 h-4 text-brand-gold animate-bounce" />
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Awards & Recognition
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-brand-ivory leading-tight mb-4"
          >
            Komagal Awards
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl font-serif italic text-gradient-gold mb-4"
          >
            “Celebrating Women Who Create Change.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base text-brand-mutedIvory leading-relaxed font-light max-w-2xl mx-auto"
          >
            A prestigious signature ceremony instituted by Offscreen Hub to honor educators, healthcare workers, social reformers, and grassroot heroes who transform our world every day.
          </motion.p>
        </div>

        {/* Prominent Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Active Hero Photograph Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-brand-gold/40 shadow-[0_20px_50px_rgba(212,175,55,0.2)] bg-black group">
              <img
                src={awardPhotos[activePhoto].src}
                alt={awardPhotos[activePhoto].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider shadow-md">
                  {awardPhotos[activePhoto].tag}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-ivory mb-1">
                  {awardPhotos[activePhoto].title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed">
                  {awardPhotos[activePhoto].caption}
                </p>
              </div>
            </div>

            {/* 4 Interactive Photo Selectors */}
            <div className="grid grid-cols-4 gap-3">
              {awardPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-300 focus:outline-none ${
                    activePhoto === idx
                      ? 'border-brand-gold shadow-glow-gold scale-102 ring-2 ring-brand-gold/50'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Narrative, Partners, and Verified Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Story Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-brand-gold/30 bg-brand-card/90 space-y-4 shadow-xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-gold" />
                The Komagal Legacy
              </span>

              <h3 className="text-2xl font-serif font-bold text-brand-ivory">
                Lifting Up the Real Changemakers of Our Society
              </h3>

              <p className="text-xs sm:text-sm text-brand-mutedIvory leading-relaxed font-light">
                In an era dominated by superficial digital acclaim, the Komagal Awards creates an authentic, dignified stage to honor tangible real-world contributions. Recipients are felicitated in front of peers, dignitaries, and families in a spirit of pure offline celebration.
              </p>

              {/* Verified Event Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-brand-gold mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Audience</span>
                  </div>
                  <span className="text-base font-serif font-bold text-brand-ivory">
                    400 Attendees
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-brand-gold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Engagement</span>
                  </div>
                  <span className="text-base font-serif font-bold text-brand-ivory">
                    1,600 Part-Hours
                  </span>
                </div>
              </div>

              {/* Verified Location & Duration */}
              <div className="space-y-2 text-xs text-brand-mutedIvory pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>Srinivasa Art & Gallery, Peelamedu, Coimbatore</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>4 Hours Immersive Screen-Free Ceremony</span>
                </div>
              </div>
            </div>

            {/* Sponsoring & Collaborating Partners Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 bg-white/[0.02] space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-gold/90 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                Collaborating Institutions & Sponsors
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-brand-gold/40 text-brand-gold text-xs font-semibold">
                  Lead Sponsor: OSH
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-ivory text-xs">
                  Adissia
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-ivory text-xs">
                  Southern Bank
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-ivory text-xs">
                  Lions Club
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
