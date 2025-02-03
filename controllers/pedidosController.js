const { Pedidos } = require('../models');

exports.createPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.create({
      fecha_realizacion: req.body.fecha_realizacion,
      clienteId: req.body.clienteId,
      direccion: req.body.direccion,
      estado_envio: req.body.estado_envio,
      estado_pago: req.body.estado_pago,
      forma_pagoId: req.body.forma_pagoId
    });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};