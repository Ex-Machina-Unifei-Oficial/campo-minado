type fieldObj = {
    row: number,
    column: number,
    opened: boolean,
    mined: boolean,
    nearMines: number,
    exploded: boolean,
    flagged: boolean,
    hinted: boolean,

}

type boardType = fieldObj[][]

const createBoard = (rows: number, columns: number): boardType => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                mined: false,
                nearMines: 0,
                exploded: false,
                flagged: false,
                hinted: false,
            }
        })
    })
}

const plantMines = (board: boardType, quantity: number): void => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < quantity) {
        const row = Math.floor(Math.random() * rows)
        const col = Math.floor(Math.random() * columns)

        if (!board[row][col].mined) {
            board[row][col].mined = true
            minesPlanted++
        }
    }
}

const giveHint = (board: boardType): void => {
    const rows = board.length
    const columns = board[0].length
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * columns)

    if (!board[row][col].mined && safeNeighborhood(board, row, col))
        board[row][col].hinted = true
    else
        giveHint(board)
}

const createMinedBoard = (rows: number, columns: number, minesQuantity: number): boardType => {
    const board = createBoard(rows, columns)
    plantMines(board, minesQuantity)
    giveHint(board)

    return board
}

const cloneBoard = (board: boardType): boardType => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board: boardType, row: number, column: number): fieldObj[] => {
    const neighbors: fieldObj[] = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const valid = r >= 0 && r < board.length && c >= 0 && c < board[0].length
            if (different && valid) neighbors.push(board[r][c])
        })
    });

    return neighbors
}

const safeNeighborhood = (board: boardType, row: number, column: number): boolean => {
    const checkSafe = (previousSafe: boolean, neighbor: fieldObj) => previousSafe && !neighbor.mined

    return getNeighbors(board, row, column).reduce(checkSafe, true)
}

const openField = (board: boardType, row: number, column: number): void => {
    const field = board[row][column]
    if (field.opened || field.flagged) return

    field.opened = true

    if (field.mined) {
        field.exploded = true

    } else if (safeNeighborhood(board, row, column)) {
        getNeighbors(board, row, column).forEach(n => {
            openField(board, n.row, n.column)
        })

    } else {
        field.nearMines = getNeighbors(board, row, column).filter(n => n.mined).length
    }
}

const toggleFlag = (board: boardType, row: number, column: number): void => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const openRemainingNeighbors = (board: boardType, row: number, column: number): void => {
    if (board[row][column].nearMines === 0 || getNeighbors(board, row, column)
        .filter(field => field.flagged).length != board[row][column].nearMines
    ) return

    getNeighbors(board, row, column).forEach(field => {
        if (!field.flagged) openField(board, field.row, field.column)
    })
}

const fields = (board: boardType): fieldObj[] => {
    const fieldArray: fieldObj[] = []
    return fieldArray.concat(...board)
}

const hadExplosion = (board: boardType): boolean => (
    fields(board).filter(n => n.exploded).length > 0
)

const giveSecondaryHint = (board: boardType) => {
    const isAmbiguous = (board: boardType, row: number, column: number) => {
        const neighbors = getNeighbors(board, row, column)
        return neighbors.filter(field => (!field.opened && field.mined && !field.flagged)).length === 1
            && neighbors.filter(field => (!field.opened && !field.mined)).length === 1
    }

    const ambiguousFields = fields(board).filter(field => field.opened && isAmbiguous(board, field.row, field.column))
    const selectedField = ambiguousFields[Math.floor(Math.random() * ambiguousFields.length)]

    if (selectedField){
        getNeighbors(board, selectedField.row, selectedField.column).forEach(field => {
            if (!field.opened && !field.mined) field.hinted = true
        })
    }
}

const pendent = (field: fieldObj): boolean => (field.mined && !field.flagged) || (!field.mined && !field.opened)

const wonGame = (board: boardType): boolean => fields(board).filter(pendent).length === 0

const showMines = (board: boardType): void => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

const flagsUsed = (board: boardType): number => fields(board).filter(field => field.flagged).length

export type {boardType}

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
    giveSecondaryHint,
}