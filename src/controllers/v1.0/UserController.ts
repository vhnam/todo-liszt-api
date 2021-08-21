import {NextFunction, Request, Response} from 'express';

import {AppError, ErrorCode, HttpStatus} from '../../utils/appError';
import {Multer} from '../../utils/multer';

import Controller, {Methods} from '../../core/Controller';

import authMiddleware from '../../middlewares/auth';

import {UserModel} from '../../models/UserModel';

import SettingsService from '../../services/settings/v1.0';
import UserService from '../../services/user/v1.0';

class UserController extends Controller {
  public path = '/users';
  public version = 'v1.0';
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
    {
      path: '/',
      method: Methods.PUT,
      handler: this.update,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/',
      method: Methods.DELETE,
      handler: this.destroy,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/me',
      method: Methods.GET,
      handler: this.getMyProfile,
      localMiddleware: [authMiddleware],
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
        await SettingsService.create({
          user: user.id,
          language: 'en-US',
          timezone: 'Asia/Ho_Chi_Minh',
          weekStart: 'mon',
        });

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

      await UserService.forgotPassword({
        email,
      });

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
        userID: req.user.id,
        file: avatar,
      };

      await UserService.updateAvatar(params);

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {name, password} = req.body;

      await UserService.update({
        userID: req.user.id,
        name,
        password,
      });

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.destroy({
        userID: req.user.id,
      });

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserModel = req.user;

      res.status(HttpStatus.Ok).json({
        data: {
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
}

export default UserController;
