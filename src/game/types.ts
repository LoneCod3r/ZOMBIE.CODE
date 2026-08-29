export type Language = "csharp" | "javascript" | "python";

export type Difficulty = "easy" | "medium" | "hard";

export type Gender = "male" | "female";

export type CharacterStage = 1 | 2 | 3;

export interface Question {
  id: number;
  language: Language;
  difficulty: Difficulty;
  incidentTitle: string;
  question: string;
  code?: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
  zombieGain: number;
}

export type GameStatus =
  | "menu"
  | "howto"
  | "achievements"
  | "highscores"
  | "characterSelect"
  | "playing"
  | "transition"
  | "paused"
  | "finalboss"
  | "results";

export interface AnswerRecord {
  questionId: number;
  correct: boolean;
}

export interface GameState {
  runQuestions: Question[];
  currentQuestionIndex: number;
  score: number;
  zombieLevel: number;
  correctAnswers: number;
  wrongAnswers: number;
  answersByLanguage: Record<Language, { correct: number; total: number }>;
  selectedAnswer: number | null;
  answerSubmitted: boolean;
  lastAnswerCorrect: boolean | null;
  gameStatus: GameStatus;
  timeLeft: number;
  history: AnswerRecord[];
  unlockedAchievementIds: string[];
  pendingAchievementIds: string[];
  characterGender: Gender | null;
  characterStage: CharacterStage;
  playerName: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface HighScoreEntry {
  playerName: string;
  score: number;
  zombieLevel: number;
  rank: string;
  date: string;
}
