interface GameHUDProps {
  incidentNumber: number;
  totalIncidents: number;
  zombieLevel: number;
  score: number;
  timeLeft: number;
  timerTotal: number;
}

export default function GameHUD({
  incidentNumber,
  totalIncidents,
  zombieLevel,
  score,
  timeLeft,
  timerTotal,
}: GameHUDProps) {
  const isWarning = timeLeft <= 5;
  const timePercent = Math.max(0, Math.min(100, (timeLeft / timerTotal) * 100));

  return (
    <div className="game-hud">
      <div className="hud-left">
        INCIDENT {String(incidentNumber).padStart(2, "0")} / {totalIncidents}
      </div>
      <div className="hud-center">
        <div className="hud-zombie-label">ZOMBIFICATION {zombieLevel}%</div>
        <div className={`hud-timer ${isWarning ? "hud-timer-warning" : ""}`}>
          <span className="hud-timer-value">{Math.ceil(timeLeft)}s</span>
          <div className="hud-timer-track">
            <div className="hud-timer-fill" style={{ width: `${timePercent}%` }} />
          </div>
        </div>
      </div>
      <div className="hud-right">SCORE {score.toLocaleString()}</div>
    </div>
  );
}
