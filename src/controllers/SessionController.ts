import {NextFunction, Request, Response} from 'express';

import Controller, {Methods} from '../core/Controller';

import authMiddleware from '../middlewares/auth';

import SessionService from '../services/session';
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
    {
      path: '/',
      method: Methods.DELETE,
      handler: this.clear,
      localMiddleware: [authMiddleware],
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

      const jwtToken = await SessionService.create({
        user,
      });

      res.status(HttpStatus.Ok).json({
        data: {
          ...jwtToken,
          id: user.id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async clear(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.header('Authorization');

      if (accessToken) {
        await SessionService.clear(accessToken);
      }

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }
}

export default SessionController;
