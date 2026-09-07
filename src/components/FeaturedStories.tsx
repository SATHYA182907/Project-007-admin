import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Award } from 'lucide-react';

import mom1 from '../assets/events/portfolio_p12_img1.jpeg';
import mom2 from '../assets/events/portfolio_p12_img2.jpeg';
import mom3 from '../assets/events/portfolio_p12_img3.jpeg';
import mom4 from '../assets/events/portfolio_p12_img4.jpeg';
import mom5 from '../assets/events/portfolio_p12_img5.jpeg';
import mom6 from '../assets/events/portfolio_p12_img6.jpeg';

import komagal1 from '../assets/events/portfolio_p13_img1.jpeg';
import komagal2 from '../assets/events/portfolio_p13_img2.jpeg';
import komagal3 from '../assets/events/portfolio_p13_img3.jpeg';
import komagal4 from '../assets/events/portfolio_p13_img4.jpeg';
import komagal5 from '../assets/events/portfolio_p13_img5.jpeg';
import komagal6 from '../assets/events/portfolio_p13_img6.jpeg';

export const FeaturedStories: React.FC = () => {
  const [selectedMomImg, setSelectedMomImg] = useState(mom1);
  const [selectedKomagalImg, setSelectedKomagalImg] = useState(komagal1);

  const momPhotos = [mom1, mom2, mom3, mom4, mom5, mom6];
  const komagalPhotos = [komagal1, komagal2, komagal3, komagal4, komagal5, komagal6];

  return (
    <section className="relative py-24 sm:py-32 bg-brand-darker border-t border-white/5 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-brand-lavender/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* STORY 01: MOM & ME */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" /> Featured Case Study 01
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory leading-tight">
              Mom & Me <br />
              <span className="text-gradient-gold">Love. Inclusion. Acceptance.</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed">
              “Mom & Me was more than a ramp walk — it was a celebration of love, inclusion, and acceptance.”
            </p>

            <p className="text-sm sm:text-base text-brand-mutedIvory/80 leading-relaxed">
              By bringing together mothers and children, including children on the autism spectrum, we created a platform where every family felt seen, valued, and celebrated. The event reflected our vision of building an inclusive society where every child belongs and every difference is embraced.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl glass-card border border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-gold block mb-1">LOCATION</span>
                <span className="text-sm font-semibold text-brand-ivory">Sri Maruti Gana Sabha, R.S. Puram</span>
              </div>
              <div className="p-4 rounded-xl glass-card border border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-gold block mb-1">ATTENDANCE</span>
                <span className="text-sm font-semibold text-brand-ivory">Around 750 Attendees</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Autism Awareness', 'Inclusion', 'Belonging', 'Neurodiverse & Neurotypical Bond'].map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-brand-ivory border border-white/10">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Interactive Photo Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Featured Image */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden glass-card border border-brand-gold/30 shadow-2xl">
              <img
                src={selectedMomImg}
                alt="Mom & Me Still"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-6 text-xs font-serif font-bold text-brand-gold uppercase tracking-widest">
                Stills from Mom & Me Celebration
              </span>
            </div>

            {/* Thumbnail Selector */}
            <div className="grid grid-cols-6 gap-2">
              {momPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMomImg(photo)}
                  className={`h-16 rounded-lg overflow-hidden border transition-all ${
                    selectedMomImg === photo
                      ? 'border-brand-gold scale-105 shadow-glow-gold'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt={`Mom & Me ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* STORY 02: KOMAGAL AWARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 border-t border-white/5">
          {/* Interactive Photo Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-4 order-2 lg:order-1"
          >
            {/* Featured Image */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden glass-card border border-brand-lavender/30 shadow-2xl">
              <img
                src={selectedKomagalImg}
                alt="Komagal Awards Still"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-6 text-xs font-serif font-bold text-brand-lavender uppercase tracking-widest">
                Stills from Komagal Awards Ceremony
              </span>
            </div>

            {/* Thumbnail Selector */}
            <div className="grid grid-cols-6 gap-2">
              {komagalPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedKomagalImg(photo)}
                  className={`h-16 rounded-lg overflow-hidden border transition-all ${
                    selectedKomagalImg === photo
                      ? 'border-brand-lavender scale-105 shadow-glow-lavender'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt={`Komagal Award ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Text Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-brand-lavender/30 text-brand-lavender text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-brand-lavender" /> Featured Case Study 02
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory leading-tight">
              Komagal Awards <br />
              <span className="text-gradient-silver">Celebrating Women Who Create Change.</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed">
              The Komagal Awards celebrated the inspiring women of Coimbatore who have made meaningful contributions across various fields.
            </p>

            <p className="text-sm sm:text-base text-brand-mutedIvory/80 leading-relaxed">
              A large-scale women empowerment initiative recognizing 250+ women under categories including Entrepreneur, Social Worker, and Homemaker. The event featured cultural performances, dance programs, debate sessions, awards, and recognition ceremonies, creating nearly 6 hours of screen-free engagement.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl glass-card border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-serif font-bold text-brand-gold block">250+</span>
                <span className="text-[10px] text-brand-mutedIvory uppercase font-semibold">Women Honored</span>
              </div>
              <div className="p-3 rounded-xl glass-card border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-serif font-bold text-brand-gold block">400+</span>
                <span className="text-[10px] text-brand-mutedIvory uppercase font-semibold">Audience Crowd</span>
              </div>
              <div className="p-3 rounded-xl glass-card border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-serif font-bold text-brand-gold block">6 Hours</span>
                <span className="text-[10px] text-brand-mutedIvory uppercase font-semibold">Screen-Free</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
