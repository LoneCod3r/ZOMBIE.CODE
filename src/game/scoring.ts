import type { Difficulty } from "./types";

export const TIMER_DURATION_SECONDS = 30;
export const TIMER_WARNING_THRESHOLD = 5;

const BASE_POINTS = 100;
const HARD_POINTS = 150;
const FAST_ANSWER_BONUS = 25;
const FAST_ANSWER_TIME_RATIO = 0.66;

export function calculateScore(
  difficulty: Difficulty,
  correct: boolean,
  timeLeft: number
): number {
  if (!correct) return 0;

  const base = difficulty === "hard" ? HARD_POINTS : BASE_POINTS;
  const isFast = timeLeft / TIMER_DURATION_SECONDS >= FAST_ANSWER_TIME_RATIO;
  const bonus = isFast ? FAST_ANSWER_BONUS : 0;

  return base + bonus;
}
