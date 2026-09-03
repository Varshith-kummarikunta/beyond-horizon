import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

const GalleryViewer = lazy(() => import("../GalleryViewer/GalleryViewer"));

function Travel() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const viewerItems = useMemo(
    () =>
      site.travel.map(({ location, subtitle, imagePath }) => ({
        src: imagePath,
        alt: `${location} travel photograph`,
        title: location,
        category: "Travel",
        description: subtitle,
      })),
    []
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

    let split;
    let context;

    const frameId = window.requestAnimationFrame(() => {
      split = new SplitType(headingRef.current?.querySelectorAll(".travel__title-line") ?? [], { types: "chars" });
      context = gsap.context(() => {
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
            yPercent: index % 2 === 0 ? -2 : 2,
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
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      context?.revert();
      split?.revert();
    };
  }, []);

  return (
    <section id="travel" ref={sectionRef} className="travel" aria-labelledby="travel-title">
      <div className="travel__atmosphere" aria-hidden="true"><span /></div>
      <header className="travel__intro">
        <p className="travel__eyebrow">{site.travelIntro.eyebrow}</p>
        <h2 id="travel-title" ref={headingRef} className="travel__title" aria-label={site.travelIntro.titleLines.join(" ")}>
          <span className="travel__title-line">{site.travelIntro.titleLines[0]}</span>
          <span className="travel__title-line travel__title-line--accent">{site.travelIntro.titleLines[1]}</span>
        </h2>
        <p className="travel__description">{site.travelIntro.description}</p>
      </header>

      <div className="travel__gallery">
        {site.travel.map(({ location, subtitle, imagePath, variant }, index) => (
          <button
            key={location}
            type="button"
            className={`travel__card travel__card--${variant}`}
            onClick={() => openViewer(index)}
            aria-label={`Open ${location} gallery image`}
          >
            <div className="travel__media">
              <img
                className="travel__image"
                src={imagePath}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className="travel__terrain" aria-hidden="true" />
              <span className="travel__shade" aria-hidden="true" />
            </div>
            <div className="travel__caption">
              <h3>{location}</h3>
              <p>{subtitle}</p>
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
            label="Travel gallery viewer"
          />
        </Suspense>
      )}
    </section>
  );
}

export default memo(Travel);
