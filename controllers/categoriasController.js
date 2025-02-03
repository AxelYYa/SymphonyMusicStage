const { Categorias } = require('../models');

exports.createCategoria = async (req, res) => {
  try {
    const categoria = await Categorias.create({
      nombre: req.body.nombre
    });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};