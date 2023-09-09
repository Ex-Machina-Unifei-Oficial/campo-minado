const width = window.innerWidth;
const height = window.innerHeight;

interface Params {
  headerRatio: number;
  mineDensity: number;

  getColumnsAmount: () => number;
  getRowsAmount: () => number;
}

const params: Params = {
  headerRatio: 0.15,
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
