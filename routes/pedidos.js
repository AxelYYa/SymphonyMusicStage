const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.post('/', pedidosController.createPedido);
router.put('/:id/aceptar', pedidosController.aceptarPedido);
router.put('/:id/entregar', pedidosController.entregarPedido);
router.put('/:id/procesar', pedidosController.procesarPedido);
router.put('/:id/revertir', pedidosController.revertirPedido);

module.exports = router;