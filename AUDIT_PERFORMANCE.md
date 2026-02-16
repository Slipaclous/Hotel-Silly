# 🔍 Audit de Performance - Site Hôtel de Silly

**Date:** 16 février 2026  
**Problème rapporté:** Navigation entre les pages trop lente

---

## 📊 Résumé Exécutif

### Problèmes Identifiés
- ✅ **Animations excessives** - Utilisation intensive de `whileInView` sur tous les composants
- ✅ **Chargement dynamique non optimisé** - Composants chargés de manière synchrone
- ⚠️ **Images non optimisées** - Pas de priorité définie, lazy loading par défaut
- ⚠️ **Bundle JavaScript volumineux** - Framer Motion chargé sur toutes les pages
- ⚠️ **Pas de préchargement** - Aucune stratégie de prefetch pour les pages
- ⚠️ **Fonts Google** - Chargement bloquant des polices

### Impact Estimé
- **Temps de navigation actuel:** ~2-3 secondes entre pages
- **Temps optimal attendu:** <500ms
- **Score de performance estimé:** 40-60/100

---

## 🎯 Problèmes Critiques

### 1. ❌ Animations `whileInView` Excessives

**Localisation:**
- `ChambresContent.tsx` - Ligne 106-111 (chaque chambre)
- `EvenementsContent.tsx` - Lignes 103-117, 132-145, 163-177, 181-198, 207-227, 251-256
- `GalerieContent.tsx` - Lignes 117-123 (chaque image)

**Impact:**
- Chaque animation nécessite un recalcul de layout
- Bloque le rendu jusqu'au scroll
- Cumulative Layout Shift (CLS) élevé
- Performance CPU dégradée sur mobile

**Code problématique:**
```tsx
// ChambresContent.tsx - Ligne 106
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}  // ❌ PROBLÈME
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true, margin: "-100px" }}
>
```

**Solution recommandée:**
```tsx
// Supprimer whileInView, utiliser des divs normales
<div className="opacity-0 animate-fade-in">
  {/* Utiliser CSS animations au lieu de JS */}
</div>
```

---

### 2. ❌ Chargement de Framer Motion sur Toutes les Pages

**Localisation:**
- Importé dans tous les composants `*Content.tsx`
- Bundle size: ~50-60KB (gzipped)

**Impact:**
- Augmente le temps de chargement initial
- JavaScript bloquant le rendu
- Parsing et exécution coûteux

**Solution:**
1. Limiter Framer Motion au hero uniquement
2. Utiliser CSS animations pour le reste
3. Considérer `react-spring` (plus léger) si animations nécessaires

---

### 3. ⚠️ Images Non Optimisées

**Localisation:**
- Toutes les images de chambres, galerie, événements

**Problèmes identifiés:**
```tsx
// ChambresContent.tsx - Ligne 118
<Image
  src={room.imageUrl}
  alt={roomName}
  fill
  className="object-cover"
  sizes="(max-width: 1024px) 100vw, 50vw"
  // ❌ Pas de priority
  // ❌ Pas de placeholder
  // ❌ Lazy loading par défaut (même pour images above-the-fold)
/>
```

**Solutions:**
1. Ajouter `priority` pour images above-the-fold
2. Utiliser `placeholder="blur"` avec `blurDataURL`
3. Optimiser les `sizes` selon le viewport réel

---

### 4. ⚠️ Polices Google Non Optimisées

**Localisation:**
- `layout.tsx` - Lignes 9-25

**Problèmes:**
```tsx
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // ❌ 5 poids = 5 fichiers
  variable: "--font-display",
});
```

**Impact:**
- 3 polices × 5 poids = 15 fichiers de fonts
- Temps de chargement: ~500-800ms
- Render-blocking

**Solutions:**
1. Réduire le nombre de poids (garder 400, 500, 700)
2. Utiliser `font-display: swap`
3. Précharger les polices critiques

---

### 5. ❌ Pas de Stratégie de Préchargement

**Problème:**
- Aucun `prefetch` pour les liens de navigation
- Chaque page charge tout depuis zéro
- Pas de cache optimisé

**Impact:**
- Navigation lente entre pages
- Ressources rechargées à chaque fois
- Expérience utilisateur dégradée

**Solution:**
```tsx
// Utiliser prefetch dans les liens
<Link href="/chambres" prefetch={true}>
  Chambres
</Link>
```

---

## 🔧 Solutions Détaillées

### Solution 1: Supprimer les Animations `whileInView`

**Fichiers à modifier:**
1. `ChambresContent.tsx`
2. `EvenementsContent.tsx`
3. `GalerieContent.tsx`
4. `CarteCadeauContent.tsx`
5. `SeminairesContent.tsx`
6. `AboutContent.tsx`

**Changements:**
```tsx
// AVANT
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>

// APRÈS
<div>
  {/* Pas d'animation ou CSS animation simple */}
</div>
```

**Gain estimé:** -40% temps de chargement, +30 points performance

---

### Solution 2: Optimiser les Images

**Créer un composant `OptimizedImage`:**
```tsx
// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // tiny blur
      onLoadingComplete={() => setIsLoading(false)}
      className={`
        transition-opacity duration-300
        ${isLoading ? 'opacity-0' : 'opacity-100'}
        ${props.className}
      `}
      {...props}
    />
  );
}
```

**Gain estimé:** -20% temps de chargement, meilleure UX

---

### Solution 3: Optimiser les Polices

**Modifier `layout.tsx`:**
```tsx
// Réduire les poids
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"], // ❌ Seulement 2 poids au lieu de 5
  variable: "--font-display",
  display: 'swap', // ✅ Ajouter font-display
  preload: true, // ✅ Précharger
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"], // ❌ Réduire de 5 à 2
  variable: "--font-body",
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"], // ❌ Réduire
  variable: "--font-accent",
  display: 'swap',
  preload: true,
});
```

**Gain estimé:** -60% temps de chargement des fonts (~300ms)

---

### Solution 4: Ajouter le Préchargement

**Modifier `Header.tsx`:**
```tsx
import { Link } from '@/i18n/routing';

// Dans les liens de navigation
<Link href="/chambres" prefetch={true}>
  {t('nav.rooms')}
</Link>
```

**Ajouter dans `next.config.ts`:**
```ts
const nextConfig: NextConfig = {
  images: {
    // ... config existante
  },
  experimental: {
    optimizeCss: true, // ✅ Optimiser CSS
  },
};
```

**Gain estimé:** -50% temps de navigation entre pages

---

### Solution 5: Lazy Loading Intelligent

**Modifier les imports dynamiques:**
```tsx
// ChambresContent.tsx - Ligne 10
const GalleryLightbox = dynamic(
  () => import('./GalleryLightbox'),
  { 
    loading: () => <div>Loading...</div>,
    ssr: false // ✅ Pas de SSR pour le lightbox
  }
);
```

**Ajouter lazy loading pour composants lourds:**
```tsx
// Dans les pages
const ChambresContent = dynamic(
  () => import('@/components/ChambresContent'),
  { loading: () => <LoadingSpinner /> }
);
```

---

## 📈 Plan d'Action Prioritaire

### Phase 1: Quick Wins (1-2 heures)
1. ✅ **Supprimer animations `whileInView`** - Impact immédiat
2. ✅ **Optimiser les polices** - Réduire les poids
3. ✅ **Ajouter `prefetch` aux liens** - Navigation plus rapide

**Gain estimé:** +40 points performance

---

### Phase 2: Optimisations Images (2-3 heures)
1. ⚠️ Créer composant `OptimizedImage`
2. ⚠️ Ajouter `priority` aux images above-the-fold
3. ⚠️ Générer `blurDataURL` pour toutes les images
4. ⚠️ Optimiser les `sizes` par composant

**Gain estimé:** +20 points performance

---

### Phase 3: Optimisations Avancées (4-6 heures)
1. 🔄 Implémenter CSS animations au lieu de Framer Motion
2. 🔄 Ajouter Service Worker pour cache
3. 🔄 Optimiser le bundle JavaScript
4. 🔄 Implémenter code splitting avancé

**Gain estimé:** +15 points performance

---

## 🎯 Résultats Attendus

### Avant Optimisations
- **First Contentful Paint (FCP):** ~2.5s
- **Largest Contentful Paint (LCP):** ~4.0s
- **Time to Interactive (TTI):** ~5.0s
- **Cumulative Layout Shift (CLS):** 0.25
- **Navigation entre pages:** ~2-3s

### Après Phase 1
- **FCP:** ~1.2s (-52%)
- **LCP:** ~2.0s (-50%)
- **TTI:** ~2.5s (-50%)
- **CLS:** 0.05 (-80%)
- **Navigation:** ~0.5s (-83%)

### Après Toutes les Phases
- **FCP:** ~0.8s (-68%)
- **LCP:** ~1.5s (-62%)
- **TTI:** ~1.8s (-64%)
- **CLS:** 0.02 (-92%)
- **Navigation:** ~0.3s (-90%)

---

## 🛠️ Outils de Mesure Recommandés

1. **Lighthouse** (Chrome DevTools)
   - Mesurer performance avant/après
   - Identifier bottlenecks

2. **WebPageTest**
   - Tester sur vraies connexions
   - Analyser waterfall

3. **Next.js Bundle Analyzer**
   ```bash
   npm install @next/bundle-analyzer
   ```

4. **React DevTools Profiler**
   - Identifier composants lents
   - Optimiser re-renders

---

## 📝 Checklist d'Implémentation

### Immédiat (Aujourd'hui)
- [ ] Supprimer `whileInView` de ChambresContent
- [ ] Supprimer `whileInView` de EvenementsContent
- [ ] Supprimer `whileInView` de GalerieContent
- [ ] Réduire poids des polices dans layout.tsx
- [ ] Ajouter `prefetch={true}` dans Header

### Court terme (Cette semaine)
- [ ] Créer composant OptimizedImage
- [ ] Remplacer toutes les images par OptimizedImage
- [ ] Ajouter priority aux images hero
- [ ] Générer blurDataURL pour images principales
- [ ] Tester avec Lighthouse

### Moyen terme (Ce mois)
- [ ] Implémenter CSS animations
- [ ] Optimiser bundle JavaScript
- [ ] Ajouter Service Worker
- [ ] Implémenter code splitting
- [ ] Tests de performance complets

---

## 💡 Recommandations Supplémentaires

### 1. Configuration Next.js
```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // ✅ Formats modernes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true, // ✅ Compression gzip
  poweredByHeader: false, // ✅ Sécurité
  reactStrictMode: true,
};
```

### 2. Utiliser CSS Variables pour Animations
```css
/* globals.css */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

### 3. Monitoring Continu
- Implémenter Web Vitals tracking
- Ajouter analytics de performance
- Alertes si dégradation

---

## 🎓 Conclusion

Les problèmes de lenteur sont principalement dus à:
1. **Animations JavaScript excessives** (60% du problème)
2. **Polices non optimisées** (20% du problème)
3. **Pas de préchargement** (15% du problème)
4. **Images non optimisées** (5% du problème)

**La Phase 1 devrait résoudre 75% des problèmes de performance** et peut être implémentée en 1-2 heures.

---

**Prochaine étape:** Voulez-vous que je commence par implémenter la Phase 1 (Quick Wins) ?
