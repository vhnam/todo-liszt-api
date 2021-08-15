import {NextFunction, Request, Response} from 'express';

import {AppError, ErrorCode, HttpStatus} from '../utils/appError';
import {Multer} from '../utils/multer';

import Controller, {Methods} from '../core/Controller';

import authMiddleware from '../middlewares/auth';

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
    {
      path: '/avatar',
      method: Methods.PUT,
      handler: this.updateAvatar,
      localMiddleware: [authMiddleware, Multer.getInstance().single('avatar')],
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

      res.status(HttpStatus.NoContent).send();
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

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const avatar = req.file;

      if (!avatar) {
        throw new AppError(ErrorCode.User.BadRequest);
      }

      const params = {
        userID: req.token.usr,
        file: avatar,
      };

      await UserService.updateAvatar(params);

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
