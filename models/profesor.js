'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});
  profesor.associate = function(models) {
    // associations can be defined here

      /* belongTo: la clave para la asociacion existe en el modelo de origen */
        profesor.belongsTo(models.materia// modelo al que pertenece
          ,{
            as : 'Materia-Relacionada',  // nombre de mi relacion
            foreignKey: 'id'     // campo con el que voy a igualar
          })
    
          /////////////////////
      
  };
  return profesor;
};