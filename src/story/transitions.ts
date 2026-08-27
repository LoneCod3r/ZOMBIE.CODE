export interface StoryBeat {
  heading: string;
  lines: string[];
}

export const STORY_TRANSITIONS: Record<number, StoryBeat> = {
  5: {
    heading: "DAY 1 — 02:43 AM",
    lines: [
      "The office was supposed to close six hours ago.",
      "Nobody has left.",
      "The vending machine is whispering.",
      "You blame the backend team.",
    ],
  },
  10: {
    heading: "DAY 2 — 04:17 AM",
    lines: [
      "Martin from backend hasn't blinked in approximately 11 hours.",
      "He says he's fine.",
      "He has started eating the keyboard.",
    ],
  },
  15: {
    heading: "DAY 3",
    lines: [
      "HR has sent another email.",
      "Subject:",
      '"MANDATORY TEAM BUILDING EVENT"',
      "You decide that becoming a zombie might actually be preferable.",
    ],
  },
  20: {
    heading: "DAY 4",
    lines: [
      "Your manager asks for a quick fix.",
      "The bug is from 2019.",
      "You realize there is no escape.",
    ],
  },
  25: {
    heading: "DAY 5",
    lines: [
      "You can no longer remember what sleep feels like.",
      "Your code compiles.",
      "This worries you.",
    ],
  },
};
