# Les Chroniques de Jez — Site Officiel

Site vitrine de la saga dark fantasy **Les Chroniques de Jez** par **Aladin Akkari**.

## Aperçu

Une page web immersive présentant la saga, les tomes, l'univers, les personnages et l'auteur. Design dark fantasy avec typographie serif, palette rubis et noire, animations au scroll et particules ambiantes.

## Stack technique

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — animations et parallaxe au scroll
- **Lucide React** — icônes

## Structure

```
app/
├── page.tsx        # Page principale (Hero, Tomes, Univers, Personnages, Auteur)
├── layout.tsx      # Layout global + SEO complet (Open Graph, JSON-LD, Twitter Card)
├── globals.css     # Variables, effets visuels (glow, btn-ruby, noise)
├── icon.tsx        # Favicon généré dynamiquement (cercle rubis)
├── sitemap.ts      # Sitemap XML auto-généré
└── robots.ts       # robots.txt auto-généré
```

## Fonctionnalités

- Hero avec parallaxe et fade au scroll
- Section des 4 tomes avec liens Amazon
- Carte de l'univers (Aros & Lethra) en SVG
- Fiches personnages (descriptions sans spoilers)
- Bio auteur
- Particules animées en arrière-plan
- Logo épée fineline en SVG
- SEO complet : métadonnées, Open Graph, Twitter Card, JSON-LD (BookSeries + Book schema)
- Sitemap & robots.txt générés automatiquement

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement

Compatible [Vercel](https://vercel.com) — connecter le repo et déployer en un clic.

Penser à mettre à jour `SITE_URL` dans `layout.tsx`, `sitemap.ts` et `robots.ts` avec le vrai domaine avant la mise en production.

---

© 2025 Aladin Akkari
