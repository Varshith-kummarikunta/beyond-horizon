import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

const GalleryViewer = lazy(() => import("../GalleryViewer/GalleryViewer"));

function ArtGallery() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const { artGallery } = site;

  const viewerItems = useMemo(
    () =>
      artGallery.images.map(({ src, title, category, year, description, alt }) => ({
        src,
        alt: alt || title,
        title,
        category,
        year,
        description,
      })),
    [artGallery.images]
  );

  const openViewer = useCallback((index) => setActiveIndex(index), []);
  const closeViewer = useCallback(() => setActiveIndex(null), []);
  const onPrevious = useCallback(() => {
    setActiveIndex((current) => (current === null ? 0 : current === 0 ? viewerItems.length - 1 : current - 1));
  }, [viewerItems.length]);
  const onNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? 0 : current === viewerItems.length - 1 ? 0 : current + 1));
  }, [viewerItems.length]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      const split = new SplitType(headingRef.current?.querySelectorAll(".art-gallery__title-line") ?? [], { types: "chars" });
      const context = gsap.context(() => {
        gsap
          .timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
          })
          .from(".art-gallery__eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
          .from(split.chars, { autoAlpha: 0, yPercent: 110, duration: 0.7, stagger: 0.014 }, "-=0.2")
          .from(".art-gallery__description", { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.35")
          .from(".art-gallery__card, .art-gallery__empty", { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.1 }, "-=0.28");
      }, sectionRef);

      return () => {
        context.revert();
        split.revert();
      };
    });

    return () => window.cancelAnimationFrame(frameId);
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
        {artGallery.images.length === 0 ? (
          <p className="art-gallery__empty">{artGallery.emptyMessage}</p>
        ) : artGallery.images.map(({ src, title, category, year, description, alt }, index) => (
          <button
            key={src}
            type="button"
            className="art-gallery__card"
            onClick={() => openViewer(index)}
            aria-label={`Open ${title} in gallery`}
          >
            <img className="art-gallery__image" src={src} alt={alt || title} loading="lazy" decoding="async" />
            <div className="art-gallery__glow" aria-hidden="true" />
            <div className="art-gallery__meta">
              <strong>{title}</strong>
              {(category || year) && <span>{[category, year].filter(Boolean).join(" · ")}</span>}
              {description && <p>{description}</p>}
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Suspense fallback={null}>
          <GalleryViewer
            items={viewerItems}
            index={activeIndex}
            onClose={closeViewer}
            onPrevious={onPrevious}
            onNext={onNext}
            label="Art gallery viewer"
          />
        </Suspense>
      )}
    </section>
  );
}

export default memo(ArtGallery);
