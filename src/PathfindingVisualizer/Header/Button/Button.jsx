import React from "react";

const Button = ({ topMessage, distanceToBeTraveled, visualizeDijkstra }) => {
    var button_task;

    switch (topMessage) {
        case "Shortest Path":
            button_task = (
                <div href="#" onClick={() => window.location.reload(false)} style={{ fontSize: "16px" }}>
                    Reset <br />
                    Time : {distanceToBeTraveled}
                    <small> [1 Block = 1 Time = 1 Weight]</small>
                </div>
            );
            break;
        case "Creator : Adrian":
            button_task = <h3 className="running">Running...</h3>;
            break;
        default:
            button_task = (
                <button onClick={visualizeDijkstra} className="inline-block runBtn">
                    Run
                </button>
            );
            break;
    }

    return <> {button_task} </>;
};

export default Button;
