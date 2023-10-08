import { Dialect, Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';
import { farmerModel } from './farmer.model';

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
  farmers: farmerModel(sequelize),
};

export default db;
