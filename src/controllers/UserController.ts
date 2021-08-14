import {NextFunction, Request, Response} from 'express';

import {HttpStatus} from '../utils/appError';

import Controller, {Methods} from '../core/Controller';

import SessionService from '../services/session';
import UserService from '../services/user';

class UserController extends Controller {
  public path = '/users';
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
      const {email, password} = req.body;

      const user = await UserService.create({
        email,
        password,
      });

      if (user) {
        const jwtToken = await SessionService.create({
          user,
        });

        res.status(HttpStatus.Created).json({
          data: {
            ...jwtToken,
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
