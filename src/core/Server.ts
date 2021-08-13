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
      this.app.use(controller.path, controller.setRoutes());
    });
  }

  public loadConfig() {
    this.app.disable('x-powered-by');

    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        res.status(404).send({
          message: error.message,
        });
      },
    );

    this.app.get('*', (req: Request, res: Response, next: NextFunction) => {
      res.status(404).send({
        message: 'Not Found',
      });
    });
  }

  public async initDatabase(): Promise<void> {
    try {
      await this.database.authenticate();
      console.log('Database is successfully authenticated');
    } catch (err) {
      console.error(err);
    }
  }
}

export default Server;
