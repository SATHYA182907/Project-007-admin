import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

import hero1 from '../assets/events/portfolio_p11_img4.jpeg'; // Diwali Carnival
import hero2 from '../assets/events/portfolio_p10_img1.jpeg'; // Walkathon
import hero3 from '../assets/events/portfolio_p12_img1.jpeg'; // Mom & Me
import hero4 from '../assets/events/portfolio_p13_img1.jpeg'; // Komagal Awards
import hero5 from '../assets/events/portfolio_p10_img2.jpeg'; // Children's Day

const heroSlides = [
  { image: hero1, title: 'Diwali Carnival', subtitle: '2000+ Floating Crowd Engaged in Screen-Free Joy' },
  { image: hero2, title: 'Kovaipudur Walkathon', subtitle: 'Promoting Active Living & Community Wellness' },
  { image: hero3, title: 'Mom & Me Ramp Walk', subtitle: 'Autism Awareness, Love & Inclusive Celebration' },
  { image: hero4, title: 'Komagal Awards', subtitle: 'Honoring 250+ Women & Community Leaders' },
  { image: hero5, title: 'Children’s Day Festival', subtitle: 'Nurturing Creativity & Family Bonding' }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 bg-brand-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Dark Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-brand-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-transparent to-brand-dark/70" />
        
        {/* Soft Ambient Radial Light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Subtle Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-brand-gold/30 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Offscreen Entertainment Hub
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-brand-ivory leading-[1.1] mb-6"
        >
          BEYOND THE SCREEN, <br />
          <span className="text-gradient-gold">INTO THE WORLD.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-brand-mutedIvory font-light leading-relaxed mb-10"
        >
          Creating meaningful offline experiences that inspire creativity, confidence, connection, learning, and well-being.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#events"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-glow-gold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Explore Our Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#collaborate"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-card hover:bg-white/10 text-brand-ivory font-semibold text-xs sm:text-sm tracking-wider uppercase border border-white/15 hover:border-brand-gold/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Collaborate With Us
          </a>
        </motion.div>

        {/* Live Slide Info Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card text-xs text-brand-mutedIvory border border-white/5"
        >
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
          <span className="font-medium text-brand-ivory">{heroSlides[currentSlide].title}:</span>
          <span className="text-brand-mutedIvory/80 hidden sm:inline">{heroSlides[currentSlide].subtitle}</span>
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index ? 'w-8 h-2 bg-brand-gold shadow-glow-gold' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.a
        href="#philosophy"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-brand-gold/70 hover:text-brand-gold transition-colors text-[10px] tracking-widest uppercase font-semibold"
      >
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
};
