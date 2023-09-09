import { colors } from "../../../utils/colors";

import styles from "../styles.module.css";

type LevelButtonProps = {
  color: "easy" | "medium" | "hard";
  text: string;
  onClick: () => void;
};

export const LevelButton = ({ color, text, onClick }: LevelButtonProps) => (
  <button
    className={styles.button}
    style={{ backgroundColor: colors.levelSelect[color] }}
    onClick={onClick}
  >
    {text}
  </button>
);
