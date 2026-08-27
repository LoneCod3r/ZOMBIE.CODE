import { describe, expect, it } from "vitest";
import { clampZombieLevel, getZombieStage } from "./zombieSystem";

describe("clampZombieLevel", () => {
  it("clamps values below 0 up to 0", () => {
    expect(clampZombieLevel(-20)).toBe(0);
  });

  it("clamps values above 100 down to 100", () => {
    expect(clampZombieLevel(150)).toBe(100);
  });

  it("leaves in-range values unchanged", () => {
    expect(clampZombieLevel(42)).toBe(42);
  });
});

describe("getZombieStage", () => {
  it.each([
    [0, 0, "NORMAL DEVELOPER"],
    [15, 0, "NORMAL DEVELOPER"],
    [16, 1, "SLEEP DEPRIVED"],
    [30, 1, "SLEEP DEPRIVED"],
    [31, 2, "INFECTED"],
    [50, 2, "INFECTED"],
    [51, 3, "ZOMBIE DEVELOPER"],
    [70, 3, "ZOMBIE DEVELOPER"],
    [71, 4, "UNDEAD SENIOR"],
    [85, 4, "UNDEAD SENIOR"],
    [86, 5, "ZOMBIE ARCHITECT"],
    [99, 5, "ZOMBIE ARCHITECT"],
    [100, 6, "FINAL FORM"],
  ])("maps zombieLevel %i to stage %i (%s)", (level, expectedStage, expectedLabel) => {
    const result = getZombieStage(level);
    expect(result.stage).toBe(expectedStage);
    expect(result.label).toBe(expectedLabel);
  });

  it("clamps out-of-range levels before mapping to a stage", () => {
    expect(getZombieStage(-10).stage).toBe(0);
    expect(getZombieStage(500).stage).toBe(6);
  });
});
