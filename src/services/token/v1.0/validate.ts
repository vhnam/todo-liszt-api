import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import {Token} from '../../../models';

const getToken = async (token: string) => {
  const _token = await Token.findOne({
    where: {
      [Op.or]: [{token}],
    },
  });
  return _token;
};

const blockToken = async (token: string) => {
  const now = new Date();

  await Token.update(
    {
      deletedAt: now,
      usedAt: now,
    },
    {
      where: {
        [Op.or]: [{token}],
      },
    },
  );
};

const confirmValidToken = async (token: string) => {
  await Token.update(
    {
      usedAt: new Date(),
    },
    {
      where: {
        [Op.or]: [{token}],
      },
    },
  );
};
const validate = async (token: string) => {
  const _token = await getToken(token);

  if (!_token) {
    throw new AppError(ErrorCode.User.InvalidRefreshPasswordToken);
  }

  const expireAt = _token.expireAt.getTime();

  if (_token.usedAt || Date.now() > expireAt) {
    await blockToken(token);
    throw new AppError(ErrorCode.User.InvalidRefreshPasswordToken);
  }

  await confirmValidToken(token);
};

export default validate;
