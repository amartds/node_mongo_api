const Product = require('../models/Product')

exports.post = ("/", (req, res, next) => {
  let product = new Product(req.body);
  product.save().then(s => {
    res.status(201).send({
      "message":"success"
    });
  }).catch(e=>{
    res.status(400).send({
      "message":"error"
    })
  });
});

exports.put = ("/:id", (req, res, next) => {
  const { id } = req.params;
  res.status(201).send(`Parametro enviado ${id}`);
});

exports.delete = ("/:id", (req, res, next) => {
  const { id } = req.params;
  res.status(200).send({
    id,
    title: "qualquer coisa",
  });
});