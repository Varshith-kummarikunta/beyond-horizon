import { useEffect, useRef } from "react";
import { gsap } from "../../../animations/gsap";
import { site } from "../../../data/site";
import styles from "./Loader.module.css";

export default function Loader({ progress, onExitComplete }) {
  const loaderRef = useRef(null);
  const titleRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(loaderRef.current, {
          autoAlpha: 0,
          duration: 0.8,
        })
        .from(
          titleRef.current,
          {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
          },
          0.2
        )
        .from(
          percentRef.current,
          {
            y: 16,
            autoAlpha: 0,
            duration: 0.6,
          },
          0.4
        );
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (progress !== 100 || !onExitComplete) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onExitComplete();
      return undefined;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    tl.to(
      [titleRef.current, percentRef.current],
      {
        autoAlpha: 0,
        y: -24,
        duration: 0.45,
        stagger: 0.08,
      },
      0
    );

    tl.to(
      loaderRef.current,
      {
        autoAlpha: 0,
        duration: 0.6,
        onComplete: onExitComplete,
      },
      0.15
    );

    return () => tl.kill();
  }, [progress, onExitComplete]);

  return (
    <div
      ref={loaderRef}
      className={styles.loader}
      role="status"
      aria-live="polite"
    >
      <div className={styles.content}>
        <span className={styles.tag}>{site.loader.label}</span>

        <h1 ref={titleRef} className={styles.title}>
          {site.personal.name}
        </h1>

        <div
          className={styles.track}
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div
            ref={barRef}
            className={styles.bar}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div ref={percentRef} className={styles.percent} aria-hidden="true">
          {progress.toString().padStart(2, "0")}%
        </div>
      </div>
    </div>
  );
}
