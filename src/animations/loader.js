import { gsap } from "./gsap";
import SplitType from "split-type";

export function animateLoader(onComplete) {
  const title = document.querySelector("#loader-title");
  const bar = document.querySelector("#loader-bar");
  const loader = document.querySelector("#loader");

  if (!title || !bar || !loader) return;

  const split = new SplitType(title, {
    types: "chars",
  });

  gsap.set(split.chars, {
    y: 120,
    opacity: 0,
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  tl.to(split.chars, {
    y: 0,
    opacity: 1,
    stagger: 0.03,
    duration: 0.8,
  });

  tl.to(
    bar,
    {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    },
    0.2
  );

  tl.to(loader, {
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    onComplete: () => {
      split.revert();
      onComplete?.();
    },
  });

  return tl;
}