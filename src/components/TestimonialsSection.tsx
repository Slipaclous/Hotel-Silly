'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarUrl: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Erreur chargement testimonials:', err));
  }, []);

  return (
    <section className="py-24 bg-noir text-blanc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-12 h-px bg-or mx-auto mb-6"></div>
          <h2 className="font-display text-4xl sm:text-5xl font-medium mb-6">
            Avis de nos Clients
          </h2>
          <p className="font-body text-lg text-blanc/70 max-w-3xl mx-auto leading-relaxed">
            Découvrez ce que nos clients disent de leur expérience
            dans notre hôtel de luxe.
          </p>
        </motion.div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-noir-800 border border-blanc/10 p-8 hover:border-or/30 transition-colors duration-300"
            >
              {/* Icône citation */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-or" />
              </div>

              {/* Note */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-or fill-current" />
                ))}
              </div>

              {/* Texte du témoignage */}
              <p className="font-body text-sm text-blanc/80 mb-8 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Auteur */}
              <div className="flex items-center space-x-3 pt-6 border-t border-blanc/10">
                <div
                  className="w-12 h-12 bg-cover bg-center border border-blanc/20"
                  style={{ backgroundImage: `url(${testimonial.avatarUrl})` }}
                />
                <div>
                  <h4 className="font-body font-medium text-blanc text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-xs text-blanc/50">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouton Voir Tous les Avis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/avis"
            className="inline-block font-body text-sm px-8 py-3 bg-or text-noir hover:bg-or-600 transition-all duration-300"
          >
            Voir Tous les Avis
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 