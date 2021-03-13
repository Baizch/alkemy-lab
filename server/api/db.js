const Sequelize = require("sequelize");
const transactionModel = require("./models/transactions");
const userModel = require("./models/users");

const sequelize = new Sequelize("0hDQgojNHa", "0hDQgojNHa", "SHMKQOuTWe", {
  host: "remotemysql.com",
  dialect: "mysql",
});

const Transaction = transactionModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = {
  Transaction,
  User,
};
