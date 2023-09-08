import { MouseEventHandler, useState } from "react";

import { Flag } from "../Flag";
import { Mine } from "../Mine";

import { colors } from "../../utils/colors";
import styles from "./styles.module.css";

type FieldState = "closed" | "opened" | "flagged";

type FieldProps = {
  initalState: FieldState;
  hasMine: boolean;
  nearMines: number;
  onOpen: MouseEventHandler<HTMLDivElement>;
  onHold: MouseEventHandler<HTMLDivElement>;
};

export const Field = ({
  initalState,
  nearMines,
  hasMine,
  onOpen,
  onHold,
}: FieldProps) => {
  const [state, setState] = useState<FieldState>(initalState);

  const getStyle = () => {
    return hasMine && state === "opened" ? "exploded" : state;
  };

  return (
    <div
      className={`${styles.field} ${styles[getStyle()]}`}
      onClick={onOpen}
      onDoubleClick={onHold}
    >
      {!hasMine && state == "opened" && nearMines > 0 && (
        <h1
          className={`${styles.label}`}
          style={{ color: colors.fieldLabels[nearMines - 1] }}
        >
          {nearMines}
        </h1>
      )}
      {hasMine && state === "opened" && <Mine />}
      {state === "flagged" && <Flag />}
    </div>
  );
};
