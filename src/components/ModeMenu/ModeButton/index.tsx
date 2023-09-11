import { PropsWithChildren } from "react";
import { colors } from "../../../utils/colors";
import { GameMode } from "../../../utils/logic";

import styles from "../styles.module.css";

type ModeButtonProps = PropsWithChildren & {
  mode: GameMode;
  onClick: () => void;
};

export const ModeButton = ({ mode, onClick, children }: ModeButtonProps) => (
  <button
    className={styles.button}
    style={{ backgroundColor: colors.modeButtons[mode] }}
    onClick={onClick}
  >
    {children}
  </button>
);
