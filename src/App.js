import React, { Component } from "react";
import Header from "./shared/Header";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>I am app component!</p>
      </div>
    );
  }
}

export default App;
