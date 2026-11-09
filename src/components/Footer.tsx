import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, LayoutGrid, BookOpen } from 'lucide-react';
import logoImg from '../assets/logo/offscreen_logo.jpg';
import { siteContent } from '../data/siteContent';

export const Footer: React.FC = () => {
  const { contact } = siteContent;

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Journey', href: '#explore-journey' },
    { name: 'Our Events', href: '#events' },
    { name: 'Awards', href: '#awards' },
    { name: 'Our Impact', href: '#impact' },
    { name: 'Sponsors & Partners', href: '#sponsors' },
    { name: 'Collaborate', href: '#collaborate' },
    { name: 'Join Our Team', href: '#join-team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-brand-darker text-brand-ivory border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-gold/40 shadow-glow-gold flex items-center justify-center bg-black/40">
                <img src={logoImg} alt="Offscreen Hub Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-wider text-brand-ivory">
                  OFFSCREEN HUB
                </span>
                <span className="text-[10px] tracking-widest text-brand-gold uppercase">
                  Events Division
                </span>
              </div>
            </div>

            <p className="text-sm font-serif italic text-brand-gold">
              “Beyond the Screen, Into the Real World.”
            </p>

            <p className="text-xs text-brand-mutedIvory font-light leading-relaxed max-w-sm">
              Creating meaningful offline experiences that inspire creativity, confidence, intellectual learning and well-being.
            </p>

            {/* Division Switching Links */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-brand-ivory transition-colors"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-brand-gold" />
                <span>Division Hub</span>
              </Link>
              <Link
                to="/lifeskills"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-brand-ivory transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-brand-lavender" />
                <span>Life Skills Division</span>
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-brand-ivory transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-brand-gold" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-4">
              Events Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-brand-mutedIvory hover:text-brand-gold transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-brand-mutedIvory">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{contact.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-mutedIvory/70">
          <p>© {new Date().getFullYear()} Offscreen Hub. All rights reserved.</p>
          <p className="font-serif italic text-brand-gold/80">
            Beyond the Screen, Into the Real World.
          </p>
        </div>
      </div>
    </footer>
  );
};
