import {NextFunction, Response} from 'express';

import {AppError, ErrorCode, HttpStatus} from '../../utils/appError';
import ac from '../../utils/ac';

import Controller, {Methods} from '../../core/Controller';

import authenticationMiddleware from '../../middlewares/authentication';
import schemaMiddleware from '../../middlewares/schema';

import {updateSettingsSchema} from '../../schemas';

import SettingsService from '../../services/settings/v1.0';

class SettingsController extends Controller {
  public path = '/settings';
  public version = 'v1.0';
  public routes = [
    {
      path: '/',
      method: Methods.PUT,
      handler: this.update,
      localMiddleware: [authenticationMiddleware, schemaMiddleware(updateSettingsSchema)],
    },
    {
      path: '/',
      method: Methods.GET,
      handler: this.show,
      localMiddleware: [authenticationMiddleware],
    },
  ];

  constructor() {
    super();
  }

  async update(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).updateOwn('settings');

      if (!permission.granted) {
        throw new AppError(ErrorCode.Settings.ForBidden);
      }

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

  async show(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).readOwn('settings');

      if (!permission.granted) {
        throw new AppError(ErrorCode.Settings.ForBidden);
      }

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
