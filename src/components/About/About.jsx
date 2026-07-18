import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const split = new SplitType(
      headingRef.current.querySelectorAll(".about__title-line"),
      { types: "chars" }
    );
    const context = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 72%",
        toggleActions: "play none none reverse",
      };

      gsap
        .timeline({ defaults: { ease: "power4.out" }, scrollTrigger: trigger })
        .from(".about__eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
        .from(
          split.chars,
          { autoAlpha: 0, yPercent: 110, stagger: 0.014, duration: 0.7 },
          "-=0.18"
        )
        .from(
          ".about__description",
          { autoAlpha: 0, y: 22, duration: 0.6 },
          "-=0.35"
        )
        .from(
          ".about__stat-card",
          { autoAlpha: 0, y: 28, duration: 0.55, stagger: 0.12 },
          "-=0.4"
        );

      gsap.to(".about__atmosphere", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    }, sectionRef);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about" aria-labelledby="about-title">
      <div className="about__atmosphere" aria-hidden="true">
        <span className="about__glow about__glow--one" />
        <span className="about__glow about__glow--two" />
        <span className="about__grid" />
        <span className="about__particle about__particle--one" />
        <span className="about__particle about__particle--two" />
        <span className="about__particle about__particle--three" />
      </div>

      <div className="about__content">
        <div className="about__copy">
          <p className="about__eyebrow">{site.about.eyebrow}</p>
          <h2 id="about-title" ref={headingRef} className="about__title" aria-label={site.about.titleLines.join(" ")}>
            <span className="about__title-line">{site.about.titleLines[0]}</span>
            <span className="about__title-line about__title-line--accent">{site.about.titleLines[1]}</span>
          </h2>
          <p className="about__description">{site.personal.bio}</p>
        </div>

        <div className="about__statistics" aria-label="Experience statistics">
          {site.about.statistics.map(({ value, label }, index) => (
            <article
              key={label}
              className={`about__stat-card about__stat-card--${index + 1}`}
            >
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
