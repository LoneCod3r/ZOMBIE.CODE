import { loadMutedPreference, saveMutedPreference } from "./storage";

type ToneOptions = {
  frequency: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  slideTo?: number;
};

let ctx: AudioContext | null = null;
let muted = loadMutedPreference();
const muteListeners = new Set<(muted: boolean) => void>();

export function isMuted(): boolean {
  return muted;
}

export function setMuted(next: boolean): void {
  muted = next;
  saveMutedPreference(muted);
  muteListeners.forEach((listener) => listener(muted));
}

export function toggleMuted(): boolean {
  setMuted(!muted);
  return muted;
}

export function onMuteChange(listener: (muted: boolean) => void): () => void {
  muteListeners.add(listener);
  return () => muteListeners.delete(listener);
}

function getContext(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    return ctx;
  } catch {
    return null;
  }
}

function playTone({ frequency, duration, type = "square", gain = 0.05, slideTo }: ToneOptions): void {
  if (muted) return;
  try {
    const audioCtx = getContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    if (slideTo) {
      osc.frequency.linearRampToValueAtTime(slideTo, audioCtx.currentTime + duration);
    }

    gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Audio is best-effort; silently ignore failures.
  }
}

export function playHover(): void {
  playTone({ frequency: 220, duration: 0.05, type: "square", gain: 0.02 });
}

export function playClick(): void {
  playTone({ frequency: 440, duration: 0.08, type: "square", gain: 0.04 });
}

export function playCorrect(): void {
  playTone({ frequency: 523, duration: 0.12, type: "square", gain: 0.05, slideTo: 784 });
}

export function playWrong(): void {
  playTone({ frequency: 180, duration: 0.3, type: "sawtooth", gain: 0.05, slideTo: 80 });
}

export function playTimerWarning(): void {
  playTone({ frequency: 660, duration: 0.08, type: "square", gain: 0.04 });
}

export function playTransform(): void {
  playTone({ frequency: 100, duration: 0.6, type: "sawtooth", gain: 0.06, slideTo: 40 });
}

export function playTransition(): void {
  playTone({ frequency: 300, duration: 0.4, type: "triangle", gain: 0.04, slideTo: 150 });
}

export function playBoss(): void {
  playTone({ frequency: 60, duration: 0.9, type: "sawtooth", gain: 0.08, slideTo: 30 });
}

export function playVictory(): void {
  playTone({ frequency: 440, duration: 0.15, type: "square", gain: 0.05, slideTo: 880 });
}
