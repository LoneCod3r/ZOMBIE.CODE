import { useState } from "react";
import type { Gender } from "../game/types";
import { playClick, playHover } from "../game/audio";

interface CharacterSelectProps {
  onSelect: (gender: Gender, playerName: string) => void;
}

const MAX_NAME_LENGTH = 20;

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
  const [name, setName] = useState("");

  const choose = (gender: Gender) => () => {
    playClick();
    onSelect(gender, name);
  };

  return (
    <div className="screen character-select">
      <div className="terminal-titlebar character-select-titlebar">
        <span>NEW HIRE ONBOARDING</span>
      </div>
      <h2 className="character-select-title">CHOOSE YOUR DEVELOPER</h2>

      <label className="character-name-field">
        <span>ENTER YOUR NAME:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={MAX_NAME_LENGTH}
          placeholder="ANONYMOUS DEV"
          autoComplete="off"
          spellCheck={false}
        />
      </label>

      <div className="character-select-options">
        <button
          type="button"
          className="character-option"
          onMouseEnter={playHover}
          onClick={choose("male")}
        >
          <img src="/characters/male-1.png" alt="Male developer" />
          <span>[ MALE ]</span>
        </button>

        <button
          type="button"
          className="character-option"
          onMouseEnter={playHover}
          onClick={choose("female")}
        >
          <img src="/characters/female-1.png" alt="Female developer" />
          <span>[ FEMALE ]</span>
        </button>
      </div>
    </div>
  );
}
