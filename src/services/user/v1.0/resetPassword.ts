import {Op} from 'sequelize';
import bcrypt from 'bcryptjs';

import {AppError, ErrorCode} from '../../../utils/appError';

import TokenService from '../../token/v1.0';

import {User} from '../../../models';

interface IResetPassword {
  email: string;
  password: string;
  token: string;
}

const validateToken = async (token: string) => {
  await TokenService.validate(token);
};

const validateEmail = async (email: string) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{email}],
      deletedAt: null,
    },
  });

  if (!user) {
    throw new AppError(ErrorCode.User.EmailNotDefined);
  }
};

const updatePassword = async (email: string, password: string) => {
  const salt = await bcrypt.genSalt();
  const hasedPassword = await bcrypt.hash(password, salt);

  await User.update(
    {
      password: hasedPassword,
      updatedAt: new Date(),
    },
    {
      where: {
        [Op.or]: [{email: email}],
      },
    },
  );
};

const resetPassword = async (params: IResetPassword) => {
  await validateToken(params.token);
  await validateEmail(params.email);
  await updatePassword(params.email, params.password);
};

export default resetPassword;
