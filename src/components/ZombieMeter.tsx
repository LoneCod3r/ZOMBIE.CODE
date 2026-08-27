interface ZombieMeterProps {
  zombieLevel: number;
  label?: string;
}

export default function ZombieMeter({ zombieLevel, label }: ZombieMeterProps) {
  const clamped = Math.max(0, Math.min(100, zombieLevel));

  return (
    <div className="zombie-meter" role="meter" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      {label ? <div className="zombie-meter-label">{label}</div> : null}
      <div className="zombie-meter-track">
        <div className="zombie-meter-fill" style={{ width: `${clamped}%` }} />
      </div>
      <div className="zombie-meter-value">{clamped}%</div>
    </div>
  );
}
