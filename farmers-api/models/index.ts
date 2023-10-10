import { Dialect, Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';
import { Farmer, farmerModel } from './farmer.model';
import { State, stateModel } from './state.model';

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  port: Number(dbConfig.port),
  host: dbConfig.host,
  dialect: dbConfig.dialect as Dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  Sequelize,
  sequelize,
  states: stateModel(sequelize),
  farmers: farmerModel(sequelize),
};

State.hasMany(Farmer, { foreignKey: 'stateId' });
Farmer.belongsTo(State, { foreignKey: 'stateId' });

export default db;
