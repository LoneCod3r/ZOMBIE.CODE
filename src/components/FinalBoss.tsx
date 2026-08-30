import { useEffect } from "react";
import type { CharacterStage, Gender } from "../game/types";
import { playBoss } from "../game/audio";
import { characterImageSrc } from "../game/assets";

interface FinalBossProps {
  correctAnswers: number;
  totalQuestions: number;
  gender: Gender;
  stage: CharacterStage;
  onContinue: () => void;
}

export default function FinalBoss({ correctAnswers, totalQuestions, gender, stage, onContinue }: FinalBossProps) {
  useEffect(() => {
    playBoss();
  }, []);

  const shipped = correctAnswers >= Math.ceil(totalQuestions * 0.66);

  return (
    <div className="screen final-boss">
      <div className="boss-header">FINAL INCIDENT</div>
      <h1 className="boss-title">PRODUCTION</h1>
      <div className="boss-portrait">
        <img
          src={characterImageSrc(gender, stage)}
          alt={`${gender === "male" ? "Male" : "Female"} developer, final state`}
        />
      </div>
      <p className="boss-line">YOU HAVE COMPLETED THE ENTIRE CODEBASE.</p>
      <p className="boss-line">YOU ARE NO LONGER HUMAN.</p>
      <p className="boss-line boss-emphasis">YOU ARE NOW:</p>
      <p className="boss-line boss-rank">THE UNDEAD DEVELOPER</p>
      <p className="boss-line boss-verdict">
        {shipped ? "YOU SHIPPED IT." : "PRODUCTION SURVIVED.\nSOMEHOW."}
      </p>
      <button type="button" className="menu-button" onClick={onContinue}>
        [ CONTINUE ]
      </button>
    </div>
  );
}
