import { useEffect, useRef } from "react";

const EASING = 0.1;

export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const glow = glowRef.current;
    let frameId;
    let running = false;
    let hasPointer = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const moveGlow = (x, y) => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onPointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPointer) {
        currentX = targetX;
        currentY = targetY;
        hasPointer = true;
        moveGlow(currentX, currentY);
        glow.classList.add("mouse-glow--visible");
      }
    };

    const onPointerLeave = () => glow.classList.remove("mouse-glow--visible");
    const onPointerEnter = () => {
      if (hasPointer) glow.classList.add("mouse-glow--visible");
    };

    const animate = () => {
      currentX += (targetX - currentX) * EASING;
      currentY += (targetY - currentY) * EASING;
      moveGlow(currentX, currentY);
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running || !hoverCapable.matches || reducedMotion.matches) return;

      running = true;
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("pointerenter", onPointerEnter);
      frameId = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (!running) return;

      running = false;
      cancelAnimationFrame(frameId);
      glow.classList.remove("mouse-glow--visible");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
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

  return <div ref={glowRef} className="mouse-glow" aria-hidden="true" />;
}
