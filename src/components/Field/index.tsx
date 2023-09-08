import { MouseEventHandler, useEffect, useState } from "react";

import { Flag } from "../Flag";
import { Mine } from "../Mine";

import { FieldState } from "../../utils/logic";
import { colors } from "../../utils/colors";
import styles from "./styles.module.css";

type FieldProps = {
  state: FieldState;
  hasMine: boolean;
  nearMines: number;
  onLeftClick: () => void;
  onRightClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const Field = ({
  state,
  nearMines,
  hasMine,
  onLeftClick,
  onRightClick,
}: FieldProps) => {
  const getStyle = () => {
    return hasMine && state === "opened" ? "exploded" : state;
  };

  return (
    <div
      className={`${styles.field} ${styles[getStyle()]}`}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
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
