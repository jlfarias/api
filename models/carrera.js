'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  
  //codigo de asociacion
  carrera.associate = function(models) {
  	carrera.hasMany(models.materia,         // Modelo al que pertenece
    {
      as: 'Materia-Relacionada',            // nombre de mi relacion
      primaryKey: 'id'                      // campo con el que voy a igualar 
    })

  	carrera.hasMany(models.alumno,          // Modelo al que pertenece
    {
      as: 'Alumno-Relacionado',             // nombre de mi relacion
      primaryKey: 'id'                      // campo con el que voy a igualar 
    })

    /*
    carrera.belongsTo(models.facultad,
      {
        as:'Facultad-Relacionada',
        primaryKey: 'id'
    }) */

  };
 
  return carrera;
};