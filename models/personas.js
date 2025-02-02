'use strict';
module.exports = (sequelize, DataTypes) => {
  const Personas = sequelize.define('Personas', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  Personas.associate = function(models) {
    // associations can be defined here
  };
  return Personas;
};