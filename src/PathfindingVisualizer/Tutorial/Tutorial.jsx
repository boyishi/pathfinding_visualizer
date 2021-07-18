import React, { Component } from "react";

import start from "../Node/images/start.png"; // Tell webpack this JS file uses this image
import end from "../Node/images/end.png";
import weight from "../Node/images/weight.png";
import visitedWeight from "../Node/images/visitedWeight.png";
import pathWeight from "../Node/images/pathWeight.png";
import "./Tutorial.css";

export class Tutorial extends Component {
    componentDidMount() {
        document.addEventListener("DOMContentLoaded", function () {
            if (getCookie("visited") == null) {
                showPopUp();
                console.log("h");
                setCookie("visited", true);
            } else {
                skipPopUp();
            }
        });
    }
    render() {
        return (
            <div className="PopUpTextBox">
                <header>
                    <p>Welcome to Dijkstra Search Visualizer</p>
                    <h3 onClick={skipPopUp}>x</h3>
                </header>

                <div className="PopUpIntroductionText">
                    <h3>Quick Walkthrough to Visualizer</h3>
                    <div className="row">
                        <div className="col-4 ">
                            <label htmlFor="start">Start : </label>
                            <div>
                                <img src={start} name="start" alt="" />
                            </div>
                        </div>

                        <div className="col-4">
                            <label htmlFor="end" className="mr-3">
                                End:
                            </label>
                            <div>
                                <img src={end} name="end" alt="" />
                            </div>
                        </div>

                        <div className="col-4">
                            <label htmlFor="wall" className="mr-3">
                                Wall:
                            </label>

                            <div style={{ background: "black" }} className="wall"></div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4">
                            <label htmlFor="weight">Weight : </label>
                            <div>
                                <img src={weight} name="weight" alt="" />
                            </div>
                        </div>
                        <div className="col-4">
                            <label htmlFor="pathWeight" className="mr-3">
                                Weighted Path :{" "}
                            </label>
                            <div>
                                <img src={pathWeight} name="pathWeight" alt="" />
                            </div>
                        </div>

                        <div className="col-4">
                            <label htmlFor="visitedWeight" className="mr-3">
                                Visited Weight:
                            </label>
                            <div>
                                <img src={visitedWeight} name="visitedWeight" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="skipBox mt-3">
                    <small>
                        *You can view this anytime by clicking on <span>[Search Visualizer]</span>
                    </small>
                    <button onClick={skipPopUp}>Done!</button>
                </div>
            </div>
        );
    }
}

export const skipPopUp = () => {
    const Popup = document.querySelector(".PopUp");
    const pathfindingVisualizer = document.querySelector(".pathfindingVisualizer");
    Popup.style.display = "none";
    pathfindingVisualizer.style.filter = "none";
};

export const showPopUp = () => {
    const Popup = document.querySelector(".PopUp");
    const pathfindingVisualizer = document.querySelector(".pathfindingVisualizer");
    Popup.style.display = "block";
    pathfindingVisualizer.style.filter = " blur(4px)";
};

///////////////////////////////////////////////////////////////////
function setCookie(name, value) {
    var cookie = name + "=" + escape(value) + ";";
    document.cookie = cookie;
}

function getCookie(name) {
    var chunks = document.cookie.split(";");
    for (var i = chunks.length; i--; ) {
        if (chunks[i].trim().split("=")[0].trim() === name) {
            return chunks[i].trim().split("=")[1].trim();
        }
    }
    return null;
}
