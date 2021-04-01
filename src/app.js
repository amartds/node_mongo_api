require('dotenv').config({ path: './.env' });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const index = require("./routes/index");
const product = require("./routes/product");
const customer = require("./routes/customer");
const order = require("./routes/order");
require('./database/index');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", index);
app.use("/product", product);
app.use("/products", product);
app.use("/customers", customer);
app.use("/orders", order);

module.exports = app;