import bcrypt from 'bcryptjs';
import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import {User} from '../../../models';

interface IAuthenticateEmail {
  email: string;
  password: string;
}

const validatePassword = (user: User, password: string) => {
  return bcrypt.compare(password, user.password);
};

const authenticateEmail = async (params: IAuthenticateEmail) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{email: params.email.toLowerCase()}],
      deletedAt: null,
    },
  });

  if (!user || !user.password) {
    throw new AppError(ErrorCode.Sessions.InvalidCredentials);
  }

  const isCorrectPassword = await validatePassword(user, params.password);

  if (!isCorrectPassword) {
    throw new AppError(ErrorCode.Sessions.InvalidCredentials);
  }

  return user;
};

export default authenticateEmail;
