import { describe, expect, it } from "vitest";
import { getRank } from "./rank";

describe("getRank", () => {
  it.each([
    [0, "INTERN"],
    [499, "INTERN"],
    [500, "JUNIOR DEVELOPER"],
    [999, "JUNIOR DEVELOPER"],
    [1000, "MID-LEVEL DEVELOPER"],
    [1599, "MID-LEVEL DEVELOPER"],
    [1600, "SENIOR DEVELOPER"],
    [2199, "SENIOR DEVELOPER"],
    [2200, "STAFF ENGINEER"],
    [2799, "STAFF ENGINEER"],
    [2800, "PRINCIPAL ENGINEER"],
    [3399, "PRINCIPAL ENGINEER"],
    [3400, "ARCHITECT"],
    [3799, "ARCHITECT"],
    [3800, "UNDEAD ARCHITECT"],
    [4099, "UNDEAD ARCHITECT"],
    [4100, "CTO OF THE DAMNED"],
    [10000, "CTO OF THE DAMNED"],
  ])("maps score %i to rank %s", (score, expectedRank) => {
    expect(getRank(score)).toBe(expectedRank);
  });
});
