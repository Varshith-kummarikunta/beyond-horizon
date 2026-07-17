import { useEffect, useState } from "react";

export default function useLoader(duration = 2200) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 5) + 1;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setTimeout(() => {
          setLoading(false);
        }, 300);
      }

      setProgress(value);
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration]);

  return { loading, progress };
}