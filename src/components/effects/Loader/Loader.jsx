import { useLayoutEffect, useRef } from "react";
import { loaderAnimation } from "../../../animations/loader";
import useBodyLock from "../../../hooks/useBodyLock";

import styles from "./Loader.module.css";

export default function Loader({ onComplete }) {

  const container = useRef(null);
  const text = useRef(null);
  const progress = useRef(null);

  useBodyLock(true);


  useLayoutEffect(() => {

    const cleanup = loaderAnimation(
      container.current,
      text.current,
      progress.current,
      onComplete
    );

    return cleanup;

  }, [onComplete]);


  return (
    <div
      ref={container}
      className={styles.loader}
    >

      <div className={styles.content}>

        <h1
          ref={text}
          className={styles.title}
        >
          Beyond Horizon
        </h1>


        <div className={styles.progressWrapper}>

          <div
            ref={progress}
            className={styles.progress}
          />

        </div>

      </div>

    </div>
  );
}