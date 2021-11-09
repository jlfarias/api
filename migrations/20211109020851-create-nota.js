'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alumno: {
        type: Sequelize.STRING
      },
      id_materia: {
        type: Sequelize.INTEGER
      },
      parc_1: {
        type: Sequelize.INTEGER
      },
      parc_2: {
        type: Sequelize.INTEGER
      },
      recu_1: {
        type: Sequelize.INTEGER
      },
      recu_2: {
        type: Sequelize.INTEGER
      },
      integrador: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nota');
  }
};