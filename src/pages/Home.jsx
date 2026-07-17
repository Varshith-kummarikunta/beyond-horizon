import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Loader from "../components/effects/Loader";
import useLoader from "../hooks/useLoader";
import useBodyLock from "../hooks/useBodyLock";

export default function Home() {
  const { loading, progress } = useLoader();

  useBodyLock(loading);

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      {loading && <Loader progress={progress} />}

      <Layout>
        <main className="flex min-h-screen items-center justify-center">
          <h1 className="text-6xl font-black tracking-tight md:text-8xl">
            Beyond Horizon
          </h1>
        </main>
      </Layout>
    </>
  );
}