"use strict";
const mongoose = require("mongoose");
const Order = mongoose.model("Order");


exports.get = async (data) => {
  let order = await Order.find({}, 'status customer items')
  .populate('customer', 'name email').
  populate('items.product', 'price product title slug description')
  return order;
}

exports.post = async (body) => {
  var order = new Order(body);
  await order.save();
};
