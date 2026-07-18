import { gsap } from "./gsap";
import SplitType from "split-type";

export function animateLoader(onComplete) {
  const loader = document.querySelector("#loader");
  const title = document.querySelector("#loader-title");
  const bar = document.querySelector("#loader-bar");
  const percent = document.querySelector("#loader-percent");

  if (!loader || !title) return;

  const split = new SplitType(title, {
    types: "chars",
  });

  gsap.set(split.chars, {
    y: 110,
    opacity: 0,
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  tl.to(split.chars, {
    y: 0,
    opacity: 1,
    stagger: 0.04,
    duration: 0.7,
  });

  tl.to(
    bar,
    {
      width: "100%",
      duration: 1,
    },
    0
  );

  tl.to(
    percent,
    {
      opacity: 1,
      y: -6,
      duration: 0.4,
    },
    0.2
  );

  tl.to(loader, {
    opacity: 0,
    duration: 0.7,
    delay: 0.3,
    onComplete: () => {
      split.revert();
      onComplete?.();
    },
  });

  return tl;
}