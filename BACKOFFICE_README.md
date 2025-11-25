# 📋 Guide du Back Office - Hôtel de Silly

## 🎯 Vue d'ensemble

Ce back office vous permet de gérer facilement tout le contenu de votre site web d'hôtel sans toucher au code. Vous pouvez modifier les textes, images, chambres et témoignages directement depuis une interface d'administration intuitive.

---

## 🔐 Connexion

### Accès à l'administration

**URL** : `http://localhost:3000/admin`

**Identifiants par défaut** :
- **Email** : `admin@hotel-silly.com`
- **Mot de passe** : `admin123`

> ⚠️ **Important** : Changez ces identifiants en production !

---

## 📊 Sections du Back Office

### 1. 🏠 Section Hero (Page d'accueil)

Cette section gère la première image que vos visiteurs voient.

**Champs modifiables** :
- **Badge** : Le petit texte en haut (ex: "Ouverture 2025 - Luxe & Confort")
- **Sous-titre** : Le texte avant le nom de l'hôtel (ex: "Bienvenue à")
- **Titre Principal** : Le nom de l'hôtel (ex: "L'Hôtel de Silly")
- **Description** : Le paragraphe de présentation
- **Localisation** : L'adresse affichée (ex: "Silly, Belgique - Région Wallonne")
- **URL de l'image de fond** : L'image principale de la page d'accueil

---

### 2. ℹ️ Section À Propos

Présente votre hôtel et ses points forts.

**Champs modifiables** :
- **Titre** : Titre de la section (ex: "Une Expérience Unique")
- **Description** : Paragraphe de présentation
- **Point Clé 1, 2, 3** : Les trois arguments principaux (titre + texte)
  - Emplacement idéal
  - Service personnalisé
  - Équipements de luxe
- **Année d'Ouverture** : Affichée dans l'encart (ex: "2025")
- **URL de l'image** : Image illustrative de la section

---

### 3. ⭐ Features

Les 4 icônes de valeurs de l'hôtel.

**Actions disponibles** :
- ➕ Ajouter une feature
- ✏️ Modifier une feature existante
- 🗑️ Supprimer une feature

**Champs pour chaque feature** :
- **Icône** : Choix parmi Award, Heart, Shield, Star
- **Titre** : Ex: "Excellence"
- **Description** : Courte phrase explicative
- **Ordre d'affichage** : Pour organiser l'ordre (1, 2, 3, 4...)

---

### 4. 🛏️ Chambres

Gérez votre catalogue de chambres et suites.

**Actions disponibles** :
- ➕ Ajouter une chambre
- ✏️ Modifier une chambre
- 🗑️ Supprimer une chambre

**Champs pour chaque chambre** :
- **Nom** : Ex: "Suite Présidentielle"
- **Description** : Présentation courte
- **Prix** : Ex: "À partir de 1200€"
- **Capacité** : Ex: "2-4 personnes"
- **Note** : De 1 à 5 étoiles
- **URL de l'image** : Photo de la chambre
- **Caractéristiques** : Liste séparée par virgules (ex: "Vue mer, Balcon, WiFi")
- **Ordre d'affichage** : Pour organiser l'ordre

---

### 5. 💬 Témoignages

Affichez les avis de vos clients satisfaits.

**Actions disponibles** :
- ➕ Ajouter un témoignage
- ✏️ Modifier un témoignage
- 🗑️ Supprimer un témoignage

**Champs pour chaque témoignage** :
- **Nom** : Nom du client
- **Localisation** : Ex: "Paris, France"
- **Témoignage** : Le texte de l'avis
- **Note** : De 1 à 5 étoiles
- **URL de l'avatar** : Photo du client
- **Ordre d'affichage** : Pour organiser l'ordre

---

## 💾 Comment modifier le contenu ?

### Étapes générales :

1. **Connectez-vous** sur `/admin`
2. **Sélectionnez une section** dans le menu de gauche
3. **Modifiez les champs** souhaités
4. **Cliquez sur "Sauvegarder"**
5. **Vérifiez** sur la page d'accueil que les modifications apparaissent

> ✅ Les changements sont **immédiats** ! Rafraîchissez simplement la page d'accueil pour les voir.

---

## 🌐 URLs importantes

- **Site public** : `http://localhost:3000/`
- **Back office** : `http://localhost:3000/admin`
- **Tableau de bord** : `http://localhost:3000/admin/dashboard`

---

## 🔧 API Endpoints (pour développeurs)

Si vous souhaitez intégrer ces données ailleurs :

### Hero
- GET `/api/hero` - Récupérer les données
- PUT `/api/hero` - Mettre à jour

### About
- GET `/api/about` - Récupérer
- PUT `/api/about` - Mettre à jour

### Features
- GET `/api/features` - Liste
- POST `/api/features` - Créer
- PUT `/api/features/[id]` - Modifier
- DELETE `/api/features/[id]` - Supprimer

### Rooms
- GET `/api/rooms` - Liste
- POST `/api/rooms` - Créer
- PUT `/api/rooms/[id]` - Modifier
- DELETE `/api/rooms/[id]` - Supprimer

### Testimonials
- GET `/api/testimonials` - Liste
- POST `/api/testimonials` - Créer
- PUT `/api/testimonials/[id]` - Modifier
- DELETE `/api/testimonials/[id]` - Supprimer

### Auth
- POST `/api/auth/login` - Connexion admin

---

## 🗄️ Base de données

**Type** : PostgreSQL  
**Nom** : `hotel_db`  
**ORM** : Prisma

### Commandes utiles :

```bash
# Voir la base de données dans un navigateur
npx prisma studio

# Régénérer le client Prisma après modification du schéma
npx prisma generate

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Repeupler la base avec les données initiales
npx prisma db seed
```

---

## 🚀 Déploiement en production

### Avant de déployer :

1. **Changez les identifiants admin** dans la base de données
2. **Utilisez une vraie base de données PostgreSQL** (pas localhost)
3. **Configurez les variables d'environnement** :
   - `DATABASE_URL` : URL de votre base PostgreSQL
   - `JWT_SECRET` : Un secret fort pour les sessions

4. **Ajoutez une vraie authentification** avec NextAuth.js ou similaire

### Variables d'environnement (.env) :

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
JWT_SECRET="votre_secret_super_secure"
```

---

## ❓ FAQ

### Comment ajouter un nouvel utilisateur admin ?

Utilisez Prisma Studio ou créez un script :

```bash
npx prisma studio
```

Puis ajoutez un utilisateur dans la table `User` avec un mot de passe haché (utilisez bcryptjs).

### Les images ne s'affichent pas ?

Vérifiez que les URLs d'images sont valides et accessibles publiquement. Utilisez de préférence :
- Unsplash
- Cloudinary
- Votre propre CDN

### Comment sauvegarder la base de données ?

```bash
# Export
pg_dump -U postgres hotel_db > backup.sql

# Import
psql -U postgres hotel_db < backup.sql
```

---

## 📞 Support

Pour toute question technique, consultez :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

---

**Bon travail avec votre back office ! 🎉**



