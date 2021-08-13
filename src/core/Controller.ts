import {NextFunction, Request, Response, Router} from 'express';

export enum Methods {
  GET = 'GET',
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
  protected abstract readonly routes: IRoute[] = [];

  public abstract path: string;
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
        default:
          console.error('Invalid method');
          break;
      }
    }

    return this.router;
  };

  protected sendSuccess(
    res: Response,
    data: object,
  ): Response {
    return res.status(200).json(data);
  }

  protected sendError(res: Response, message?: string): Response {
    return res.status(500).json({
      message: message || 'Internal Server Error',
    });
  }
}

export default Controller;
