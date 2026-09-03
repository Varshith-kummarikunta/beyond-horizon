import { memo, useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return undefined;

    let isMounted = true;
    let split;
    let context;
    let frameId;

    const initProjects = () => {
      if (!isMounted) return;

      frameId = window.requestAnimationFrame(() => {
        if (!isMounted) return;

        split = new SplitType(
          headingRef.current?.querySelectorAll(".projects__title-line") ?? [],
          {
            types: "words, chars",
          }
        );

        context = gsap.context(() => {
          gsap
            .timeline({
              defaults: { ease: "power4.out" },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%",
              },
            })
            .from(".projects__eyebrow", {
              autoAlpha: 0,
              y: 16,
              duration: 0.55,
            })
            .from(
              split.chars,
              {
                autoAlpha: 0,
                yPercent: 110,
                duration: 0.7,
                stagger: 0.014,
              },
              "-=0.2"
            )
            .from(
              ".projects__description",
              {
                autoAlpha: 0,
                y: 18,
                duration: 0.6,
              },
              "-=0.35"
            );

          gsap.utils.toArray(".projects__card").forEach((card, index) => {
            gsap.from(card, {
              autoAlpha: 0,
              x: index % 2 === 0 ? -48 : 48,
              y: 18,
              duration: 0.75,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
              },
            });
          });
        }, sectionRef);
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(initProjects);
    } else {
      initProjects();
    }

    return () => {
      isMounted = false;
      if (frameId) window.cancelAnimationFrame(frameId);
      context?.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects"
      aria-labelledby="projects-title"
    >
      <div className="projects__atmosphere" aria-hidden="true">
        <span />
      </div>
      <header className="projects__intro">
        <p className="projects__eyebrow">{site.projectsIntro.eyebrow}</p>
        <h2
          id="projects-title"
          ref={headingRef}
          className="projects__title"
          aria-label={site.projectsIntro.titleLines.join(" ")}
        >
          <span className="projects__title-line">
            {site.projectsIntro.titleLines[0]}
          </span>
          <span className="projects__title-line projects__title-line--accent">
            {site.projectsIntro.titleLines[1]}
          </span>
        </h2>
        <p className="projects__description">
          {site.projectsIntro.description}
        </p>
      </header>

      <div className="projects__list">
        {site.projects.map((project, index) => (
          <article
            key={project.number}
            className={`projects__card projects__card--${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="projects__visual">
              {project.screenshotPath ? (
                <img
                  className="projects__screenshot"
                  src={project.screenshotPath}
                  alt={`${project.title} application preview`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <>
                  <span className="projects__visual-grid" />
                  <span className="projects__visual-orbit" />
                  <span className="projects__number">{project.number}</span>
                </>
              )}
            </div>
            <div className="projects__details">
              <ul
                className="projects__technologies"
                aria-label={`${project.title} technologies`}
              >
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="projects__actions">
                {project.liveUrl && (
                  <a
                    className="projects__action"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} ${project.liveLabel ? project.liveLabel.toLowerCase() : "live demo"}`}
                  >
                    {project.liveLabel || "Live Demo"} <span aria-hidden="true">↗</span>
                  </a>
                )}

                {project.previewUrl && (
                  <a
                    className="projects__action"
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} preview`}
                  >
                    Preview <span aria-hidden="true">↗</span>
                  </a>
                )}

                <a
                  className="projects__action projects__github"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository`}
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(Projects);
