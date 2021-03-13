module.exports = (sequelize, type) => {
  return sequelize.define("transaction", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: type.STRING,
    amount: type.INTEGER,
    date: type.DATE,
    transactionType: type.STRING,
  });
};
