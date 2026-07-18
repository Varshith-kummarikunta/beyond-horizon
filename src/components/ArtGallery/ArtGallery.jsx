import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

export default function ArtGallery() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const { artGallery } = site;

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const split = new SplitType(
      headingRef.current.querySelectorAll(".art-gallery__title-line"),
      { types: "chars" }
    );
    const context = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        })
        .from(".art-gallery__eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
        .from(split.chars, { autoAlpha: 0, yPercent: 110, duration: 0.7, stagger: 0.014 }, "-=0.2")
        .from(".art-gallery__description", { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.35")
        .from(".art-gallery__card", { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.1 }, "-=0.28");
    }, sectionRef);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return (
    <section id="art" ref={sectionRef} className="art-gallery" aria-labelledby="art-title">
      <div className="art-gallery__atmosphere" aria-hidden="true"><span /></div>
      <header className="art-gallery__intro">
        <p className="art-gallery__eyebrow">{artGallery.eyebrow}</p>
        <h2 id="art-title" ref={headingRef} className="art-gallery__title" aria-label={artGallery.titleLines.join(" ")}>
          <span className="art-gallery__title-line">{artGallery.titleLines[0]}</span>
          <span className="art-gallery__title-line art-gallery__title-line--accent">{artGallery.titleLines[1]}</span>
        </h2>
        <p className="art-gallery__description">{artGallery.description}</p>
      </header>

      <div className="art-gallery__grid">
        {artGallery.images.map(({ src, title, category, year, description, alt }) => (
          <figure key={src} className="art-gallery__card">
            <img className="art-gallery__image" src={src} alt={alt || title} loading="lazy" decoding="async" />
            <div className="art-gallery__glow" aria-hidden="true" />
            <figcaption>
              <strong>{title}</strong>
              {(category || year) && <span>{[category, year].filter(Boolean).join(" \u00B7 ")}</span>}
              {description && <p>{description}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
