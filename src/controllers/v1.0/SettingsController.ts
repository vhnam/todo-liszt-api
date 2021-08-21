import {NextFunction, Request, Response} from 'express';

import {HttpStatus} from '../../utils/appError';

import Controller, {Methods} from '../../core/Controller';

import authMiddleware from '../../middlewares/auth';

import SettingsService from '../../services/settings/v1.0';

class SettingsController extends Controller {
  public path = '/settings';
  public version = 'v1.0';
  public routes = [
    {
      path: '/',
      method: Methods.PUT,
      handler: this.update,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/',
      method: Methods.GET,
      handler: this.show,
      localMiddleware: [authMiddleware],
    },
  ];

  constructor() {
    super();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {language, timezone, weekStart} = req.body;

      await SettingsService.update({
        user: req.user.id,
        language,
        timezone,
        weekStart,
      });

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await SettingsService.show({
        userID: req.user.id,
      });

      res.status(HttpStatus.Ok).json(settings);
    } catch (error) {
      next(error);
    }
  }
}

export default SettingsController;
