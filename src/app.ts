import express, {Application, RequestHandler} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import Controller from './core/Controller';
import Server from './core/Server';

import env from './env';
import db from './models';

import ListController from './controllers/v1.0/ListController';
import SettingsController from './controllers/v1.0/SettingsController';
import SessionController from './controllers/v1.0/SessionController';
import UserController from './controllers/v1.0/UserController';

const app: Application = express();
const server: Server = new Server(app, db.sequelize, env.PORT);

const controllers: Array<Controller> = [
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
