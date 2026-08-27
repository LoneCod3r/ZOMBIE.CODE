interface PauseMenuProps {
  onResume: () => void;
  onMainMenu: () => void;
}

export default function PauseMenu({ onResume, onMainMenu }: PauseMenuProps) {
  return (
    <div className="pause-overlay">
      <div className="pause-frame">
        <div className="pause-title">PAUSED</div>
        <p className="pause-subtitle">PRODUCTION IS STILL WATCHING.</p>
        <div className="menu-buttons">
          <button type="button" className="menu-button" onClick={onResume}>
            [ RESUME ]
          </button>
          <button type="button" className="menu-button" onClick={onMainMenu}>
            [ MAIN MENU ]
          </button>
        </div>
      </div>
    </div>
  );
}
