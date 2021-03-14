import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

/*const transaction = axios.create({
  baseURL: "http://localhost:3001/api/transactions/",
});*/

class App extends Component {
  //state
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      isLoading: false,
      isError: false,
    };
  }

  //async get request
  async componentDidMount() {
    this.setState({ isLoading: true });

    const resp = await fetch("http://localhost:3001/api/transactions/");

    //check the answer
    if (resp.ok) {
      const transactions = await resp.json();
      /*console.log(transactions);*/
      this.setState({ transactions, isLoading: false });
    } else {
      this.setState({ isError: true, isLoading: false });
    }
  }

  //render table functions
  renderTableHeader = () => {
    return Object.keys(this.state.transactions[0]).map((attribute) => (
      <th key={attribute}>{attribute.toUpperCase()}</th>
    ));
  };

  renderTableRows = () => {
    return this.state.transactions.map((transaction) => {
      return (
        <tr key={transaction.id}>
          <td>{transaction.id}</td>
          <td>{transaction.description}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.date}</td>
          <td>{transaction.transactionType}</td>
          <td>
            <button className="btn">Editar</button>
          </td>
          <td>
            <button className="btn">Eliminar</button>
          </td>
        </tr>
      );
    });
  };

  //App
  render() {
    const { transactions, isLoading, isError } = this.state;
    if (isLoading) {
      return <div>Cargando...</div>;
    }

    if (isError) {
      return <div>Error...</div>;
    }

    return transactions.length > 0 ? (
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
          <tbody>{this.renderTableRows()}</tbody>
        </table>
      </div>
    ) : (
      <div>No hay información para mostrar...</div>
    );
  }
}
/*{this.renderTableHeader()}*/

export default App;
