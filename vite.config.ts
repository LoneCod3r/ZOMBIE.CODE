import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// This same build is deployed to two different roots: GitHub Pages serves it
// as a project site at /ZOMBIE.CODE/, while Firebase Hosting serves it at the
// domain root. A relative base makes every asset path (bundle, manifest,
// icons, service worker scope) resolve correctly under either, without
// needing a separate build per host.
const BASE_PATH = "./";

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
