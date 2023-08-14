const db = require("../models");
const Favorite = db.favorite;

exports.create = (req, res) => {
  Favorite.create(req.body)
    .then(() => {
      res.status(201).send({ message: "Data berhasil disimpan" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Favorite.find()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  Favorite.deleteOne({ title: req.params.id })
    .then(() => res.send({ message: "deleted" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
