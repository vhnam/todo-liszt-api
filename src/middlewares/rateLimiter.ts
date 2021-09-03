import {NextFunction, Request, Response} from 'express';

import {AppError, ErrorCode} from '../utils/appError';
import rateLimiter from '../utils/rateLimiter';

const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await rateLimiter.consume(req.ip, 1);
  } catch (rateLimiterRes: any) {
    if (rateLimiterRes instanceof Error) {
      next(new AppError(ErrorCode.General.InternalServerError));
    }

    res.set('Retry-After', String(rateLimiterRes.msBeforeNext / 1000));
    next(new AppError(ErrorCode.General.TooManyRequests));
  }

  next();
};

export default rateLimiterMiddleware;
