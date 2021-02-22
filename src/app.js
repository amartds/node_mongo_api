const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const index = require("./routes/index");
const product = require("./routes/product");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", index);
app.use("/product", product);

module.exports = app;
