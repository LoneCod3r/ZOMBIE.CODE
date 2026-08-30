import type { HighScoreEntry } from "../game/types";
import { playClick } from "../game/audio";
import { ACHIEVEMENTS } from "../game/achievements";
import { loadUnlockedAchievements } from "../game/storage";

interface AchievementsScreenProps {
  onBack: () => void;
  highScores: HighScoreEntry[];
}

export default function AchievementsScreen({ onBack, highScores }: AchievementsScreenProps) {
  const topScore = highScores[0] ?? null;
  const unlockedIds = topScore ? loadUnlockedAchievements(topScore.playerName) : [];

  return (
    <div className="screen achievements-screen">
      <div className="terminal-frame achievements-frame">
        <div className="terminal-titlebar">
          <h1>ACHIEVEMENTS</h1>
        </div>

        {topScore ? (
          <>
            <div className="achievements-header">
              {topScore.playerName || "ANONYMOUS DEV"} — {unlockedIds.length} / {ACHIEVEMENTS.length} UNLOCKED
            </div>
            <div className="achievements-list">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = unlockedIds.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`achievement-row ${unlocked ? "unlocked" : "locked"}`}
                  >
                    <span className="achievement-mark">{unlocked ? "[X]" : "[ ]"}</span>
                    <span className="achievement-text">
                      <span className="achievement-title">{achievement.title}</span>
                      {unlocked ? <span className="achievement-desc">{achievement.description}</span> : null}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="achievements-empty">NO RECORDS FOUND. PLAY A SHIFT FIRST.</div>
        )}
      </div>

      <div className="menu-buttons">
        <button
          type="button"
          className="menu-button"
          onClick={() => {
            playClick();
            onBack();
          }}
        >
          BACK
        </button>
      </div>
    </div>
  );
}
