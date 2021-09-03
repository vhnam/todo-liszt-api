import {Sequelize} from 'sequelize';

import env from '../env';

import {getList, ListModelStatic} from './ListModel';
import {getSettings, SettingsModelStatic} from './SettingsModel';
import {getToken, TokenModelStatic} from './TokenModel';
import {getUser, UserModelStatic} from './UserModel';

interface IDatabase {
  sequelize: Sequelize;
  List: ListModelStatic;
  Settings: SettingsModelStatic;
  Token: TokenModelStatic;
  User: UserModelStatic;
}

const sequelize = new Sequelize(
  env.DB_DATABASE,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
  },
);

const List = getList(sequelize);
const Settings = getSettings(sequelize);
const Token = getToken(sequelize);
const User = getUser(sequelize);

const db: IDatabase = {
  sequelize,
  List,
  Settings,
  Token,
  User,
};

db.sequelize
  .sync({force: false})
  .then(() => {
    console.log('Database & tables synced');
  })
  // .then(async () => {
  //   await Seeder.run();
  // })
  .catch((err) => {
    console.error(err);
  });

export default db;
