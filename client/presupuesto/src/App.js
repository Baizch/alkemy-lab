import React, { Component } from "react";
import Header from "./components/Header/Header";
import { Balance } from "./components/Balance/Balance";
import TransactionBox from "./components/Transaction/Transactions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//app
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Header title="Tu saldo es" />
          <Balance />
          <br />
          <TransactionBox />
        </div>
      </div>
    );
  }
}

export default App;
