import type { Achievement, GameState } from "./types";
import { TIMER_DURATION_SECONDS } from "./scoring";

const SPEEDRUN_SECONDS = 5;
const SPEEDRUN_TIME_LEFT_THRESHOLD = TIMER_DURATION_SECONDS - SPEEDRUN_SECONDS;

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_blood", title: "FIRST BLOOD", description: "Answer your first question correctly." },
  { id: "null_pointer", title: "NULL POINTER", description: "Get a question wrong." },
  { id: "coffee_dependency", title: "COFFEE DEPENDENCY", description: "Complete 5 incidents." },
  { id: "no_sleep", title: "NO SLEEP TIL PRODUCTION", description: "Complete 15 incidents." },
  { id: "ship_it", title: "SHIP IT", description: "Complete the game." },
  { id: "undead_senior", title: "UNDEAD SENIOR", description: "Reach 70% zombification." },
  {
    id: "works_on_my_machine",
    title: "IT WORKS ON MY MACHINE",
    description: "Finish with at least 25 correct answers.",
  },
  {
    id: "bug_in_production",
    title: "THE BUG WAS IN PRODUCTION",
    description: "Complete all 30 incidents.",
  },
  {
    id: "speedrun",
    title: "SPEEDRUN",
    description: `Answer a question correctly in under ${SPEEDRUN_SECONDS} seconds.`,
  },
  {
    id: "flawless",
    title: "FLAWLESS",
    description: "Complete the game with zero wrong answers.",
  },
  {
    id: "polyglot",
    title: "POLYGLOT",
    description: "Answer at least one question correctly in C#, JavaScript and Python.",
  },
];

const ACHIEVEMENT_MAP = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENT_MAP.get(id);
}

export function evaluateAchievements(state: GameState, gameComplete: boolean): string[] {
  const answered = state.correctAnswers + state.wrongAnswers;
  const newlyUnlocked: string[] = [];

  const maybeUnlock = (id: string, condition: boolean) => {
    if (condition && !state.unlockedAchievementIds.includes(id) && !newlyUnlocked.includes(id)) {
      newlyUnlocked.push(id);
    }
  };

  maybeUnlock("first_blood", state.correctAnswers >= 1);
  maybeUnlock("null_pointer", state.wrongAnswers >= 1);
  maybeUnlock("coffee_dependency", answered >= 5);
  maybeUnlock("no_sleep", answered >= 15);
  maybeUnlock("undead_senior", state.zombieLevel >= 70);
  maybeUnlock("works_on_my_machine", state.correctAnswers >= 25);
  maybeUnlock(
    "speedrun",
    state.lastAnswerCorrect === true && state.timeLeft >= SPEEDRUN_TIME_LEFT_THRESHOLD
  );
  maybeUnlock(
    "polyglot",
    state.answersByLanguage.csharp.correct >= 1 &&
      state.answersByLanguage.javascript.correct >= 1 &&
      state.answersByLanguage.python.correct >= 1
  );

  if (gameComplete) {
    maybeUnlock("ship_it", true);
    maybeUnlock("bug_in_production", answered >= 30);
    maybeUnlock("flawless", state.wrongAnswers === 0);
  }

  return newlyUnlocked;
}
