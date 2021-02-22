const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Nodejs API",
    version: "",
  });
});

const create = router.post("/", (req, res, next) => {
  res.status(201).send(req.body);
});

const update = router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  res.status(201).send(`Parametro enviado ${id}`);
});

app.use("/", route);

module.exports = app;
