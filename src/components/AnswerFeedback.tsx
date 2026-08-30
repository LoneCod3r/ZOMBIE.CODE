import type { Question } from "../game/types";
import { calculateScore } from "../game/scoring";

interface AnswerFeedbackProps {
  question: Question;
  selectedAnswer: number | null;
  answerSubmitted: boolean;
  lastAnswerCorrect: boolean | null;
  timeLeft: number;
}

export default function AnswerFeedback({
  question,
  selectedAnswer,
  answerSubmitted,
  lastAnswerCorrect,
  timeLeft,
}: AnswerFeedbackProps) {
  if (!answerSubmitted) return null;

  const timedOut = lastAnswerCorrect === false && selectedAnswer === null;
  const pointsAwarded = lastAnswerCorrect ? calculateScore(question.difficulty, true, timeLeft) : 0;

  return (
    <div className={`feedback-panel ${lastAnswerCorrect ? "feedback-correct" : "feedback-incorrect"}`}>
      {timedOut ? (
        <>
          <div className="feedback-title">TIME EXPIRED</div>
          <div className="feedback-subtitle">THE BUG WON.</div>
        </>
      ) : lastAnswerCorrect ? (
        <>
          <div className="feedback-title">CORRECT</div>
          <div className="feedback-stats">
            +{pointsAwarded} XP &nbsp;·&nbsp; +{question.zombieGain} ZOMBIFICATION
          </div>
        </>
      ) : (
        <div className="feedback-title">INCORRECT</div>
      )}
      <div className="feedback-answer">
        THE CORRECT ANSWER: [{question.correctAnswer + 1}] {question.answers[question.correctAnswer]}
      </div>
      <div className="feedback-why">WHY: {question.explanation}</div>
    </div>
  );
}
