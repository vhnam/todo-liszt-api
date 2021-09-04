import {decodeToken} from '../../../utils/jwt';
import {Redis} from '../../../utils/redis';

interface IDestroy {
  accessToken: string;
}

const destroy = async (params: IDestroy) => {
  const sessionInfo = await decodeToken(params.accessToken);

  const redis = Redis.getInstance();
  redis.del(sessionInfo.usr);
};

export default destroy;
