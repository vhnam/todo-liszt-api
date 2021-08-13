import express, {Application, RequestHandler} from 'express';
import cors from 'cors';

import Controller from './core/Controller';
import Server from './core/Server';

import {PORT} from './config';
import db from './models';

import FeatureController from './controllers/FeatureController';
import PricingController from './controllers/PricingController';

import headerMiddleware from './middlewares/headerMiddleware';

const app: Application = express();
const server: Server = new Server(app, db.sequelize, PORT);

const controllers: Array<Controller> = [
  new FeatureController(),
  new PricingController(),
];

const globalMiddlewares: Array<RequestHandler> = [
  cors({credentials: true, origin: true}),
  headerMiddleware,
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
