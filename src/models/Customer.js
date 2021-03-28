'use-strict'
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required:true,
    trim: true,
    index: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Customer', productSchema)