import { LevelButton } from "./LevelButton";

import styles from "./styles.module.css";

type LevelSelectProps = {
  isVisible: boolean;
  onLevelSelected: (mineDensity: number) => void;
};

export const LevelSelect = ({
  isVisible,
  onLevelSelected,
}: LevelSelectProps) => {
  return (
    <div className={styles.container}>
      {isVisible && (
        <div className={styles.frame}>
          <LevelButton
            text="Fácil"
            color="easy"
            onClick={() => onLevelSelected(0.1)}
          />
          <LevelButton
            text="Médio"
            color="medium"
            onClick={() => onLevelSelected(0.2)}
          />
          <LevelButton
            text="Difícil"
            color="hard"
            onClick={() => onLevelSelected(0.3)}
          />
        </div>
      )}
    </div>
  );
};
