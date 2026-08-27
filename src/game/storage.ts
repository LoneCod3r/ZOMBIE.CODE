import type { HighScoreEntry } from "./types";

const HIGH_SCORE_KEY = "zombiecode:highscores";
const LEGACY_HIGH_SCORE_KEY = "zombiecode:highscore";
const MAX_HIGH_SCORES = 3;
const ACHIEVEMENTS_KEY_PREFIX = "zombiecode:achievements:";
const MUTED_KEY = "zombiecode:muted";

function achievementsKey(playerName: string): string {
  return `${ACHIEVEMENTS_KEY_PREFIX}${playerName.trim().toUpperCase()}`;
}

function isStorageAvailable(): boolean {
  try {
    const testKey = "zombiecode:__test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// Top 3 best runs, sorted highest score first.
export function loadHighScores(): HighScoreEntry[] {
  if (!isStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(HIGH_SCORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return (parsed as HighScoreEntry[])
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_HIGH_SCORES);
      }
    }

    // Migrate a single legacy high score entry into the new list format.
    const legacyRaw = window.localStorage.getItem(LEGACY_HIGH_SCORE_KEY);
    if (legacyRaw) {
      const legacyEntry = JSON.parse(legacyRaw) as HighScoreEntry;
      return [legacyEntry];
    }
    return [];
  } catch {
    return [];
  }
}

export function saveHighScore(entry: HighScoreEntry): HighScoreEntry[] {
  if (!isStorageAvailable()) return [entry];
  try {
    const scores = [...loadHighScores(), entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_HIGH_SCORES);
    window.localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
    window.localStorage.removeItem(LEGACY_HIGH_SCORE_KEY);
    return scores;
  } catch {
    return [entry];
  }
}

// Achievements are tracked per player name, so a name that has never played
// before sees every popup again, while a returning name keeps its history.
export function loadUnlockedAchievements(playerName: string): string[] {
  if (!isStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(achievementsKey(playerName));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUnlockedAchievements(playerName: string, ids: string[]): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.setItem(achievementsKey(playerName), JSON.stringify(ids));
  } catch {
    // Ignore storage failures; achievements simply won't persist.
  }
}

export function loadMutedPreference(): boolean {
  if (!isStorageAvailable()) return false;
  try {
    return window.localStorage.getItem(MUTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveMutedPreference(muted: boolean): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.setItem(MUTED_KEY, muted ? "1" : "0");
  } catch {
    // Ignore storage failures; the preference simply won't persist.
  }
}
