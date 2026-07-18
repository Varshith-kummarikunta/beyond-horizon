import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";

const categories = [
  ["Frontend", ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"]],
  ["Backend", ["Node.js", "Express.js", "MongoDB", "REST APIs"]],
  ["Tools", ["Git", "GitHub", "VS Code", "Vite", "GSAP", "Figma"]],
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const split = new SplitType(
      headingRef.current.querySelectorAll(".skills__title-line"),
      { types: "chars" }
    );
    const context = gsap.context(() => {
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

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills" aria-labelledby="skills-title">
      <div className="skills__atmosphere" aria-hidden="true">
        <span className="skills__orb" />
        <span className="skills__line" />
      </div>

      <header className="skills__intro">
        <p className="skills__eyebrow">Skills</p>
        <h2 id="skills-title" ref={headingRef} className="skills__title" aria-label="Technologies I work with.">
          <span className="skills__title-line">Technologies</span>
          <span className="skills__title-line skills__title-line--accent">I work with.</span>
        </h2>
        <p className="skills__description">
          I build scalable, performant web applications using modern frontend and backend
          technologies while focusing on clean architecture and exceptional user experience.
        </p>
      </header>

      <div className="skills__grid">
        {categories.map(([title, technologies]) => (
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
