import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

const contactDetails = [
  { label: "Email", value: site.personal.email, href: `mailto:${site.personal.email}` },
  { label: "Location", value: site.personal.location },
  { label: "Availability", value: site.contact.availability },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const split = new SplitType(headingRef.current.querySelectorAll(".contact__title-line"), { types: "chars" });
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" }, scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } })
        .from(".contact__eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
        .from(split.chars, { autoAlpha: 0, yPercent: 110, duration: 0.7, stagger: 0.014 }, "-=0.2")
        .from(".contact__description", { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.35")
        .from(".contact__card", { autoAlpha: 0, y: 24, duration: 0.55, stagger: 0.12 }, "-=0.3")
        .from(".contact__actions > *", { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.1 }, "-=0.25");
    }, sectionRef);

    return () => { context.revert(); split.revert(); };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact" aria-labelledby="contact-title">
      <div className="contact__atmosphere" aria-hidden="true"><span /></div>
      <div className="contact__content">
        <header className="contact__intro">
          <p className="contact__eyebrow">{site.contact.eyebrow}</p>
          <h2 id="contact-title" ref={headingRef} className="contact__title" aria-label={site.contact.titleLines.join(" ")}>
            <span className="contact__title-line">{site.contact.titleLines[0]}</span>
            <span className="contact__title-line contact__title-line--accent">{site.contact.titleLines[1]}</span>
          </h2>
          <p className="contact__description">{site.contact.description}</p>
        </header>

        <dl className="contact__cards">
          {contactDetails.map(({ label, value, href }) => (
            <div key={label} className="contact__card">
              <dt>{label}</dt>
              <dd>{href ? <a href={href}>{value}</a> : value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="contact__actions">
        <a className="contact__button contact__button--primary" href={`mailto:${site.personal.email}`}>{site.contact.sendEmailLabel} <span aria-hidden="true">↗</span></a>
        <button className="contact__button contact__button--secondary" type="button" onClick={() => window.open(site.personal.resumeUrl, "_blank", "noopener,noreferrer")}>{site.contact.downloadResumeLabel} <span aria-hidden="true">↓</span></button>
      </div>
    </section>
  );
}
