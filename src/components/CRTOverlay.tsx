interface CRTOverlayProps {
  intensity?: "normal" | "strong";
}

export default function CRTOverlay({ intensity = "normal" }: CRTOverlayProps) {
  return (
    <div className={`crt-overlay crt-${intensity}`} aria-hidden="true">
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
      <div className="crt-noise" />
      <div className="crt-flicker" />
    </div>
  );
}
