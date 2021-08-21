import {Sequelize} from 'sequelize';

import {DATABASE_URL} from '../config';
// import Seeder from '../seeders';

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

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
  .sync({force: true})
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
