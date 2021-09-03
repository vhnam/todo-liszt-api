import {Sequelize} from 'sequelize';

import env from './env';

const sequelizeConnection = new Sequelize(
  env.DB_DATABASE,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
  },
);

export default sequelizeConnection;
