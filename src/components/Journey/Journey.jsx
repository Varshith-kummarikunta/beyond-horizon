import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

export default function Journey() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".journey__item");

      gsap.from(".journey__intro > *", {
        autoAlpha: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".journey__timeline",
            start: "top 72%",
            end: "bottom 68%",
            scrub: 0.7,
          },
        }
      );

      gsap.from(cards, {
        autoAlpha: 0,
        x: (index) => (index % 2 === 0 ? -44 : 44),
        y: 18,
        duration: 0.72,
        stagger: 0.16,
        ease: "power4.out",
        scrollTrigger: { trigger: ".journey__timeline", start: "top 68%" },
      });

      cards.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            end: "bottom 42%",
            toggleClass: "journey__item--active",
          },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="journey" aria-labelledby="journey-title">
      <div className="journey__atmosphere" aria-hidden="true">
        <span className="journey__glow" />
        <span className="journey__beam" />
      </div>

      <header className="journey__intro">
        <p className="journey__eyebrow">{site.journey.eyebrow}</p>
        <h2 id="journey-title">{site.journey.titleLines[0]}<br />{site.journey.titleLines[1]}</h2>
      </header>

      <div className="journey__timeline">
        <span ref={lineRef} className="journey__line" aria-hidden="true" />
        <ol className="journey__list">
          {site.timeline.map(({ year, description }, index) => (
            <li key={year} className={`journey__item journey__item--${index % 2 === 0 ? "left" : "right"}`}>
              <article className="journey__card">
                <time dateTime={year} className="journey__year">{year}</time>
                <p>{description}</p>
              </article>
              <span className="journey__marker" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
