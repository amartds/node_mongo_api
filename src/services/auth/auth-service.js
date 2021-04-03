'use-strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: '1d' });
};

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, process.env.APP_SECRET);
  return data;
};

exports.authorize = function (req, res, next) {
 let { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      message: 'token inválido',
    });
  } else {
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.APP_SECRET, function (error, decoded) {
      if (error) {
        res.status(401).json({ message: 'Token inválido' });
      } else {
        next();
      }
    });
  }
};
