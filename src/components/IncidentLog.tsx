import type { AnswerRecord } from "../game/types";

interface IncidentLogProps {
  history: AnswerRecord[];
  totalIncidents: number;
  currentIndex: number;
}

type DotState = "correct" | "incorrect" | "current" | "pending";

export default function IncidentLog({ history, totalIncidents, currentIndex }: IncidentLogProps) {
  return (
    <div className="incident-log">
      <div className="incident-log-title">INCIDENT LOG</div>
      <div className="incident-log-grid">
        {Array.from({ length: totalIncidents }, (_, i) => {
          const record = history[i];
          let dotState: DotState = "pending";
          if (record) dotState = record.correct ? "correct" : "incorrect";
          else if (i === currentIndex) dotState = "current";

          return (
            <span
              key={i}
              className={`incident-dot incident-dot-${dotState}`}
              title={`Incident ${i + 1}${record ? (record.correct ? " — correct" : " — incorrect") : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
}
