import {NextFunction, Request, Response} from 'express';

import {AppError} from '../utils/appError';

const errorMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status).json({
    code: error.code,
    message: error.message,
    details: error.details,
  });
};

export default errorMiddleware;
