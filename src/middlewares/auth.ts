import {NextFunction, Request, Response} from 'express';

import {AppError, ErrorCode} from '../utils/appError';
import {decodeToken} from '../utils/jwt';

import findByUserID from '../services/user/findByUserID';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.header('Authorization');

  if (accessToken) {
    const token = await decodeToken(accessToken);
    const user = await findByUserID({
      userID: token.usr,
    });

    if (user) {
      req.token = token;
      return next();
    }
  }

  const error = new AppError(ErrorCode.Sessions.InvalidSessionToken);

  res.status(error.status).json({
    code: error.code,
    message: error.message,
    details: error.details,
  });
};

export default authMiddleware;
