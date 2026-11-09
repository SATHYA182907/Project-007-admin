import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ZoomIn, ZoomOut, Image as ImageIcon, Sparkles, Filter } from 'lucide-react';

import p10_1 from '../assets/events/portfolio_p10_img1.jpeg';
import p10_2 from '../assets/events/portfolio_p10_img2.jpeg';
import p10_3 from '../assets/events/portfolio_p10_img3.jpeg';
import p10_4 from '../assets/events/portfolio_p10_img4.jpeg';

import p11_1 from '../assets/events/portfolio_p11_img1.jpeg';
import p11_2 from '../assets/events/portfolio_p11_img2.jpeg';
import p11_3 from '../assets/events/portfolio_p11_img3.jpeg';
import p11_4 from '../assets/events/portfolio_p11_img4.jpeg';

import p12_1 from '../assets/events/portfolio_p12_img1.jpeg';
import p12_2 from '../assets/events/portfolio_p12_img2.jpeg';
import p12_3 from '../assets/events/portfolio_p12_img3.jpeg';
import p12_4 from '../assets/events/portfolio_p12_img4.jpeg';
import p12_5 from '../assets/events/portfolio_p12_img5.jpeg';
import p12_6 from '../assets/events/portfolio_p12_img6.jpeg';
import p12_7 from '../assets/events/portfolio_p12_img7.jpeg';

import p13_1 from '../assets/events/portfolio_p13_img1.jpeg';
import p13_2 from '../assets/events/portfolio_p13_img2.jpeg';
import p13_3 from '../assets/events/portfolio_p13_img3.jpeg';
import p13_4 from '../assets/events/portfolio_p13_img4.jpeg';
import p13_5 from '../assets/events/portfolio_p13_img5.jpeg';
import p13_6 from '../assets/events/portfolio_p13_img6.jpeg';
import p13_7 from '../assets/events/portfolio_p13_img7.jpeg';

import p14_1 from '../assets/events/portfolio_p14_img1.jpeg';
import p1_img1 from '../assets/events/portfolio_p1_img1.jpeg';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const categories = [
    'All',
    'Walkathon',
    'Carnivals',
    'Children’s Events',
    'Mom & Me',
    'Komagal Awards',
    'Nana Nani Events',
    'Community Activities',
    'Fitness Events',
    'School Programs',
  ];

  const galleryItems: GalleryItem[] = [
    // Walkathon
    { id: 'g-walkathon-1', src: p10_1, title: 'Kovaipudur Walkathon', category: 'Walkathon', caption: 'Senior citizens and families marching together for screen-free health in Kovaipudur.' },
    // Carnivals
    { id: 'g-carnival-1', src: p11_4, title: 'Diwali Carnival Gathering', category: 'Carnivals', caption: 'Over 2000+ residents enjoying festive stalls, traditional music, and joyful community dance.' },
    { id: 'g-carnival-2', src: p13_7, title: 'Dhandiya Festive Dance', category: 'Carnivals', caption: 'Women united in rhythmic stick dance during the Kovaipudur Navratri celebration.' },
    // Children’s Events
    { id: 'g-children-1', src: p10_2, title: 'Children’s Day Joy', category: 'Children’s Events', caption: 'Toddlers and young students engaged with physical motor coordination toys at Kids.com.' },
    { id: 'g-children-2', src: p11_3, title: 'Republic Day Drawing Competition', category: 'Children’s Events', caption: '400 children expressing patriotic imagination on paper at Sri Kumaran Mahal.' },
    { id: 'g-children-3', src: p12_6, title: 'Kids Ramp Walk @ Alveal Mall', category: 'Children’s Events', caption: 'Confidence and poise on the runway without digital distractions.' },
    // Mom & Me
    { id: 'g-momme-1', src: p12_1, title: 'Mom & Me Inclusive Ramp Walk', category: 'Mom & Me', caption: 'Mothers walking hand-in-hand with their children on the autism spectrum with deep pride.' },
    { id: 'g-momme-2', src: p12_2, title: 'Mom & Me Celebration Stills', category: 'Mom & Me', caption: 'Heartwarming moments of triumph and community cheering at Sri Maruti Gana Sabha.' },
    // Komagal Awards
    { id: 'g-komagal-1', src: p13_1, title: 'Komagal Awards Stage', category: 'Komagal Awards', caption: 'Main ceremonial stage celebrating women changemakers at Srinivasa Art & Gallery.' },
    { id: 'g-komagal-2', src: p13_2, title: 'Komagal Trophies & Citations', category: 'Komagal Awards', caption: 'Brass mementos of honor bestowed on inspiring community pillars.' },
    { id: 'g-komagal-3', src: p13_3, title: 'Awardees on Stage', category: 'Komagal Awards', caption: 'Felicitating healthcare pioneers, educators, and social reformers.' },
    { id: 'g-komagal-4', src: p13_4, title: 'Komagal Audience Fellowship', category: 'Komagal Awards', caption: 'Distinguished guests and families applauding changemakers in screen-free presence.' },
    // Nana Nani Events (Dedicated category for Ananya's Nana Nani)
    { id: 'g-nananani-1', src: p13_5, title: 'Women’s Day @ Ananya’s Nana Nani', category: 'Nana Nani Events', caption: 'Honoring senior women residents across KN Palayam and Somayampalayam with cultural fellowship.' },
    { id: 'g-nananani-2', src: p13_6, title: 'Onam Celebrations @ Somayampalayam', category: 'Nana Nani Events', caption: 'Grand floral pookalam, traditional songs, and shared joy with 1000+ senior citizens.' },
    { id: 'g-nananani-3', src: p12_7, title: 'Senior Sangamam Elders Gathering', category: 'Nana Nani Events', caption: 'Elders bonding over memory puzzles and music at Grand Regent, Avinashi Road.' },
    // Community Activities
    { id: 'g-comm-1', src: p11_2, title: 'Vedanta Community Projects', category: 'Community Activities', caption: 'Five focused wellness and social sessions for senior living residents.' },
    { id: 'g-comm-2', src: p12_5, title: 'Alveal Mall Brain Gym Workshops', category: 'Community Activities', caption: 'Shoppers and young families solving tactile cognitive puzzles.' },
    { id: 'g-comm-3', src: p12_3, title: 'Pet Ramp Walk @ Kalapatti', category: 'Community Activities', caption: 'Human-animal emotional bonding and outdoor fun at Bow Bow Bliss.' },
    // Fitness Events
    { id: 'g-fit-1', src: p14_1, title: 'Komagal Marathon at Racecourse', category: 'Fitness Events', caption: '1,800 runners running in early morning dawn to promote active offline health.' },
    { id: 'g-fit-2', src: p11_1, title: 'Women’s Badminton Tournament', category: 'Fitness Events', caption: 'Homemakers and professionals competing on the court with vitality.' },
    // School Programs
    { id: 'g-school-1', src: p10_3, title: 'Brain Gym School Sessions', category: 'School Programs', caption: 'Bilateral coordination exercises in Shrishti Vidyala and Vasavi Vidyala.' },
    { id: 'g-school-2', src: p10_4, title: 'Townhall Public Agility Workshops', category: 'School Programs', caption: 'Cognitive drills and speed challenges conducted with Ganapathi Silks.' },
    { id: 'g-school-3', src: p1_img1, title: 'Youth Unplugged Session @ Mudcups', category: 'Community Activities', caption: 'Wholesome offline social conversation and acoustic vibes without phones.' },
  ];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-brand-dark text-brand-ivory border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-brand-lavender/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card border border-brand-gold/30 mb-4"
          >
            <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Authentic Photographic Record
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-ivory leading-tight mb-4"
          >
            Moments Beyond the Screen
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            Real people, unposed joy, and genuine community bonds captured live across our 21 offline initiatives.
          </motion.p>
        </div>

        {/* Dedicated Nana Nani Notice Banner */}
        {activeCategory === 'Nana Nani Events' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl glass-card border border-brand-gold/40 bg-brand-gold/10 text-center max-w-2xl mx-auto"
          >
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider block mb-1">
              Dedicated Ananya’s Nana Nani Gallery Section
            </span>
            <p className="text-xs text-brand-ivory/90">
              Featuring verified Onam celebrations and Women's Day gatherings for senior residents. Dynamic gallery architecture prepared for seamless integration of additional Nana Nani event photographs.
            </p>
          </motion.div>
        )}

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-card border border-white/10 shadow-lg max-w-5xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold-gradient text-brand-dark shadow-glow-gold'
                    : 'text-brand-mutedIvory hover:text-brand-ivory hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Masonry-Style Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  setLightboxItem(item);
                  setIsZoomed(false);
                }}
                className="group cursor-pointer relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-brand-gold/40 shadow-xl transition-all duration-300 aspect-[4/3] bg-black/50"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex flex-col justify-end">
                  <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider mb-0.5">
                    {item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-serif font-semibold text-brand-ivory group-hover:text-brand-gold transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>

                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-brand-gold" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with Zoom & Captions */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden glass-card border border-brand-gold/40 bg-brand-dark/95 flex flex-col shadow-2xl"
            >
              {/* Lightbox Controls Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-dark/90">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-gold">
                  {lightboxItem.category} • Authentic Photograph
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-ivory transition-colors"
                    title={isZoomed ? 'Zoom out' : 'Zoom in'}
                  >
                    {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setLightboxItem(null)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-ivory hover:text-brand-gold transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Image Stage */}
              <div className="p-4 flex-grow flex items-center justify-center overflow-auto bg-black/60 max-h-[65vh]">
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className={`max-w-full max-h-[60vh] object-contain rounded-xl transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>

              {/* Caption Footer */}
              <div className="p-6 border-t border-white/10 bg-brand-card/90">
                <h4 className="text-base sm:text-lg font-serif font-bold text-brand-ivory mb-1">
                  {lightboxItem.title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed">
                  {lightboxItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
