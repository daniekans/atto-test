import { Dialect, Sequelize } from 'sequelize';
import { dbConfig } from '../config/db.config.js';
import { farmerModel } from './farmer.model';

const sequelize = new Sequelize(dbConfig.DB!, dbConfig.USER!, dbConfig.PASSWORD, {
  port: Number(dbConfig.PORT),
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT as Dialect,
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
  farmers: farmerModel(sequelize),
};

export default db;
