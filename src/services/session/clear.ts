import {decodeToken} from '../../utils/jwt';
import {Redis} from '../../utils/redis';

class Clear {
  private _accessToken: string;

  constructor(accessToken: string) {
    this._accessToken = accessToken;
  }

  async exec() {
    const sessionInfo = await decodeToken(this._accessToken);

    const redis = Redis.getInstance();
    redis.del(sessionInfo.usr);
  }
}

const clear = (accessToken: string) => {
  return new Clear(accessToken).exec();
};

export default clear;
