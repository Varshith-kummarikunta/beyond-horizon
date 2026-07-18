import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Journey", "journey"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Travel", "travel"],
  ["Contact", "contact"],
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: [0.01, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
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
          Beyond Horizon
        </a>

        <div className="site-nav__links">
          {links.map(([label, id]) => (
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
          className="site-nav__toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          data-open={menuOpen || undefined}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              className="site-nav__backdrop"
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              id="mobile-navigation"
              className="site-nav__mobile-menu"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {links.map(([label, id]) => (
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
