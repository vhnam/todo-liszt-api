import {Sequelize} from 'sequelize';

import {DATABASE_URL} from '../config';
// import Seeder from '../seeders';

import {getUser, IUser, UserModelStatic} from './UserModel';

interface IDatabase {
  sequelize: Sequelize;
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

const User = getUser(sequelize);

const db: IDatabase = {
  sequelize,
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

export type UserModel = IUser;

export default db;
