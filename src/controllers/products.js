const Product = require("../models/Product");

exports.get =
  ("products/",
  (req, res, next) => {
    Product.find({ active: true }, "title slug price")
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: "nada encontrado" });
      });
  });

exports.getBySlug = (req, res, next) => {
  Product.findOne(
    { active: true, slug: req.params.slug },
    "title slug price description"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "not found",
      });
    });
};

exports.getById = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "not found",
      });
    });
};

exports.getByTags = (req, res, next) => {
  Product.find({ tags: req.params.tag })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "not found",
      });
    });
};

exports.post =
  ("/",
  (req, res, next) => {
    let product = new Product(req.body);
    product
      .save()
      .then((s) => {
        res.status(201).send({
          message: "success",
        });
      })
      .catch((e) => {
        res.status(400).send({
          message: "error",
        });
      });
  });

exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug,
    },
  })
    .then((data) => {
      res.status(201).send({ message: "success" });
    })
    .catch((err) => {
      res.status(201).send({ message: "error" });
    });
};

exports.delete = ((req, res, next) => {
  Product.findOneAndRemove(req.params.id)
    .then((data) => {
      res.status(201).send({ message: "success" });
    })
    .catch((err) => {
      res.status(201).send({ message: "error" });
    });
});
