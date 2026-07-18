import Layout from "../components/Layout/Layout";
import Loader from "../components/effects/Loader";
import useLoader from "../hooks/useLoader";
import useBodyLock from "../hooks/useBodyLock";
import Navigation from "../components/Navigation/Navigation";

const sections = [
  ["About", "about"],
  ["Journey", "journey"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Travel", "travel"],
  ["Contact", "contact"],
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
            <section id="home" className="nav-page-section nav-page-section--hero">
              <p className="nav-page-section__eyebrow">Portfolio 2026</p>
              <h1>Beyond Horizon</h1>
            </section>
            {sections.map(([title, id], index) => (
              <section key={id} id={id} className="nav-page-section">
                <p className="nav-page-section__eyebrow">0{index + 1}</p>
                <h2>{title}</h2>
              </section>
            ))}
          </main>
        </Layout>
      )}
    </>
  );
}
