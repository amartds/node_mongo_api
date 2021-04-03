const Customer = require('../models/Customer');
const ValidatorContract = require('../validator/fluentValidator');
const CustomerRepository = require('../repositories/customer-repository');
const md5 = require('md5');
const Mail = require('../services/mail/lib/Mail');

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
    await CustomerRepository.post({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + process.env.APP_SECRET),
    });
    Mail.sendMail({
      to: `${req.body.name} <${req.body.email}`,
      subject: 'Oi, eu disse Oi',
      template: 'send',
      context: {
        provider: req.body.name,
        user: req.body.name,
        date: new Date(),
      },
    });
    res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
  } catch (error) {
    res.status(500).send(error);
  }
};
