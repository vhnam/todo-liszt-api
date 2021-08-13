import {NextFunction, Request, Response} from 'express';

function headerMiddleware(req: Request, res: Response, next: NextFunction) {
  res.removeHeader('X-Powered-By');
  next();
}

export default headerMiddleware;
