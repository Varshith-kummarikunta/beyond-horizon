import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap";
import { site } from "../../data/site";

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" }, scrollTrigger: { trigger: footerRef.current, start: "top 82%" } })
        .from(".footer__brand, .footer__tagline", { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.1 })
        .from(".footer__nav-link", { autoAlpha: 0, y: 12, duration: 0.4, stagger: 0.06 }, "-=0.25")
        .from(".footer__social-link", { autoAlpha: 0, y: 12, duration: 0.4, stagger: 0.08 }, "-=0.25")
        .from(".footer__bottom, .footer__top", { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.1 }, "-=0.2");
    }, footerRef);

    return () => context.revert();
  }, []);

  const navigateTo = (id) => (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: { id } }));
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer__divider" aria-hidden="true"><span /></div>
      <div className="footer__content">
        <div className="footer__identity">
          <a
  className="footer__brand"
  href="#home"
  onClick={navigateTo("home")}
  aria-label="Go to homepage"
>
  {site.personal.name}
</a>
          <p className="footer__tagline">{site.personal.tagline}</p>
        </div>
        <nav className="footer__navigation" aria-label="Footer navigation">
          {site.navigation.map(({ label, id }) => (
  <a
    key={id}
    className="footer__nav-link"
    href={`#${id}`}
    onClick={navigateTo(id)}
  >
    {label}
  </a>
))}
        </nav>
        <nav className="footer__socials" aria-label="Social links">
          {site.social.filter(({ label }) => label !== "Portfolio").map(({ label, url }) => <a key={label} className="footer__social-link" href={url} rel="noopener noreferrer">{label}</a>)}
        </nav>
        <div className="footer__bottom">
          <p>{site.footer.copyright}</p>
          <p className="footer__built">Built with {site.footer.stack.map((item) => <span key={item}>{item}</span>)}</p>
        </div>
        <button
  className="footer__top"
  type="button"
  onClick={navigateTo("home")}
  aria-label="Scroll back to top"
>{site.footer.backToTopLabel} <span aria-hidden="true">↑</span></button>
      </div>
    </footer>
  );
}
