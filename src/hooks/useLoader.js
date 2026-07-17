import { useEffect, useState } from "react";
import { animateLoader } from "../animations/loader";

export default function useLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
      }
    }, 20);

    const tl = animateLoader(() => {
      setLoading(false);
    });

    return () => {
      clearInterval(timer);
      tl?.kill();
    };
  }, []);

  return {
    loading,
    progress,
  };
}