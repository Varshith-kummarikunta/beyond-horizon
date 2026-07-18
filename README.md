# Beyond Horizon

A cinematic, data-driven portfolio for Kummarikunta Varshith. It combines high-performance motion, an optional React Three Fiber Hero scene, and accessible, responsive portfolio sections.

## Tech stack

- React 19 and Vite 8
- Tailwind CSS v4
- GSAP, Framer Motion, and Lenis
- React Three Fiber and Drei

## Features

- Responsive cinematic Hero with a lazy-loaded 3D scene
- Centralized content in `src/data/site.js`
- Accessible navigation, focus states, reduced-motion support, and lazy-loaded media
- Project, travel, and empty-safe art galleries
- SEO metadata, JSON-LD, sitemap, robots, manifest, and favicon
- Production code splitting for below-the-fold sections and Three.js

## Installation

```bash
npm install
```

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Content and assets

Update portfolio content in `src/data/site.js`.

- Travel images belong in `public/images/travel/`.
- Project screenshots can be added as `/images/projects/project-name.webp` and referenced through `screenshotPath`.
- Sketches belong in `public/images/sketches/`; add their metadata to `site.artGallery.images` after the files exist.

## Deploying to Vercel

This is a static Vite application and needs no environment variables or custom routing configuration.

1. Import the repository into Vercel.
2. Use the default build command: `npm run build`.
3. Set the output directory to `dist` if Vercel does not detect Vite automatically.
4. Update the canonical URL, Open Graph URL, sitemap, and robots sitemap URL in `index.html`, `public/sitemap.xml`, and `public/robots.txt` if the production domain differs from `https://beyondhorizon.dev/`.
