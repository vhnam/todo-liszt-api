import env from '../env';

import AuditLog from './AuditLog';
import List from './List';
import Settings from './Settings';
import SubTask from './SubTask';
import Token from './Token';
import User from './User';

const isDev = env.NODE_ENV === 'development';

const dbInit = () => {
  AuditLog.sync({alter: isDev});
  List.sync({alter: isDev});
  Settings.sync({alter: isDev});
  SubTask.sync({alter: isDev});
  Token.sync({alter: isDev});
  User.sync({alter: isDev});
};

export {AuditLog, List, Settings, SubTask, Token, User};
export default dbInit;
