import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';

import heroWalkathon from '../assets/events/portfolio_p10_img1.jpeg'; // Walkathon
import heroDiwali from '../assets/events/portfolio_p11_img4.jpeg'; // Diwali Carnival
import heroMomMe from '../assets/events/portfolio_p12_img1.jpeg'; // Mom & Me
import heroWomensDay from '../assets/events/portfolio_p13_img5.jpeg'; // Women's Day
import heroChildrensDay from '../assets/events/portfolio_p10_img2.jpeg'; // Children's Day
import heroOnam from '../assets/events/portfolio_p13_img6.jpeg'; // Onam
import heroPetRamp from '../assets/events/portfolio_p12_img3.jpeg'; // Pet Ramp Walk
import heroKomagal from '../assets/events/portfolio_p13_img1.jpeg'; // Komagal Awards

const heroSlides = [
  { image: heroDiwali, title: 'Diwali Carnival @ Kovaipudur', subtitle: '2,000+ Floating Audience Engaged in Screen-Free Joy' },
  { image: heroWalkathon, title: 'Walkathon @ Kovaipudur', subtitle: 'Community Fitness, Active Aging & Screen-Free Awareness' },
  { image: heroMomMe, title: 'Mom & Me – Inclusive Ramp Walk', subtitle: 'Autism Awareness, Courage & Emotion on Stage' },
  { image: heroWomensDay, title: 'Women’s Day @ Ananya’s Nana Nani', subtitle: 'Honoring 900+ Elderly Women Across Generations' },
  { image: heroChildrensDay, title: 'Children’s Day @ Kids.com', subtitle: 'Tactile Motor Skills, Sensory Play & Childhood Agility' },
  { image: heroOnam, title: 'Onam Celebrations @ Somayampalayam', subtitle: '1,000+ Senior Citizens United in Traditional Harmony' },
  { image: heroPetRamp, title: 'Pet Ramp Walk @ Kalapatti', subtitle: 'Human-Animal Emotional Bonding & Outdoor Joy' },
  { image: heroKomagal, title: 'Komagal Awards Ceremony', subtitle: 'Celebrating Women Who Create Change' },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Slideshow */}
      <div className="absolute inset-0 bg-brand-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Dark Editorial Image Overlays for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/65 to-brand-dark/95" />

        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/10 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28">
        {/* Prominent Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-brand-gold/40 shadow-glow-gold mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-brand-gold uppercase">
            Offscreen Hub • Events Division
          </span>
        </motion.div>

        {/* Prominent Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-brand-ivory leading-[1.08] mb-6"
        >
          OFFSCREEN HUB
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gradient-gold mt-2 font-serif">
            Beyond the Screen, <br className="sm:hidden" /> Into the Real World.
          </span>
        </motion.h1>

        {/* Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-brand-mutedIvory font-light leading-relaxed mb-10"
        >
          “Creating meaningful offline experiences that inspire creativity, confidence, intellectual learning and well-being.”
        </motion.p>

        {/* Primary and Secondary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#explore-journey"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-glow-gold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Explore Our Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#collaborate"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-brand-ivory font-semibold text-xs sm:text-sm tracking-wider uppercase border border-white/20 hover:border-brand-gold/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Collaborate With Us</span>
            <ArrowUpRight className="w-4 h-4 text-brand-gold" />
          </a>
        </motion.div>

        {/* Live Photographic Context Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-xs text-brand-mutedIvory border border-white/10 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
          <span className="font-semibold text-brand-ivory">{heroSlides[currentSlide].title}:</span>
          <span className="text-brand-mutedIvory/80 hidden md:inline">{heroSlides[currentSlide].subtitle}</span>
        </motion.div>
      </div>

      {/* Bottom Controls: Slideshow Indicators & Scroll to Discover */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        {/* Pagination Slideshow Indicators (".......") */}
        <div className="flex items-center gap-2">
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

        {/* Scroll to Discover directly below the indicators */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 3 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
          className="flex flex-col items-center gap-1 text-brand-gold/80 hover:text-brand-gold transition-colors text-[10px] tracking-widest uppercase font-semibold group cursor-pointer"
        >
          <span className="whitespace-nowrap">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 text-brand-gold transition-transform group-hover:translate-y-0.5" />
        </motion.a>
      </div>
    </section>
  );
};
