const router = require("express").Router();

const { Transaction } = require("../../db");

//get method
router.get("/", async (req, res) => {
  console.log(req.userId);
  const transactions = await Transaction.findAll();
  res.json(transactions);
});

//post method
router.post("/", async (req, res) => {
  const transaction = await Transaction.create(req.body);
  res.json(transaction);
});

//put method
router.put("/:transactionId", async (req, res) => {
  await Transaction.update(req.body, {
    where: { id: req.params.transactionId },
  });
  res.json({ success: "Registro actualizado con éxito" });
});

//delete method
router.delete("/:transactionId", async (req, res) => {
  await Transaction.destroy({
    where: { id: req.params.transactionId },
  });
  res.json({ success: "Registro eliminado con éxito" });
});

module.exports = router;
