const { Pedidos, DetallesDePedido, sequelize } = require('../models');

exports.createPedido = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const pedido = await Pedidos.create({
      fecha_realizacion: req.body.fecha_realizacion,
      clienteId: req.body.clienteId,
      direccion: req.body.direccion,
      estado_envio: req.body.estado_envio,
      estado_pago: req.body.estado_pago,
      forma_pagoId: req.body.forma_pagoId
    }, { transaction: t });

    const detalles = req.body.detalles.map(detalle => ({
      pedidoId: pedido.id,
      productoId: detalle.productoId,
      cantidad: detalle.cantidad,
      precio: detalle.precio
    }));

    await DetallesDePedido.bulkCreate(detalles, { transaction: t });

    await t.commit();
    res.status(201).json(pedido);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

exports.aceptarPedido = async (req, res) => {
  console.log('Solicitud para aceptar pedido recibida');
  try {
    const pedido = await Pedidos.findByPk(req.params.id);
    if (!pedido) {
      console.log('Pedido no encontrado');
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (pedido.estado_envio !== 'En Proceso') {
      return res.status(400).json({ message: 'El pedido no está en estado En Proceso' });
    }

    pedido.repartidorId = req.body.repartidorId;
    pedido.estado_envio = 'En Camino';
    await pedido.save();

    console.log('Pedido aceptado:', pedido);
    res.status(200).json(pedido);
  } catch (error) {
    console.log('Error al aceptar pedido:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.entregarPedido = async (req, res) => {
  console.log('Solicitud para entregar pedido recibida');
  try {
    const pedido = await Pedidos.findByPk(req.params.id);
    if (!pedido) {
      console.log('Pedido no encontrado');
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (pedido.estado_envio !== 'En Camino') {
      return res.status(400).json({ message: 'El pedido no está en estado En Camino' });
    }

    pedido.estado_envio = 'Entregado';
    pedido.fecha_entrega = new Date();
    await pedido.save();

    console.log('Pedido entregado:', pedido);
    res.status(200).json(pedido);
  } catch (error) {
    console.log('Error al entregar pedido:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.procesarPedido = async (req, res) => {
  console.log('Solicitud para procesar pedido recibida');
  try {
    const pedido = await Pedidos.findByPk(req.params.id);
    if (!pedido) {
      console.log('Pedido no encontrado');
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (pedido.estado_envio !== 'Pendiente') {
      return res.status(400).json({ message: 'El pedido no está en estado Pendiente' });
    }

    pedido.estado_envio = 'En Proceso';
    await pedido.save();

    console.log('Pedido en proceso:', pedido);
    res.status(200).json(pedido);
  } catch (error) {
    console.log('Error al procesar pedido:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.revertirPedido = async (req, res) => {
  console.log('Solicitud para revertir pedido recibida');
  try {
    const pedido = await Pedidos.findByPk(req.params.id);
    if (!pedido) {
      console.log('Pedido no encontrado');
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (pedido.estado_envio !== 'En Camino') {
      return res.status(400).json({ message: 'El pedido no está en estado En Camino' });
    }

    pedido.estado_envio = 'Pendiente';
    await pedido.save();

    console.log('Pedido revertido a Pendiente:', pedido);
    res.status(200).json(pedido);
  } catch (error) {
    console.log('Error al revertir pedido:', error);
    res.status(400).json({ error: error.message });
  }
};