import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "https://localhost:44302/api/empresas";

class App extends Component {
  state = {
    transactions: [],
  };

  getPetition = () => {
    axios.get(url).then((response) => {
      console.log(response.transactions);
    });
  };

  componentDidMount() {
    this.getPetition();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Tu saldo es de:</h1> <br />
          <p>$0</p>
        </div>
        <br />
        <button className="btn btn-success">Nueva operación</button>
        <br /> <br />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

export default App;
