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
}

export default UserController;
