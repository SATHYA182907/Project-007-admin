import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

import g1 from '../assets/events/portfolio_p10_img1.jpeg';
import g2 from '../assets/events/portfolio_p10_img2.jpeg';
import g3 from '../assets/events/portfolio_p10_img3.jpeg';
import g4 from '../assets/events/portfolio_p10_img4.jpeg';
import g5 from '../assets/events/portfolio_p11_img1.jpeg';
import g6 from '../assets/events/portfolio_p11_img2.jpeg';
import g7 from '../assets/events/portfolio_p11_img3.jpeg';
import g8 from '../assets/events/portfolio_p11_img4.jpeg';
import g9 from '../assets/events/portfolio_p12_img1.jpeg';
import g10 from '../assets/events/portfolio_p12_img3.jpeg';
import g11 from '../assets/events/portfolio_p13_img1.jpeg';
import g12 from '../assets/events/portfolio_p13_img5.jpeg';

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    { src: g1, title: 'Walkathon Kovaipudur', category: 'Fitness & Awareness' },
    { src: g2, title: 'Children’s Day Festival', category: 'Kids & Families' },
    { src: g3, title: 'Alveal Mall Workshops', category: 'Interactive Competitions' },
    { src: g4, title: 'Republic Day Drawing Competition', category: '500+ Kids Participating' },
    { src: g5, title: 'Women’s Day Nana Nani Phase 3', category: '500+ Senior Citizens' },
    { src: g6, title: 'Vedanta Senior Programs', category: 'Cultural Engagement' },
    { src: g7, title: 'Pet Ramp Walk Kalapatti', category: 'Family & Pet Bonding' },
    { src: g8, title: 'Diwali Carnival Kovaipudur', category: '2000+ Floating Crowd' },
    { src: g9, title: 'Mom & Me Inclusive Ramp Walk', category: 'Autism Inclusion' },
    { src: g10, title: 'Mom & Me Family Stills', category: '750+ Attendees' },
    { src: g11, title: 'Komagal Awards Stage Ceremony', category: '250+ Women Honored' },
    { src: g12, title: 'Komagal Trophies & Recognition', category: 'Social Impact Awards' },
  ];

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            Authentic Visual Record
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-4"
          >
            Moments Beyond the Screen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light"
          >
            Real laughter, real triumphs, and unforgettable screen-free memories captured across Offscreen Hub events.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedImage(item.src)}
              className="group cursor-pointer relative h-64 rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-brand-gold/40 shadow-xl transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-serif font-semibold text-brand-ivory group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden glass-card border border-brand-gold/40 flex items-center justify-center p-2"
            >
              <img
                src={selectedImage}
                alt="Enlarged Offscreen Hub Still"
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-dark/80 text-brand-ivory hover:text-brand-gold border border-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
