'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'farmers',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        companyName: { type: Sequelize.STRING, allowNull: false },
        tradingName: { type: Sequelize.STRING, allowNull: false },
        identification: { type: new Sequelize.STRING(15), allowNull: false },
        city: { type: Sequelize.STRING(50), allowNull: false },
        state: { type: Sequelize.STRING(50), allowNull: false },
        phoneNumber: { type: new Sequelize.STRING(20) },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('farmers');
  },
};