import { useEffect, useState } from "react";

const BOOT_LINES = [
  "INITIALIZING WORKSTATION.......... OK",
  "LOADING NIGHT SHIFT PROTOCOL...... OK",
  "CHECKING COFFEE RESERVES.......... CRITICAL",
  "SCANNING FOR PRODUCTION ISSUES.... 30 FOUND",
  "DISABLING PANIC RESPONSE.......... OK",
  "CONNECTING TO OFFICE MAINFRAME.... OK",
  "WARNING: NO ONE IS COMING TO HELP YOU",
  "BOOT SEQUENCE COMPLETE.",
];

const LINE_DELAY_MS = 350;

interface BootScreenProps {
  onContinue: () => void;
}

export default function BootScreen({ onContinue }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const done = visibleLines >= BOOT_LINES.length;

  useEffect(() => {
    if (done) return;
    const timeout = window.setTimeout(() => setVisibleLines((n) => n + 1), LINE_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [visibleLines, done]);

  // Any interaction skips straight through - nobody should be stuck waiting
  // on a fake boot log.
  useEffect(() => {
    const skip = () => onContinue();
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [onContinue]);

  return (
    <div className="screen boot-screen">
      <div className="boot-log">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <p key={i} className="boot-line">
            {line}
          </p>
        ))}
      </div>
      {done ? <p className="boot-prompt">PRESS ANY KEY OR CLICK TO CONTINUE</p> : null}
    </div>
  );
}
