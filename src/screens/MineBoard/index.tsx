// import React, { useState, useEffect } from "react";
// import { Alert } from "react-native";

// import { Container } from "./styles";

// import params from "../../utils/params";
// import Board from "../../components/Board";
// import Header from "../../components/Header";
// import LevelSelect from "../LevelSelect";
// import Menu from "../Menu";
// import { appThemes } from "../../themes";
// import {
//   createMinedBoard,
//   cloneBoard,
//   openField,
//   toggleFlag,
//   openRemainingNeighbors,
//   hadExplosion,
//   wonGame,
//   showMines,
//   flagsUsed,
//   giveSecondaryHint,
//   boardType,
// } from "../../utils/logic";
// import {
//   saveGame,
//   saveSetting,
//   loadData,
//   deleteGame,
//   deleteSetting,
// } from "../../utils/saveData";
// import Snackbar from "react-native-snackbar";

// export default ({ setTheme }: { setTheme: Function }) => {
//   let didLoadBoard = false;

//   const minesQuantity = () => {
//     const rows = params.getRowsAmount();
//     const cols = params.getColumnsAmount();
//     return Math.ceil(rows * cols * params.mineDensity);
//   };

//   const newBoard = () =>
//     createMinedBoard(
//       params.getRowsAmount(),
//       params.getColumnsAmount(),
//       minesQuantity()
//     );

//   const [board, setBoard] = useState(newBoard());
//   const [won, setWon] = useState(false);
//   const [lost, setLost] = useState(false);
//   const [showLevels, setShowLevels] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);

//   // load game or pass on first render
//   useEffect(() => {
//     loadData(loadBoard, loadSettings);
//   }, []);

//   const gameOver = (status: "win" | "lose") => {
//     const title = status == "win" ? "Você Venceu!" : "Você Perdeu!";
//     const message =
//       (status == "win" ? "Parabéns! " : "Que Pena!") +
//       "\nDeseja iniciar um novo jogo?";
//     const buttons = [{ text: "Não" }, { text: "Sim", onPress: newGame }];

//     setTimeout(() => {
//       Alert.alert(title, message, buttons);
//     }, 500);
//   };

//   const newGame = () => {
//     setBoard(newBoard());
//     setWon(false);
//     setLost(false);
//     didLoadBoard = false;
//   };

//   const onOpenField = (row: number, column: number): void => {
//     if (won || lost) return;

//     const boardClone = cloneBoard(board);
//     openField(boardClone, row, column);
//     const hasLost = hadExplosion(boardClone);
//     const hasWon = wonGame(boardClone);

//     if (hasLost) {
//       showMines(boardClone);
//       gameOver("lose");
//     }
//     if (hasWon) {
//       gameOver("win");
//     }

//     setBoard(boardClone);
//     setLost(hasLost);
//     setWon(hasWon);
//   };

//   const onHoldField = (row: number, column: number): void => {
//     if (won || lost) return;

//     const boardClone = cloneBoard(board);
//     if (board[row][column].opened)
//       openRemainingNeighbors(boardClone, row, column);
//     else toggleFlag(boardClone, row, column);

//     const hasWon = wonGame(boardClone);
//     const hasLost = hadExplosion(boardClone);

//     if (hasWon) {
//       gameOver("win");
//     }

//     if (hasLost) {
//       showMines(boardClone);
//       gameOver("lose");
//     }

//     setBoard(boardClone);
//     setWon(hasWon);
//     setLost(hasLost);
//   };

//   const onLevelSelected = (level: number) => {
//     if (level === params.mineDensity) {
//       setShowLevels(false);
//       return;
//     }

//     params.mineDensity = level;
//     setShowLevels(false);
//     newGame();
//   };

//   const onThemeSelected = (theme: appThemes) => {
//     params.theme = theme;
//     setTheme(theme);
//     setShowMenu(false);
//   };

//   const onGiveSecondaryHint = () => {
//     if (won || lost) return;

//     const boardClone = cloneBoard(board);
//     giveSecondaryHint(boardClone);

//     setBoard(boardClone);
//     setShowMenu(false);
//   };

//   const loadBoard = (data: { board: boardType; mineDensity: number }) => {
//     didLoadBoard = true;
//     params.mineDensity = data.mineDensity;
//     setBoard(data.board);
//   };

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

//   return (
//     <Container>
//       <Menu
//         isVisible={showMenu}
//         onCancel={() => setShowMenu(false)}
//         onThemeSelected={onThemeSelected}
//         onSaveGame={onSaveGame}
//         onSaveSetting={onSaveSetting}
//         onDeleteGame={onDeleteGame}
//         onDeleteSetting={onDeleteSetting}
//         onGiveHint={onGiveSecondaryHint}
//       />
//       <LevelSelect
//         isVisible={showLevels}
//         onLevelSelected={onLevelSelected}
//         onCancel={() => setShowLevels(false)}
//       />
//       <Header
//         flagsLeft={minesQuantity() - flagsUsed(board)}
//         onNewGame={newGame}
//         onNewGameLongPress={() => loadData(loadBoard, loadSettings)}
//         onFlagPress={() => setShowLevels(true)}
//         onMenu={() => setShowMenu(true)}
//       />
//       <Board
//         board={board}
//         onOpenField={onOpenField}
//         onHoldField={onHoldField}
//       />
//     </Container>
//   );
// };
export {};
