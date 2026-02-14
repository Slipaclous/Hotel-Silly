'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Formulaire soumis:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-blanc">
      <Header />

      {/* Hero Section - Compact & Elegant */}
      <section id="hero" data-nav-section="Contact" data-nav-is-dark="true" className="relative h-[40vh] flex items-end justify-center pb-12 overflow-hidden bg-[#2c3840]">
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl lg:text-7xl font-medium mb-4 text-[#C6ad7a]">Contact</h1>
            <p className="font-body text-white/80 text-lg font-light tracking-wide">Une question ? Un désir particulier ?</p>
          </motion.div>
        </div>
      </section>

      <section id="form" data-nav-section="Message" className="relative z-20 -mt-8 mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row shadow-2xl bg-white">

          {/* Left Side: Contact Info (Dark) */}
          <div className="lg:w-2/5 bg-[#2c3840] text-white p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-or/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 space-y-12 text-white">
              <div>
                <h3 className="font-display text-2xl mb-2 text-[#C6ad7a]">Nos Coordonnées</h3>
                <p className="font-body text-sm text-white/70 mb-8">Nous sommes à votre entière disposition.</p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-[#C6ad7a] mt-1" />
                    <div>
                      <p className="font-display text-lg text-white">Villa Dolce</p>
                      <p className="font-body text-sm text-white/70 leading-relaxed">
                        PLACE COMMUNALE 9<br />
                        7830 Silly, Belgique
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-[#C6ad7a] mt-1" />
                    <div>
                      <p className="font-display text-lg text-white">Téléphone</p>
                      <a href="tel:+32212345678" className="font-body text-sm text-white/70 hover:text-[#C6ad7a] transition-colors">
                        +32 (0)2 123 45 67
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-[#C6ad7a] mt-1" />
                    <div>
                      <p className="font-display text-lg text-white">Email</p>
                      <a href="mailto:info@hoteldesilly.be" className="font-body text-sm text-white/70 hover:text-[#C6ad7a] transition-colors">
                        info@dolcehotel-silly.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-[#C6ad7a] mt-1" />
                  <div>
                    <h3 className="font-display text-xl mb-4 text-white">Horaires Réception</h3>
                    <ul className="space-y-2 font-body text-sm text-white/70">
                      <li className="flex justify-between w-48">
                        <span>Lun - Ven</span>
                        <span className="text-white">09:00 - 18:00</span>
                      </li>
                      <li className="flex justify-between w-48">
                        <span>Samedi</span>
                        <span className="text-white">10:00 - 16:00</span>
                      </li>
                      <li className="flex justify-between w-48">
                        <span>Dimanche</span>
                        <span className="text-white">Fermé</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form (Light) */}
          <div className="lg:w-3/5 bg-white p-12 lg:p-16">
            <h2 className="font-display text-3xl sm:text-4xl text-[#2c3840] mb-8">Envoyez-nous un message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-or/10 border border-or/30 p-8 text-center"
              >
                <h3 className="font-display text-2xl text-[#2c3840] mb-2">Message reçu</h3>
                <p className="font-body text-[#2c3840]/70">Merci de nous avoir contactés. Nous reviendrons vers vous très prochainement.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm underline hover:text-or text-[#2c3840]"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">Nom Complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors placeholder:text-gray-400"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors placeholder:text-gray-400"
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">Sujet</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-white text-gray-900">Choisir un sujet...</option>
                    <option value="reservation" className="bg-white text-gray-900">Réservation de chambre</option>
                    <option value="event" className="bg-white text-gray-900">Organisation d&apos;événement</option>
                    <option value="question" className="bg-white text-gray-900">Informations générales</option>
                    <option value="other" className="bg-white text-gray-900">Autre demande</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors resize-none placeholder:text-gray-400"
                    placeholder="Dites-nous en plus..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-[#2c3840] text-white px-8 py-4 font-body text-sm uppercase tracking-widest hover:bg-or transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Envoi...' : 'Envoyer ma demande'}</span>
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <div id="footer" data-nav-section="Infos" data-nav-is-dark="true"></div>
      <Footer />
    </main>
  );
}
