import styles from "./Loader.module.css";

export default function Loader({ progress }) {
  return (
    <div
      id="loader"
      className={styles.loader}
      role="status"
      aria-live="polite"
    >
      <div className={styles.content}>
        <span className={styles.tag}>PORTFOLIO 2026</span>

        <h1 id="loader-title" className={styles.title}>
          Beyond Horizon
        </h1>

        <div className={styles.track}>
          <div id="loader-bar" className={styles.bar} />
        </div>

        <div id="loader-percent" className={styles.percent}>
          {progress.toString().padStart(2, "0")}%
        </div>
      </div>
    </div>
  );
}