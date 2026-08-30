import type { Question } from "../game/types";
import AnswerButton from "./AnswerButton";

const LANGUAGE_LABEL: Record<Question["language"], string> = {
  csharp: "C#",
  javascript: "JAVASCRIPT",
  python: "PYTHON",
};

interface QuestionPanelProps {
  question: Question;
  incidentNumber: number;
  selectedAnswer: number | null;
  answerSubmitted: boolean;
  onSelect: (index: number) => void;
  onHover: () => void;
}

export default function QuestionPanel({
  question,
  incidentNumber,
  selectedAnswer,
  answerSubmitted,
  onSelect,
  onHover,
}: QuestionPanelProps) {
  const revealStateFor = (index: number): "idle" | "correct" | "incorrect" | "muted" => {
    if (!answerSubmitted) return "idle";
    if (index === question.correctAnswer) return "correct";
    if (index === selectedAnswer) return "incorrect";
    return "muted";
  };

  return (
    <div className="question-panel">
      <div className="terminal-frame">
        <div className="terminal-titlebar">
          <h1>INCIDENT #{String(incidentNumber).padStart(2, "0")}</h1>
          <span className={`terminal-lang lang-${question.language}`}>
            {LANGUAGE_LABEL[question.language]}
          </span>
          <span className={`terminal-difficulty difficulty-${question.difficulty}`}>
            {question.difficulty.toUpperCase()}
          </span>
        </div>
        <div className="terminal-incident-title">{question.incidentTitle}</div>
        <div className="terminal-question">{question.question}</div>
        {question.code ? (
          <pre className="terminal-code">
            <code>{question.code}</code>
          </pre>
        ) : null}
      </div>

      <div className="answer-grid">
        {question.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            index={index}
            text={answer}
            selected={selectedAnswer === index}
            disabled={answerSubmitted}
            revealState={revealStateFor(index)}
            onSelect={onSelect}
            onHover={onHover}
          />
        ))}
      </div>
    </div>
  );
}
