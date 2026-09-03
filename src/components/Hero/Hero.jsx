import { memo, useCallback, useLayoutEffect, useRef } from "react";

import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";
import heroMountain from "../../assets/images/hero-mountain.webp";

function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotionPreference.matches) return undefined;

    let isMounted = true;
    let split;
    let context;

    const initHero = () => {
      if (!isMounted) return;

      split = new SplitType(
        headingRef.current?.querySelectorAll(".hero__title-line") ?? [],
        { types: "chars" },
      );
      context = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".hero__eyebrow", { autoAlpha: 0, y: 16, duration: 0.65 })
          .from(
            split.chars,
            { autoAlpha: 0, yPercent: 115, duration: 0.8, stagger: 0.018 },
            "-=0.25",
          )
          .from(
            ".hero__description",
            { autoAlpha: 0, y: 20, duration: 0.65 },
            "-=0.42",
          )
          .from(
            ".hero__actions > *",
            { autoAlpha: 0, y: 14, duration: 0.55, stagger: 0.1 },
            "-=0.35",
          )
          .from(".hero__meta", { autoAlpha: 0, y: 10, duration: 0.5 }, "-=0.25");
      }, heroRef);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(initHero);
    } else {
      initHero();
    }

    return () => {
      isMounted = false;
      context?.revert();
      split?.revert();
    };
  }, []);

  const navigateTo = useCallback(
    (id) => (event) => {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("lenis-scroll-to", { detail: { id } }),
      );
    },
    [],
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero"
      aria-labelledby="hero-title"
    >
      <div
        className="hero__background"
        style={{ backgroundImage: `url(${heroMountain})` }}
        aria-hidden="true"
      />

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">{site.personal.name} · {site.personal.title}</p>
        <h1
          id="hero-title"
          ref={headingRef}
          className="hero__title"
          aria-label={site.hero.titleLines.join(" ")}
        >
          <span className="hero__title-line">{site.hero.titleLines[0]}</span>
          <span className="hero__title-line hero__title-line--accent">
            {site.hero.titleLines[1]}
          </span>
        </h1>
        <p className="hero__description">{site.hero.description}</p>
        <div className="hero__actions">
          <a
            className="hero__button hero__button--primary"
            href={`#${site.hero.primaryAction.target}`}
            onClick={navigateTo(site.hero.primaryAction.target)}
          >
            {site.hero.primaryAction.label}
          </a>
          <a
            className="hero__button hero__button--secondary"
            href={site.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Varshith Kummarikunta's resume in a new tab"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
          <a
            className="hero__button hero__button--secondary"
            href={`#${site.hero.secondaryAction.target}`}
            onClick={navigateTo(site.hero.secondaryAction.target)}
          >
            {site.hero.secondaryAction.label}
          </a>
        </div>
      </div>

      <p className="hero__meta" aria-hidden="true">
        {site.hero.scrollLabel} <span />
      </p>
    </section>
  );
}

export default memo(Hero);
