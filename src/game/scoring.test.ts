import { describe, expect, it } from "vitest";
import { calculateScore, TIMER_DURATION_SECONDS } from "./scoring";

const FAST_TIME_LEFT = Math.ceil(TIMER_DURATION_SECONDS * 0.66);
const SLOW_TIME_LEFT = Math.floor(TIMER_DURATION_SECONDS * 0.66) - 1;

describe("calculateScore", () => {
  it("awards 0 points for a wrong answer, regardless of difficulty or time", () => {
    expect(calculateScore("easy", false, TIMER_DURATION_SECONDS)).toBe(0);
    expect(calculateScore("hard", false, 1)).toBe(0);
  });

  it("awards 100 base points for a correct easy/medium answer answered slowly", () => {
    expect(calculateScore("easy", true, SLOW_TIME_LEFT)).toBe(100);
    expect(calculateScore("medium", true, SLOW_TIME_LEFT)).toBe(100);
  });

  it("awards 150 base points for a correct hard answer answered slowly", () => {
    expect(calculateScore("hard", true, SLOW_TIME_LEFT)).toBe(150);
  });

  it("adds a 25 point fast-answer bonus when at least 66% of the time remains", () => {
    expect(calculateScore("easy", true, FAST_TIME_LEFT)).toBe(125);
    expect(calculateScore("hard", true, FAST_TIME_LEFT)).toBe(175);
  });

  it("does not add the fast-answer bonus just below the 66% threshold", () => {
    expect(calculateScore("easy", true, SLOW_TIME_LEFT)).toBe(100);
  });

  it("awards the fast bonus when answered with the full timer remaining", () => {
    expect(calculateScore("easy", true, TIMER_DURATION_SECONDS)).toBe(125);
  });
});
