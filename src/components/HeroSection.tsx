'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-800/50 to-gray-900/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Star className="w-4 h-4 text-white" />
            <span className="text-sm font-medium">Ouverture 2025 - Luxe & Confort</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            <span className="block">Bienvenue à</span>
            <span className="block text-white font-cursive text-5xl sm:text-6xl lg:text-8xl mt-2">
              L'Hôtel de Silly
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez une expérience hôtelière exceptionnelle au cœur de la Belgique, 
            où élégance, confort et service personnalisé se rencontrent pour créer des 
            souvenirs inoubliables.
          </p>

          {/* Location */}
          <div className="flex items-center justify-center space-x-2 text-gray-300 mb-8">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Silly, Belgique - Région Wallonne</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 flex items-center space-x-2 group shadow-lg hover:shadow-xl hover:bg-white/30"
            >
              <span>Pré-réserver</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Découvrir nos Chambres
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Repositionné plus bas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/10 rounded-full"></div>
    </section>
  );
} 