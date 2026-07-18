import { useEffect, useRef } from "react";
import Lenis from "lenis";
import CustomCursor from "./components/effects/CustomCursor/CustomCursor";
import MouseGlow from "./components/effects/MouseGlow/MouseGlow";
import ScrollProgress from "./components/effects/ScrollProgress/ScrollProgress";
import Home from "./pages/Home";

export default function App() {
  const progressFillRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    let rafId;
    let displayedProgress = 0;

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

        const progress = lenis.progress;
        displayedProgress += (progress - displayedProgress) * 0.14;
        progressFillRef.current.style.transform = `scaleX(${displayedProgress})`;
        progressFillRef.current.classList.toggle("scroll-progress__fill--visible", progress > 0);

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
      <MouseGlow />
      <ScrollProgress fillRef={progressFillRef} />
      <CustomCursor />
      <Home />
    </>
  );
}
