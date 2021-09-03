import {NextFunction, Response} from 'express';

import {AppError, ErrorCode} from '../utils/appError';
import {decodeToken} from '../utils/jwt';

import UserService from '../services/user/v1.0';

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const accessToken = req.header('Authorization');

  if (accessToken) {
    const token = await decodeToken(accessToken);
    const user = await UserService.show({
      userID: token.usr,
    });

    if (user) {
      req.user = user;
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
