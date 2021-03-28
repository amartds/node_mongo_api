const Product = require('../models/Product');
const ValidatorContract = require('../validator/fluentValidator');
const ProductRepository = require('../repositories/product-repository');

exports.get = ('products/', async (req, res, next) => {
    try {
      const response = await ProductRepository.get();
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send({ message: 'nada encontrado' });
    }
  });

exports.getBySlug = async (req, res, next) => {
  try {
    const response = await ProductRepository.slug(req.params.slug);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send({ messate: 'nada encontrado' });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const response = await ProductRepository.getById(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send({
      message: 'nada encontrado',
    });
  }
};

exports.getByTags = async (req, res, next) => {
  try {
    const response = await ProductRepository.getByTags(req.params.tag);
    return res.status(200).send(response);
  } catch (error) {
    res.status(400).send({
      message: 'not found',
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidatorContract();
  contract.hasMinLen(req.body.title,'3','o titulo deve ter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug,'3','o slug deve ter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description,'3','a descrição deve ter pelo menos 3 caracteres');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  try {
    await ProductRepository.post(req.body);
    res.status(201).send({ message: 'produto cadastrado com sucesso' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.put = async (req, res, next) => {  
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        slug: req.body.slug,
      },
    })
    res.status(201).send({ message: 'success' });
  } catch (err) {
    res.status(201).send({ message: 'error' });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Product.findOneAndRemove(req.params.id)
    return res.status(201).send({ message: 'success' });
  } catch (err) {
    return res.status(201).send(err);
  }
};
