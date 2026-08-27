import type { Question } from "./types";

const LANGUAGES = new Set(["csharp", "javascript", "python"]);
const DIFFICULTIES = new Set(["easy", "medium", "hard"]);

export function validateQuestions(questions: Question[]): string[] {
  const errors: string[] = [];

  if (questions.length !== 30) {
    errors.push(`Expected exactly 30 questions, found ${questions.length}.`);
  }

  const seenIds = new Set<number>();
  for (const q of questions) {
    if (seenIds.has(q.id)) {
      errors.push(`Duplicate question id: ${q.id}`);
    }
    seenIds.add(q.id);

    if (!LANGUAGES.has(q.language)) {
      errors.push(`Question ${q.id} has invalid language: ${q.language}`);
    }
    if (!DIFFICULTIES.has(q.difficulty)) {
      errors.push(`Question ${q.id} has invalid difficulty: ${q.difficulty}`);
    }
    if (q.answers.length !== 4) {
      errors.push(`Question ${q.id} must have exactly 4 answers, has ${q.answers.length}.`);
    }
    if (q.correctAnswer < 0 || q.correctAnswer >= q.answers.length) {
      errors.push(`Question ${q.id} has an out-of-range correctAnswer index.`);
    }
    if (!q.explanation || q.explanation.trim().length === 0) {
      errors.push(`Question ${q.id} is missing an explanation.`);
    }
    if (!q.incidentTitle || q.incidentTitle.trim().length === 0) {
      errors.push(`Question ${q.id} is missing an incidentTitle.`);
    }
  }

  return errors;
}

export function assertQuestionsValid(questions: Question[]): void {
  const errors = validateQuestions(questions);
  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.error("Question database validation failed:", errors);
  }
}
