import Layout from "../components/Layout/Layout";
import Loader from "../components/effects/Loader";
import useLoader from "../hooks/useLoader";
import useBodyLock from "../hooks/useBodyLock";
import Navigation from "../components/Navigation/Navigation";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Journey from "../components/Journey/Journey";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Travel from "../components/Travel/Travel";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const sections = [
];

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
            <Projects />
            <Travel />
            <Contact />
            {sections.map(([title, id], index) => (
              <section key={id} id={id} className="nav-page-section">
                <p className="nav-page-section__eyebrow">0{index + 1}</p>
                <h2>{title}</h2>
              </section>
            ))}
          </main>
          <Footer />
        </Layout>
      )}
    </>
  );
}
