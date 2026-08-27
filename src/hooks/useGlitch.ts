import { useCallback, useEffect, useRef, useState } from "react";

export function useGlitch(defaultDuration = 400): [boolean, (duration?: number) => void] {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const trigger = useCallback(
    (duration = defaultDuration) => {
      setActive(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setActive(false), duration);
    },
    [defaultDuration]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [active, trigger];
}
