const express = require("express");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/api");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res, next) {
  console.log(req.body);
  res.send("response");
});

app.use("/api", apiRouter);

app.listen(3001, () => {
  console.log("Está vivo!");
});
