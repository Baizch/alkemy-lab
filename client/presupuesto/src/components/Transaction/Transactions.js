import React, { Component } from "react";
import PubSub from "pubsub-js";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

class TransactionForm extends Component {
  //model state
  state = {
    model: {
      id: 0,
      description: "",
      amount: "",
      transactionType: "",
      date: "",
    },
  };

  //follow state
  setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
  };

  //create transaction
  create = () => {
    this.setState({
      model: {
        id: 0,
        description: "",
        amount: "",
        transactionType: "",
        date: "",
      },
    });
    this.props.transactionCreate(this.state.model);
  };

  //edit transaction
  componentWillMount() {
    PubSub.subscribe("edit-transaction", (topic, transaction) => {
      this.setState({ model: transaction });
    });
  }

  //form render
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="description">Concepto</Label>
          <Input
            id="description"
            type="text"
            value={this.state.model.description}
            placeholder="Venta, compra, etc..."
            onChange={(e) => this.setValues(e, "description")}
            required
          />
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <div className="col-md-6">
              <Label for="amount">Monto</Label>
              <Input
                id="amount"
                type="text"
                value={this.state.model.amount}
                placeholder="$"
                onChange={(e) => this.setValues(e, "amount")}
                required
              />
            </div>
            <div className="col-md-6">
              <Label for="transactionType">Tipo</Label>
              <Input
                id="transactionType"
                type="text"
                value={this.state.model.transactionType}
                placeholder="Ingreso o egreso..."
                onChange={(e) => this.setValues(e, "transactionType")}
                required
                readOnly={!true}
              />
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="date">Fecha</Label>
          <Input
            id="date"
            type="date"
            value={this.state.model.date}
            onChange={(e) => this.setValues(e, "date")}
            required
          />
        </FormGroup>
        <Button color="success" block onClick={this.create}>
          Guardar
        </Button>
      </Form>
    );
  }
}

class TransactionList extends Component {
  //delete call
  delete = (id) => {
    this.props.deleteTransaction(id);
  };

  //update call
  onEdit = (transaction) => {
    PubSub.publish("edit-transaction", transaction);
  };

  //table rows render
  render() {
    const { transactions } = this.props;
    return (
      <Table className="table-bordered text-center" size="sm">
        <thead className="thead-dark">
          <tr>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>{transaction.transactionType}</td>
              <td>
                <Button
                  color="info"
                  size="sm"
                  onClick={(e) => this.onEdit(transaction)}
                >
                  Editar
                </Button>
                {"  "}
                <Button
                  color="danger"
                  size="sm"
                  onClick={(e) => this.delete(transaction.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default class TransactionBox extends Component {
  //api url
  url = "http://localhost:3001/api/transactions";

  //state
  state = {
    transactions: [],
    message: {
      text: "",
      alert: "",
    },
  };

  //get transactions
  componentDidMount() {
    fetch(this.url)
      .then((response) => response.json())
      .then((transactions) => this.setState({ transactions }))
      .catch((e) => console.log(e));
  }

  //save transaction
  save = (transaction) => {
    let data = {
      id: parseInt(transaction.id),
      description: transaction.description,
      amount: parseFloat(transaction.amount),
      transactionType: transaction.transactionType,
      date: transaction.date,
    };
    const requestInfo = {
      method: data.id !== 0 ? "PUT" : "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };

    if (data.id === 0) {
      //create new transaction
      fetch(this.url, requestInfo)
        .then((response) => response.json)
        .then((newTransaction) => {
          let { transactions } = this.state;
          transactions.push(newTransaction);
          this.setState({
            transactions,
            message: {
              text: "¡Operación creada con éxito!",
              alert: "success",
            },
          });
          this.timerMessage(3000);
        })
        .catch((e) => console.log(e));
    } else {
      //edit transaction
      fetch(`${this.url}/${data.id}`, requestInfo)
        .then((response) => response.json)
        .then((updatedTransaction) => {
          let { transactions } = this.state;
          let position = transactions.findIndex(
            (transaction) => transaction.id === data.id
          );
          transactions[position] = updatedTransaction;
          this.setState({
            transactions,
            message: {
              text: "¡Operación actualizada con éxito!",
              alert: "info",
            },
          });
          this.timerMessage(3000);
        })
        .catch((e) => console.log(e));
    }
  };

  //delete transaction
  delete = (id) => {
    fetch(`${this.url}/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((rows) => {
        const transactions = this.state.transactions.filter(
          (transaction) => transaction.id !== id
        );
        this.setState({
          transactions,
          message: {
            text: "¡Operación eliminada con éxito!",
            alert: "danger",
          },
        });
        this.timerMessage(3000);
      })
      .catch((e) => console.log(e));
  };

  //set alert message timer
  timerMessage = (duration) => {
    setTimeout(() => {
      this.setState({ message: { text: "", alert: "" } });
    }, duration);
  };

  //transactions list render
  render() {
    return (
      <div>
        {this.state.message.text !== "" ? (
          <Alert color={this.state.message.alert} className="text-center">
            {this.state.message.text}
          </Alert>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold">Alta de operación</h2>
            <br />
            <TransactionForm transactionCreate={this.save} />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold">Lista de operaciones</h2>
            <TransactionList
              transactions={this.state.transactions}
              deleteTransaction={this.delete}
            />
          </div>
        </div>
      </div>
    );
  }
}
