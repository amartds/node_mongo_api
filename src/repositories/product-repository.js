"use strict";
const mongoose = require("mongoose");
const ProductModel = mongoose.model("Product");

exports.get = async () => {
  return await ProductModel.find({ active: true }, "title slug price");
};

exports.slug = async (slug) => {
  return await ProductModel.findOne(
    { active: true, slug: slug },
    "title slug price description"
  );
};

exports.getById = async (id) => {
  return await ProductModel.findOne({ _id: id });
};

exports.getByTags = (tag) => {
  return ProductModel.find({ tags: tag });
};

exports.post = async (body) => {
  var product = new ProductModel(body);
  await product.save();
};

exports.put = async (id, body) => {
  await ProductModel.findByIdAndUpdate(id, {
    $set: {
      title: body.title,
      description: body.description,
      price: body.price,
      slug: body.slug,
    },
  });
};

exports.delete = async (id) => {
  await ProductModel.findOneAndRemove(id)
};
