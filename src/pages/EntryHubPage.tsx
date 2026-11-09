import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';
import logoImg from '../assets/logo/offscreen_logo.jpg';

// Authentic event preview photos for the Events card
import p10_1 from '../assets/events/portfolio_p10_img1.jpeg'; // Walkathon
import p11_4 from '../assets/events/portfolio_p11_img4.jpeg'; // Diwali Carnival
import p12_1 from '../assets/events/portfolio_p12_img1.jpeg'; // Mom & Me
import p13_1 from '../assets/events/portfolio_p13_img1.jpeg'; // Komagal Awards

export const EntryHubPage: React.FC = () => {
  const eventPreviewImages = [
    { src: p11_4, title: 'Diwali Carnival', stat: '2,000+ Participants' },
    { src: p12_1, title: 'Mom & Me Ramp Walk', stat: 'Inclusive Celebration' },
    { src: p10_1, title: 'Kovaipudur Walkathon', stat: 'Active Community' },
    { src: p13_1, title: 'Komagal Awards', stat: 'Honoring Women' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E232B] font-sans selection:bg-[#E5C96D]/40 selection:text-[#0D0D0F] relative overflow-hidden flex flex-col justify-between">
      {/* Soft Gradient Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#EDE9FE]/70 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-[#E0F2FE]/60 rounded-full blur-[140px]" />
        <div className="absolute -bottom-24 left-1/3 w-[600px] h-[600px] bg-[#FFEDD5]/60 rounded-full blur-[150px]" />
        <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-[#FEF3C7]/50 rounded-full blur-[130px]" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#1E232B 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Top Header / Brand Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-8 sm:pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-md flex items-center justify-center bg-white p-0.5">
            <img src={logoImg} alt="Offscreen Hub Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#14171F] block group-hover:text-[#967C29] transition-colors">
              OFFSCREEN HUB
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#6B7280] font-sans font-medium block">
              Digital Platform Ecosystem
            </span>
          </div>
        </div>

        {/* Quick Portal Switcher / Admin Anchor */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="text-xs font-medium text-[#4B5563] hover:text-[#0D0D0F] px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#E5E7EB] transition-all shadow-sm flex items-center gap-1.5"
            title="Portal Administration"
          >
            <Shield className="w-3.5 h-3.5 text-[#967C29]" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </header>

      {/* Main Selection Stage */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-14 my-auto">
        {/* Central Brand Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E5C96D]/50 shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-widest text-[#967C29] uppercase">
              Beyond the Screen, Into the Real World
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#111827] tracking-tight leading-[1.08] mb-6"
          >
            OFFSCREEN HUB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#4B5563] font-light leading-relaxed max-w-2xl mx-auto mb-3"
          >
            “Creating meaningful offline experiences that inspire creativity, confidence, intellectual learning and well-being.”
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs sm:text-sm text-[#9CA3AF] tracking-wide uppercase font-medium"
          >
            Select a division to explore our real-world ecosystem
          </motion.p>
        </div>

        {/* Two Major Division Interactive Portal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {/* OPTION 1 — EVENTS PORTAL CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_rgba(20,24,35,0.06)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            {/* Soft Ambient Card Glow on Hover */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#FEF3C7]/60 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#FFEDD5]/40 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Card Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5E6] border border-[#E5C96D]/40 text-[#967C29] text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Division 01 • Active</span>
                </div>
                <span className="text-xs font-serif italic text-[#9CA3AF]">21 Events • 10,300+ Engaged</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111827] mb-3 group-hover:text-[#967C29] transition-colors">
                EVENTS
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-8">
                “Discover experiences that bring people together, inspire creativity and create meaningful moments beyond screens.”
              </p>

              {/* Real Photographs Interactive Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {eventPreviewImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] group/img bg-[#E5E7EB] shadow-sm"
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                      <p className="text-[11px] font-semibold leading-tight line-clamp-1">{img.title}</p>
                      <p className="text-[9px] text-[#E5C96D] font-mono">{img.stat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                to="/events"
                className="w-full py-4 px-6 rounded-2xl bg-[#14171F] hover:bg-[#967C29] text-white font-medium text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 group-hover:shadow-lg shadow-md"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* OPTION 2 — EDUCATION PORTAL CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_rgba(20,24,35,0.06)] hover:shadow-[0_30px_70px_rgba(138,128,184,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            {/* Soft Ambient Card Glow on Hover */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#EDE9FE]/70 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#E0F2FE]/50 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Card Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F0FF] border border-[#DDD6FE] text-[#7C3AED] text-xs font-semibold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Division 02 • Coming Soon</span>
                </div>
                <span className="text-xs font-serif italic text-[#8A80B8] font-medium">In Formulation</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111827] mb-3 group-hover:text-[#7C3AED] transition-colors">
                EDUCATION
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-8">
                “Discover opportunities for learning, creativity and personal development.”
              </p>

              {/* Refined Abstract Educational Visual */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE]/50 to-[#E0F2FE]/40 border border-[#DDD6FE]/60 p-6 flex flex-col justify-between mb-8 shadow-inner">
                {/* Abstract Geometric Rings & Orbiting Nodes */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-48 h-48 rounded-full border border-[#8A80B8]/40 animate-[spin_25s_linear_infinite]" />
                  <div className="absolute w-36 h-36 rounded-full border border-dashed border-[#4A6FA5]/50 animate-[spin_18s_linear_infinite_reverse]" />
                  <div className="absolute w-24 h-24 rounded-full border border-[#7C3AED]/40" />
                  <div className="absolute w-4 h-4 rounded-full bg-[#8A80B8]/60 blur-xs" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#6D28D9]">
                    <Compass className="w-4 h-4" />
                    <span>Cognitive & Intellectual Development</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/80 border border-[#DDD6FE] text-[#7C3AED]">
                    Future Architecture
                  </span>
                </div>

                <div className="relative z-10 space-y-2 max-w-xs">
                  <div className="h-2 w-3/4 bg-[#8A80B8]/20 rounded-full" />
                  <div className="h-2 w-1/2 bg-[#8A80B8]/15 rounded-full" />
                  <p className="text-xs font-serif italic text-[#6B7280] pt-2">
                    Nurturing patience, concentration, and deep intellectual curiosity beyond digital distractions.
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#8A80B8]/15 text-[11px] text-[#4B5563]">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3 h-3 text-[#7C3AED]" />
                    Screen-Free Learning Foundation
                  </span>
                  <span className="font-semibold text-[#7C3AED]">Coming Soon</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                to="/education"
                className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-[#F5F3FF] text-[#111827] hover:text-[#7C3AED] font-medium text-sm tracking-wider uppercase border border-[#DDD6FE] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md"
              >
                <span>Explore Education</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] border-t border-[#E5E7EB]/60 gap-4">
        <div>
          <span className="font-serif font-semibold text-[#14171F]">Offscreen Hub</span> — Beyond the Screen, Into the Real World.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/events" className="hover:text-[#111827] transition-colors">
            Events Portal
          </Link>
          <Link to="/education" className="hover:text-[#111827] transition-colors">
            Education Portal
          </Link>
          <Link to="/admin" className="hover:text-[#111827] transition-colors">
            Admin Portal
          </Link>
        </div>
      </footer>
    </div>
  );
};
