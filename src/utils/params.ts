import { GameMode } from "./logic";

interface Params {
  headerRatio: number;
  mineDensity: { [Property in GameMode]: number } & { current: number };

  getColumnsAmount: () => number;
  getRowsAmount: () => number;
}

export const params: Params = {
  headerRatio: 0.15,
  mineDensity: {
    easy: 0.1,
    medium: 0.2,
    hard: 0.3,
    current: 0.2,
  },

  getColumnsAmount() {
    return Math.floor(window.innerWidth / 30);
  },

  getRowsAmount() {
    const boardHeight = window.innerHeight * (1 - this.headerRatio);
    return Math.floor(boardHeight / 30);
  },
};
