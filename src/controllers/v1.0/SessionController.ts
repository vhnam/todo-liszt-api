import {NextFunction, Request, Response} from 'express';

import {HttpStatus} from '../../utils/appError';

import Controller, {Methods} from '../../core/Controller';

import authMiddleware from '../../middlewares/auth';

import SessionService from '../../services/session/v1.0';
import UserService from '../../services/user/v1.0';

class SessionController extends Controller {
  public path = '/sessions';
  public version = 'v1.0';
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
      handler: this.destroy,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/refresh',
      method: Methods.POST,
      handler: this.refresh,
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

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.header('Authorization');

      if (accessToken) {
        await SessionService.destroy({
          accessToken,
        });
      }

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.header('Authorization');
      const {refreshToken} = req.body;

      if (accessToken) {
        const tokens = await SessionService.refresh(accessToken, refreshToken);

        res.status(HttpStatus.Ok).json(tokens);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default SessionController;
