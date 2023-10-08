import * as dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env['DB_HOST'] ?? 'localhost',
  username: process.env['DB_USER'] ?? 'root',
  password: process.env['DB_PASSWORD'] ?? '123456',
  database: process.env['DB_NAME'] ?? 'farmers_db',
  port: process.env['DB_PORT'] ?? 3306,
  dialect: process.env['DB_DIALECT'] ?? 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
