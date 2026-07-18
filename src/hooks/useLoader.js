import { useEffect, useState } from "react";

export default function useLoader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let value = 0;

    const interval = window.setInterval(() => {
      value += Math.floor(Math.random() * 8) + 2;

      if (value >= 100) {
        value = 100;
        window.clearInterval(interval);
      }

      setProgress(value);
    }, 70);

    return () => window.clearInterval(interval);
  }, []);

  const finishLoading = () => {
    setLoading(false);
  };

  return {
    loading,
    progress,
    finishLoading,
  };
}
