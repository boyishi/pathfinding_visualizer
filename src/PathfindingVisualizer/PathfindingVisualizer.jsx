import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import { showPopUp } from "./Tutorial/Tutorial.jsx";
import Header from "./Header/Header";
import { dijkstra } from "../algorithms/dijkstra";
import { dfs } from "../algorithms/dfs";
import { getNodesInShortestPathOrder } from "../algorithms/common.js";
import generateMaze from "../maze/RecursiveMaze";

import "./PathfindingVisualizer.css";

// Defining initial state of start and finish.

let ROW_MAX_LENGTH = 20;
let COL_MAX_LENGTH = 40;

let START_NODE_ROW = 9;
let START_NODE_COL = 8;
let FINISH_NODE_ROW = 9;
let FINISH_NODE_COL = 31;

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            topMessage: "Dijkstra Algorithm",
            weight: 1,
            changeWeight: false,
            distanceToBeTraveled: 0,
            algorithm: "Dijkstra",
        };

        this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
        this.animateDijkstra = this.animateDijkstra.bind(this);
        this.animateShortestPath = this.animateShortestPath.bind(this);
        this.weightChangeHandler = this.weightChangeHandler.bind(this);
        this.toggleWeight = this.toggleWeight.bind(this);
        this.pointChangeHandler = this.pointChangeHandler.bind(this);
        this.changeAlgorithm = this.changeAlgorithm.bind(this);
        this.animateMaze = this.animateMaze.bind(this);
        this.clearGrid = this.clearGrid.bind(this);
    }

    // Creating grid
    componentDidMount() {
        this.clearGrid();
    }

    clearGrid() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    // On pressing the mouse down
    handleMouseDown(row, col) {
        if (!this.state.topMessage.includes("Algorithm")) return;

        let newGrid = [];

        if (this.state.changeWeight) {
            newGrid = getNewGridWithWeightToggled(this.state.grid, row, col, this.state.weight);
        } else {
            newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        }

        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    // On entering the new node element.
    handleMouseEnter(row, col) {
        if (!this.state.topMessage.includes("Algorithm")) return;
        if (!this.state.mouseIsPressed) return;

        let newGrid = [];

        if (this.state.changeWeight) {
            newGrid = getNewGridWithWeightToggled(this.state.grid, row, col, this.state.weight);
        } else {
            newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        }

        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    // When we release the mouse
    handleMouseUp() {
        if (!this.state.topMessage.includes("Algorithm")) return;
        this.setState({ mouseIsPressed: false });
    }

    visualizeDijkstra() {
        this.setState({ topMessage: "Creator : Adrian" });
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let visitedNodesInOrder;

        switch (this.state.algorithm) {
            case "Dijkstra":
                visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                break;
            case "DFS":
                visitedNodesInOrder = dfs(grid, startNode, finishNode);
                break;
            default:
                break;
        }
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animateMaze() {
        const { grid } = this.state;
        const wallAnimations = generateMaze(grid);

        for (let i = 0; i < wallAnimations.length; i++) {
            setTimeout(() => {
                const { row, col } = wallAnimations[i];
                const updatedGrid = getGridWithNewWall(grid, row, col);
                this.setState({ grid: updatedGrid });
            }, 15 * i);
        }
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 1; i <= visitedNodesInOrder.length; i++) {
            // When we reach the last element in visitedNodesInOrder.
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.setState({ topMessage: "Shortest Path" });
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            // Do not change the style of the finish node
            if (i === visitedNodesInOrder.length - 1) continue;
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (node.isWeight) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visitedWeight";
                } else {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
                }
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        let timeTaken = 0;
        for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (nodesInShortestPathOrder[i].isWeight) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-path-weight";
                } else {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-path";
                }
            }, 50 * i);
        }

        timeTaken = nodesInShortestPathOrder[nodesInShortestPathOrder.length - 1].distance;
        this.setState({ distanceToBeTraveled: timeTaken });
    }

    changeAlgorithm = (e) => {
        let _algorithm = e.target.value;
        let message;

        switch (_algorithm) {
            case "Dijkstra":
                message = "Dijkstra Algorithm";
                break;
            case "DFS":
                message = "DFS Algorithm";
                break;
            default:
                break;
        }

        this.setState({
            algorithm: _algorithm,
            topMessage: message,
        });
    };

    weightChangeHandler = (event) => {
        this.setState({ weight: event.target.value });
    };

    pointChangeHandler = () => {
        if (this.notCorrect()) return; //To check if the provided value is suitable or not.

        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node";
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node";

        START_NODE_ROW = parseInt(document.getElementById("start_row").value);
        START_NODE_COL = parseInt(document.getElementById("start_col").value);
        FINISH_NODE_ROW = parseInt(document.getElementById("end_row").value);
        FINISH_NODE_COL = parseInt(document.getElementById("end_col").value);

        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start";
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish";
    };

    notCorrect = () => {
        if (
            isNaN(parseInt(document.getElementById("start_row").value)) ||
            isNaN(parseInt(document.getElementById("start_col").value)) ||
            isNaN(parseInt(document.getElementById("end_row").value)) ||
            isNaN(parseInt(document.getElementById("end_col").value))
        )
            return true;

        if (
            parseInt(document.getElementById("start_row").value) > ROW_MAX_LENGTH ||
            parseInt(document.getElementById("start_col").value) > COL_MAX_LENGTH
        )
            return true;
        if (
            parseInt(document.getElementById("start_row").value) < 0 ||
            parseInt(document.getElementById("start_col").value) < 0
        )
            return true;

        if (
            parseInt(document.getElementById("end_row").value) > ROW_MAX_LENGTH ||
            parseInt(document.getElementById("end_col").value) > COL_MAX_LENGTH
        )
            return true;
        if (
            parseInt(document.getElementById("end_row").value) < 0 ||
            parseInt(document.getElementById("end_col").value) < 0
        )
            return true;

        return false;
    };

    toggleWeight = () => {
        const temp = this.state.changeWeight;
        this.setState({ changeWeight: !temp });
    };

    render() {
        const { grid, mouseIsPressed, topMessage, distanceToBeTraveled } = this.state;

        let changeWeightText = "False";
        if (this.state.changeWeight) changeWeightText = "True";

        return (
            <div className="pathfindingVisualizer">
                <Header
                    grid={grid}
                    topMessage={topMessage}
                    showPopUp={showPopUp}
                    distanceToBeTraveled={distanceToBeTraveled}
                    changeWeightText={changeWeightText}
                    clearGrid={this.clearGrid}
                    animateMaze={this.animateMaze}
                    visualizeDijkstra={this.visualizeDijkstra}
                    toggleWeight={this.toggleWeight}
                    pointChangeHandler={this.pointChangeHandler}
                    changeAlgorithm={this.changeAlgorithm}
                />

                <div className="visualGridContainer">
                    <div className="gridBox">
                        <table className="grid" style={{ borderSpacing: "0" }}>
                            <tbody>
                                {grid.map((row, rowIndex) => {
                                    return (
                                        <tr key={rowIndex}>
                                            {row.map((node, nodeIndex) => {
                                                const { isStart, isFinish, isWall, isWeight } = node; //Extracting from the node
                                                return (
                                                    <Node
                                                        row={rowIndex}
                                                        col={nodeIndex}
                                                        key={rowIndex + "-" + nodeIndex}
                                                        isStart={isStart}
                                                        isFinish={isFinish}
                                                        isWall={isWall}
                                                        isWeight={isWeight}
                                                        mouseIsPressed={mouseIsPressed}
                                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                                        onMouseUp={() => this.handleMouseUp()}
                                                    ></Node>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < ROW_MAX_LENGTH; row++) {
        const currentRow = [];
        for (let col = 0; col < COL_MAX_LENGTH; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isWeight: false,
        previousNode: null,
        weight: 0,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
        ...node, // copying other properties of the node
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const getNewGridWithWeightToggled = (grid, row, col, weight) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
        ...node, // copying other properties of the node
        isWeight: !node.isWeight,
        weight: parseInt(weight),
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const getGridWithNewWall = (grid, row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
        ...node, // copying other properties of the node
        isWall: true,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
