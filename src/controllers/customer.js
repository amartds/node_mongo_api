const Customer = require('../models/Customer');
const ValidatorContract = require('../validator/fluentValidator');
const CustomerRepository = require('../repositories/customer-repository');

exports.post = async (req, res, next) => {
  let contract = new ValidatorContract();
  contract.hasMinLen(req.body.name,'3','o nome deve ter pelo menos 3 caracteres');
  contract.isEmail(req.body.email,'deve ser um email');
  contract.hasMinLen(req.body.password,'3','deve ser uma senha válida');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  try {
    await CustomerRepository.post(req.body);
    res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
  } catch (error) {
    res.status(500).send(error);
  }
};
