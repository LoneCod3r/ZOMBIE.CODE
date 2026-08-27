import type { ReactNode } from "react";

interface GlitchEffectProps {
  active: boolean;
  children: ReactNode;
  className?: string;
}

export default function GlitchEffect({ active, children, className = "" }: GlitchEffectProps) {
  return <div className={`${className} ${active ? "glitching" : ""}`.trim()}>{children}</div>;
}
