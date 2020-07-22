import React, { Component } from "react";
import Countdown from "./Components/Countdown";

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-title">Countdown Timer</div>
        <div className="Timer">
          <Countdown />
        </div>
      </div>
    );
  }
}

export default App;
