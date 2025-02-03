const { Usuarios } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secret, expiresIn } = require('../config/jwtConfig');

exports.register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.contraseña, 8);
    const usuario = await Usuarios.create({
      correo: req.body.correo,
      contraseña: hashedPassword,
      rolId: req.body.rolId,
      personaId: req.body.personaId,
      direccion: req.body.direccion
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({ where: { correo: req.body.correo } });
    if (!usuario) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.contraseña, usuario.contraseña);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      });
    }

    const token = jwt.sign({ id: usuario.id }, secret, {
      expiresIn: expiresIn
    });

    res.status(200).send({
      id: usuario.id,
      correo: usuario.correo,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};