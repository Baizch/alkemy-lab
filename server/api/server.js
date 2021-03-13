const express = require("express");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/api");

const app = express();

require("./db");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(3001, () => {
  console.log("Está vivo!");
});
