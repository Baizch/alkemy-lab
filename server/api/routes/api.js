const router = require("express").Router();

const middleWares = require("./middlewares");
const apiTransactionsRouter = require("./api/transactions");
const apiUsersRouter = require("./api/users");

router.use("/transactions", middleWares.checkToken, apiTransactionsRouter);
router.use("/users", apiUsersRouter);

module.exports = router;
