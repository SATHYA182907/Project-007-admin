import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, HeartHandshake, Building, X, Send, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { dbService } from '../services/db';
import type { UserRoleCategory } from '../services/types';

interface JoinSectionProps {
  isOpenModal: boolean;
  preselectedRole?: string;
  onCloseModal: () => void;
  onOpenModal: (role?: string) => void;
}

export const JoinSection: React.FC<JoinSectionProps> = ({
  isOpenModal,
  preselectedRole,
  onCloseModal,
  onOpenModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: (preselectedRole as UserRoleCategory) || 'Parent',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedRole) {
      setFormData((prev) => ({ ...prev, role: preselectedRole as UserRoleCategory }));
    }
  }, [preselectedRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setIsSubmitting(true);

    try {
      await dbService.createSubmission({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role as UserRoleCategory,
        category: `${formData.role} Engagement`,
        message: formData.message || 'Expressed interest in joining Offscreen Hub movement.',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit form', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Parent',
      message: '',
    });
    onCloseModal();
  };

  return (
    <section id="join" className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-brand-gold uppercase block mb-3"
          >
            Get Involved
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory mb-6"
          >
            Join the Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-mutedIvory font-light leading-relaxed"
          >
            Offscreen Hub is building a movement where children, parents, volunteers, educators, and communities come together to create a healthier balance between technology and real life.
          </motion.p>
        </div>

        {/* 3 Join Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all text-center space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center mx-auto">
              <HeartHandshake className="w-7 h-7 text-brand-gold" />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-ivory">
              Join as a Parent
            </h3>
            <p className="text-xs text-brand-mutedIvory font-light leading-relaxed">
              Discover screen-free family events, weekend workshops, and parent-child bonding sessions across Coimbatore.
            </p>
            <button
              onClick={() => onOpenModal('Parent')}
              className="w-full py-3 rounded-full bg-gold-gradient text-brand-dark font-bold text-xs uppercase tracking-wider shadow-glow-gold"
            >
              Join as a Parent
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all text-center space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-lavender/15 border border-brand-lavender/30 flex items-center justify-center mx-auto">
              <Users className="w-7 h-7 text-brand-lavender" />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-ivory">
              Join as a Volunteer
            </h3>
            <p className="text-xs text-brand-mutedIvory font-light leading-relaxed">
              Facilitate games, mentor young minds, and lead activity zones at high-impact carnivals and walks.
            </p>
            <button
              onClick={() => onOpenModal('Volunteer')}
              className="w-full py-3 rounded-full bg-white/10 hover:bg-brand-lavender text-brand-ivory hover:text-brand-dark font-bold text-xs uppercase tracking-wider border border-white/15 transition-colors"
            >
              Join as a Volunteer
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl glass-card border border-white/10 hover:border-brand-gold/40 transition-all text-center space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center mx-auto">
              <Building className="w-7 h-7 text-brand-blue" />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-ivory">
              Join as an Organization
            </h3>
            <p className="text-xs text-brand-mutedIvory font-light leading-relaxed">
              Bring Offscreen Hub workshops to your school, corporate workplace, CSR program, or housing community.
            </p>
            <button
              onClick={() => onOpenModal('Organization')}
              className="w-full py-3 rounded-full bg-white/10 hover:bg-brand-gold text-brand-ivory hover:text-brand-dark font-bold text-xs uppercase tracking-wider border border-white/15 transition-colors"
            >
              Join as an Organization
            </button>
          </motion.div>
        </div>
      </div>

      {/* Join Interest Modal */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl glass-card border border-brand-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={onCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full glass-card text-brand-ivory hover:text-brand-gold border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-brand-gold" />
                    <h3 className="text-2xl font-serif font-bold text-brand-ivory">
                      Join Offscreen Hub
                    </h3>
                  </div>
                  <p className="text-xs text-brand-mutedIvory mb-4">
                    Fill out your details below to become part of the screen-free movement.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory focus:border-brand-gold focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gold mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory focus:border-brand-gold focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gold mb-1">
                      I am interested as:
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRoleCategory })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-brand-ivory focus:border-brand-gold focus:outline-none text-sm"
                    >
                      <option value="Parent">Parent</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="School">School / Educational Institution</option>
                      <option value="Organization">Organization / CSR Partner</option>
                      <option value="Brand">Brand / Sponsor</option>
                      <option value="Community Member">Community Member</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gold mb-1">
                      Your Message / Inquiry (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us how you would like to participate..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gold-gradient text-brand-dark font-bold text-xs uppercase tracking-wider shadow-glow-gold flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] transition-transform disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Join Offscreen Hub
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center mx-auto shadow-glow-gold">
                    <CheckCircle2 className="w-8 h-8 text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-ivory">
                    Welcome to the Movement!
                  </h3>
                  <p className="text-sm text-brand-mutedIvory">
                    Thank you, <span className="text-brand-gold font-semibold">{formData.name}</span>. We have received your interest request for Offscreen Hub. Our team will contact you shortly at {formData.phone} or {formData.email}.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-brand-ivory font-semibold text-xs uppercase tracking-wider border border-white/20 hover:bg-brand-gold hover:text-brand-dark transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
