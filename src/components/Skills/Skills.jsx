import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    let isMounted = true;
    let split;
    let context;

    const initSkills = () => {
      if (!isMounted) return;

      split = new SplitType(
        headingRef.current.querySelectorAll(".skills__title-line"),
        { types: "chars" }
      );
      context = gsap.context(() => {
        gsap
          .timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
          })
          .from(".skills__eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
          .from(
            split.chars,
            { autoAlpha: 0, yPercent: 110, duration: 0.7, stagger: 0.014 },
            "-=0.2"
          )
          .from(
            ".skills__description",
            { autoAlpha: 0, y: 18, duration: 0.6 },
            "-=0.35"
          )
          .from(
            ".skills__card",
            { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.12 },
            "-=0.25"
          )
          .from(
            ".skills__chip",
            { autoAlpha: 0, y: 10, duration: 0.35, stagger: 0.035 },
            "-=0.32"
          );
      }, sectionRef);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(initSkills);
    } else {
      initSkills();
    }

    return () => {
      isMounted = false;
      context?.revert();
      split?.revert();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills" aria-labelledby="skills-title">
      <div className="skills__atmosphere" aria-hidden="true">
        <span className="skills__orb" />
        <span className="skills__line" />
      </div>

      <header className="skills__intro">
        <p className="skills__eyebrow">{site.skills.eyebrow}</p>
        <h2 id="skills-title" ref={headingRef} className="skills__title" aria-label={site.skills.titleLines.join(" ")}>
          <span className="skills__title-line">{site.skills.titleLines[0]}</span>
          <span className="skills__title-line skills__title-line--accent">{site.skills.titleLines[1]}</span>
        </h2>
        <p className="skills__description">{site.skills.description}</p>
      </header>

      <div className="skills__grid">
        {site.skills.categories.map(({ title, technologies }) => (
          <article key={title} className="skills__card">
            <h3>{title}</h3>
            <ul className="skills__chips">
              {technologies.map((technology) => (
                <li key={technology} className="skills__chip">{technology}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
