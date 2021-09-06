import express, {Application, RequestHandler} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import Controller from './core/Controller';
import Server from './core/Server';

import AuditLogController from './controllers/v1.0/AuditLogController';
import ListController from './controllers/v1.0/ListController';
import SettingsController from './controllers/v1.0/SettingsController';
import SessionController from './controllers/v1.0/SessionController';
import UserController from './controllers/v1.0/UserController';

import authorizationMiddleware from './middlewares/authorization';
import auditLogMiddleware from './middlewares/auditLog';
import rateLimiterMiddleware from './middlewares/rateLimiter';

const app: Application = express();
const server: Server = new Server(app);

const controllers: Array<Controller> = [
  new AuditLogController(),
  new ListController(),
  new SettingsController(),
  new SessionController(),
  new UserController(),
];

const globalMiddlewares: Array<RequestHandler> = [
  cors({credentials: true, origin: true}),
  express.urlencoded(),
  express.json(),
  compression(),
  helmet(),
  rateLimiterMiddleware,
  authorizationMiddleware,
  auditLogMiddleware,
];

Promise.resolve()
  .then(async () => {
    await server.initDatabase();
  })
  .then(() => {
    server.loadMiddlewares(globalMiddlewares);
    server.loadControllers(controllers);
    server.loadConfig();
    server.run();
  });
