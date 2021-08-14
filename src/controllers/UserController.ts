import {NextFunction, Request, Response} from 'express';
import {omit} from 'lodash';

import Controller, {Methods} from '../core/Controller';

import UserService from '../services/user';

import {HttpStatus} from '../utils/appError';

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
        res.status(HttpStatus.Created).json({
          data: {
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
