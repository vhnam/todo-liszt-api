import {NextFunction, Request, Response} from 'express';

import Controller, {Methods} from '../core/Controller';

import UserService from '../services/user';

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

      res.status(200).json({
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default SessionController;
