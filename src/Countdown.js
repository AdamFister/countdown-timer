import React, { Component } from "react";
import "./App.css";

class Countdown extends Component {

    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        run: false
    };

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: this.state.timerTime
        });

        this.timer = setInterval(() => {
            const newTime = this.state.timerTime - 10;
            if (newTime >= 0) {
                this.setState({
                    timerTime: newTime
                });
            } else {
                clearInterval(this.timer);
                this.setState({ timerOn: false });
                alert("Countdown ended");
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
        console.log("INPUT ", input)
    }

    render() {
        const { timerTime, timerStart, timerOn } = this.state;

        let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);

        return (
            <div>
                <div className="Countdown-header">Countdown</div>
                <div className="Countdown-label">Minutes : Seconds</div>
                <div className="Countdown-display">
                    <button onClick={() => this.adjustTimer("incMinutes")}>&#8679;</button>
                    <button onClick={() => this.adjustTimer("incSeconds")}>&#8679;</button>
                    <div className="Countdown-time">
                        {minutes} : {seconds}
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
                    <button onClick={ () => this.speedChangeClick(1)}>1x</button>
                    <button onClick={ () => this.speedChangeClick(1.5)}>1.5x</button>
                    <button onClick={ () => this.speedChangeClick(2)}>2x</button>
                </div>
            </div>
        );
    }
}

export default Countdown;