# 🚀 Plan d'Action - Optimisation Performance

**Date:** 16 février 2026  
**Objectif:** Réduire le temps de navigation de 2-3s à <500ms

---

## 📊 Analyse Technique

### Problèmes Identifiés
✅ **22 animations `whileInView`** détectées dans:
- `ChambresContent.tsx` - 1 occurrence
- `EvenementsContent.tsx` - 6 occurrences  
- `GalerieContent.tsx` - 1 occurrence
- `AboutContent.tsx` - 6 occurrences
- `AboutSection.tsx` - 3 occurrences
- `RoomSection.tsx` - 1 occurrence
- `TestimonialsSection.tsx` - 3 occurrences

✅ **Polices non optimisées** - 15 fichiers de fonts chargés
✅ **Pas de prefetch** - Navigation lente entre pages
✅ **Images non optimisées** - Pas de priority ni blur

---

## ⚡ PHASE 1: Quick Wins (1-2 heures)

### Étape 1.1: Supprimer les animations `whileInView`

**Fichiers à modifier (par ordre de priorité):**

#### 1. `src/components/ChambresContent.tsx`
```tsx
// LIGNE 106-111 - Supprimer motion.div
// AVANT:
<motion.div
  key={room.id}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true, margin: "-100px" }}
  className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
  id={`room-${room.id}`}
>

// APRÈS:
<div
  key={room.id}
  className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
  id={`room-${room.id}`}
>
```

#### 2. `src/components/EvenementsContent.tsx`
**6 occurrences à supprimer:**
- Ligne 103-108 (Introduction section)
- Ligne 132-137 (Past events title)
- Ligne 163-168 (Curiosities title)
- Ligne 181-186 (Services cards)
- Ligne 207-212 (CTA section)
- Ligne 251-256 (EventCard component)

**Remplacement systématique:**
```tsx
// Remplacer tous les motion.div par des div normales
// Garder uniquement les className
```

#### 3. `src/components/GalerieContent.tsx`
**Ligne 117-123:**
```tsx
// AVANT:
<motion.div
  key={image.id}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
  viewport={{ once: true }}
  className="relative group cursor-pointer overflow-hidden card-hover"
  onClick={() => setSelectedImage(image)}
>

// APRÈS:
<div
  key={image.id}
  className="relative group cursor-pointer overflow-hidden card-hover"
  onClick={() => setSelectedImage(image)}
>
```

#### 4. `src/components/AboutContent.tsx`
**6 occurrences à supprimer** (lignes 132, 171, 196, 225, 304, 322)

#### 5. `src/components/AboutSection.tsx`
**3 occurrences** (lignes 100, 147, 173)

#### 6. `src/components/RoomSection.tsx`
**1 occurrence** (ligne 72)

#### 7. `src/components/TestimonialsSection.tsx`
**3 occurrences** (lignes 68, 92, 142)

---

### Étape 1.2: Optimiser les polices

**Fichier:** `src/app/[locale]/layout.tsx`

```tsx
// LIGNES 9-25 - Réduire les poids des polices

// AVANT:
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // ❌ 5 poids
  variable: "--font-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // ❌ 5 poids
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // ❌ 4 poids
  variable: "--font-accent",
});

// APRÈS:
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"], // ✅ 2 poids seulement
  variable: "--font-display",
  display: 'swap', // ✅ Évite le FOIT
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"], // ✅ 2 poids
  variable: "--font-body",
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"], // ✅ 2 poids
  variable: "--font-accent",
  display: 'swap',
  preload: true,
});
```

**Ajuster le CSS si nécessaire:**
```css
/* Si font-weight: 300 utilisé quelque part, remplacer par 400 */
/* Si font-weight: 500 utilisé, peut rester (Playfair) ou passer à 600 */
```

---

### Étape 1.3: Ajouter prefetch aux liens

**Fichier:** `src/components/Header.tsx`

```tsx
// LIGNES 103-112 - Ajouter prefetch={true}

// AVANT:
<Link
  key={item.href}
  href={item.href as any}
  className={`font-body text-sm...`}
>
  {item.name}
</Link>

// APRÈS:
<Link
  key={item.href}
  href={item.href as any}
  prefetch={true} // ✅ Ajouter cette ligne
  className={`font-body text-sm...`}
>
  {item.name}
</Link>
```

**Répéter pour:**
- Lignes 143-149 (Services menu)
- Lignes 215-221 (Mobile menu)
- Lignes 234-241 (Mobile services)
- Ligne 160 (Bouton réservation)
- Ligne 252 (Mobile booking)

---

### Étape 1.4: Optimiser les imports Framer Motion

**Tous les fichiers avec animations:**

```tsx
// AVANT:
import { motion } from 'framer-motion';

// APRÈS (si on garde le hero seulement):
import { motion } from 'framer-motion';
// Mais supprimer tous les motion.div sauf dans le hero

// OU (si on supprime complètement):
// Supprimer l'import et tous les motion.div
```

---

## 📈 PHASE 2: Optimisations Images (2-3 heures)

### Étape 2.1: Créer le composant OptimizedImage

**Nouveau fichier:** `src/components/OptimizedImage.tsx`

```tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectFit?: 'cover' | 'contain';
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Tiny blur placeholder (1x1 pixel base64)
  const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurDataURL}
      sizes={sizes}
      onLoad={() => setIsLoading(false)}
      className={`
        transition-opacity duration-300
        ${isLoading ? 'opacity-0' : 'opacity-100'}
        ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}
        ${className}
      `}
    />
  );
}
```

### Étape 2.2: Remplacer les images dans ChambresContent

```tsx
// AVANT:
import Image from 'next/image';

// APRÈS:
import OptimizedImage from './OptimizedImage';

// Remplacer toutes les <Image> par <OptimizedImage>
// Ajouter priority={true} pour la première chambre
```

### Étape 2.3: Optimiser les sizes

```tsx
// Pour les chambres (50% viewport sur desktop):
sizes="(max-width: 1024px) 100vw, 50vw"

// Pour la galerie (3 colonnes sur desktop):
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

// Pour les événements (2 colonnes):
sizes="(max-width: 768px) 100vw, 50vw"
```

---

## 🔧 PHASE 3: Optimisations Avancées (4-6 heures)

### Étape 3.1: Créer des animations CSS

**Nouveau fichier:** `src/app/globals.css` (ajouter à la fin)

```css
/* Animations CSS légères */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Stagger animations */
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
```

### Étape 3.2: Optimiser next.config.ts

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // ✅ Formats modernes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  compress: true, // ✅ Compression gzip/brotli
  poweredByHeader: false, // ✅ Sécurité
  reactStrictMode: true,
  experimental: {
    optimizeCss: true, // ✅ Optimiser CSS
  },
};

export default withNextIntl(nextConfig);
```

### Étape 3.3: Lazy loading intelligent

```tsx
// Dans les pages qui utilisent des composants lourds
import dynamic from 'next/dynamic';

const GalleryLightbox = dynamic(
  () => import('./GalleryLightbox'),
  { 
    loading: () => (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    ),
    ssr: false // Pas de SSR pour le lightbox
  }
);
```

---

## ✅ Checklist d'Exécution

### Phase 1 - Aujourd'hui (2 heures)
- [ ] **1.1** Supprimer whileInView dans ChambresContent.tsx
- [ ] **1.1** Supprimer whileInView dans EvenementsContent.tsx (6x)
- [ ] **1.1** Supprimer whileInView dans GalerieContent.tsx
- [ ] **1.1** Supprimer whileInView dans AboutContent.tsx (6x)
- [ ] **1.1** Supprimer whileInView dans AboutSection.tsx (3x)
- [ ] **1.1** Supprimer whileInView dans RoomSection.tsx
- [ ] **1.1** Supprimer whileInView dans TestimonialsSection.tsx (3x)
- [ ] **1.2** Optimiser polices dans layout.tsx
- [ ] **1.3** Ajouter prefetch dans Header.tsx (tous les liens)
- [ ] **1.4** Nettoyer imports Framer Motion inutiles
- [ ] **Test** Tester navigation entre pages
- [ ] **Test** Mesurer avec Lighthouse

### Phase 2 - Cette semaine (3 heures)
- [ ] **2.1** Créer OptimizedImage.tsx
- [ ] **2.2** Remplacer Image par OptimizedImage dans ChambresContent
- [ ] **2.2** Remplacer Image par OptimizedImage dans EvenementsContent
- [ ] **2.2** Remplacer Image par OptimizedImage dans GalerieContent
- [ ] **2.3** Optimiser les sizes pour chaque composant
- [ ] **2.3** Ajouter priority aux images above-the-fold
- [ ] **Test** Vérifier temps de chargement images
- [ ] **Test** Mesurer LCP avec Lighthouse

### Phase 3 - Ce mois (6 heures)
- [ ] **3.1** Créer animations CSS dans globals.css
- [ ] **3.1** Remplacer motion.div par classes CSS (optionnel)
- [ ] **3.2** Optimiser next.config.ts
- [ ] **3.3** Implémenter lazy loading intelligent
- [ ] **Test** Tests de performance complets
- [ ] **Test** Tests sur mobile (3G/4G)
- [ ] **Deploy** Déployer en production

---

## 📊 Métriques de Succès

### Avant
- Navigation entre pages: **2-3 secondes**
- Lighthouse Performance: **40-60/100**
- First Contentful Paint: **~2.5s**
- Largest Contentful Paint: **~4.0s**

### Objectif Après Phase 1
- Navigation entre pages: **<500ms** ✅
- Lighthouse Performance: **70-80/100** ✅
- First Contentful Paint: **~1.2s** ✅
- Largest Contentful Paint: **~2.0s** ✅

### Objectif Final
- Navigation entre pages: **<300ms** 🎯
- Lighthouse Performance: **85-95/100** 🎯
- First Contentful Paint: **<1s** 🎯
- Largest Contentful Paint: **<1.5s** 🎯

---

## 🛠️ Commandes Utiles

### Tester la performance
```bash
# Build de production
npm run build

# Analyser le bundle
npm install --save-dev @next/bundle-analyzer
```

### Mesurer avec Lighthouse
1. Ouvrir Chrome DevTools (F12)
2. Onglet "Lighthouse"
3. Sélectionner "Performance"
4. Cliquer "Analyze page load"

### Tester sur mobile
1. Chrome DevTools > Network
2. Throttling: "Slow 3G"
3. Recharger la page

---

## 💡 Notes Importantes

1. **Garder le hero animé** - L'animation du hero (avec `animate` au lieu de `whileInView`) peut rester
2. **Tester après chaque phase** - Ne pas tout faire d'un coup
3. **Commit réguliers** - Faire un commit après chaque fichier modifié
4. **Backup** - Faire une branche avant de commencer

---

**Prêt à commencer ?** Je peux implémenter la Phase 1 maintenant si vous voulez !
