'use strict';
module.exports = (sequelize, DataTypes) => {
  const facultad = sequelize.define('facultad', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});
  facultad.associate = function(models) {
    // associations can be defined here
    /**/
    facultad.belongsTo(models.carrera,    // modelo al que pertenece
      {
        as : 'Carrera-Relacionada',     // nombre de mi relacion
        foreignKey: 'id_carrera'        // campo con el que voy a igualar
      })
  };
  return facultad;
};