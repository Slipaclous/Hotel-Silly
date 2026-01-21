'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  url: string;
  category: string;
  title: string;
  order: number;
}

interface PageHero {
  page: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

const categories = ['Toutes', 'Chambres', 'Restaurant', 'Spa', 'Intérieur', 'Extérieur'];

export default function GaleriePage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [pageHero, setPageHero] = useState<PageHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/gallery').then(res => res.json()),
      fetch('/api/page-hero/galerie').then(res => res.json())
    ])
      .then(([imagesData, heroData]) => {
        setGalleryImages(imagesData);
        setPageHero(heroData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement gallery:', err);
        setLoading(false);
      });
  }, []);

  const filteredImages = selectedCategory === 'Toutes'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <main className="min-h-screen bg-blanc">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-[120px]">
        <div className="absolute inset-0">
          {pageHero?.imageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${pageHero.imageUrl}')`
              }}
            ></div>
          )}
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
              {pageHero?.title || 'Galerie Photo'}
            </h1>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {pageHero?.subtitle || 'Découvrez les espaces et l&apos;ambiance unique de notre hôtel'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Filtres */}
      <section className="py-12 bg-blanc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-body text-sm px-6 py-2 transition-all duration-300 ${selectedCategory === category
                  ? 'bg-noir text-blanc'
                  : 'bg-blanc text-noir border border-noir/20 hover:border-or'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille Galerie */}
      <section className="py-24 bg-blanc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="font-body text-noir/60">Chargement de la galerie...</div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="font-body text-noir/60">Aucune image trouvée</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative group cursor-pointer overflow-hidden card-hover"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="font-body text-xs uppercase tracking-widest mb-1 text-white/70">{image.category}</div>
                      <div className="font-display text-lg font-medium">{image.title}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blanc p-2">
                      <ZoomIn className="w-5 h-5 text-noir" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-blanc p-2 hover:bg-or transition-colors duration-300"
            >
              <X className="w-6 h-6 text-noir" />
            </button>
            <div className="relative w-full h-full min-h-[50vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-6 text-white">
              <div className="font-body text-xs uppercase tracking-widest mb-1 text-white/60">{selectedImage.category}</div>
              <div className="font-display text-2xl font-medium">{selectedImage.title}</div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}
