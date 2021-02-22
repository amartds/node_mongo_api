const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  res.status(201).send(req.body);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  res.status(201).send(`Parametro enviado ${id}`);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  res.status(200).send({
    id,
    title: "qualquer coisa",
  });
});

module.exports = router;
