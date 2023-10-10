'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'farmer',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        companyName: { type: Sequelize.STRING, allowNull: false },
        tradingName: { type: Sequelize.STRING, allowNull: false },
        personIdentification: { type: new Sequelize.STRING(15), allowNull: false, unique: true },
        city: { type: Sequelize.STRING(50), allowNull: false },
        stateId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'state',
            },
            key: 'id',
          },
        },
        phoneNumber: { type: new Sequelize.STRING(20) },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('farmer');
  },
};
