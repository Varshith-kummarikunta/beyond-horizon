import { lazy, Suspense } from "react";
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

const sections = [];

export default function Home() {
  const { loading, progress, finishLoading } = useLoader();

  useBodyLock(loading);

  return (
    <>
      {loading ? (
        <Loader progress={progress} onExitComplete={finishLoading} />
      ) : (
        <Layout>
          <Navigation />
          <main>
            <Hero />
            <About />
            <Journey />
            <Skills />
            <Suspense fallback={null}>
              <Projects />
              <Travel />
              <ArtGallery />
              <Contact />
            </Suspense>
            {sections.map(([title, id], index) => (
              <section key={id} id={id} className="nav-page-section">
                <p className="nav-page-section__eyebrow">0{index + 1}</p>
                <h2>{title}</h2>
              </section>
            ))}
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </Layout>
      )}
    </>
  );
}
