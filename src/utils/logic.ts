export type FieldState = "closed" | "opened" | "flagged";

type Field = {
  row: number;
  column: number;
  state: FieldState;
  hasMine: boolean;
  nearMines: number;
};

type Board = Field[][];

const createBoard = (rows: number, columns: number): Board => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            row,
            column,
            state: "closed",
            hasMine: false,
            nearMines: 0,
          };
        });
    });
};

const plantMines = (board: Board, quantity: number): void => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < quantity) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * columns);

    if (!board[row][col].hasMine) {
      board[row][col].hasMine = true;
      minesPlanted++;
    }
  }
};

const createMinedBoard = (
  rows: number,
  columns: number,
  minesQuantity: number
): Board => {
  const board = createBoard(rows, columns);
  plantMines(board, minesQuantity);

  return board;
};

const cloneBoard = (board: Board): Board => {
  return board.map((rows) => {
    return rows.map((field) => {
      return { ...field };
    });
  });
};

const getNeighbors = (board: Board, row: number, column: number): Field[] => {
  const neighbors: Field[] = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  rows.forEach((r) => {
    columns.forEach((c) => {
      const different = r !== row || c !== column;
      const valid = r >= 0 && r < board.length && c >= 0 && c < board[0].length;
      if (different && valid) neighbors.push(board[r][c]);
    });
  });

  return neighbors;
};

const safeNeighborhood = (
  board: Board,
  row: number,
  column: number
): boolean => {
  const checkSafe = (previousSafe: boolean, neighbor: Field) =>
    previousSafe && !neighbor.hasMine;

  return getNeighbors(board, row, column).reduce(checkSafe, true);
};

const openField = (board: Board, row: number, column: number): void => {
  const field = board[row][column];
  if (field.state === "opened" || field.state === "flagged") return;

  field.state = "opened";

  if (!field.hasMine && safeNeighborhood(board, row, column)) {
    getNeighbors(board, row, column).forEach((n) => {
      openField(board, n.row, n.column);
    });
  } else {
    field.nearMines = getNeighbors(board, row, column).filter(
      (n) => n.hasMine
    ).length;
  }
};

const toggleFlag = (board: Board, row: number, column: number): void => {
  const field = board[row][column];
  field.state = field.state === "closed" ? "flagged" : "closed";
};

const openRemainingNeighbors = (
  board: Board,
  row: number,
  column: number
): void => {
  if (
    board[row][column].nearMines === 0 ||
    getNeighbors(board, row, column).filter(
      (field) => field.state === "flagged"
    ).length != board[row][column].nearMines
  )
    return;

  getNeighbors(board, row, column).forEach((field) => {
    if (!(field.state === "flagged")) openField(board, field.row, field.column);
  });
};

const fields = (board: Board): Field[] => {
  const fieldArray: Field[] = [];
  return fieldArray.concat(...board);
};

const hadExplosion = (board: Board): boolean =>
  fields(board).filter((field) => field.hasMine && field.state === "opened")
    .length > 0;

const pendent = (field: Field): boolean =>
  (field.hasMine && !(field.state === "flagged")) ||
  (!field.hasMine && !(field.state === "opened"));

const wonGame = (board: Board): boolean =>
  fields(board).filter(pendent).length === 0;

const showMines = (board: Board): void =>
  fields(board)
    .filter((field) => field.hasMine)
    .forEach((field) => (field.state = "opened"));

const flagsUsed = (board: Board): number =>
  fields(board).filter((field) => field.state === "flagged").length;

export type { Board };

export {
  createMinedBoard,
  cloneBoard,
  openField,
  toggleFlag,
  openRemainingNeighbors,
  hadExplosion,
  wonGame,
  showMines,
  flagsUsed,
};
