import {decodeToken} from '../../../utils/jwt';
import {Redis} from '../../../utils/redis';

interface IClear {
  accessToken: string;
}

class Clear {
  private _params: IClear;

  constructor(params: IClear) {
    this._params = params;
  }

  async exec() {
    const sessionInfo = await decodeToken(this._params.accessToken);

    const redis = Redis.getInstance();
    redis.del(sessionInfo.usr);
  }
}

const clear = (params: IClear) => {
  return new Clear(params).exec();
};

export default clear;
