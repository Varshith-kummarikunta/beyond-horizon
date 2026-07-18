import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../animations/gsap";

const contactDetails = [
  ["Email", "varshith@example.com", "mailto:varshith@example.com"],
  ["Location", "Hyderabad, India"],
  ["Availability", "Open to opportunities"],
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const split = new SplitType(
      headingRef.current.querySelectorAll(".contact__title-line"),
      { types: "chars" }
    );
    const context = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        })
        .from(".contact__eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
        .from(split.chars, { autoAlpha: 0, yPercent: 110, duration: 0.7, stagger: 0.014 }, "-=0.2")
        .from(".contact__description", { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.35")
        .from(".contact__card", { autoAlpha: 0, y: 24, duration: 0.55, stagger: 0.12 }, "-=0.3")
        .from(".contact__actions > *", { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.1 }, "-=0.25");
    }, sectionRef);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact" aria-labelledby="contact-title">
      <div className="contact__atmosphere" aria-hidden="true"><span /></div>
      <div className="contact__content">
        <header className="contact__intro">
          <p className="contact__eyebrow">Contact</p>
          <h2 id="contact-title" ref={headingRef} className="contact__title" aria-label="Let's build something remarkable.">
            <span className="contact__title-line">Let&apos;s build</span>
            <span className="contact__title-line contact__title-line--accent">something remarkable.</span>
          </h2>
          <p className="contact__description">
            Whether it&apos;s a freelance project, a full-time opportunity, or simply a conversation
            about technology and design, I&apos;d love to hear from you.
          </p>
        </header>

        <dl className="contact__cards">
          {contactDetails.map(([label, value, href]) => (
            <div key={label} className="contact__card">
              <dt>{label}</dt>
              <dd>{href ? <a href={href}>{value}</a> : value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="contact__actions">
        <a className="contact__button contact__button--primary" href="mailto:varshith@example.com">Send Email <span aria-hidden="true">↗</span></a>
        <button className="contact__button contact__button--secondary" type="button">Download Resume <span aria-hidden="true">↓</span></button>
      </div>
    </section>
  );
}
