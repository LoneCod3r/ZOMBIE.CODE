import type { CharacterStage, Gender } from "./types";

// Runtime asset paths must be prefixed with Vite's BASE_URL, unlike assets
// referenced from index.html or CSS which get this rewritten automatically
// at build time. Without it these 404 once deployed under a non-root base
// (e.g. GitHub Pages project sites at /ZOMBIE.CODE/).
export function characterImageSrc(gender: Gender, stage: CharacterStage): string {
  return `${import.meta.env.BASE_URL}characters/${gender}-${stage}.png`;
}
