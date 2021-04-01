"use strict";
const mongoose = require("mongoose");
const CustomerModel = mongoose.model("Customer");

exports.get = async () => {
  return await CustomerModel.find({ active: true }, "title slug price");
};

exports.post = async (body) => {
  var customer = new CustomerModel(body);
  await customer.save();
};
