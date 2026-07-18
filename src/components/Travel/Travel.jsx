import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";

const destinations = [
  ["Kedarkantha Trek", "Snow mountains", "large"],
  ["Rishikesh", "Adventure & Ganga", "portrait"],
  ["Agra", "Timeless architecture", "portrait"],
  ["Delhi", "City exploration", "wide"],
  ["Hyderabad", "Home", "small"],
  ["Future Adventures", "Coming soon", "future"],
];

export default function Travel() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const split = new SplitType(
      headingRef.current.querySelectorAll(".travel__title-line"),
      { types: "chars" }
    );
    const context = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        })
        .from(".travel__eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
        .from(split.chars, { autoAlpha: 0, yPercent: 110, duration: 0.7, stagger: 0.014 }, "-=0.2")
        .from(".travel__description", { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.35")
        .from(".travel__card", { autoAlpha: 0, y: 28, duration: 0.65, stagger: 0.1 }, "-=0.2");

      gsap.utils.toArray(".travel__image").forEach((image, index) => {
        gsap.to(image, {
          yPercent: index % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".travel__card"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    }, sectionRef);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return (
    <section id="travel" ref={sectionRef} className="travel" aria-labelledby="travel-title">
      <div className="travel__atmosphere" aria-hidden="true"><span /></div>
      <header className="travel__intro">
        <p className="travel__eyebrow">Travel</p>
        <h2 id="travel-title" ref={headingRef} className="travel__title" aria-label="Every destination changed my perspective.">
          <span className="travel__title-line">Every destination</span>
          <span className="travel__title-line travel__title-line--accent">changed my perspective.</span>
        </h2>
        <p className="travel__description">
          Travel inspires the way I design and build digital experiences. Every journey teaches
          simplicity, balance, storytelling, and curiosity.
        </p>
      </header>

      <div className="travel__gallery">
        {destinations.map(([location, subtitle, variant]) => (
          <article key={location} className={`travel__card travel__card--${variant}`}>
            <div className="travel__media" aria-hidden="true">
              <span className="travel__image" />
              <span className="travel__terrain" />
              <span className="travel__shade" />
            </div>
            <div className="travel__caption">
              <h3>{location}</h3>
              <p>{subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
