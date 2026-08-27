import { describe, expect, it } from "vitest";
import { validateQuestions } from "./validation";
import { questions } from "../questions/questions";
import type { Question } from "./types";

function baseQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: 1,
    language: "python",
    difficulty: "easy",
    incidentTitle: "TEST INCIDENT",
    question: "What is printed?",
    answers: ["a", "b", "c", "d"],
    correctAnswer: 0,
    explanation: "Because reasons.",
    zombieGain: 2,
    ...overrides,
  };
}

function makeThirtyQuestions(): Question[] {
  return Array.from({ length: 30 }, (_, i) => baseQuestion({ id: i + 1 }));
}

describe("validateQuestions", () => {
  it("passes the real question bank shipped with the game", () => {
    expect(validateQuestions(questions)).toEqual([]);
  });

  it("passes a well-formed set of exactly 30 questions", () => {
    expect(validateQuestions(makeThirtyQuestions())).toEqual([]);
  });

  it("flags a question count other than 30", () => {
    const errors = validateQuestions(makeThirtyQuestions().slice(0, 29));
    expect(errors.some((e) => e.includes("Expected exactly 30 questions"))).toBe(true);
  });

  it("flags duplicate ids", () => {
    const set = makeThirtyQuestions();
    set[1] = baseQuestion({ id: set[0].id });
    const errors = validateQuestions(set);
    expect(errors.some((e) => e.includes("Duplicate question id"))).toBe(true);
  });

  it("flags a question without exactly 4 answers", () => {
    const set = makeThirtyQuestions();
    set[0] = baseQuestion({ id: set[0].id, answers: ["a", "b", "c"] });
    const errors = validateQuestions(set);
    expect(errors.some((e) => e.includes("must have exactly 4 answers"))).toBe(true);
  });

  it("flags an out-of-range correctAnswer index", () => {
    const set = makeThirtyQuestions();
    set[0] = baseQuestion({ id: set[0].id, correctAnswer: 7 });
    const errors = validateQuestions(set);
    expect(errors.some((e) => e.includes("out-of-range correctAnswer"))).toBe(true);
  });

  it("flags a missing explanation", () => {
    const set = makeThirtyQuestions();
    set[0] = baseQuestion({ id: set[0].id, explanation: "" });
    const errors = validateQuestions(set);
    expect(errors.some((e) => e.includes("missing an explanation"))).toBe(true);
  });

  it("flags an invalid language or difficulty", () => {
    const set = makeThirtyQuestions();
    // @ts-expect-error intentionally invalid value to test validation
    set[0] = baseQuestion({ id: set[0].id, language: "cobol" });
    const errors = validateQuestions(set);
    expect(errors.some((e) => e.includes("invalid language"))).toBe(true);
  });
});
