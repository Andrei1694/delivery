import { useState, useRef } from 'react';

export function useToast(duration = 3000) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    setVisible(true);
    setFading(false);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setFading(true);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, 300);
    }, duration - 300);
  }

  return { visible, fading, show };
}
