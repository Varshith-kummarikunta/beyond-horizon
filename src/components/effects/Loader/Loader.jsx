import styles from "./Loader.module.css";

export default function Loader({ progress }) {
  return (
    <div id="loader" className={styles.loader}>
      <h1 id="loader-title" className={styles.title}>
        Beyond Horizon
      </h1>

      <div className={styles.progress}>
        <div id="loader-bar" className={styles.bar}></div>
      </div>

      <span id="loader-percent" className={styles.percent}>
        {progress}%
      </span>
    </div>
  );
}