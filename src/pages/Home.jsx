import { lazy, Suspense, memo, useCallback, useEffect, useRef } from "react";
import { ScrollTrigger } from "../animations/gsap";
import Layout from "../components/Layout/Layout";
import Loader from "../components/effects/Loader";
import useLoader from "../hooks/useLoader";
import useBodyLock from "../hooks/useBodyLock";
import Navigation from "../components/Navigation/Navigation";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Journey from "../components/Journey/Journey";
import Skills from "../components/Skills/Skills";

const Projects = lazy(() => import("../components/Projects/Projects"));
const Travel = lazy(() => import("../components/Travel/Travel"));
const ArtGallery = lazy(() => import("../components/ArtGallery/ArtGallery"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Footer = lazy(() => import("../components/Footer/Footer"));

function LazyMountNotifier({ children, onMount }) {
  useEffect(() => {
    onMount();
  }, [onMount]);

  return children;
}

function HomePage() {
  const { loading, progress, finishLoading } = useLoader();
  const refreshRafRef = useRef(null);

  useBodyLock(loading);

  const handleLazyMount = useCallback(() => {
    if (refreshRafRef.current) {
      cancelAnimationFrame(refreshRafRef.current);
    }
    refreshRafRef.current = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  useEffect(() => {
    return () => {
      if (refreshRafRef.current) {
        cancelAnimationFrame(refreshRafRef.current);
      }
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader progress={progress} onExitComplete={finishLoading} />
      ) : (
        <Layout>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content" tabIndex="-1">
            <Hero />
            <About />
            <Journey />
            <Skills />
            <Suspense fallback={null}>
              <LazyMountNotifier onMount={handleLazyMount}>
                <Projects />
              </LazyMountNotifier>
            </Suspense>
            <Suspense fallback={null}>
              <LazyMountNotifier onMount={handleLazyMount}>
                <Travel />
              </LazyMountNotifier>
            </Suspense>
            <Suspense fallback={null}>
              <LazyMountNotifier onMount={handleLazyMount}>
                <ArtGallery />
              </LazyMountNotifier>
            </Suspense>
            <Suspense fallback={null}>
              <LazyMountNotifier onMount={handleLazyMount}>
                <Contact />
              </LazyMountNotifier>
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <LazyMountNotifier onMount={handleLazyMount}>
              <Footer />
            </LazyMountNotifier>
          </Suspense>
        </Layout>
      )}
    </>
  );
}

export default memo(HomePage);
