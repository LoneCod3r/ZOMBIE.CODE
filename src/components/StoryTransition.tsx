import { useEffect } from "react";
import type { StoryBeat } from "../story/transitions";
import { playTransition } from "../game/audio";

interface StoryTransitionProps {
  beat: StoryBeat;
  onContinue: () => void;
}

export default function StoryTransition({ beat, onContinue }: StoryTransitionProps) {
  useEffect(() => {
    playTransition();
  }, [beat]);

  return (
    <div className="screen story-transition">
      <div className="story-heading">{beat.heading}</div>
      <div className="story-lines">
        {beat.lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <button type="button" className="menu-button" onClick={onContinue}>
        [ CONTINUE ]
      </button>
    </div>
  );
}
