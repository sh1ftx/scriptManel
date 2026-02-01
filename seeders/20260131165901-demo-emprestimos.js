'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Emprestimo', [
      {
        jogoId: 1,
        amigoId: 2,
        dataInicio: '2026-01-09',
        dataFim: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Emprestimo', null, {});
  }
};
