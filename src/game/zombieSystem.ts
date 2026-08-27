export interface ZombieStage {
  stage: number;
  label: string;
  className: string;
}

const STAGES: { min: number; stage: number; label: string; className: string }[] = [
  { min: 0, stage: 0, label: "NORMAL DEVELOPER", className: "stage-0" },
  { min: 16, stage: 1, label: "SLEEP DEPRIVED", className: "stage-1" },
  { min: 31, stage: 2, label: "INFECTED", className: "stage-2" },
  { min: 51, stage: 3, label: "ZOMBIE DEVELOPER", className: "stage-3" },
  { min: 71, stage: 4, label: "UNDEAD SENIOR", className: "stage-4" },
  { min: 86, stage: 5, label: "ZOMBIE ARCHITECT", className: "stage-5" },
  { min: 100, stage: 6, label: "FINAL FORM", className: "stage-6" },
];

export function clampZombieLevel(level: number): number {
  return Math.max(0, Math.min(100, level));
}

export function getZombieStage(zombieLevel: number): ZombieStage {
  const level = clampZombieLevel(zombieLevel);
  let current = STAGES[0];
  for (const s of STAGES) {
    if (level >= s.min) current = s;
  }
  return { stage: current.stage, label: current.label, className: current.className };
}
