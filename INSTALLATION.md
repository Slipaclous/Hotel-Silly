# 🚀 Guide d'Installation - Back Office Hôtel de Silly

## ✅ Ce qui a été créé

Un système complet de gestion de contenu (CMS) pour votre site d'hôtel comprenant :

### 📁 Structure créée

```
hotel/
├── prisma/
│   ├── schema.prisma          # Schéma de base de données
│   ├── seed.ts                # Données initiales
│   └── migrations/            # Historique des migrations
├── src/
│   ├── app/
│   │   ├── api/              # Routes API REST
│   │   │   ├── auth/login/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── features/
│   │   │   ├── rooms/
│   │   │   └── testimonials/
│   │   └── admin/            # Interface d'administration
│   │       ├── page.tsx      # Page de connexion
│   │       └── dashboard/    # Tableau de bord
│   ├── components/
│   │   ├── admin/            # Composants d'édition
│   │   │   ├── HeroEditor.tsx
│   │   │   ├── AboutEditor.tsx
│   │   │   ├── FeaturesEditor.tsx
│   │   │   ├── RoomsEditor.tsx
│   │   │   └── TestimonialsEditor.tsx
│   │   ├── HeroSection.tsx        # ✅ Connecté à la BDD
│   │   ├── AboutSection.tsx       # ✅ Connecté à la BDD
│   │   ├── RoomSection.tsx        # ✅ Connecté à la BDD
│   │   └── TestimonialsSection.tsx # ✅ Connecté à la BDD
│   └── lib/
│       ├── prisma.ts         # Client Prisma
│       └── auth.ts           # Utilitaires d'authentification
└── .env                      # Configuration (non versionné)
```

---

## 🗄️ Base de données

### Tables créées dans PostgreSQL (`hotel_db`) :

1. **User** - Utilisateurs administrateurs
2. **Hero** - Données de la section héro
3. **About** - Données de la section à propos
4. **Feature** - Les 4 icônes de valeurs
5. **Room** - Catalogue des chambres
6. **Testimonial** - Avis clients

---

## 🔑 Identifiants par défaut

**Email** : `admin@hotel-silly.com`  
**Mot de passe** : `admin123`

> ⚠️ Changez-les en production !

---

## 🛠️ Technologies utilisées

- **Framework** : Next.js 15.4.5
- **Base de données** : PostgreSQL
- **ORM** : Prisma 6.17.1
- **Authentification** : bcryptjs
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Icons** : Lucide React

---

## 📋 Commandes principales

### Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur :
- **Site public** : http://localhost:3000
- **Back office** : http://localhost:3000/admin

### Base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer/appliquer les migrations
npx prisma migrate dev

# Réinitialiser la base de données
npx prisma migrate reset

# Peupler avec les données initiales
npx prisma db seed

# Ouvrir l'interface visuelle de la BDD
npx prisma studio
```

---

## 🎨 Fonctionnalités du Back Office

### ✅ Gestion complète du contenu

- **Section Hero** : Badge, titre, description, localisation, image
- **Section À Propos** : Titre, description, 3 points clés, année, image
- **Features** : Gestion CRUD complète (Créer, Lire, Modifier, Supprimer)
- **Chambres** : Gestion CRUD avec prix, capacité, caractéristiques
- **Témoignages** : Gestion CRUD avec notes et avatars

### ✅ Interface utilisateur

- Design moderne et responsive
- Navigation par onglets
- Formulaires intuitifs
- Messages de confirmation
- Sauvegarde en temps réel

### ✅ Sécurité

- Authentification par email/mot de passe
- Mots de passe hachés avec bcryptjs
- Session storage pour la persistance

---

## 🔄 Workflow d'utilisation

1. **Connexion** à `/admin` avec vos identifiants
2. **Sélection** d'une section dans le menu latéral
3. **Modification** des données via les formulaires
4. **Sauvegarde** automatique en base de données
5. **Visualisation** immédiate sur la page d'accueil

---

## 🌐 API REST créée

Toutes les routes API suivent les standards REST :

### Hero (Singleton)
- `GET /api/hero` - Récupérer
- `PUT /api/hero` - Mettre à jour

### About (Singleton)
- `GET /api/about` - Récupérer
- `PUT /api/about` - Mettre à jour

### Features (Collection)
- `GET /api/features` - Liste
- `POST /api/features` - Créer
- `PUT /api/features/[id]` - Modifier
- `DELETE /api/features/[id]` - Supprimer

### Rooms (Collection)
- `GET /api/rooms` - Liste
- `POST /api/rooms` - Créer
- `PUT /api/rooms/[id]` - Modifier
- `DELETE /api/rooms/[id]` - Supprimer

### Testimonials (Collection)
- `GET /api/testimonials` - Liste
- `POST /api/testimonials` - Créer
- `PUT /api/testimonials/[id]` - Modifier
- `DELETE /api/testimonials/[id]` - Supprimer

### Auth
- `POST /api/auth/login` - Connexion

---

## 📦 Dépendances installées

```json
{
  "dependencies": {
    "@prisma/client": "^6.17.1",
    "bcryptjs": "^3.0.2",
    "@types/bcryptjs": "^2.4.6"
  },
  "devDependencies": {
    "prisma": "^6.17.1",
    "ts-node": "^10.x"
  }
}
```

---

## 🔐 Variables d'environnement

Fichier `.env` créé avec :

```env
DATABASE_URL="postgresql://postgres:4dnfp4gzprr7mbgm@localhost:5432/hotel_db?schema=public"
JWT_SECRET="votre_secret_jwt_super_secure_a_changer_en_production"
```

---

## ✨ Données initiales

La base a été peuplée avec :
- 1 utilisateur admin
- 1 section hero complète
- 1 section about complète
- 4 features (Excellence, Hospitalité, Sécurité, Luxe)
- 3 chambres (Suite Présidentielle, Chambre Deluxe, Suite Familiale)
- 4 témoignages clients

---

## 🎯 Prochaines étapes recommandées

### Pour la production :

1. **Sécurité**
   - [ ] Changer les identifiants admin
   - [ ] Implémenter NextAuth.js pour une meilleure gestion des sessions
   - [ ] Ajouter la validation des données côté serveur avec Zod
   - [ ] Configurer les CORS si nécessaire

2. **Fonctionnalités**
   - [ ] Ajouter l'upload d'images (Cloudinary, AWS S3)
   - [ ] Système de prévisualisation avant publication
   - [ ] Historique des modifications
   - [ ] Gestion multi-utilisateurs avec rôles

3. **Performance**
   - [ ] Mettre en place le cache (React Query, SWR)
   - [ ] Optimiser les images (next/image)
   - [ ] Mettre en place l'ISR (Incremental Static Regeneration)

4. **Déploiement**
   - [ ] Configurer une base PostgreSQL cloud (Supabase, Neon, etc.)
   - [ ] Déployer sur Vercel/Netlify
   - [ ] Configurer les variables d'environnement de production

---

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifiez que PostgreSQL est lancé
# Vérifiez que la base hotel_db existe
# Régénérez le client Prisma
npx prisma generate
```

### Erreur de connexion à la base
```bash
# Vérifiez le fichier .env
# Vérifiez que PostgreSQL écoute sur le port 5432
# Testez la connexion manuellement
```

### Les données ne s'affichent pas
```bash
# Vérifiez que le seed a été exécuté
npx prisma db seed

# Vérifiez dans Prisma Studio
npx prisma studio
```

---

## 📚 Documentation complète

Consultez le fichier `BACKOFFICE_README.md` pour :
- Guide d'utilisation détaillé
- Explication de chaque section
- FAQ
- Astuces et bonnes pratiques

---

## ✅ Checklist de vérification

- [x] Base de données PostgreSQL créée
- [x] Schéma Prisma défini
- [x] Migrations appliquées
- [x] Données initiales insérées
- [x] Routes API créées
- [x] Interface admin créée
- [x] Composants frontend connectés à la BDD
- [x] Authentification fonctionnelle
- [x] Documentation complète

---

**Votre back office est prêt à l'emploi ! 🎉**

Rendez-vous sur http://localhost:3000/admin pour commencer à gérer votre contenu.



