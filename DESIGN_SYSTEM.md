# 🎨 Système de Design Premium - Hôtel de Silly

## Vue d'ensemble

Ce document décrit le système de design luxueux et raffiné pour l'Hôtel de Silly. Il définit les principes visuels, la palette de couleurs, la typographie, les composants et les animations qui créent une expérience utilisateur premium.

---

## 🎨 Palette de Couleurs

### Couleurs Principales

#### Or Champagne (Couleur Signature)
- **champagne-500**: `#d4b886` - Couleur principale, utilisée pour les accents premium
- **champagne-600**: `#c19a5f` - Variation plus foncée pour les hover states
- **champagne-700**: `#a67c45` - Pour les textes sur fond clair

**Usage**: Accents, boutons CTA, éléments décoratifs, badges premium

#### Noir Profond (Sophistication)
- **noir-900**: `#1a1a1a` - Noir principal pour textes et fonds
- **noir-950**: `#0a0a0a` - Noir absolu pour les overlays

**Usage**: Textes principaux, fonds sombres, headers

#### Ivoire (Pureté Luxueuse)
- **ivoire-100**: `#fffef9` - Fond principal clair
- **ivoire-500**: `#fef0c7` - Accents chauds

**Usage**: Fonds de page, cartes, sections claires

### Couleurs d'Accent

#### Or Rose (Élégance Moderne)
- **rose-gold-500**: `#e07a5f`
**Usage**: Accents secondaires, hover effects

#### Bordeaux Profond (Luxe)
- **bordeaux-800**: `#7d2338`
**Usage**: Badges "Populaire", accents exclusifs

#### Émeraude (Nature)
- **emeraude-700**: `#15803d`
**Usage**: Badges "Nouveau", éléments écologiques

---

## ✍️ Typographie

### Hiérarchie des Polices

1. **Display** - `Cormorant Garamond`
   - Usage: Titres principaux (H1, Hero titles)
   - Poids: 300, 400, 600, 700
   - Caractère: Élégant, classique, raffiné

2. **Heading** - `Cinzel`
   - Usage: Sous-titres, titres de section (H2, H3)
   - Poids: 400, 600, 700
   - Caractère: Sophistiqué, architectural

3. **Serif** - `Playfair Display`
   - Usage: Citations, textes accentués
   - Poids: 400, 600, 700
   - Caractère: Traditionnel, luxueux

4. **Sans** - `Montserrat`
   - Usage: Navigation, boutons, labels
   - Poids: 300, 400, 600, 700
   - Caractère: Moderne, lisible

5. **Body** - `Inter`
   - Usage: Corps de texte, paragraphes
   - Poids: 300, 400, 500, 600
   - Caractère: Neutre, lisible

6. **Cursive** - `Great Vibes`
   - Usage: Signatures, éléments décoratifs
   - Poids: 400
   - Caractère: Élégant, manuscrit

### Échelle Typographique

```
H1: clamp(2.5rem, 5vw, 4.5rem) - 40-72px
H2: clamp(2rem, 4vw, 3.5rem) - 32-56px
H3: clamp(1.5rem, 3vw, 2.5rem) - 24-40px
Body: 1rem (16px)
Small: 0.875rem (14px)
```

### Letter Spacing

- **ultra-wide**: `0.3em` - Titres en majuscules
- **luxury**: `0.15em` - Sous-titres élégants
- **normal**: `0.01-0.02em` - Texte courant

---

## 🎭 Animations

### Animations d'Entrée

- **fade-in**: Apparition douce (0.8s)
- **fade-in-up**: Montée avec fondu (0.8s)
- **fade-in-down**: Descente avec fondu (0.8s)
- **slide-in-left**: Glissement depuis la gauche (0.6s)
- **slide-in-right**: Glissement depuis la droite (0.6s)
- **scale-in**: Zoom progressif (0.5s)

### Animations Continues

- **shimmer**: Effet de brillance (2.5s infinite)
- **float**: Flottement vertical (3s infinite)
- **glow**: Pulsation lumineuse (2s infinite)
- **pulse**: Pulsation d'échelle (2s infinite)

### Timing Functions

- **Smooth**: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard
- **Luxury**: `cubic-bezier(0.16, 1, 0.3, 1)` - Premium, élastique

---

## 🧩 Composants Réutilisables

### LuxuryDivider
Séparateur élégant avec ornement central en diamant.

```tsx
<LuxuryDivider className="my-12" />
```

### PremiumBadge
Badge avec effet shimmer au hover.

```tsx
<PremiumBadge>Ouverture 2025</PremiumBadge>
```

### SectionTitle
Titre de section avec ornements et sous-titre optionnel.

```tsx
<SectionTitle 
  title="Nos Chambres" 
  subtitle="Découvrez"
  align="center"
/>
```

### GlassCard
Carte avec effet glassmorphism premium.

```tsx
<GlassCard hover={true}>
  {/* Contenu */}
</GlassCard>
```

### LuxuryButton
Bouton avec effet de vague au hover.

```tsx
<LuxuryButton variant="primary" size="lg">
  Réserver
</LuxuryButton>
```

**Variants**: `primary`, `secondary`, `outline`  
**Sizes**: `sm`, `md`, `lg`

### DecorativePattern
Pattern subtil en arrière-plan.

```tsx
<DecorativePattern variant="dots" />
```

**Variants**: `default`, `dots`, `lines`

### Ornament
Ornement décoratif positionné.

```tsx
<Ornament position="top-left" size="md" />
```

### StatusBadge
Badge de statut coloré.

```tsx
<StatusBadge variant="new">Nouveau</StatusBadge>
```

**Variants**: `new`, `popular`, `exclusive`

---

## 🎨 Effets Visuels

### Glassmorphism

```css
.glass-luxury {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
```

### Ombres Premium

- **shadow-luxury**: `0 10px 40px rgba(0, 0, 0, 0.15)`
- **shadow-luxury-lg**: `0 20px 60px rgba(0, 0, 0, 0.2)`
- **shadow-luxury-xl**: `0 30px 80px rgba(0, 0, 0, 0.25)`
- **shadow-gold**: `0 10px 40px rgba(212, 184, 134, 0.3)`
- **shadow-gold-lg**: `0 20px 60px rgba(212, 184, 134, 0.4)`

### Gradients

- **gradient-luxury**: Or champagne en dégradé
- **gradient-dark**: Noir profond en dégradé
- **gradient-champagne**: Horizontal or champagne
- **gradient-noir**: Vertical noir profond
- **gradient-shimmer**: Effet de brillance animé

---

## 📐 Espacements

### Spacing Scale

- **spacing-luxury**: `6rem` (96px) - Desktop
- **spacing-section**: `8rem` (128px) - Desktop
- **spacing-luxury**: `3rem` (48px) - Mobile
- **spacing-section**: `4rem` (64px) - Mobile

### Custom Spacing

- **18**: `4.5rem` (72px)
- **88**: `22rem` (352px)
- **100**: `25rem` (400px)
- **112**: `28rem` (448px)
- **128**: `32rem` (512px)

---

## 🎯 Principes de Design

### 1. Élégance Visuelle
- Utiliser des espaces généreux (breathing room)
- Privilégier la simplicité sophistiquée
- Éviter la surcharge visuelle

### 2. Hiérarchie Claire
- Contraste fort entre les niveaux de texte
- Utilisation stratégique des couleurs d'accent
- Guidage visuel par les animations

### 3. Cohérence Premium
- Utiliser systématiquement les composants définis
- Respecter la palette de couleurs
- Maintenir les espacements constants

### 4. Micro-interactions
- Ajouter des hover effects subtils
- Utiliser des transitions fluides (0.4-0.6s)
- Feedback visuel immédiat

### 5. Performance
- Utiliser `transform` et `opacity` pour les animations
- Activer l'accélération GPU avec `translateZ(0)`
- Optimiser les images et les fonts

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptations Mobile

- Réduction des espacements (50%)
- Tailles de police adaptatives (clamp)
- Navigation dots plus petits
- Simplification des animations

---

## 🎨 Exemples d'Usage

### Hero Section Premium

```tsx
<section className="relative h-screen bg-gradient-noir">
  <DecorativePattern variant="dots" />
  <Ornament position="top-right" size="lg" />
  
  <div className="relative z-10 flex flex-col items-center justify-center h-full">
    <PremiumBadge>Ouverture 2025</PremiumBadge>
    <h1 className="font-display text-6xl text-ivoire-100 mt-8">
      L'Hôtel de Silly
    </h1>
    <LuxuryDivider />
    <LuxuryButton variant="primary" size="lg">
      Découvrir
    </LuxuryButton>
  </div>
</section>
```

### Section avec Glassmorphism

```tsx
<section className="py-24 bg-ivoire-100 relative">
  <DecorativePattern variant="lines" />
  
  <div className="container mx-auto px-4">
    <SectionTitle 
      title="Nos Services" 
      subtitle="Excellence"
    />
    
    <div className="grid grid-cols-3 gap-8">
      <GlassCard>
        {/* Contenu */}
      </GlassCard>
    </div>
  </div>
</section>
```

---

## 🚀 Prochaines Étapes

1. ✅ Système de design créé
2. 🔄 Application au Header
3. 🔄 Refonte du Hero Section
4. 🔄 Mise à jour des sections
5. 🔄 Optimisation responsive

---

**Version**: 1.0  
**Dernière mise à jour**: 2025-11-25  
**Créé par**: Antigravity AI
