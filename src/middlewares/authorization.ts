import {NextFunction, Response} from 'express';

import {AppError, ErrorCode} from '../utils/appError';
import {decodeToken} from '../utils/jwt';

import UserService from '../services/user/v1.0';

const authorizationMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.header('Authorization');

  if (accessToken) {
    const token = await decodeToken(accessToken);
    const user = await UserService.show({
      userID: token.usr,
    });

    if (user) {
      req.user = user;
    }
  }

  next();
};

export default authorizationMiddleware;
