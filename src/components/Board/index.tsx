import { Field } from "../Field";
import { Board as BoardObj } from "../../utils/logic";

import styles from "./styles.module.css";

type BoardProps = {
  board: BoardObj;
  onLeftClick: (r: number, c: number) => void;
  onRightClick: (
    r: number,
    c: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
};

export const Board = ({ board, onLeftClick, onRightClick }: BoardProps) => {
  const rows = board.map((row, r) => {
    const columns = row.map((field, c) => {
      return (
        <Field
          {...field}
          key={c}
          onLeftClick={() => onLeftClick(r, c)}
          onRightClick={(e) => onRightClick(r, c, e)}
        />
      );
    });

    return (
      <div className={styles.fieldColumns} key={r}>
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
