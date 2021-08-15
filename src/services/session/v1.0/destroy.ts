import {decodeToken} from '../../../utils/jwt';
import {Redis} from '../../../utils/redis';

interface IDestroy {
  accessToken: string;
}

class Destroy {
  private _params: IDestroy;

  constructor(params: IDestroy) {
    this._params = params;
  }

  async exec() {
    const sessionInfo = await decodeToken(this._params.accessToken);

    const redis = Redis.getInstance();
    redis.del(sessionInfo.usr);
  }
}

const destroy = (params: IDestroy) => {
  return new Destroy(params).exec();
};

export default destroy;
