'use strict';
module.exports = (sequelize, DataTypes) => {
  const nota = sequelize.define('nota', {
    alumno: DataTypes.STRING,
    id_materia: DataTypes.INTEGER,
    parc_1: DataTypes.INTEGER,
    parc_2: DataTypes.INTEGER,
    recu_1: DataTypes.INTEGER,
    recu_2: DataTypes.INTEGER,
    integrador: DataTypes.INTEGER
  }, {});
  nota.associate = function(models) {
    // associations can be defined here
    nota.belongsTo(models.materia,    // modelo al que pertenece
      {
        as : 'Materia-Relacionada',     // nombre de mi relacion
        foreignKey: 'id_Materia'        // campo con el que voy a igualar
      })
  };
  return nota;
};