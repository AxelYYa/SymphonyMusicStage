'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Usuarios.associate = function(models) {
    Usuarios.belongsTo(models.Roles, { foreignKey: 'rolId', as: 'rol' });
    Usuarios.belongsTo(models.Personas, { foreignKey: 'personaId', as: 'persona' });
  };
  return Usuarios;
};