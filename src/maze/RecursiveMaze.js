export default function recursiveDivisionMaze(grid) {
    const animations = [];

    addWallEdges(animations, grid); // creates a border for the maze
    const isPassage = grid.map((row) => row.map((cell) => false));

    let firstRow = 1;
    let lastRow = grid.length - 2;
    let firstCol = 1;
    let lastCol = grid[0].length - 2;

    generateMaze(grid, firstRow, lastRow, firstCol, lastCol, animations, isPassage);

    console.log(animations);
    return animations;
}

function addToArray(array, node) {
    if (!node.isStart && !node.isFinish) {
        array.push(node);
    }
}

function addWallEdges(animations, grid) {
    grid[0].map((node) => addToArray(animations, node));
    grid.map((row) =>
        // eslint-disable-next-line array-callback-return
        row.map((node, col) => {
            if (col === grid[0].length - 1) {
                addToArray(animations, node);
            }
        })
    );

    grid[grid.length - 1].reverse().map((node) => addToArray(animations, node));
    grid.map((row) => row.map((node, col) => col === 0 && addToArray(animations, node)));
}

function chooseOrientation(firstRow, lastRow, firstCol, lastCol) {
    let width = lastCol - firstCol;
    let height = lastRow - firstRow;

    if (width > height) {
        return "vertical";
    } else if (height > width) {
        return "horizontal";
    } else {
        return Math.random() < 0.5 ? "vertical" : "horizontal";
    }
}

function generateMaze(grid, firstRow, lastRow, firstCol, lastCol, animations, isPassage) {
    let width = lastCol - firstCol + 1;
    let height = lastRow - firstRow + 1;

    let firstValidRow = firstRow;
    let lastValidRow = lastRow;
    let firstValidCol = firstCol;
    let lastValidCol = lastCol;

    let orientation = chooseOrientation(firstRow, lastRow, firstCol, lastCol);

    if (orientation === "horizontal") {
        firstValidRow += 1;
        lastValidRow -= 1;
    } else if (orientation === "vertical") {
        firstValidCol += 1;
        lastValidCol -= 1;
    }

    let validWidth = lastValidCol - firstValidCol + 1;
    let validHeight = lastValidRow - firstValidRow + 1;

    if (width < 2 || height < 2 || validHeight < 1 || validWidth < 1) return;

    if (orientation === "horizontal") {
        // select row from random
        let rowIdxToBeWall = Math.floor(Math.random() * validHeight) + firstValidRow;

        // select col from random unless ...
        let colIdxToBeWall;
        if (isPassage[rowIdxToBeWall][firstCol - 1]) {
            colIdxToBeWall = firstCol;
        } else if (isPassage[rowIdxToBeWall][lastCol + 1]) {
            colIdxToBeWall = lastCol;
        } else {
            colIdxToBeWall = Math.floor(Math.random() * validWidth) + firstValidCol;
        }

        grid[rowIdxToBeWall].forEach((node, col) => {
            if (col < firstValidCol || col > lastValidCol || isPassage[rowIdxToBeWall][col]) return;
            else if (node.isStart || node.isFinish || col === colIdxToBeWall) {
                isPassage[rowIdxToBeWall][colIdxToBeWall] = true;
            } else {
                addToArray(animations, node);
            }
        });

        // recursively call function on upper side
        generateMaze(grid, firstRow, rowIdxToBeWall - 1, firstCol, lastCol, animations, isPassage);
        generateMaze(grid, rowIdxToBeWall + 1, lastRow, firstCol, lastCol, animations, isPassage);
    } else {
        let colIdxToBeWall = Math.floor(Math.random() * validWidth) + firstValidCol;
        let rowIdxToBeWall;
        if (isPassage[firstRow - 1][colIdxToBeWall]) {
            rowIdxToBeWall = firstRow;
        } else if (isPassage[lastRow + 1][colIdxToBeWall]) {
            rowIdxToBeWall = lastRow;
        } else {
            rowIdxToBeWall = Math.floor(Math.random() * validHeight) + firstValidRow;
        }

        grid.forEach((row, index) => {
            if (index < firstValidRow || index > lastValidRow) return;
            if (index === rowIdxToBeWall) {
                isPassage[index][colIdxToBeWall] = true;
                return;
            }

            row.forEach((node, idx) => {
                if (node.type === "start" || node.type === "finish") {
                    isPassage[index][idx] = true;
                }
                if (isPassage[index][idx]) return;
                idx === colIdxToBeWall && animations.push(node);
            });
        });

        generateMaze(grid, firstRow, lastRow, firstCol, colIdxToBeWall - 1, animations, isPassage);
        generateMaze(grid, firstRow, lastRow, colIdxToBeWall + 1, lastCol, animations, isPassage);
    }
}
// const createNode = (col, row) => {
//     return {
//         col,
//         row,
//         isStart: row === START_NODE_ROW && col === START_NODE_COL,
//         isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//         distance: Infinity,
//         isVisited: false,
//         isWall: false,
//         isWeight: false,
//         previousNode: null,
//         weight: 0,
//     };
// };
