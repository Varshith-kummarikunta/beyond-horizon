import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const split = new SplitType(
      headingRef.current.querySelectorAll(".hero__title-line"),
      { types: "chars" }
    );
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero__eyebrow", { autoAlpha: 0, y: 16, duration: 0.65 })
        .from(
          split.chars,
          { autoAlpha: 0, yPercent: 115, duration: 0.8, stagger: 0.018 },
          "-=0.25"
        )
        .from(
          ".hero__description",
          { autoAlpha: 0, y: 20, duration: 0.65 },
          "-=0.42"
        )
        .from(
          ".hero__actions > *",
          { autoAlpha: 0, y: 14, duration: 0.55, stagger: 0.1 },
          "-=0.35"
        )
        .from(
          ".hero__meta",
          { autoAlpha: 0, y: 10, duration: 0.5 },
          "-=0.25"
        );
    }, heroRef);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  const navigateTo = (id) => (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: { id } }));
  };

  return (
    <section id="home" ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__atmosphere" aria-hidden="true">
        <span className="hero__orb hero__orb--cyan" />
        <span className="hero__orb hero__orb--violet" />
        <span className="hero__halo" />
        <div className="hero__scene-space">
          <span className="hero__scene-ring" />
          <span className="hero__scene-star hero__scene-star--one" />
          <span className="hero__scene-star hero__scene-star--two" />
          <span className="hero__scene-star hero__scene-star--three" />
        </div>
      </div>

      {!reducedMotion && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <div className="hero__content">
        <p className="hero__eyebrow">{site.personal.title}</p>
        <h1 id="hero-title" ref={headingRef} className="hero__title" aria-label={site.hero.titleLines.join(" ")}>
          <span className="hero__title-line">{site.hero.titleLines[0]}</span>
          <span className="hero__title-line hero__title-line--accent">{site.hero.titleLines[1]}</span>
        </h1>
        <p className="hero__description">{site.hero.description}</p>
        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href={`#${site.hero.primaryAction.target}`} onClick={navigateTo(site.hero.primaryAction.target)}>
            {site.hero.primaryAction.label}
          </a>
          <a className="hero__button hero__button--secondary" href={`#${site.hero.secondaryAction.target}`} onClick={navigateTo(site.hero.secondaryAction.target)}>
            {site.hero.secondaryAction.label}
          </a>
        </div>
      </div>

      <p className="hero__meta" aria-hidden="true">{site.hero.scrollLabel} <span /></p>
    </section>
  );
}
