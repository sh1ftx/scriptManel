// 20260131165558-create-emprestimo.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Emprestimo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      jogoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Jogo',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      amigoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Amigo',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      dataInicio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataFim: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Emprestimo');
  }
};
