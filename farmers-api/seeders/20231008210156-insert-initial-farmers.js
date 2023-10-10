'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('farmer', [
      {
        companyName: 'AgroFertilizantes do Brasil Ltda.',
        tradingName: 'FertilAgro',
        personIdentification: '91459083000137',
        city: 'Goiânia',
        stateId: await this.getStateIdByCode('GO', queryInterface),
        phoneNumber: '(83) 99247-2958',
      },
      {
        companyName: 'Ana Pereira Plantações Ltda.',
        tradingName: 'AnaPlant',
        personIdentification: '97871647296',
        city: 'Cuiabá',
        stateId: await this.getStateIdByCode('MT', queryInterface),
        phoneNumber: '(96) 98323-3422',
      },
      {
        companyName: 'Plantio Verde Agronegócios S.A.',
        tradingName: 'VerdeCampo',
        personIdentification: '69255079000106',
        city: 'Fortaleza',
        stateId: await this.getStateIdByCode('CE', queryInterface),
        phoneNumber: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('farmer', null, {});
  },

  async getStateIdByCode(code, queryInterface) {
    return queryInterface.rawSelect(
      'state',
      {
        where: {
          code: code,
        },
      },
      ['id']
    );
  },
};
