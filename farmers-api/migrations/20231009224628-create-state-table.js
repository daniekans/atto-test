'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'state',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        code: { type: Sequelize.CHAR(2), allowNull: false, unique: true },
        name: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('state');
  },
};
