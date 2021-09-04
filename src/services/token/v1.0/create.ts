import bcrypt from 'bcryptjs';
import {nanoid} from 'nanoid';
import {addSeconds} from 'date-fns';

import env from '../../../env';

import {Token} from '../../../models';

const generateToken = async () => {
  const _nanoid = nanoid();
  const salt = await bcrypt.genSalt();
  const token = await bcrypt.hash(_nanoid, salt);
  return token;
};

const saveToken = async (token: string) => {
  const expireAt = addSeconds(Date.now(), env.EMAIL_EXPIRES_IN);

  const params = {
    token: token,
    expireAt: expireAt.getTime(),
  };

  await Token.create(params);
};

const create = async () => {
  const token = await generateToken();
  await saveToken(token);

  return token;
};

export default create;
