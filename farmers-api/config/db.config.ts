export const dbConfig = {
  HOST: process.env['DB_HOST'] ?? 'localhost',
  USER: process.env['DB_USER'] ?? 'root',
  PASSWORD: process.env['DB_PASSWORD'] ?? '123456',
  DB: process.env['DB_NAME'] ?? 'farmers_db',
  PORT: process.env['DB_PORT'] ?? 3307,
  DIALECT: process.env['DB_DIALECT'] ?? 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
