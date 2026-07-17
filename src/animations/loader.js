import { gsap } from "./gsap";
import SplitType from "split-type";

export function animateLoader(onComplete) {
  const loader = document.querySelector("#loader");
  const title = document.querySelector("#loader-title");
  const bar = document.querySelector("#loader-bar");
  const percent = document.querySelector("#loader-percent");

  if (!loader || !title || !bar || !percent) return;

  const split = new SplitType(title, {
    types: "chars",
  });

  gsap.set(split.chars, {
    yPercent: 120,
    opacity: 0,
  });

  gsap.set(loader, {
    opacity: 1,
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  tl.to(split.chars, {
    yPercent: 0,
    opacity: 1,
    stagger: 0.04,
    duration: 0.9,
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

  tl.to(
    percent,
    {
      opacity: 1,
      y: -8,
      duration: 0.4,
    },
    0.3
  );

  tl.to(loader, {
    opacity: 0,
    scale: 1.05,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      split.revert();
      onComplete?.();
    },
  });

  return tl;
}