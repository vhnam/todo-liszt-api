import {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import {Sequelize} from 'sequelize';
import http from 'http';

import Controller from './Controller';

import errorMiddleware from '../middlewares/error';
import rateLimiterMiddleware from '../middlewares/rateLimiter';

import {AppError, ErrorCode} from '../utils/appError';

class Server {
  private app: Application;
  private database: Sequelize;
  private readonly port: number;

  constructor(app: Application, database: Sequelize, port: number) {
    this.app = app;
    this.database = database;
    this.port = port;
  }

  public run(): http.Server {
    return this.app.listen(this.port, () => {
      console.log(`⚡️[server]: The server is running on port ${this.port}`);
    });
  }

  public loadMiddlewares(middlewares: RequestHandler[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  public loadControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(
        `/api/${controller.version}${controller.path}`,
        controller.setRoutes(),
      );
    });
  }

  public loadConfig() {
    this.app.use(rateLimiterMiddleware);

    this.app.use(errorMiddleware);

    this.app.get('*', (req: Request, res: Response, next: NextFunction) => {
      const error = new AppError(ErrorCode.General.NotFound);
      res.status(error.status).json({
        code: error.code,
        message: error.message,
        details: error.details,
      });
    });
  }

  public async initDatabase(): Promise<void> {
    try {
      await this.database.authenticate();
      console.log('Database is successfully authenticated');
    } catch (err: any) {
      throw new AppError(ErrorCode.General.InternalServerError, err.message);
    }
  }
}

export default Server;
