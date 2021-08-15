import {NextFunction, Request, Response} from 'express';

import {HttpStatus} from '../utils/appError';

import Controller, {Methods} from '../core/Controller';

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
    {
      path: '/forgot-password',
      method: Methods.POST,
      handler: this.forget,
      localMiddleware: [],
    },
    {
      path: '/reset-password',
      method: Methods.POST,
      handler: this.reset,
      localMiddleware: [],
    },
  ];

  constructor() {
    super();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password, role} = req.body;

      const user = await UserService.create({
        email,
        password,
        role,
      });

      if (user) {
        res.status(HttpStatus.Created).json({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async forget(req: Request, res: Response, next: NextFunction) {
    try {
      const {email} = req.body;

      await UserService.forgotPassword(email);

      res.status(HttpStatus.Ok).send();
    } catch (error) {
      next(error);
    }
  }

  async reset(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password, token} = req.body;

      await UserService.resetPassword({
        email,
        password,
        token,
      });

      res.status(HttpStatus.Ok).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
