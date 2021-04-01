const Product = require('../models/Order');
const guid = require('guid');
const OrderRepository = require('../repositories/order-repository');

exports.get = (async (req, res, next) => {
    try {
      const response = await OrderRepository.get();
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send({ message: 'nada encontrado' });
    }
});

exports.post = async (req, res, next) => {
  try {
    await OrderRepository.post({
      customer : req.body.customer,
      number: guid.raw().substring(0,6),
      items: req.body.items,
    });
    res.status(201).send({ message: 'pedido cadastrado com sucesso' });
  } catch (error) {
    res.status(500).send(error);
  }
};