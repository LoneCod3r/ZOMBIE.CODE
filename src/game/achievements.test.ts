import { describe, expect, it } from "vitest";
import { evaluateAchievements } from "./achievements";
import type { GameState } from "./types";

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    runQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    zombieLevel: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    answersByLanguage: {
      csharp: { correct: 0, total: 0 },
      javascript: { correct: 0, total: 0 },
      python: { correct: 0, total: 0 },
    },
    selectedAnswer: null,
    answerSubmitted: false,
    lastAnswerCorrect: null,
    gameStatus: "playing",
    timeLeft: 30,
    history: [],
    unlockedAchievementIds: [],
    pendingAchievementIds: [],
    characterGender: "male",
    characterStage: 1,
    playerName: "TEST DEV",
    ...overrides,
  };
}

describe("evaluateAchievements", () => {
  it("unlocks FIRST_BLOOD on the first correct answer", () => {
    const state = makeState({ correctAnswers: 1 });
    expect(evaluateAchievements(state, false)).toContain("first_blood");
  });

  it("unlocks NULL_POINTER on the first wrong answer", () => {
    const state = makeState({ wrongAnswers: 1 });
    expect(evaluateAchievements(state, false)).toContain("null_pointer");
  });

  it("unlocks COFFEE_DEPENDENCY after 5 answered questions", () => {
    const state = makeState({ correctAnswers: 3, wrongAnswers: 2 });
    expect(evaluateAchievements(state, false)).toContain("coffee_dependency");
  });

  it("does not unlock COFFEE_DEPENDENCY before 5 answered questions", () => {
    const state = makeState({ correctAnswers: 2, wrongAnswers: 2 });
    expect(evaluateAchievements(state, false)).not.toContain("coffee_dependency");
  });

  it("unlocks NO_SLEEP_TIL_PRODUCTION after 15 answered questions", () => {
    const state = makeState({ correctAnswers: 10, wrongAnswers: 5 });
    expect(evaluateAchievements(state, false)).toContain("no_sleep");
  });

  it("unlocks UNDEAD_SENIOR at 70% zombification", () => {
    const state = makeState({ zombieLevel: 70 });
    expect(evaluateAchievements(state, false)).toContain("undead_senior");
    expect(evaluateAchievements(makeState({ zombieLevel: 69 }), false)).not.toContain("undead_senior");
  });

  it("unlocks IT_WORKS_ON_MY_MACHINE at 25 correct answers", () => {
    const state = makeState({ correctAnswers: 25 });
    expect(evaluateAchievements(state, false)).toContain("works_on_my_machine");
  });

  it("only unlocks SHIP_IT and THE_BUG_WAS_IN_PRODUCTION when the game is complete", () => {
    const state = makeState({ correctAnswers: 20, wrongAnswers: 10 });
    expect(evaluateAchievements(state, false)).not.toContain("ship_it");
    expect(evaluateAchievements(state, false)).not.toContain("bug_in_production");

    const completed = evaluateAchievements(state, true);
    expect(completed).toContain("ship_it");
    expect(completed).toContain("bug_in_production");
  });

  it("unlocks SPEEDRUN on a correct answer with at least 25s left on a 30s timer", () => {
    const fast = makeState({ lastAnswerCorrect: true, timeLeft: 25 });
    expect(evaluateAchievements(fast, false)).toContain("speedrun");

    const slow = makeState({ lastAnswerCorrect: true, timeLeft: 24 });
    expect(evaluateAchievements(slow, false)).not.toContain("speedrun");
  });

  it("does not unlock SPEEDRUN on a fast but wrong answer", () => {
    const state = makeState({ lastAnswerCorrect: false, timeLeft: 29 });
    expect(evaluateAchievements(state, false)).not.toContain("speedrun");
  });

  it("unlocks POLYGLOT once all three languages have a correct answer", () => {
    const state = makeState({
      answersByLanguage: {
        csharp: { correct: 1, total: 1 },
        javascript: { correct: 1, total: 2 },
        python: { correct: 1, total: 1 },
      },
    });
    expect(evaluateAchievements(state, false)).toContain("polyglot");
  });

  it("does not unlock POLYGLOT while a language still has zero correct answers", () => {
    const state = makeState({
      answersByLanguage: {
        csharp: { correct: 1, total: 1 },
        javascript: { correct: 0, total: 2 },
        python: { correct: 1, total: 1 },
      },
    });
    expect(evaluateAchievements(state, false)).not.toContain("polyglot");
  });

  it("unlocks FLAWLESS only when the game completes with zero wrong answers", () => {
    const perfect = makeState({ correctAnswers: 30, wrongAnswers: 0 });
    expect(evaluateAchievements(perfect, true)).toContain("flawless");

    const notPerfect = makeState({ correctAnswers: 29, wrongAnswers: 1 });
    expect(evaluateAchievements(notPerfect, true)).not.toContain("flawless");

    // Even a flawless run in progress shouldn't unlock it before the game is complete.
    expect(evaluateAchievements(perfect, false)).not.toContain("flawless");
  });

  it("does not re-unlock an achievement the player already has", () => {
    const state = makeState({ correctAnswers: 1, unlockedAchievementIds: ["first_blood"] });
    expect(evaluateAchievements(state, false)).not.toContain("first_blood");
  });

  it("returns an empty list when nothing new qualifies", () => {
    const state = makeState();
    expect(evaluateAchievements(state, false)).toEqual([]);
  });
});
