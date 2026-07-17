import { useState } from "react";

import Layout from "../components/Layout/Layout";
import Loader from "../components/effects/Loader";


export default function Home(){

  const [loading,setLoading] = useState(true);


  return(
    <>

      {loading && (
        <Loader
          onComplete={() => setLoading(false)}
        />
      )}


      {!loading && (

        <Layout>

          <main className="flex min-h-screen items-center justify-center">

            <h1 className="text-5xl font-black md:text-8xl">
              Beyond Horizon
            </h1>

          </main>

        </Layout>

      )}

    </>
  );
}