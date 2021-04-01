'use-strict'
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  createDate :{
    type: Date,
    required: true,
    default: Date.now
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created'
  },
  items: [{
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }]
})

module.exports = mongoose.model('Order', orderSchema)