const Sequelize = require("sequelize");
const transactionModel = require("./models/transactions");

const sequelize = new Sequelize("0hDQgojNHa", "0hDQgojNHa", "SHMKQOuTWe", {
  host: "remotemysql.com",
  dialect: "mysql",
});

const Transaction = transactionModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = {
  Transaction,
};
