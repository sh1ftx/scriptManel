'use strict';

// Model responsável pelos jogos cadastrados
module.exports = (sequelize, DataTypes) => {
  // Definição do model Jogo
  const Jogo = sequelize.define('Jogo', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plataforma: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amigoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Jogo'
  });

  // Relacionamentos do model
  Jogo.associate = (models) => {
    // Cada jogo pertence a um amigo (dono)
    Jogo.belongsTo(models.Amigo, {
      foreignKey: 'amigoId',
      as: 'dono'
    });

    // Um jogo pode ter vários empréstimos
    Jogo.hasMany(models.Emprestimo, {
      foreignKey: 'jogoId',
      as: 'emprestimos'
    });
  };

  // Retorna o model configurado
  return Jogo;
};
