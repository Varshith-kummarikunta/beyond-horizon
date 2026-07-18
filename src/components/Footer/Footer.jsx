import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap";

const navigation = [["Home", "home"], ["About", "about"], ["Journey", "journey"], ["Skills", "skills"], ["Projects", "projects"], ["Travel", "travel"], ["Contact", "contact"]];
const socialLinks = [["GitHub", "https://github.com/"], ["LinkedIn", "https://www.linkedin.com/"], ["Instagram", "https://www.instagram.com/"]];

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
          <a className="footer__brand" href="#home" onClick={navigateTo("home")}>Beyond Horizon</a>
          <p className="footer__tagline">Crafting immersive digital experiences through code, design, and storytelling.</p>
        </div>
        <nav className="footer__navigation" aria-label="Footer navigation">
          {navigation.map(([label, id]) => <a key={id} className="footer__nav-link" href={`#${id}`} onClick={navigateTo(id)}>{label}</a>)}
        </nav>
        <nav className="footer__socials" aria-label="Social links">
          {socialLinks.map(([label, href]) => <a key={label} className="footer__social-link" href={href} rel="noreferrer">{label}</a>)}
        </nav>
        <div className="footer__bottom">
          <p>© 2026 Beyond Horizon. All rights reserved.</p>
          <p className="footer__built">Built with <span>React</span><span>GSAP</span><span>Framer Motion</span><span>Lenis</span><span>Three.js</span></p>
        </div>
        <button className="footer__top" type="button" onClick={navigateTo("home")}>Back to top <span aria-hidden="true">↑</span></button>
      </div>
    </footer>
  );
}
