import { useEffect, useRef } from "react";
import type { GameState } from "../game/types";
import { currentQuestion } from "../game/gameState";
import { getZombieStage } from "../game/zombieSystem";
import { TIMER_DURATION_SECONDS, TIMER_WARNING_THRESHOLD } from "../game/scoring";
import { playCorrect, playHover, playTimerWarning, playTransform, playWrong } from "../game/audio";
import { useGlitch } from "../hooks/useGlitch";
import GameHUD from "./GameHUD";
import QuestionPanel from "./QuestionPanel";
import ZombieCharacter from "./ZombieCharacter";
import ZombieMeter from "./ZombieMeter";
import SidebarStats from "./SidebarStats";
import AnswerFeedback from "./AnswerFeedback";
import GlitchEffect from "./GlitchEffect";
import PauseMenu from "./PauseMenu";

interface GameScreenProps {
  state: GameState;
  actions: {
    selectAnswer: (index: number) => void;
    submitAnswer: () => void;
    advance: () => void;
    tick: (delta: number) => void;
    togglePause: () => void;
    goToMenu: () => void;
  };
}

const ADVANCE_DELAY_MS = 2400;

export default function GameScreen({ state, actions }: GameScreenProps) {
  const question = currentQuestion(state);
  const [glitching, triggerGlitch] = useGlitch(350);
  const prevCharacterStageRef = useRef(state.characterStage);
  const prevQuestionIdRef = useRef<number | null>(null);
  const warnedRef = useRef(false);

  const isPlaying = state.gameStatus === "playing";
  const isPaused = state.gameStatus === "paused";

  // Timer tick.
  useEffect(() => {
    if (!isPlaying || state.answerSubmitted) return;
    const interval = window.setInterval(() => actions.tick(1), 1000);
    return () => window.clearInterval(interval);
  }, [isPlaying, state.answerSubmitted, state.currentQuestionIndex, actions]);

  // Timer warning sound.
  useEffect(() => {
    if (!isPlaying) return;
    if (state.timeLeft <= TIMER_WARNING_THRESHOLD && state.timeLeft > 0 && !warnedRef.current) {
      warnedRef.current = true;
      playTimerWarning();
    }
    if (state.timeLeft > TIMER_WARNING_THRESHOLD) {
      warnedRef.current = false;
    }
  }, [state.timeLeft, isPlaying]);

  // Glitch + sound on new question.
  useEffect(() => {
    if (!question) return;
    if (prevQuestionIdRef.current !== null && prevQuestionIdRef.current !== question.id) {
      triggerGlitch(300);
    }
    prevQuestionIdRef.current = question.id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.id]);

  // Glitch + sound on answer submit.
  useEffect(() => {
    if (!state.answerSubmitted) return;
    triggerGlitch(400);
    if (state.lastAnswerCorrect) {
      playCorrect();
    } else {
      playWrong();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.answerSubmitted]);

  // Character portrait transformation sound + glitch.
  useEffect(() => {
    if (state.characterStage !== prevCharacterStageRef.current) {
      prevCharacterStageRef.current = state.characterStage;
      triggerGlitch(500);
      playTransform();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.characterStage]);

  // Auto-advance after feedback.
  useEffect(() => {
    if (!isPlaying || !state.answerSubmitted) return;
    const timeout = window.setTimeout(() => actions.advance(), ADVANCE_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [isPlaying, state.answerSubmitted, actions]);

  // Keyboard controls.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isPaused) {
        if (e.key === "Escape") actions.togglePause();
        return;
      }
      if (!isPlaying) return;

      if (["1", "2", "3", "4"].includes(e.key) && !state.answerSubmitted) {
        actions.selectAnswer(Number(e.key) - 1);
        return;
      }
      if (e.key === "Enter") {
        if (!state.answerSubmitted && state.selectedAnswer !== null) {
          actions.submitAnswer();
        } else if (state.answerSubmitted) {
          actions.advance();
        }
        return;
      }
      if (e.key === "Escape" && !state.answerSubmitted) {
        actions.togglePause();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isPlaying, isPaused, state.answerSubmitted, state.selectedAnswer, actions]);

  if (!question) return null;

  const handleAnswerClick = (index: number) => {
    if (state.answerSubmitted) return;
    actions.selectAnswer(index);
    actions.submitAnswer();
  };

  const stage = getZombieStage(state.zombieLevel).stage;
  const corruptionClass =
    stage <= 1 ? "corruption-low" : stage <= 3 ? "corruption-medium" : stage <= 5 ? "corruption-high" : "corruption-final";

  return (
    <div className={`screen game-screen ${corruptionClass}`}>
      <GameHUD
        incidentNumber={state.currentQuestionIndex + 1}
        totalIncidents={state.runQuestions.length}
        zombieLevel={state.zombieLevel}
        score={state.score}
        timeLeft={state.timeLeft}
        timerTotal={TIMER_DURATION_SECONDS}
      />

      <div className="game-body">
        <GlitchEffect active={glitching} className="game-terminal-wrap">
          <QuestionPanel
            question={question}
            incidentNumber={state.currentQuestionIndex + 1}
            selectedAnswer={state.selectedAnswer}
            answerSubmitted={state.answerSubmitted}
            onSelect={handleAnswerClick}
            onHover={playHover}
          />
        </GlitchEffect>

        <aside className="game-sidebar">
          <ZombieCharacter gender={state.characterGender ?? "male"} stage={state.characterStage} />
          <ZombieMeter zombieLevel={state.zombieLevel} label="INFECTION LEVEL" />
          <SidebarStats
            correctAnswers={state.correctAnswers}
            answered={state.correctAnswers + state.wrongAnswers}
            zombieStage={stage}
          />
          <AnswerFeedback
            question={question}
            selectedAnswer={state.selectedAnswer}
            answerSubmitted={state.answerSubmitted}
            lastAnswerCorrect={state.lastAnswerCorrect}
            timeLeft={state.timeLeft}
          />
        </aside>
      </div>

      {isPaused ? <PauseMenu onResume={actions.togglePause} onMainMenu={actions.goToMenu} /> : null}
    </div>
  );
}
