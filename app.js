const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);

// Otras rutas pueden ser añadidas aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});