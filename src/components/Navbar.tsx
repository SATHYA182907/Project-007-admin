import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import logoImg from '../assets/logo/offscreen_logo.jpg';

interface NavbarProps {
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Events', href: '#events' },
    { name: 'About Us', href: '#about' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Collaborate', href: '#collaborate' },
    { name: 'Join Us', href: '#join' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-nav py-3 shadow-glass' : 'bg-gradient-to-b from-brand-dark/90 via-brand-dark/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-gold/40 group-hover:border-brand-gold transition-colors duration-300 shadow-glow-gold flex items-center justify-center bg-black/40">
            <img src={logoImg} alt="Offscreen Hub Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-brand-ivory group-hover:text-brand-gold transition-colors">
              OFFSCREEN HUB
            </span>
            <span className="text-[10px] tracking-widest text-brand-gold/80 font-sans uppercase">
              Entertainment Hub
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs xl:text-sm font-medium tracking-wide text-brand-mutedIvory hover:text-brand-gold transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:9360701789"
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-brand-ivory/80 hover:text-brand-gold transition-colors px-3 py-2"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>9360701789</span>
          </a>
          <button
            onClick={() => onOpenJoinModal()}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gold-gradient rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="relative px-4 py-2 rounded-full bg-brand-dark hover:bg-brand-dark/80 transition-colors flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-ivory uppercase">
              Collaborate With Us
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
          <a
            href="/admin/login"
            className="text-[11px] font-mono text-brand-gold/70 hover:text-brand-gold underline transition-colors px-2 py-1"
          >
            Admin Portal
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-brand-ivory hover:text-brand-gold focus:outline-none glass-card"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-brand-gold" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slideout Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-b border-brand-gold/20 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wide text-brand-ivory hover:text-brand-gold transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:9360701789"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-gold py-2 rounded-lg bg-white/5 border border-brand-gold/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 9360701789</span>
                </a>
                <a
                  href="#collaborate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs tracking-wider uppercase shadow-glow-gold"
                >
                  Collaborate With Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
