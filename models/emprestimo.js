'use strict';

// Model de empréstimos
module.exports = (sequelize, DataTypes) => {
  // Inicialização do model Emprestimo
  const Emprestimo = sequelize.define('Emprestimo', {
    jogoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amigoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dataInicio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataFim: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Emprestimo'
  });

  // Definição das associações
  Emprestimo.associate = (models) => {
    // Cada empréstimo pertence a um jogo
    Emprestimo.belongsTo(models.Jogo, {
      foreignKey: 'jogoId',
      as: 'jogo'
    });

    // Cada empréstimo pertence a um amigo
    Emprestimo.belongsTo(models.Amigo, {
      foreignKey: 'amigoId',
      as: 'amigo'
    });
  };

  // Exporta o model configurado
  return Emprestimo;
};
