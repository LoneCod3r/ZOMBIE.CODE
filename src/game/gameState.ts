import { useCallback, useReducer } from "react";
import type { CharacterStage, Gender, GameState, Language, Question } from "./types";
import { questions as allQuestions } from "../questions/questions";
import { assertQuestionsValid } from "./validation";
import { calculateScore, TIMER_DURATION_SECONDS } from "./scoring";
import { clampZombieLevel } from "./zombieSystem";
import { evaluateAchievements } from "./achievements";
import { loadUnlockedAchievements, saveUnlockedAchievements } from "./storage";

assertQuestionsValid(allQuestions);

const TRANSITION_INTERVAL = 5;
const CHARACTER_STAGE_2_PROGRESS = 0.5;
const CHARACTER_STAGE_3_ACCURACY = 0.8;
const MAX_PLAYER_NAME_LENGTH = 20;
export const DEFAULT_PLAYER_NAME = "ANONYMOUS DEV";

function sanitizePlayerName(rawName: string): string {
  const trimmed = rawName.trim().slice(0, MAX_PLAYER_NAME_LENGTH);
  return trimmed.length > 0 ? trimmed : DEFAULT_PLAYER_NAME;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function emptyAnswersByLanguage(): Record<Language, { correct: number; total: number }> {
  return {
    csharp: { correct: 0, total: 0 },
    javascript: { correct: 0, total: 0 },
    python: { correct: 0, total: 0 },
  };
}

// The character portrait only ever advances forward (never reverts), mirroring
// the one-way "transformation" narrative: once you've slipped further toward
// zombie, a lucky streak of correct answers doesn't undo it.
function computeCharacterStage(
  correctAnswers: number,
  answered: number,
  totalQuestions: number,
  previousStage: CharacterStage
): CharacterStage {
  const progress = totalQuestions > 0 ? answered / totalQuestions : 0;
  const accuracy = answered > 0 ? correctAnswers / answered : 0;

  let candidate: CharacterStage = 1;
  if (progress >= CHARACTER_STAGE_2_PROGRESS) {
    candidate = accuracy >= CHARACTER_STAGE_3_ACCURACY ? 3 : 2;
  }

  return Math.max(previousStage, candidate) as CharacterStage;
}

function createInitialState(): GameState {
  return {
    runQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    zombieLevel: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    answersByLanguage: emptyAnswersByLanguage(),
    selectedAnswer: null,
    answerSubmitted: false,
    lastAnswerCorrect: null,
    gameStatus: "menu",
    timeLeft: TIMER_DURATION_SECONDS,
    history: [],
    unlockedAchievementIds: [],
    pendingAchievementIds: [],
    characterGender: null,
    characterStage: 1,
    playerName: "",
  };
}

export type GameAction =
  | { type: "GO_TO_HOWTO" }
  | { type: "GO_TO_MENU" }
  | { type: "GO_TO_CHARACTER_SELECT" }
  | { type: "START_GAME"; gender: Gender; playerName: string }
  | { type: "SELECT_ANSWER"; index: number }
  | { type: "SUBMIT_ANSWER" }
  | { type: "TICK"; delta: number }
  | { type: "ADVANCE" }
  | { type: "CONTINUE_TRANSITION" }
  | { type: "CONTINUE_FINAL_BOSS" }
  | { type: "TOGGLE_PAUSE" }
  | { type: "DISMISS_ACHIEVEMENT" };

function currentQuestion(state: GameState): Question | undefined {
  return state.runQuestions[state.currentQuestionIndex];
}

function withUnlockedAchievements(state: GameState, newIds: string[]): GameState {
  if (newIds.length === 0) return state;
  const unlockedAchievementIds = [...state.unlockedAchievementIds, ...newIds];
  saveUnlockedAchievements(state.playerName, unlockedAchievementIds);
  return {
    ...state,
    unlockedAchievementIds,
    pendingAchievementIds: [...state.pendingAchievementIds, ...newIds],
  };
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "GO_TO_HOWTO":
      return { ...state, gameStatus: "howto" };

    case "GO_TO_MENU":
      return createInitialState();

    case "GO_TO_CHARACTER_SELECT":
      return { ...state, gameStatus: "characterSelect" };

    case "START_GAME": {
      const playerName = sanitizePlayerName(action.playerName);
      return {
        ...createInitialState(),
        runQuestions: shuffle(allQuestions),
        gameStatus: "playing",
        timeLeft: TIMER_DURATION_SECONDS,
        characterGender: action.gender,
        characterStage: 1,
        playerName,
        unlockedAchievementIds: loadUnlockedAchievements(playerName),
      };
    }

    case "SELECT_ANSWER": {
      if (state.gameStatus !== "playing" || state.answerSubmitted) return state;
      return { ...state, selectedAnswer: action.index };
    }

    case "SUBMIT_ANSWER": {
      if (state.gameStatus !== "playing" || state.answerSubmitted) return state;
      const question = currentQuestion(state);
      if (!question || state.selectedAnswer === null) return state;

      const correct = state.selectedAnswer === question.correctAnswer;
      const points = calculateScore(question.difficulty, correct, state.timeLeft);
      const zombieLevel = clampZombieLevel(
        state.zombieLevel + (correct ? question.zombieGain : 0)
      );
      const lang = state.answersByLanguage[question.language];
      const correctAnswers = state.correctAnswers + (correct ? 1 : 0);
      const wrongAnswers = state.wrongAnswers + (correct ? 0 : 1);
      const characterStage = computeCharacterStage(
        correctAnswers,
        correctAnswers + wrongAnswers,
        state.runQuestions.length,
        state.characterStage
      );

      const nextState: GameState = {
        ...state,
        score: state.score + points,
        zombieLevel,
        correctAnswers,
        wrongAnswers,
        answersByLanguage: {
          ...state.answersByLanguage,
          [question.language]: { correct: lang.correct + (correct ? 1 : 0), total: lang.total + 1 },
        },
        answerSubmitted: true,
        lastAnswerCorrect: correct,
        history: [...state.history, { questionId: question.id, correct }],
        characterStage,
      };

      const newlyUnlocked = evaluateAchievements(nextState, false);
      return withUnlockedAchievements(nextState, newlyUnlocked);
    }

    case "TICK": {
      if (state.gameStatus !== "playing" || state.answerSubmitted) return state;
      const timeLeft = Math.max(0, state.timeLeft - action.delta);
      if (timeLeft <= 0) {
        const question = currentQuestion(state);
        const lang = question ? state.answersByLanguage[question.language] : undefined;
        const wrongAnswers = state.wrongAnswers + 1;
        const characterStage = computeCharacterStage(
          state.correctAnswers,
          state.correctAnswers + wrongAnswers,
          state.runQuestions.length,
          state.characterStage
        );
        const nextState: GameState = {
          ...state,
          timeLeft: 0,
          answerSubmitted: true,
          lastAnswerCorrect: false,
          wrongAnswers,
          answersByLanguage: question && lang
            ? { ...state.answersByLanguage, [question.language]: { correct: lang.correct, total: lang.total + 1 } }
            : state.answersByLanguage,
          history: question ? [...state.history, { questionId: question.id, correct: false }] : state.history,
          characterStage,
        };
        const newlyUnlocked = evaluateAchievements(nextState, false);
        return withUnlockedAchievements(nextState, newlyUnlocked);
      }
      return { ...state, timeLeft };
    }

    case "ADVANCE": {
      if (state.gameStatus !== "playing") return state;
      const nextIndex = state.currentQuestionIndex + 1;

      if (nextIndex >= state.runQuestions.length) {
        const nextState: GameState = { ...state, currentQuestionIndex: nextIndex, gameStatus: "finalboss" };
        const newlyUnlocked = evaluateAchievements(nextState, true);
        return withUnlockedAchievements(nextState, newlyUnlocked);
      }

      const baseNext: GameState = {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        answerSubmitted: false,
        lastAnswerCorrect: null,
        timeLeft: TIMER_DURATION_SECONDS,
      };

      if (nextIndex % TRANSITION_INTERVAL === 0) {
        return { ...baseNext, gameStatus: "transition" };
      }
      return baseNext;
    }

    case "CONTINUE_TRANSITION": {
      if (state.gameStatus !== "transition") return state;
      return { ...state, gameStatus: "playing", timeLeft: TIMER_DURATION_SECONDS };
    }

    case "CONTINUE_FINAL_BOSS": {
      if (state.gameStatus !== "finalboss") return state;
      return { ...state, gameStatus: "results" };
    }

    case "TOGGLE_PAUSE": {
      if (state.gameStatus === "playing") return { ...state, gameStatus: "paused" };
      if (state.gameStatus === "paused") return { ...state, gameStatus: "playing" };
      return state;
    }

    case "DISMISS_ACHIEVEMENT": {
      const [, ...rest] = state.pendingAchievementIds;
      return { ...state, pendingAchievementIds: rest };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  const actions = {
    goToHowTo: useCallback(() => dispatch({ type: "GO_TO_HOWTO" }), []),
    goToMenu: useCallback(() => dispatch({ type: "GO_TO_MENU" }), []),
    goToCharacterSelect: useCallback(() => dispatch({ type: "GO_TO_CHARACTER_SELECT" }), []),
    startGame: useCallback(
      (gender: Gender, playerName: string) => dispatch({ type: "START_GAME", gender, playerName }),
      []
    ),
    selectAnswer: useCallback((index: number) => dispatch({ type: "SELECT_ANSWER", index }), []),
    submitAnswer: useCallback(() => dispatch({ type: "SUBMIT_ANSWER" }), []),
    tick: useCallback((delta: number) => dispatch({ type: "TICK", delta }), []),
    advance: useCallback(() => dispatch({ type: "ADVANCE" }), []),
    continueTransition: useCallback(() => dispatch({ type: "CONTINUE_TRANSITION" }), []),
    continueFinalBoss: useCallback(() => dispatch({ type: "CONTINUE_FINAL_BOSS" }), []),
    togglePause: useCallback(() => dispatch({ type: "TOGGLE_PAUSE" }), []),
    dismissAchievement: useCallback(() => dispatch({ type: "DISMISS_ACHIEVEMENT" }), []),
  };

  return { state, actions };
}

export { currentQuestion, computeCharacterStage };
