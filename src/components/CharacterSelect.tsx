import { useState } from "react";
import type { Gender } from "../game/types";
import { playClick, playHover } from "../game/audio";
import { characterImageSrc } from "../game/assets";

interface CharacterSelectProps {
  onSelect: (gender: Gender, playerName: string) => void;
}

const MAX_NAME_LENGTH = 20;

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
  const [name, setName] = useState("");
  const isNameValid = name.trim().length > 0;

  const choose = (gender: Gender) => () => {
    if (!isNameValid) return;
    playClick();
    onSelect(gender, name);
  };

  return (
    <div className="screen character-select">
      <div className="terminal-titlebar character-select-titlebar">
        <span>NEW HIRE ONBOARDING</span>
      </div>
      <h1 className="character-select-title">CHOOSE YOUR DEVELOPER</h1>

      <label className="character-name-field">
        <span>ENTER YOUR NAME:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={MAX_NAME_LENGTH}
          placeholder="REQUIRED"
          autoComplete="off"
          spellCheck={false}
          required
        />
        {!isNameValid && <span className="character-name-hint">Name required to continue</span>}
      </label>

      <div className="character-select-options">
        <button
          type="button"
          className="character-option"
          onMouseEnter={playHover}
          onClick={choose("male")}
          disabled={!isNameValid}
          aria-disabled={!isNameValid}
        >
          <img src={characterImageSrc("male", 1)} alt="Male developer" />
          <span>[ MALE ]</span>
        </button>

        <button
          type="button"
          className="character-option"
          onMouseEnter={playHover}
          onClick={choose("female")}
          disabled={!isNameValid}
          aria-disabled={!isNameValid}
        >
          <img src={characterImageSrc("female", 1)} alt="Female developer" />
          <span>[ FEMALE ]</span>
        </button>
      </div>
    </div>
  );
}
