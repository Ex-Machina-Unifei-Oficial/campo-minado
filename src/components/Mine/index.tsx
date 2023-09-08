import styles from "./styles.module.css";

export const Mine = () => (
  <div className={styles.container}>
    <div className={styles.line} style={{ transform: "rotate(45deg)" }} />
    <div className={styles.line} style={{ transform: "rotate(180deg)" }} />
    <div className={styles.line} style={{ transform: "rotate(90deg)" }} />
    <div className={styles.line} style={{ transform: "rotate(135deg)" }} />

    <div className={styles.core}>
      <div className={styles.highlight1}>
        <div className={styles.highlight2} />
      </div>
    </div>
  </div>
);
