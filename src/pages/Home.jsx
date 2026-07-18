import Layout from "../components/Layout/Layout";
import Loader from "../components/effects/Loader";
import useLoader from "../hooks/useLoader";
import useBodyLock from "../hooks/useBodyLock";

export default function Home() {
  const { loading, progress, finishLoading } = useLoader();

  useBodyLock(loading);

  return (
    <>
      {loading ? (
        <Loader progress={progress} onExitComplete={finishLoading} />
      ) : (
        <Layout>
          <main className="min-h-screen flex items-center justify-center">
            <h1 className="text-6xl font-black md:text-8xl">
              Beyond Horizon
            </h1>
          </main>
        </Layout>
      )}
    </>
  );
}
