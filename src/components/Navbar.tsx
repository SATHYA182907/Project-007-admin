import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone, LayoutGrid } from 'lucide-react';
import logoImg from '../assets/logo/offscreen_logo.jpg';

interface NavbarProps {
  onOpenJoinModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal: _onOpenJoinModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Journey', href: '#explore-journey' },
    { name: 'Events', href: '#events' },
    { name: 'Awards', href: '#awards' },
    { name: 'Impact', href: '#impact' },
    { name: 'Partners', href: '#sponsors' },
    { name: 'Join Us', href: '#join-team' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === '/events') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-brand-dark/70 backdrop-blur-md py-4 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <Link
          to="/events"
          onClick={handleScrollToTop}
          className="flex items-center gap-3 group flex-shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-brand-gold/40 group-hover:border-brand-gold transition-colors duration-300 shadow-glow-gold flex items-center justify-center bg-black/40">
            <img src={logoImg} alt="Offscreen Hub" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-brand-ivory group-hover:text-brand-gold transition-colors leading-tight whitespace-nowrap">
              OFFSCREEN HUB
            </span>
            <span className="text-[9px] tracking-[0.2em] text-brand-gold/80 font-sans uppercase">
              Events Division
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 flex-shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-wider font-medium text-brand-mutedIvory hover:text-brand-gold transition-colors duration-200 relative group py-1 whitespace-nowrap"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold/80 transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Utility Cluster: Division Switcher + CTA Button */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          {/* Switch Division Hub Pill */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 hover:border-brand-gold/60 transition-all duration-200 whitespace-nowrap"
            title="Return to Division Selection Hub"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-brand-gold" />
            <span className="tracking-wide">Hub</span>
          </Link>

          {/* Primary CTA */}
          <a
            href="#collaborate"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-gradient hover:brightness-110 text-brand-dark font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-glow-gold whitespace-nowrap group"
          >
            <span>Collaborate</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-dark transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile / Tablet Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/"
            className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-brand-gold bg-brand-gold/10 border border-brand-gold/30"
          >
            <LayoutGrid className="w-3 h-3" />
            <span>Hub</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-ivory hover:text-brand-gold focus:outline-none bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-gold" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-dark/98 backdrop-blur-2xl border-b border-brand-gold/20 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-2.5 flex flex-col max-h-[80vh] overflow-y-auto">
              <div className="pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs text-brand-gold uppercase tracking-wider font-semibold">
                  Events Division
                </span>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-brand-ivory hover:text-brand-gold flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/25 px-3 py-1 rounded-full"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Return to Hub</span>
                </Link>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wide text-brand-ivory hover:text-brand-gold transition-colors py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-brand-gold/50">→</span>
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-2.5">
                <a
                  href="tel:9360701789"
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-gold py-2.5 rounded-lg bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 9360701789</span>
                </a>
                <a
                  href="#collaborate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs tracking-wider uppercase shadow-glow-gold hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Collaborate With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};