'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  
    /**/
  //codigo de asociacion  (tiene muchos:)

  carrera.associate = function(models) {

  	carrera.hasMany(models.materia,         // Modelo al que pertenece
    {
      as: 'Carrera-Relacionada',            // nombre de mi relacion
      primaryKey: 'id'                      // campo con el que voy a igualar 
    })

  	carrera.hasMany(models.alumno,          // Modelo al que pertenece
    {
      as: 'Alumno-Relacionado',             // nombre de mi relacion
      primaryKey: 'id'                      // campo con el que voy a igualar 
    })


  };
  ///////////////////////

 
  return carrera;
};