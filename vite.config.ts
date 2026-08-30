import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// GitHub Pages serves this as a project site at /ZOMBIE.CODE/, not the domain
// root, so every root-relative asset path (manifest, icons, service worker
// scope) has to be prefixed with this base or they'll 404 once deployed.
const BASE_PATH = "/ZOMBIE.CODE/";

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      includeAssets: ["favicon.svg", "favicon.ico"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
      manifest: {
        name: "ZOMBIE.CODE — A Coding Horror Experience",
        short_name: "ZOMBIE.CODE",
        description:
          "A retro coding horror quiz. Answer 30 incidents in C#, JavaScript and Python before you fully turn.",
        theme_color: "#8fae75",
        background_color: "#080909",
        display: "standalone",
        orientation: "landscape",
        start_url: BASE_PATH,
        scope: BASE_PATH,
        icons: [
          { src: `${BASE_PATH}icons/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
          { src: `${BASE_PATH}icons/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
          {
            src: `${BASE_PATH}icons/icon-maskable-512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  test: {
    environment: "node",
  },
});
