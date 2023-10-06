import { Sequelize } from 'sequelize';

export const farmerModel = (sequelize: Sequelize) => {
  const Farmer = sequelize.define('farmer', {});

  return Farmer;
};
