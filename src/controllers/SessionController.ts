import {NextFunction, Request, Response} from 'express';

import Controller, {Methods} from '../core/Controller';

import UserService from '../services/user';

import {HttpStatus} from '../utils/appError';

class SessionController extends Controller {
  public path = '/sessions';
  public routes = [
    {
      path: '/',
      method: Methods.POST,
      handler: this.create,
      localMiddleware: [],
    },
  ];

  constructor() {
    super();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {type, email, password, token} = req.body;

      const user = await UserService.authenticate({
        type,
        email,
        password,
        token,
      });

      res.status(HttpStatus.Ok).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SessionController;
