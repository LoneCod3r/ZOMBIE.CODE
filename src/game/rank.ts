const RANKS: { min: number; label: string }[] = [
  { min: 0, label: "INTERN" },
  { min: 500, label: "JUNIOR DEVELOPER" },
  { min: 1000, label: "MID-LEVEL DEVELOPER" },
  { min: 1600, label: "SENIOR DEVELOPER" },
  { min: 2200, label: "STAFF ENGINEER" },
  { min: 2800, label: "PRINCIPAL ENGINEER" },
  { min: 3400, label: "ARCHITECT" },
  { min: 3800, label: "UNDEAD ARCHITECT" },
  { min: 4100, label: "CTO OF THE DAMNED" },
];

export function getRank(score: number): string {
  let current = RANKS[0].label;
  for (const r of RANKS) {
    if (score >= r.min) current = r.label;
  }
  return current;
}
