'use strict';
module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define('Productos', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {});
  Productos.associate = function(models) {
    // associations can be defined here
  };
  return Productos;
};