import { colors } from "./colors";

const width = window.innerWidth;
const height = window.innerHeight;

interface Params {
  fontSize: number;
  headerRatio: number;
  mineDensity: number;

  getColumnsAmount: () => number;
  getRowsAmount: () => number;
}

const params: Params = {
  fontSize: 20,
  headerRatio: 0.1,

  mineDensity: 0.2,

  getColumnsAmount() {
    return Math.floor(width / 30);
  },
  getRowsAmount() {
    const boardHeight = height * (1 - this.headerRatio);
    return Math.floor(boardHeight / 30);
  },
};

export default params;
