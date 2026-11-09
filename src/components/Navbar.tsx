import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone, LayoutGrid } from 'lucide-react';
import logoImg from '../assets/logo/offscreen_logo.jpg';

interface NavbarProps {
  onOpenJoinModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal: _onOpenJoinModal }) => {
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
    { name: 'About Us', href: '#about' },
    { name: 'Our Journey', href: '#explore-journey' },
    { name: 'Our Events', href: '#events' },
    { name: 'Awards', href: '#awards' },
    { name: 'Our Impact', href: '#impact' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Collaborate', href: '#collaborate' },
    { name: 'Join Our Team', href: '#join-team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md py-3 shadow-glass border-b border-brand-gold/15'
          : 'bg-gradient-to-b from-brand-dark/90 via-brand-dark/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-brand-gold/40 group-hover:border-brand-gold transition-colors duration-300 shadow-glow-gold flex items-center justify-center bg-black/40">
              <img src={logoImg} alt="Offscreen Hub Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-brand-ivory group-hover:text-brand-gold transition-colors leading-tight">
                OFFSCREEN HUB
              </span>
              <span className="text-[9px] tracking-widest text-brand-gold/80 font-sans uppercase">
                Events Division
              </span>
            </div>
          </Link>

          {/* Division Switcher Pill */}
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 transition-colors uppercase ml-2"
            title="Switch Division"
          >
            <LayoutGrid className="w-3 h-3 text-brand-gold" />
            <span>Hub</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium tracking-wide text-brand-mutedIvory hover:text-brand-gold transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:9360701789"
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-brand-ivory/80 hover:text-brand-gold transition-colors px-2 py-1"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>9360701789</span>
          </a>

          <a
            href="#collaborate"
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gold-gradient rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="relative px-3.5 py-1.5 rounded-full bg-brand-dark hover:bg-brand-dark/80 transition-colors flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-ivory uppercase">
              Collaborate
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            to="/"
            className="inline-flex sm:hidden items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-brand-gold bg-brand-gold/10 border border-brand-gold/30"
          >
            <LayoutGrid className="w-3 h-3" />
            <span>Hub</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-ivory hover:text-brand-gold focus:outline-none glass-card"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-gold" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slideout Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-brand-gold/20 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-2.5 flex flex-col max-h-[80vh] overflow-y-auto">
              <div className="pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs text-brand-gold uppercase tracking-wider font-semibold">Division Navigation</span>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-brand-ivory hover:text-brand-gold flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Return to Division Selection</span>
                </Link>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wide text-brand-ivory hover:text-brand-gold transition-colors py-1.5 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href="tel:9360701789"
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-gold py-2 rounded-lg bg-white/5 border border-brand-gold/20"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 9360701789</span>
                </a>
                <a
                  href="#collaborate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs tracking-wider uppercase shadow-glow-gold"
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
