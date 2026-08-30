import { useGameState } from "./game/gameState";
import { loadHighScores } from "./game/storage";
import { STORY_TRANSITIONS } from "./story/transitions";
import CRTOverlay from "./components/CRTOverlay";
import BootScreen from "./components/BootScreen";
import MainMenu from "./components/MainMenu";
import HowToPlay from "./components/HowToPlay";
import AchievementsScreen from "./components/AchievementsScreen";
import HighScoresScreen from "./components/HighScoresScreen";
import CharacterSelect from "./components/CharacterSelect";
import GameScreen from "./components/GameScreen";
import StoryTransition from "./components/StoryTransition";
import FinalBoss from "./components/FinalBoss";
import ResultsScreen from "./components/ResultsScreen";
import AchievementPopup from "./components/AchievementPopup";
import SoundToggle from "./components/SoundToggle";
import "./styles/index.css";

export default function App() {
  const { state, actions } = useGameState();
  const highScores = loadHighScores();

  const renderScreen = () => {
    switch (state.gameStatus) {
      case "boot":
        return <BootScreen onContinue={actions.continueBoot} />;

      case "menu":
        return (
          <MainMenu
            onStart={actions.goToCharacterSelect}
            onHowToPlay={actions.goToHowTo}
            onAchievements={actions.goToAchievements}
            onHighScores={actions.goToHighScores}
          />
        );

      case "howto":
        return <HowToPlay onBack={actions.goToMenu} onStart={actions.goToCharacterSelect} />;

      case "achievements":
        return <AchievementsScreen onBack={actions.goToMenu} highScores={highScores} />;

      case "highscores":
        return <HighScoresScreen onBack={actions.goToMenu} highScores={highScores} />;

      case "characterSelect":
        return <CharacterSelect onSelect={actions.startGame} />;

      case "playing":
      case "paused":
        return <GameScreen state={state} actions={actions} />;

      case "transition": {
        const completed = state.currentQuestionIndex;
        const beat = STORY_TRANSITIONS[completed];
        if (!beat) {
          actions.continueTransition();
          return null;
        }
        return <StoryTransition beat={beat} onContinue={actions.continueTransition} />;
      }

      case "finalboss":
        return (
          <FinalBoss
            correctAnswers={state.correctAnswers}
            totalQuestions={state.runQuestions.length}
            gender={state.characterGender ?? "male"}
            stage={state.characterStage}
            onContinue={actions.continueFinalBoss}
          />
        );

      case "results":
        return <ResultsScreen state={state} onPlayAgain={actions.goToCharacterSelect} onMainMenu={actions.goToMenu} />;

      default:
        return null;
    }
  };

  const pendingAchievementId = state.pendingAchievementIds[0];
  const crtIntensity = state.gameStatus === "finalboss" || state.gameStatus === "transition" ? "strong" : "normal";

  return (
    <div className="app-root">
      <div className="small-screen-warning">
        THIS WORKSTATION REQUIRES A LARGER MONITOR.
      </div>
      <div className="app-frame">
        <main>{renderScreen()}</main>
        <SoundToggle />
        {pendingAchievementId ? (
          <AchievementPopup achievementId={pendingAchievementId} onDismiss={actions.dismissAchievement} />
        ) : null}
        <CRTOverlay intensity={crtIntensity} />
      </div>
    </div>
  );
}
