import { useEffect, useState } from "react";
import { isMuted, onMuteChange, toggleMuted } from "../game/audio";

export default function SoundToggle() {
  const [muted, setMutedState] = useState(isMuted());

  useEffect(() => onMuteChange(setMutedState), []);

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={() => toggleMuted()}
      aria-pressed={muted}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      title={muted ? "SOUND: OFF" : "SOUND: ON"}
    >
      {muted ? "[ SOUND: OFF ]" : "[ SOUND: ON ]"}
    </button>
  );
}
