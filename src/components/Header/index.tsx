import { Flag } from "../Flag";

import styles from "./styles.module.css";

type HeaderProps = {
  onNewGame: () => void;
  onDifficulty: () => void;
  flagsLeft: number;
};

export const Header = ({ onNewGame, onDifficulty, flagsLeft }: HeaderProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onDifficulty}>
        Dificuldade
      </button>

      <button className={styles.button} onClick={onNewGame}>
        Novo Jogo
      </button>

      <div className={styles.flagContainer}>
        <div className={styles.flagButton}>
          <Flag bigger />
        </div>
        <h1 className={styles.label}>= {flagsLeft}</h1>
      </div>
    </div>
  );
};
