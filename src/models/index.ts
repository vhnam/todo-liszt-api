import env from '../env';

import List from './ListModel';
import Settings from './SettingsModel';
import SubTask from './SubTaskModel';
import Token from './TokenModel';
import User from './UserModel';

const isDev = env.NODE_ENV === 'development';

const dbInit = () => {
  List.sync({alter: isDev});
  Settings.sync({alter: isDev});
  SubTask.sync({alter: isDev});
  Token.sync({alter: isDev});
  User.sync({alter: isDev});
};

export {List, Settings, SubTask, Token, User};
export default dbInit;
