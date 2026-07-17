import gsap from "gsap";

export function loaderAnimation(container, text, progressBar, onComplete) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.fromTo(
      text,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      }
    );

    tl.fromTo(
      progressBar,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      "-=0.5"
    );

    tl.to(container, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.3,
    });

  }, container);

  return () => ctx.revert();
}