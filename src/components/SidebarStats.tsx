interface SidebarStatsProps {
  correctAnswers: number;
  answered: number;
  zombieStage: number;
}

// Not a real gauge - just flavor tracking the same stage tiers the
// background corruption already uses, draining as things get worse.
const COFFEE_LEVELS: Record<number, string> = {
  0: "FULL",
  1: "TOPPED UP",
  2: "RUNNING LOW",
  3: "EMPTY",
  4: "WHAT IS COFFEE",
  5: "N/A",
  6: "ERROR",
};

export default function SidebarStats({ correctAnswers, answered, zombieStage }: SidebarStatsProps) {
  const accuracy = answered > 0 ? Math.round((correctAnswers / answered) * 100) : 0;
  const coffeeLevel = COFFEE_LEVELS[zombieStage] ?? COFFEE_LEVELS[0];

  return (
    <div className="sidebar-stats">
      <div className="sidebar-stat">
        <span className="sidebar-stat-label">ACCURACY</span>
        <span className="sidebar-stat-value">{accuracy}%</span>
      </div>
      <div className="sidebar-stat">
        <span className="sidebar-stat-label">COFFEE LEVEL</span>
        <span className="sidebar-stat-value">{coffeeLevel}</span>
      </div>
    </div>
  );
}
