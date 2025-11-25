'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
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

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-[120px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
            }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-12 h-px bg-or mx-auto mb-6"></div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6">
              Contactez-Nous
            </h1>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Nous sommes à votre écoute pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-blanc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cartes d'information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-blanc border border-noir/10 p-8 card-hover"
            >
              <div className="w-12 h-12 border border-or flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-or" />
              </div>
              <h3 className="font-display text-xl font-medium text-noir mb-3">Téléphone</h3>
              <p className="font-body text-sm text-noir/60 mb-4">Appelez-nous directement</p>
              <a href="tel:+32212345678" className="font-body text-base font-medium text-noir hover:text-or transition-colors">
                +32 (0)2 123 45 67
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-blanc border border-noir/10 p-8 card-hover"
            >
              <div className="w-12 h-12 border border-or flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-or" />
              </div>
              <h3 className="font-display text-xl font-medium text-noir mb-3">Email</h3>
              <p className="font-body text-sm text-noir/60 mb-4">Envoyez-nous vos questions</p>
              <a href="mailto:info@hoteldesilly.be" className="font-body text-base font-medium text-noir hover:text-or transition-colors break-all">
                info@hoteldesilly.be
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blanc border border-noir/10 p-8 card-hover"
            >
              <div className="w-12 h-12 border border-or flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-or" />
              </div>
              <h3 className="font-display text-xl font-medium text-noir mb-3">Adresse</h3>
              <p className="font-body text-sm text-noir/60 mb-4">Visitez-nous à</p>
              <p className="font-body text-base font-medium text-noir">
                Silly, Belgique
              </p>
            </motion.div>
          </div>

          {/* Horaires et Formulaire */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Horaires */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-blanc border border-noir/10 p-8 h-full">
                <div className="w-12 h-12 border border-or flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-or" />
                </div>
                <h3 className="font-display text-xl font-medium text-noir mb-6">Horaires</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between pb-3 border-b border-noir/10">
                    <span className="font-body text-sm text-noir/60">Lundi - Vendredi</span>
                    <span className="font-body text-sm font-medium text-noir">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-noir/10">
                    <span className="font-body text-sm text-noir/60">Samedi</span>
                    <span className="font-body text-sm font-medium text-noir">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-noir/10">
                    <span className="font-body text-sm text-noir/60">Dimanche</span>
                    <span className="font-body text-sm font-medium text-noir">Fermé</span>
                  </div>
                </div>

                <p className="font-body text-xs text-noir/60 leading-relaxed">
                  Notre équipe est disponible pour répondre à toutes vos questions pendant les horaires d&apos;ouverture.
                </p>
              </div>
            </motion.div>

            {/* Formulaire de Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-blanc border border-noir/10 p-8 shadow-elegant">
                <h2 className="font-display text-2xl font-medium text-noir mb-8">
                  {submitted ? 'Merci !' : 'Formulaire de Contact'}
                </h2>

                {submitted ? (
                  <div className="bg-blanc border border-or/30 p-8 text-center">
                    <p className="font-body text-base font-medium text-noir mb-2">
                      Message envoyé avec succès !
                    </p>
                    <p className="font-body text-sm text-noir/60">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-body text-sm font-medium text-noir mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-noir/20 focus:outline-none focus:border-or transition-colors duration-300 font-body text-sm"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-body text-sm font-medium text-noir mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-noir/20 focus:outline-none focus:border-or transition-colors duration-300 font-body text-sm"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-body text-sm font-medium text-noir mb-2">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-noir/20 focus:outline-none focus:border-or transition-colors duration-300 font-body text-sm"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="reservation">Réservation</option>
                        <option value="event">Événement</option>
                        <option value="question">Question générale</option>
                        <option value="feedback">Avis et suggestions</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-body text-sm font-medium text-noir mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-noir/20 focus:outline-none focus:border-or transition-colors duration-300 resize-none font-body text-sm"
                        placeholder="Votre message..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-noir text-blanc font-body text-sm font-medium py-3 transition-all duration-300 hover:bg-or disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Envoi...' : 'Envoyer le message'}</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
