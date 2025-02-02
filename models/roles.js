'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Roles.associate = function(models) {
    // associations can be defined here
  };
  return Roles;
};