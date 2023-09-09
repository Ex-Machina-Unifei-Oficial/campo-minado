import { useState } from "react";

import { Board } from "../../components/Board";
import { Header } from "../../components/Header";
import { LevelSelect } from "../../components/LevelSelect";

import params from "../../utils/params";
import {
  createMinedBoard,
  cloneBoard,
  openField,
  toggleFlag,
  openRemainingNeighbors,
  hadExplosion,
  wonGame,
  showMines,
  flagsUsed,
} from "../../utils/logic";

import styles from "./styles.module.css";

export const Home = () => {
  const minesQuantity = () => {
    const rows = params.getRowsAmount();
    const cols = params.getColumnsAmount();
    return Math.ceil(rows * cols * params.mineDensity);
  };

  const newBoard = () =>
    createMinedBoard(
      params.getRowsAmount(),
      params.getColumnsAmount(),
      minesQuantity()
    );

  const [board, setBoard] = useState(newBoard());
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [showDificulty, setShowDifficulty] = useState(false);

  const gameOver = (status: "win" | "lose") => {
    const message =
      status == "win" ? "Você Venceu! Parabéns!" : "Você Perdeu! Que Pena!";

    setTimeout(() => {
      alert(message);
    }, 500);
  };

  const newGame = () => {
    setBoard(newBoard());
    setWon(false);
    setLost(false);
  };

  const onLeftClick = (row: number, column: number): void => {
    if (won || lost) return;

    const boardClone = cloneBoard(board);
    openField(boardClone, row, column);
    const hasLost = hadExplosion(boardClone);
    const hasWon = wonGame(boardClone);

    if (hasLost) {
      showMines(boardClone);
      gameOver("lose");
    }
    if (hasWon) {
      gameOver("win");
    }

    setBoard(boardClone);
    setLost(hasLost);
    setWon(hasWon);
  };

  const onRightClick = (
    row: number,
    column: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    event.preventDefault();
    if (won || lost) return;

    const boardClone = cloneBoard(board);
    if (board[row][column].state === "opened")
      openRemainingNeighbors(boardClone, row, column);
    else toggleFlag(boardClone, row, column);

    const hasWon = wonGame(boardClone);
    const hasLost = hadExplosion(boardClone);

    if (hasWon) {
      gameOver("win");
    }

    if (hasLost) {
      showMines(boardClone);
      gameOver("lose");
    }

    setBoard(boardClone);
    setWon(hasWon);
    setLost(hasLost);
  };

  const onLevelSelected = (level: number) => {
    if (level === params.mineDensity) {
      setShowDifficulty(false);
      return;
    }

    params.mineDensity = level;
    setShowDifficulty(false);
    newGame();
  };

  return (
    <div className={styles.container}>
      <Header
        flagsLeft={minesQuantity() - flagsUsed(board)}
        onNewGame={newGame}
        onDifficulty={() => setShowDifficulty((prevState) => !prevState)}
      />

      <LevelSelect
        isVisible={showDificulty}
        onLevelSelected={onLevelSelected}
      />

      <Board
        board={board}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
    </div>
  );
};
