import {SESSION_EXPIRES_IN} from '../../config';

import {createToken} from '../../utils/jwt';
import {Redis} from '../../utils/redis';

import {UserModel} from '../../models/UserModel';

interface ICreate {
  user: UserModel;
}

class Create {
  private _params: ICreate;

  constructor(params: ICreate) {
    this._params = params;
  }

  async exec() {
    const token = await createToken(this._params.user);

    const redis = Redis.getInstance();
    redis.setex(
      this._params.user.id,
      30 * SESSION_EXPIRES_IN,
      JSON.stringify(token),
    );

    return token;
  }
}

const create = (params: ICreate) => {
  return new Create(params).exec();
};

export default create;
