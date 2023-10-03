import dotenv from 'dotenv'
import { Sequelize } from "sequelize";

// Menggunakan env untuk konfigurasi database
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

// const db = new Sequelize(
//   'techade_backend',
//   'root',
//   '', {
//   host: 'localhost',
//   dialect: 'mysql'
// }
// )

export default db