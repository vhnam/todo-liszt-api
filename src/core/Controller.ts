import {NextFunction, Request, Response, Router} from 'express';

import {AppError, ErrorCode} from '../utils/appError';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IRoute {
  path: string;
  method: Methods;
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>;
  localMiddleware: ((
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void)[];
}

abstract class Controller {
  protected readonly routes: IRoute[] = [];

  public abstract path: string;
  public abstract version: string;
  public router: Router = Router();

  public setRoutes = (): Router => {
    for (const route of this.routes) {
      for (const middleware of route.localMiddleware) {
        this.router.use(route.path, middleware);
      }

      switch (route.method) {
        case 'GET':
          this.router.get(route.path, route.handler);
          break;
        case 'POST':
          this.router.post(route.path, route.handler);
          break;
        case 'PUT':
          this.router.put(route.path, route.handler);
          break;
        case 'DELETE':
          this.router.delete(route.path, route.handler);
          break;
        default:
          throw new AppError(ErrorCode.General.NotImplemented);
      }
    }

    return this.router;
  };
}

export default Controller;
