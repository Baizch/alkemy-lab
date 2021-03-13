const router = require("express").Router();

const apiTransactionsRouter = require("./api/transactions");

router.use("/transactions", apiTransactionsRouter);

module.exports = router;
