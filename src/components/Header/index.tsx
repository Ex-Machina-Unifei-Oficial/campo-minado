import { useState } from "react";

import { Flag } from "../Flag";
import { ModeMenu } from "../ModeMenu";
import { params } from "../../utils/params";
import { GameMode } from "../../utils/logic";

import styles from "./styles.module.css";

type HeaderProps = {
  newGame: () => void;
  flagsLeft: number;
};

export const Header = ({ newGame, flagsLeft }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const setMode = (mode: GameMode) => {
    params.mineDensity.current = params.mineDensity[mode];
    setShowMenu(false);
    newGame();
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <button
          className={styles.button}
          onClick={() => setShowMenu((show) => !show)}
        >
          Dificuldade
        </button>
        {showMenu && <ModeMenu setMode={setMode} />}
      </div>

      <button className={styles.button} onClick={newGame}>
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
