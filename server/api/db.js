const Sequelize = require('sequelize');
const transactionModel = require('./models/transactions');
const userModel = require('./models/users');

const sequelize = new Sequelize(
  process.env.DB_USER,
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  {
    host: 'remotemysql.com',
    dialect: 'mysql',
  }
);

const Transaction = transactionModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log('Tablas sincronizadas');
});

module.exports = {
  Transaction,
  User,
};
