import React, { Component } from "react";
import "./App.css";

class Countdown extends Component {

    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        timerSpeed: 10,
        halfwayTime: 0,
        timerDone: false,
        timerStarted: false
    };

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: this.state.timerTime,
            halfwayTime: this.state.timerTime / 2 + 500,
            timerStarted: true,
            timerDone: false,
        });

        this.timer = setInterval(() => {
            const newTime = this.state.timerTime - this.state.timerSpeed;
            if (newTime >= 0) {
                this.setState({
                    timerTime: newTime
                });
            } else {
                clearInterval(this.timer);
                this.setState({
                    timerOn: false,
                    timerDone: true,
                    timerStarted: false,
                    timerBlink: false,
                });
            }
        }, 10);

    };

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
    };

    resetTimer = () => {
        if (this.state.timerOn === false) {
            this.setState({
                timerTime: this.state.timerStart
            });
        }
    };

    adjustTimer = input => {
        const { timerTime, timerOn } = this.state;
        const max = 216000000;
        if (!timerOn) {
            if (input === "incMinutes" && timerTime + 60000 < max) {
                this.setState({ timerTime: timerTime + 60000 });
            } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
                this.setState({ timerTime: timerTime - 60000 });
            } else if (input === "incSeconds" && timerTime + 1000 < max) {
                this.setState({ timerTime: timerTime + 1000 });
            } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
                this.setState({ timerTime: timerTime - 1000 });
            }
        }
    };

    speedChangeClick = input => {
        this.setState({ timerSpeed: input });
    }

    render() {
        let notification;
        let timerRed = false;
        let timerBlink = false;

        if (this.state.timerTime <= this.state.halfwayTime && this.state.timerOn) {
            notification = <div>"More than halfway there!"</div>
        }
        else if (this.state.timerDone) {
            notification = <div>"Time's up!"</div>
        }
        else {
            notification = <div></div>
        }

        if (this.state.timerTime <= 21000 && this.state.timerStarted) {
            timerRed = true;
            if (this.state.timerTime <= 11000 && this.state.timerStarted) {
                timerBlink = true;
            }
        }

        const { timerTime, timerStart, timerOn } = this.state;

        let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);

        return (
            <div>
                {notification}
                <div className="Countdown-header">Countdown</div>
                <div className="Countdown-label">Minutes : Seconds</div>
                <div className="Countdown-display">
                    <button onClick={() => this.adjustTimer("incMinutes")}>&#8679;</button>
                    <button onClick={() => this.adjustTimer("incSeconds")}>&#8679;</button>
                    <div className={timerRed === false ? "Countdown-time" : "Countdown-red"}>
                        <div className={timerBlink === false ? "Countdown-time" : "Countdown-blink"}>
                            {minutes} : {seconds}
                        </div>
                    </div>
                    <button onClick={() => this.adjustTimer("decMinutes")}>&#8681;</button>
                    <button onClick={() => this.adjustTimer("decSeconds")}>&#8681;</button>
                </div>
                {timerOn === false &&
                    (timerStart === 0 || timerTime === timerStart) && (
                        <button onClick={this.startTimer}>Start</button>
                    )}
                {timerOn === true && timerTime >= 1000 && (
                    <button onClick={this.stopTimer}>Pause</button>
                )}
                {timerOn === false &&
                    (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
                        <button onClick={this.startTimer}>Resume</button>
                    )}
                {(timerOn === false || timerTime < 1000) &&
                    (timerStart !== timerTime && timerStart > 0) && (
                        <button onClick={this.resetTimer}>Reset</button>
                    )}
                <div>
                    <button onClick={() => this.speedChangeClick(10)}>1x</button>
                    <button onClick={() => this.speedChangeClick(15)}>1.5x</button>
                    <button onClick={() => this.speedChangeClick(20)}>2x</button>
                </div>
            </div>
        );
    }
}

export default Countdown;