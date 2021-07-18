import React from "react";
import ButtonTask from "./Button/Button";
import "./Header.css";

let ROW_MAX_LENGTH = 20;
let COL_MAX_LENGTH = 40;

const Header = ({
    grid,
    animateMaze,
    topMessage,
    showPopUp,
    clearGrid,
    distanceToBeTraveled,
    visualizeDijkstra,
    weightChangeHandler,
    toggleWeight,
    changeWeightText,
    pointChangeHandler,
    changeAlgorithm,
}) => {
    var textBox;
    switch (topMessage) {
        case "Creator : Adrian":
            textBox = null;
            break;
        case "Shortest Path":
            textBox = (
                <div className="buttonContainer" style={{ width: "30%", margin: "0 auto" }}>
                    <ButtonTask
                        topMessage={topMessage}
                        distanceToBeTraveled={distanceToBeTraveled}
                        visualizeDijkstra={visualizeDijkstra}
                    />
                </div>
            );
            break;
        default:
            textBox = (
                <div className="textBox">
                    <div className="weightContainer">
                        <label htmlFor="quantity">Toggle or Set Weight</label>
                        <div className="mt-1">
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                max="5"
                                onChange={weightChangeHandler}
                                defaultValue="1"
                            />

                            <button onClick={toggleWeight}>{changeWeightText}</button>
                        </div>
                    </div>

                    <div className="startPointContainer">
                        <label htmlFor="quantity"> Start Point: </label>
                        <div className="mt-1">
                            <input
                                className="mr-2"
                                type="number"
                                id="start_row"
                                name="point"
                                min="0"
                                max={ROW_MAX_LENGTH - 1}
                                onChange={pointChangeHandler}
                                defaultValue="9"
                            />
                            <input
                                type="number"
                                id="start_col"
                                name="point"
                                min="0"
                                max={ROW_MAX_LENGTH}
                                onChange={pointChangeHandler}
                                defaultValue="9"
                            />
                        </div>
                    </div>

                    <div className="endPointContainer">
                        <label htmlFor="point">End Point: </label>
                        <div className="mt-1">
                            <input
                                className="mr-2"
                                type="number"
                                name="point"
                                id="end_row"
                                min="0"
                                max={ROW_MAX_LENGTH - 1}
                                onChange={pointChangeHandler}
                                defaultValue="9"
                            ></input>
                            <input
                                type="number"
                                name="point"
                                id="end_col"
                                min="0"
                                max={COL_MAX_LENGTH - 1}
                                onChange={pointChangeHandler}
                                defaultValue="31"
                            ></input>
                        </div>
                    </div>
                    <div>
                        <button className="customBtn" onClick={clearGrid}>
                            Clear Grid
                        </button>
                        <button className="customBtn" onClick={() => animateMaze(grid)}>
                            Generate Maze
                        </button>
                    </div>
                    <div className="mt-4">
                        <select onChange={changeAlgorithm}>
                            <option value="Dijkstra"> Dijkstra </option>
                            <option value="DFS"> DFS </option>
                        </select>

                        <ButtonTask
                            topMessage={topMessage}
                            distanceToBeTraveled={distanceToBeTraveled}
                            visualizeDijkstra={visualizeDijkstra}
                        />
                    </div>
                </div>
            );
            break;
    }

    return (
        <div className="container">
            <div className="heading">
                <h2 onClick={showPopUp}>Search Visualizer</h2>
                <h2>{topMessage}</h2>
            </div>
            <div>{textBox}</div>
        </div>
    );
};

export default Header;
