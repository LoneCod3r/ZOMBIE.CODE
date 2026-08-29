import { playClick, playHover } from "../game/audio";

interface MainMenuProps {
  onStart: () => void;
  onHowToPlay: () => void;
  onAchievements: () => void;
  onHighScores: () => void;
}

export default function MainMenu({ onStart, onHowToPlay, onAchievements, onHighScores }: MainMenuProps) {
  const click = (fn: () => void) => () => {
    playClick();
    fn();
  };

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
          <button type="button" className="menu-button" onMouseEnter={playHover} onClick={click(onHighScores)}>
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
          <button type="button" className="menu-button" onMouseEnter={playHover} onClick={click(onAchievements)}>
            [ ACHIEVEMENTS ]
          </button>
        </nav>

        <p className="menu-credit">MADE BY LONE CODER</p>

        <div className="menu-footer">
          <span>BUILD 0.1.0</span>
        </div>
      </div>
    </div>
  );
}
