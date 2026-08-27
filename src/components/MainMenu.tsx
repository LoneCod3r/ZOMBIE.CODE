import { useState } from "react";
import type { HighScoreEntry } from "../game/types";
import { playClick, playHover } from "../game/audio";
import { ACHIEVEMENTS } from "../game/achievements";
import { loadUnlockedAchievements } from "../game/storage";

interface MainMenuProps {
  onStart: () => void;
  onHowToPlay: () => void;
  highScores: HighScoreEntry[];
}

type Panel = "none" | "highscores" | "achievements";

export default function MainMenu({ onStart, onHowToPlay, highScores }: MainMenuProps) {
  const [panel, setPanel] = useState<Panel>("none");

  const click = (fn: () => void) => () => {
    playClick();
    fn();
  };

  const togglePanel = (target: Panel) => {
    setPanel((current) => (current === target ? "none" : target));
  };

  const topScore = highScores[0] ?? null;
  const unlockedIds = topScore ? loadUnlockedAchievements(topScore.playerName) : [];

  return (
    <div className="screen main-menu">
      <div className="main-menu-office" aria-hidden="true" />
      <div className="menu-content">
        <h1 className="game-title">
          ZOMBIE<span className="title-dot">.</span>CODE
        </h1>
        <p className="game-subtitle">A CODING HORROR EXPERIENCE</p>

        <nav className="menu-buttons">
          <button type="button" className="menu-button" onMouseEnter={playHover} onClick={click(onStart)}>
            [ START SHIFT ]
          </button>
          <button
            type="button"
            className="menu-button"
            onMouseEnter={playHover}
            onClick={click(() => togglePanel("highscores"))}
          >
            [ HIGH SCORES ]
          </button>
          <button
            type="button"
            className="menu-button"
            onMouseEnter={playHover}
            onClick={click(onHowToPlay)}
          >
            [ HOW TO PLAY ]
          </button>
          <button
            type="button"
            className="menu-button"
            onMouseEnter={playHover}
            onClick={click(() => togglePanel("achievements"))}
          >
            [ ACHIEVEMENTS ]
          </button>
        </nav>

        {panel === "highscores" ? (
          <div className="menu-highscore-panel">
            {highScores.length > 0 ? (
              highScores.map((entry, index) => (
                <div className="menu-highscore-entry" key={`${entry.playerName}-${entry.date}-${index}`}>
                  <div className="menu-highscore-rank-badge">#{index + 1}</div>
                  <div className="menu-highscore-details">
                    <div>{entry.playerName || "ANONYMOUS DEV"}</div>
                    <div>SCORE: {entry.score.toLocaleString()} — {entry.rank}</div>
                    <div className="menu-highscore-date">
                      ZOMBIFICATION: {entry.zombieLevel}% · {entry.date}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>NO RECORDS FOUND. THE SHIFT AWAITS.</div>
            )}
          </div>
        ) : null}

        {panel === "achievements" ? (
          <div className="menu-achievements-panel">
            {topScore ? (
              <>
                <div className="menu-achievements-header">
                  {topScore.playerName || "ANONYMOUS DEV"} — {unlockedIds.length} / {ACHIEVEMENTS.length} UNLOCKED
                </div>
                <div className="menu-achievements-list">
                  {ACHIEVEMENTS.map((achievement) => {
                    const unlocked = unlockedIds.includes(achievement.id);
                    return (
                      <div
                        key={achievement.id}
                        className={`menu-achievement-row ${unlocked ? "unlocked" : "locked"}`}
                      >
                        <span className="menu-achievement-mark">{unlocked ? "[X]" : "[ ]"}</span>
                        <span className="menu-achievement-text">
                          <span className="menu-achievement-title">{achievement.title}</span>
                          {unlocked ? (
                            <span className="menu-achievement-desc">{achievement.description}</span>
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div>NO RECORDS FOUND. PLAY A SHIFT FIRST.</div>
            )}
          </div>
        ) : null}

        <p className="menu-credit">MADE BY LONE CODER</p>

        <div className="menu-footer">
          <span>BUILD 0.1.0</span>
        </div>
      </div>
    </div>
  );
}
