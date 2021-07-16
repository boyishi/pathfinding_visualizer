import React from "react";
import ButtonTask from "../Button/Button";

let ROW_MAX_LENGTH = 20;
let COL_MAX_LENGTH = 40;

const Header = ({
    topMessage,
    distanceToBeTraveled,
    visualizeDijkstra,
    weightChangeHandler,
    toggleWeight,
    changeWeightText,
    pointChangeHandler,
}) => {
    console.log(visualizeDijkstra);
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
                        <label htmlFor="quantity">Toggle or Set Weight </label>

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

                    <div className="startPointContainer">
                        <label htmlFor="point">Start Point :</label>
                        <input
                            type="number"
                            name="point"
                            id="start_row"
                            min="0"
                            max={ROW_MAX_LENGTH - 1}
                            onChange={pointChangeHandler}
                            defaultValue="9"
                        ></input>
                        <input
                            type="number"
                            name="point"
                            id="start_col"
                            min="0"
                            max={COL_MAX_LENGTH - 1}
                            onChange={pointChangeHandler}
                            defaultValue="8"
                        ></input>
                    </div>

                    <div className="endPointContainer">
                        <label htmlFor="point">End Point :</label>
                        <input
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

                    <div className="buttonContainer">
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

    return <> {textBox} </>;
};

export default Header;
