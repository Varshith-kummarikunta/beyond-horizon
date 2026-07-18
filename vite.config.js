import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/")) {
            return "react-vendor";
          }

          if (id.includes("/node_modules/framer-motion/") || id.includes("/node_modules/gsap/") || id.includes("/node_modules/lenis/")) {
            return "motion-vendor";
          }

          if (id.includes("/node_modules/three/") || id.includes("/node_modules/@react-three/")) {
            return "three-vendor";
          }
        },
      },
    },
  },
});
