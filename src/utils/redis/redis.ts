import IORedis from 'ioredis';

import {REDIS_HOST, REDIS_PORT} from '../../config';

class Redis {
  private static _redis: IORedis.Redis;

  public static getInstance() {
    if (!this._redis) {
      this._redis = new IORedis({
        host: REDIS_HOST,
        port: REDIS_PORT,
      });
    }

    return this._redis;
  }
}

export default Redis;
