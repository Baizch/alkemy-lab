import React, { Component } from "react";
import Header from "./components/Header/Header";
import Balance from "./components/Balance/Balance";
import TransactionBox from "./components/Transaction/Transactions";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

//app
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Tu saldo es" />
        <Balance />
        <br />
        <TransactionBox />
      </div>
    );
  }
}

export default App;
