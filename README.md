# Aromiq — React 3D Perfume Store

A premium perfume storefront starter inspired by editorial fragrance websites, with:
- React + Vite
- React Three Fiber / Three.js procedural perfume bottle
- Framer Motion animations
- Responsive pages
- Home, Shop, Product, About, Contact and Cart
- Video sections
- Product filtering/search
- CSS-only visual system, so you can replace imagery easily

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Build

```bash
npm run build
```

## Main folders

- `src/pages` — route pages
- `src/components` — reusable UI + 3D bottle
- `src/data` — product data
- `src/styles.css` — complete visual system

## Customize

1. Replace the Unsplash image URLs in `src/data/products.js`.
2. Replace the sample MP4 URLs in `Home.jsx` with your own videos.
3. Edit colors/fonts in `src/styles.css`.
4. For a real store, connect Cart/Checkout to your backend or a commerce API.

## 3D

The perfume bottle is generated procedurally in `src/components/Perfume3D.jsx`, so no `.glb` asset is required to start. Later you can replace it with a real GLB/GLTF perfume bottle and keep the same scene/lighting.
