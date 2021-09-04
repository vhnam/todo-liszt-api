import {RateLimiterRedis} from 'rate-limiter-flexible';

import {Redis} from '../redis';

const rateLimiter = new RateLimiterRedis({
  storeClient: Redis.getInstance(),
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

export default rateLimiter;
