import { useState, useEffect, MouseEventHandler } from "react";

import { Board } from "../../components/Board";
// import Header from "../../components/Header";
// import LevelSelect from "../LevelSelect";
// import Menu from "../Menu";

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
  Board as BoardObj,
} from "../../utils/logic";

import styles from "./styles.module.css";

// import {
//   saveGame,
//   saveSetting,
//   loadData,
//   deleteGame,
//   deleteSetting,
// } from "../../utils/saveData";
// import Snackbar from "react-native-snackbar";

export const MineBoard = () => {
  let didLoadBoard = false;

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
  const [showLevels, setShowLevels] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  //load game or pass on first render
  //   useEffect(() => {
  //     loadData(loadBoard, loadSettings);
  //   }, []);

  const gameOver = (status: "win" | "lose") => {
    const title = status == "win" ? "Você Venceu!" : "Você Perdeu!";
    const message =
      (status == "win" ? "Parabéns! " : "Que Pena!") +
      "\nDeseja iniciar um novo jogo?";
    // const buttons = [{ text: "Não" }, { text: "Sim", onPress: newGame }];

    setTimeout(() => {
      alert(title + message);
    }, 500);
  };

  const newGame = () => {
    setBoard(newBoard());
    setWon(false);
    setLost(false);
    didLoadBoard = false;
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

  //   const onLevelSelected = (level: number) => {
  //     if (level === params.mineDensity) {
  //       setShowLevels(false);
  //       return;
  //     }

  //     params.mineDensity = level;
  //     setShowLevels(false);
  //     newGame();
  //   };

  const loadBoard = (data: { board: BoardObj; mineDensity: number }) => {
    didLoadBoard = true;
    params.mineDensity = data.mineDensity;
    setBoard(data.board);
  };

  //   const loadSettings = ({
  //     theme,
  //     mineDensity,
  //   }: {
  //     theme: appThemes;
  //     mineDensity: number;
  //   }) => {
  //     params.theme = theme;
  //     setTheme(theme);

  //     if (!didLoadBoard) {
  //       params.mineDensity = mineDensity;
  //       setBoard(newBoard);
  //     }
  //   };

  //   const onSaveGame = async () => {
  //     if (await saveGame({ board, mineDensity: params.mineDensity }))
  //       Snackbar.show({
  //         text: "Jogo Salvo!",
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //   };

  //   const onSaveSetting = async () => {
  //     if (
  //       await saveSetting({
  //         theme: params.theme,
  //         mineDensity: params.mineDensity,
  //       })
  //     )
  //       Snackbar.show({
  //         text: "Preferências Salvas!",
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //   };

  //   const onDeleteGame = async () => {
  //     if (await deleteGame())
  //       Snackbar.show({
  //         text: "Jogo Excluído!",
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //   };

  //   const onDeleteSetting = async () => {
  //     if (await deleteSetting())
  //       Snackbar.show({
  //         text: "Preferências Excluídas!",
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //   };

  return (
    <div className={styles.container}>
      {/* <Menu
        isVisible={showMenu}
        onCancel={() => setShowMenu(false)}
        onThemeSelected={onThemeSelected}
        onSaveGame={onSaveGame}
        onSaveSetting={onSaveSetting}
        onDeleteGame={onDeleteGame}
        onDeleteSetting={onDeleteSetting}
        onGiveHint={onGiveSecondaryHint}
      />
      <LevelSelect
        isVisible={showLevels}
        onLevelSelected={onLevelSelected}
        onCancel={() => setShowLevels(false)}
      />
      <Header
        flagsLeft={minesQuantity() - flagsUsed(board)}
        onNewGame={newGame}
        onNewGameLongPress={() => loadData(loadBoard, loadSettings)}
        onFlagPress={() => setShowLevels(true)}
        onMenu={() => setShowMenu(true)}
      /> */}
      <Board
        board={board}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
    </div>
  );
};
