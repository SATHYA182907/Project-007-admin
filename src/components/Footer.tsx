import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../assets/logo/offscreen_logo.jpg';
import { siteContent } from '../data/siteContent';

export const Footer: React.FC = () => {
  const { contact } = siteContent;

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
                  Entertainment Hub
                </span>
              </div>
            </div>
            
            <p className="text-sm font-serif italic text-brand-gold">
              “Beyond the Screen, Into the World”
            </p>

            <p className="text-xs text-brand-mutedIvory font-light leading-relaxed max-w-sm">
              Creating meaningful offline experiences that inspire creativity, confidence, connection, learning, and well-being for children, families, schools, and communities.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-4">
              Navigation
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
            Let’s Build Screen-Free Time Together.
          </p>
        </div>
      </div>
    </footer>
  );
};
