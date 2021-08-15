import {NextFunction, Request, Response} from 'express';

import {AppError, ErrorCode} from '../utils/appError';
import {decodeToken} from '../utils/jwt';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.header('Authorization');

  if (accessToken) {
    const tokenContent = await decodeToken(accessToken);
    req.token = tokenContent;
    next();
  } else {
    const error = new AppError(ErrorCode.Sessions.InvalidSessionToken);

    res.status(error.status).json({
      code: error.code,
      message: error.message,
      details: error.details,
    });
  }
}

export default authMiddleware;
