require('dotenv').config({ path: './.env' });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const index = require("./routes/index");
const product = require("./routes/product");
require('./database/index');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", index);
app.use("/product", product);
app.use("/products", product);

module.exports = app;