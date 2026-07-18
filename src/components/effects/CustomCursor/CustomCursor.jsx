import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const interactiveSelector = [
  "a",
  "button",
  "input:not([type='hidden'])",
  "select",
  "textarea",
  "summary",
  "[role='button']",
  "[data-cursor-interactive]",
].join(",");

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let frameId;
    let isRunning = false;
    let hasPointer = false;
    let targetX = 0;
    let targetY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    const setInteractive = (element) => {
      cursor.classList.toggle("custom-cursor--interactive", Boolean(element));
    };

    const onPointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPointer) {
        dotX = ringX = targetX;
        dotY = ringY = targetY;
        hasPointer = true;
        cursor.classList.add("custom-cursor--visible");
      }
    };

    const onPointerEnter = () => cursor.classList.add("custom-cursor--visible");
    const onPointerLeave = () => cursor.classList.remove("custom-cursor--visible");
    const onPointerOver = (event) => setInteractive(event.target.closest(interactiveSelector));
    const onPointerOut = (event) => {
      const element = event.target.closest(interactiveSelector);
      if (element && !element.contains(event.relatedTarget)) setInteractive(null);
    };

    const animate = () => {
      // Keep the dot responsive while letting the ring visibly lag behind it.
      dotX = gsap.utils.interpolate(dotX, targetX, 0.45);
      dotY = gsap.utils.interpolate(dotY, targetY, 0.45);
      ringX = gsap.utils.interpolate(ringX, dotX, 0.14);
      ringY = gsap.utils.interpolate(ringY, dotY, 0.14);

      setDotX(dotX);
      setDotY(dotY);
      setRingX(ringX);
      setRingY(ringY);
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (isRunning || !hoverCapable.matches || reducedMotion.matches) return;

      isRunning = true;
      document.documentElement.classList.add("custom-cursor-active");
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerenter", onPointerEnter);
      document.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("pointerover", onPointerOver);
      document.addEventListener("pointerout", onPointerOut);
      frameId = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (!isRunning) return;

      isRunning = false;
      cancelAnimationFrame(frameId);
      document.documentElement.classList.remove("custom-cursor-active");
      cursor.classList.remove("custom-cursor--visible", "custom-cursor--interactive");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerenter", onPointerEnter);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };

    const syncAvailability = () => {
      if (hoverCapable.matches && !reducedMotion.matches) start();
      else stop();
    };

    syncAvailability();
    hoverCapable.addEventListener("change", syncAvailability);
    reducedMotion.addEventListener("change", syncAvailability);

    return () => {
      hoverCapable.removeEventListener("change", syncAvailability);
      reducedMotion.removeEventListener("change", syncAvailability);
      stop();
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span ref={dotRef} className="custom-cursor__dot" />
      <span ref={ringRef} className="custom-cursor__ring" />
    </div>
  );
}
