import styles from "./styles.module.css";

type FlagProps = {
  bigger?: boolean;
};

export const Flag = ({ bigger }: FlagProps) => (
  <div className={styles.container}>
    <div className={bigger ? styles.poleBigger : styles.pole} />
    <div
      className={bigger ? styles.poleHighlightBigger : styles.poleHighlight}
    />
    <div className={bigger ? styles.base1Bigger : styles.base1} />
    <div className={bigger ? styles.base2Bigger : styles.base2} />
    <div className={bigger ? styles.flagBigger : styles.flag} />
    <div className={bigger ? styles.flagShadowBigger : styles.flagShadow} />
  </div>
);
