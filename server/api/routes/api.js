const router = require("express").Router();

const apiTransactionsRouter = require("./api/transactions");
const apiUsersRouter = require("./api/users");

router.use("/transactions", apiTransactionsRouter);
router.use("/users", apiUsersRouter);

module.exports = router;
