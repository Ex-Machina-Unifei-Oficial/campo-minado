import { ModeButton } from "./ModeButton";
import { GameMode } from "../../utils/logic";

import styles from "./styles.module.css";

type LevelSelectProps = {
  setMode: (mode: GameMode) => void;
};

export const ModeMenu = ({ setMode }: LevelSelectProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <ModeButton mode="easy" onClick={() => setMode("easy")}>
          Fácil
        </ModeButton>

        <ModeButton mode="medium" onClick={() => setMode("medium")}>
          Médio
        </ModeButton>

        <ModeButton mode="hard" onClick={() => setMode("hard")}>
          Difícil
        </ModeButton>
      </div>
    </div>
  );
};
