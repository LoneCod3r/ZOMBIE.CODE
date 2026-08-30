import type { CharacterStage, Gender } from "../game/types";
import { characterImageSrc } from "../game/assets";

const STAGE_LABELS: Record<CharacterStage, string> = {
  1: "DEVELOPER",
  2: "HALF-ZOMBIE",
  3: "ZOMBIE",
};

interface ZombieCharacterProps {
  gender: Gender;
  stage: CharacterStage;
}

export default function ZombieCharacter({ gender, stage }: ZombieCharacterProps) {
  return (
    <div className="zombie-character">
      <div className={`zombie-portrait stage-${stage}`}>
        <img
          src={characterImageSrc(gender, stage)}
          alt={`${gender === "male" ? "Male" : "Female"} developer, ${STAGE_LABELS[stage].toLowerCase()} stage`}
        />
      </div>
      <div className="zombie-label">{STAGE_LABELS[stage]}</div>
    </div>
  );
}
