'use client';

import { motion } from 'framer-motion';
import { Star, Users, ArrowRight } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: "Suite Présidentielle",
    description: "Notre suite la plus prestigieuse avec vue panoramique sur Silly",
    price: "À partir de 1200€",
    capacity: "2-4 personnes",
    rating: 5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Vue panoramique", "Balcon privé", "Spa privé", "Butler 24h/24"]
  },
  {
    id: 2,
    name: "Chambre Deluxe",
    description: "Élégance et confort dans un cadre raffiné",
    price: "À partir de 450€",
    capacity: "2 personnes",
    rating: 5,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Vue jardin", "Salle de bain marbre", "Room service", "WiFi premium"]
  },
  {
    id: 3,
    name: "Suite Familiale",
    description: "Espace généreux pour des séjours en famille inoubliables",
    price: "À partir de 650€",
    capacity: "4-6 personnes",
    rating: 5,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["2 chambres", "Salon privé", "Cuisine équipée", "Terrasse"]
  }
];

export default function RoomSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-black mb-6">
            Nos Chambres & Suites
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos chambres et suites d&apos;exception, conçues pour offrir 
            le summum du confort et de l&apos;élégance dans un cadre raffiné.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${room.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  {room.price}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                  {[...Array(room.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-black mb-2">
                  {room.name}
                </h3>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {room.description}
                </p>

                {/* Capacity */}
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{room.capacity}</span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-gray-800 flex items-center justify-center space-x-2 group"
                >
                  <span>Découvrir</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white border-2 border-black text-black px-8 py-4 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-black hover:text-white"
          >
            Voir Toutes nos Chambres
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 