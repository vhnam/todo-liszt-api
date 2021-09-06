import {NextFunction, Request, Response} from 'express';

import {AppError, ErrorCode} from '../utils/appError';
import {decodeToken} from '../utils/jwt';

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.header('Authorization');

  if (accessToken) {
    const token = await decodeToken(accessToken);

    if (token) {
      return next();
    }
  }

  next(new AppError(ErrorCode.Sessions.InvalidSessionToken));
};

export default authenticationMiddleware;
