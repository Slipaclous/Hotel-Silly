'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Shield, Star } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: "Excellence",
    description: "Reconnu pour notre service d'exception et notre attention aux détails"
  },
  {
    icon: Heart,
    title: "Hospitalité",
    description: "Accueil chaleureux et personnalisé pour chaque client"
  },
  {
    icon: Shield,
    title: "Sécurité",
    description: "Environnement sécurisé et protocoles sanitaires rigoureux"
  },
  {
    icon: Star,
    title: "Luxe",
    description: "Équipements haut de gamme et décoration raffinée"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-black mb-6">
              Une Expérience Unique
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Notre hôtel de luxe va ouvrir ses portes au printemps 2025 dans le charmant 
              village de Silly, au cœur de la Belgique. Chaque détail a été pensé pour 
              offrir une expérience inoubliable dans un cadre d'exception.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-black">Emplacement idéal :</strong> Au cœur de Silly, 
                  village pittoresque de la Région Wallonne, à proximité de Bruxelles et des 
                  principales attractions belges.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-black">Service personnalisé :</strong> Notre équipe dédiée 
                  s'engage à anticiper vos besoins et à rendre votre séjour exceptionnel.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-black">Équipements de luxe :</strong> Chambres et suites 
                  équipées des dernières technologies et du confort le plus raffiné.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-gray-800"
            >
              Découvrir Notre Histoire
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="text-2xl font-serif font-bold text-black">2025</div>
                <div className="text-sm text-gray-700">Année d'Ouverture</div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gray-300 rounded-full opacity-30"></div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors duration-200 border border-gray-200">
                <feature.icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-serif font-bold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 