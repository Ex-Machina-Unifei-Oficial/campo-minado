import { Field } from "../Field";
import { Board as BoardObj } from "../../utils/logic";

import styles from "./styles.module.css";

type BoardProps = {
  board: BoardObj;
  onLeftClick: (row: number, col: number) => void;
  onRightClick: (
    row: number,
    col: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
};

export const Board = ({ board, onLeftClick, onRightClick }: BoardProps) => {
  const rows = board.map((row, rowIndex) => {
    const columns = row.map((field, colIndex) => {
      return (
        <Field
          {...field}
          key={colIndex}
          onLeftClick={() => onLeftClick(rowIndex, colIndex)}
          onRightClick={(e) => onRightClick(rowIndex, colIndex, e)}
        />
      );
    });

    return (
      <div className={styles.fieldColumns} key={rowIndex}>
        {columns}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.fieldRows}>{rows}</div>
    </div>
  );
};
