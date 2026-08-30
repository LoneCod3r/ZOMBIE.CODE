import { useEffect, useRef } from "react";
import type { GameState } from "../game/types";
import { getRank } from "../game/rank";
import { saveHighScore } from "../game/storage";
import { playVictory } from "../game/audio";

interface ResultsScreenProps {
  state: GameState;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

const LANGUAGE_LABEL: Record<string, string> = {
  csharp: "C#",
  javascript: "JAVASCRIPT",
  python: "PYTHON",
};

export default function ResultsScreen({ state, onPlayAgain, onMainMenu }: ResultsScreenProps) {
  const totalIncidents = state.runQuestions.length;
  const rank = getRank(state.score);
  const accuracy = totalIncidents > 0 ? Math.round((state.correctAnswers / totalIncidents) * 100) : 0;

  const savedRef = useRef(false);
  useEffect(() => {
    // Guards against React StrictMode's dev-only double-invoke of mount
    // effects, which would otherwise record this run twice on the board.
    if (savedRef.current) return;
    savedRef.current = true;

    playVictory();
    saveHighScore({
      playerName: state.playerName,
      score: state.score,
      zombieLevel: state.zombieLevel,
      rank,
      date: new Date().toISOString().slice(0, 10),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="screen results-screen">
      <div className="results-frame">
        <div className="results-title">========================</div>
        <h1 className="results-title results-title-main">SHIFT COMPLETE</h1>
        <div className="results-title">========================</div>

        <div className="results-player-name">{state.playerName}</div>

        <div className="results-row">
          <span>INCIDENTS:</span>
          <span>
            {state.correctAnswers + state.wrongAnswers} / {totalIncidents}
          </span>
        </div>
        <div className="results-row">
          <span>CORRECT ANSWERS:</span>
          <span>{accuracy}%</span>
        </div>

        {(["csharp", "javascript", "python"] as const).map((lang) => (
          <div className="results-row" key={lang}>
            <span>{LANGUAGE_LABEL[lang]}</span>
            <span>
              {state.answersByLanguage[lang].correct} / {state.answersByLanguage[lang].total}
            </span>
          </div>
        ))}

        <div className="results-row results-row-gap">
          <span>SCORE:</span>
          <span>{state.score.toLocaleString()}</span>
        </div>
        <div className="results-row">
          <span>ZOMBIFICATION:</span>
          <span>{state.zombieLevel}%</span>
        </div>
        <div className="results-row">
          <span>HUMANITY:</span>
          <span>{100 - state.zombieLevel}%</span>
        </div>

        <div className="results-rank-label">RANK:</div>
        <div className="results-rank">{rank}</div>
      </div>

      <div className="menu-buttons">
        <button type="button" className="menu-button" onClick={onPlayAgain}>
          [ PLAY AGAIN ]
        </button>
        <button type="button" className="menu-button" onClick={onMainMenu}>
          [ MAIN MENU ]
        </button>
      </div>
    </div>
  );
}
