import styles from "./styles.module.css";

type FlagProps = {
  bigger?: boolean;
};

export const Flag = ({ bigger }: FlagProps) => (
  <div className={styles.container}>
    {bigger ? (
      <>
        <div className={styles.poleBigger} />
        <div className={styles.poleHighlightBigger} />
        <div className={styles.base1Bigger} />
        <div className={styles.base2Bigger} />
        <div className={styles.flagBigger} />
        <div className={styles.flagShadowBigger} />
      </>
    ) : (
      <>
        <div className={styles.pole} />
        <div className={styles.poleHighlight} />
        <div className={styles.base1} />
        <div className={styles.base2} />
        <div className={styles.flag} />
        <div className={styles.flagShadow} />
      </>
    )}
  </div>
);
