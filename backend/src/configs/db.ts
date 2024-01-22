import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const { DB_DEPLOY, DB_USER, DB_DATABASE, DB_PORT, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false,
  native: false,
  // dialectModule: pg,
});

// const sequelize = new Sequelize(DB_DEPLOY!, {
//   dialect: 'postgres',
// });

export default sequelize;
