import { useEffect } from "react";
import { getAchievement } from "../game/achievements";

interface AchievementPopupProps {
  achievementId: string;
  onDismiss: () => void;
}

export default function AchievementPopup({ achievementId, onDismiss }: AchievementPopupProps) {
  const achievement = getAchievement(achievementId);

  useEffect(() => {
    const timeout = window.setTimeout(onDismiss, 3500);
    return () => window.clearTimeout(timeout);
  }, [achievementId, onDismiss]);

  if (!achievement) return null;

  return (
    <div className="achievement-popup" role="status" onClick={onDismiss}>
      <div className="achievement-popup-label">ACHIEVEMENT UNLOCKED</div>
      <div className="achievement-popup-title">{achievement.title}</div>
      <div className="achievement-popup-desc">{achievement.description}</div>
    </div>
  );
}
