const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.post('/', productosController.createProducto);

module.exports = router;