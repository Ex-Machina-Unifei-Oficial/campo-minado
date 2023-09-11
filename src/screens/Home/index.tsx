import { useEffect, useState } from "react";

import { Board } from "../../components/Board";
import { Header } from "../../components/Header";

import {
  Board as BoardObj,
  cloneBoard,
  openField,
  toggleFlag,
  openRemainingNeighbors,
  hadExplosion,
  wonGame,
  showMines,
  flagsUsed,
  newBoard,
  minesQuantity,
} from "../../utils/logic";

import styles from "./styles.module.css";

type GameState = "playing" | "win" | "lose";

export const Home = () => {
  const [board, setBoard] = useState(newBoard());
  const [gameState, setGameState] = useState<GameState>("playing");

  useEffect(() => {
    if (gameState === "lose") {
      setTimeout(() => {
        alert("Você Perdeu! Que Pena!");
      }, 100);
    }

    if (gameState === "win") {
      setTimeout(() => {
        alert("Você Venceu! Parabéns!");
      }, 100);
    }
  }, [gameState]);

  const newGame = () => {
    setBoard(newBoard());
    setGameState("playing");
  };

  const checkGameState = (boardClone: BoardObj) => {
    if (hadExplosion(boardClone)) {
      showMines(boardClone);
      setGameState("lose");
    }
    if (wonGame(boardClone)) setGameState("win");
  };

  const onLeftClick = (row: number, column: number): void => {
    if (gameState != "playing") return;

    const boardClone = cloneBoard(board);
    openField(boardClone, row, column);
    checkGameState(boardClone);
    setBoard(boardClone);
  };

  const onRightClick = (
    row: number,
    column: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    event.preventDefault();
    if (gameState != "playing") return;

    const boardClone = cloneBoard(board);
    if (board[row][column].state === "opened") {
      openRemainingNeighbors(boardClone, row, column);
    } else {
      toggleFlag(boardClone, row, column);
    }
    checkGameState(boardClone);
    setBoard(boardClone);
  };

  return (
    <div className={styles.container}>
      <Header
        flagsLeft={minesQuantity() - flagsUsed(board)}
        newGame={newGame}
      />

      <Board
        board={board}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
    </div>
  );
};
