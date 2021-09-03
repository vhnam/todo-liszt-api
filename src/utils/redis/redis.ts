import IORedis from 'ioredis';

import env from '../../env';

class Redis {
  private static _redis: IORedis.Redis;

  public static getInstance() {
    if (!this._redis) {
      this._redis = new IORedis({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      });
    }

    return this._redis;
  }
}

export default Redis;
