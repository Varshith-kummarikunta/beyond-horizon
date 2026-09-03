import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./animations/gsap";
import CustomCursor from "./components/effects/CustomCursor/CustomCursor";
import MouseGlow from "./components/effects/MouseGlow/MouseGlow";
import ScrollProgress from "./components/effects/ScrollProgress/ScrollProgress";
import Home from "./pages/Home";

export default function App() {
  const progressFillRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    let tickerFn;
    let displayedProgress = 0;

    const scrollToSection = (event) => {
      const target = document.getElementById(event.detail.id);
      if (!target) return;

      if (lenis) lenis.scrollTo(target, { offset: -96 });
      else target.scrollIntoView({ behavior: "auto", block: "start" });
    };

    const syncNavigation = () => {
      document.documentElement.classList.toggle(
        "has-scrolled",
        lenis ? lenis.scroll > 24 : window.scrollY > 24
      );

      if (!lenis && progressFillRef.current) {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          maxScroll > 0
            ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
            : 0;

        progressFillRef.current.style.transform = `scaleX(${progress})`;
        progressFillRef.current.classList.toggle(
          "scroll-progress__fill--visible",
          progress > 0
        );
      }
    };

    const stopLenis = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = undefined;
      }

      lenis?.destroy();
      lenis = undefined;
      syncNavigation();
    };

    const startLenis = () => {
      if (reducedMotion.matches || lenis) return;

      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time) => {
        lenis.raf(time * 1000);

        const progress = lenis.progress ?? 0;
        displayedProgress += (progress - displayedProgress) * 0.14;

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${displayedProgress})`;
          progressFillRef.current.classList.toggle(
            "scroll-progress__fill--visible",
            progress > 0
          );
        }
        syncNavigation();
      };

      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) stopLenis();
      else startLenis();
    };

    startLenis();
    window.addEventListener("lenis-scroll-to", scrollToSection);
    window.addEventListener("scroll", syncNavigation, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("lenis-scroll-to", scrollToSection);
      window.removeEventListener("scroll", syncNavigation);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      stopLenis();
      document.documentElement.classList.remove("has-scrolled");
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
