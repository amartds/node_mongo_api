exports.post = ("/", (req, res, next) => {
  res.status(201).send(req.body);
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