import React from "react";

const Button = ({ topMessage, distanceToBeTraveled, visualizeDijkstra }) => {
    console.log(visualizeDijkstra);
    var button_task;

    switch (topMessage) {
        case "Shortest Path":
            button_task = (
                <h2 className="btn" href="#" onClick={() => window.location.reload(false)}>
                    Reset <br />
                    Time : {distanceToBeTraveled}
                    <small> [1 Block = 1 Time = 1 Weight]</small>
                </h2>
            );
            break;
        case "Creator : Adrian":
            button_task = <h3 className="running">Running...</h3>;
            break;
        default:
            button_task = (
                <p className="btn" onClick={visualizeDijkstra}>
                    Start Dijkstra Algorithm
                </p>
            );
            break;
    }

    return <> {button_task} </>;
};

export default Button;
