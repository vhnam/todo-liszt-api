import {Op} from 'sequelize';

import env from '../../../env';

import {AppError, ErrorCode} from '../../../utils/appError';

import EmailService from '../../email/v1.0';
import TokenService from '../../token/v1.0';

import {User} from '../../../models';

interface IForgotPassword {
  email: string;
}

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

const createToken = async () => {
  return await TokenService.create();
};

const sendMail = async (token: string, email: string) => {
  const link = `${env.WEB_APP}/reset-password?token=${token}`;

  const params = {
    from: env.EMAIL_USERNAME,
    to: email,
    subject: '[Todo Liszt] Forgot Password',
    html: `Click to this <a href="${link}">link</a> to reset password`,
  };

  await EmailService.create(params);
};

const forgotPassword = async (params: IForgotPassword) => {
  await validateEmail(params.email);
  const token = await createToken();
  await sendMail(token, params.email);
};

export default forgotPassword;
