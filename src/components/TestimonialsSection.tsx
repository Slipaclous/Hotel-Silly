'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    location: "Paris, France",
    rating: 5,
    text: "Un séjour exceptionnel ! L'attention aux détails et le service personnalisé ont dépassé toutes nos attentes. Nous reviendrons certainement.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Thomas Müller",
    location: "Berlin, Allemagne",
    rating: 5,
    text: "La suite présidentielle est tout simplement magnifique. Vue imprenable sur Silly et service impeccable. Un hôtel de luxe authentique.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "Londres, Royaume-Uni",
    rating: 5,
    text: "Parfait pour notre voyage de noces. L'équipe a tout fait pour rendre notre séjour inoubliable. Les chambres sont sublimes.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Luca Rossi",
    location: "Milan, Italie",
    rating: 5,
    text: "Un hôtel qui mérite ses 5 étoiles. Le restaurant gastronomique est exceptionnel et l'emplacement est idéal pour découvrir la Belgique.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
            Avis de nos Clients
          </h2>
          <p className="text-xl text-cream-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez ce que nos clients disent de leur expérience 
            dans notre hôtel de luxe.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-charcoal-800 rounded-2xl p-6 hover:bg-charcoal-700 transition-colors duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-gold-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-cream-200 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${testimonial.avatar})` }}
                />
                <div>
                  <h4 className="font-medium text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-cream-400">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold-400 text-charcoal-900 px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-gold-300"
          >
            Voir Tous les Avis
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 