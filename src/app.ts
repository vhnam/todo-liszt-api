import express, {Application, RequestHandler} from 'express';
import cors from 'cors';

import Controller from './core/Controller';
import Server from './core/Server';

import {PORT} from './config';
import db from './models';

import SettingsController from './controllers/v1.0/SettingsController';
import SessionController from './controllers/v1.0/SessionController';
import UserController from './controllers/v1.0/UserController';

const app: Application = express();
const server: Server = new Server(app, db.sequelize, PORT);

const controllers: Array<Controller> = [
  new SettingsController(),
  new SessionController(),
  new UserController(),
];

const globalMiddlewares: Array<RequestHandler> = [
  cors({credentials: true, origin: true}),
  express.urlencoded(),
  express.json(),
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
