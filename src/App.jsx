import { useEffect } from "react";
import Lenis from "lenis";
import CustomCursor from "./components/effects/CustomCursor/CustomCursor";
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    let rafId;

    const stopLenis = () => {
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }

      lenis?.destroy();
      lenis = undefined;
    };

    const startLenis = () => {
      if (reducedMotion.matches || lenis) return;

      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) stopLenis();
      else startLenis();
    };

    startLenis();
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      reducedMotion.removeEventListener("change", handleMotionPreference);
      stopLenis();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Home />
    </>
  );
}
