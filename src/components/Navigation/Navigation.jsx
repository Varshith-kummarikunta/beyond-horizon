import { useEffect, useRef, useState } from "react";
import { site } from "../../data/site";
import useBodyLock from "../../hooks/useBodyLock";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const wasOpenRef = useRef(false);

  useBodyLock(menuOpen);

  const toggleMenu = () => {
    setMenuOpen((open) => {
      const next = !open;
      if (next) setIsMounted(true);
      return next;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen && isMounted) {
      wasOpenRef.current = true;
      const firstLink = navRef.current?.querySelector("a");
      firstLink?.focus();
    } else if (!menuOpen && isMounted) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        toggleRef.current?.focus();
      }
      const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 240;
      const timer = setTimeout(() => setIsMounted(false), delay);
      return () => clearTimeout(timer);
    }
  }, [menuOpen, isMounted]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Tab") {
        const focusable = Array.from(
          navRef.current?.querySelectorAll("a[href], button:not([disabled])") ?? []
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: [0.01, 0.25, 0.5] }
    );

    const observedSections = new Set();
    const observeSections = () => {
      site.navigation.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section || observedSections.has(section)) return;

        observedSections.add(section);
        observer.observe(section);
      });
    };

    observeSections();

    const main = document.querySelector("main");
    const mutationObserver = new MutationObserver(observeSections);
    if (main) mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigateTo = (id) => (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: { id } }));
    setMenuOpen(false);
  };

  return (
    <header className="site-nav">
      <nav className="site-nav__inner" aria-label="Primary navigation">
        <a className="site-nav__brand" href="#home" onClick={navigateTo("home")}>
          {site.personal.name}
        </a>

        <div className="site-nav__links">
          {site.navigation.map(({ label, id }) => (
            <a
              key={id}
              className="site-nav__link"
              data-active={activeSection === id || undefined}
              href={`#${id}`}
              onClick={navigateTo(id)}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </div>

        <button
          ref={toggleRef}
          className="site-nav__toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          data-open={menuOpen || undefined}
          onClick={toggleMenu}
        >
          <span />
          <span />
        </button>
      </nav>

      {isMounted && (
        <>
          <button
            className={`site-nav__backdrop ${menuOpen ? "is-open" : "is-closing"}`}
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
          <nav
            ref={navRef}
            id="mobile-navigation"
            className={`site-nav__mobile-menu ${menuOpen ? "is-open" : "is-closing"}`}
            aria-label="Mobile navigation"
          >
            {site.navigation.map(({ label, id }) => (
              <a
                key={id}
                className="site-nav__mobile-link"
                data-active={activeSection === id || undefined}
                href={`#${id}`}
                onClick={navigateTo(id)}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
