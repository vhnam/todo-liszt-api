import {createToken} from '../../../utils/jwt';
import {Redis} from '../../../utils/redis';

import env from '../../../env';

import {User} from '../../../models';

interface ICreate {
  user: User;
}

const create = async (params: ICreate) => {
  const token = await createToken(params.user);

  const redis = Redis.getInstance();
  redis.setex(
    params.user.id,
    30 * env.SESSION_EXPIRES_IN,
    JSON.stringify(token),
  );

  return token;
};

export default create;
