import type { HighScoreEntry } from "../game/types";
import { playClick } from "../game/audio";

interface HighScoresScreenProps {
  onBack: () => void;
  highScores: HighScoreEntry[];
}

export default function HighScoresScreen({ onBack, highScores }: HighScoresScreenProps) {
  return (
    <div className="screen highscores-screen">
      <div className="terminal-frame highscores-frame">
        <div className="terminal-titlebar">
          <h1>HIGH SCORES</h1>
        </div>

        {highScores.length > 0 ? (
          <div className="highscores-list">
            {highScores.map((entry, index) => (
              <div className="highscore-entry" key={`${entry.playerName}-${entry.date}-${index}`}>
                <div className="highscore-rank-badge">#{index + 1}</div>
                <div className="highscore-details">
                  <div className="highscore-name">{entry.playerName || "ANONYMOUS DEV"}</div>
                  <div>
                    SCORE: {entry.score.toLocaleString()} — {entry.rank}
                  </div>
                  <div className="highscore-date">
                    ZOMBIFICATION: {entry.zombieLevel}% · {entry.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="highscores-empty">NO RECORDS FOUND. THE SHIFT AWAITS.</div>
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
          [ BACK ]
        </button>
      </div>
    </div>
  );
}
