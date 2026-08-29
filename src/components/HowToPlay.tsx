import { playClick } from "../game/audio";

interface HowToPlayProps {
  onBack: () => void;
  onStart: () => void;
}

export default function HowToPlay({ onBack, onStart }: HowToPlayProps) {
  return (
    <div className="screen how-to-play">
      <div className="terminal-frame howto-frame">
        <div className="terminal-titlebar">
          <span>HOW TO PLAY</span>
        </div>
        <p>WELCOME, DEVELOPER.</p>
        <p>There are 30 incidents.</p>
        <p>Answer coding questions correctly.</p>
        <p>Every correct answer increases your</p>
        <p>ZOMBIFICATION LEVEL.</p>
        <p>Make it to Incident #30.</p>
        <p>Try to retain some humanity.</p>
        <p>Good luck.</p>

        <div className="howto-controls">
          <div>1–4&nbsp;&nbsp;&nbsp;Press a NUMBER KEY to select an answer</div>
          <div>ENTER&nbsp;Confirm your selection</div>
          <div>ESC&nbsp;&nbsp;&nbsp;Pause</div>
        </div>
      </div>

      <div className="menu-buttons">
        <button
          type="button"
          className="menu-button"
          onClick={() => {
            playClick();
            onStart();
          }}
        >
          [ START SHIFT ]
        </button>
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
