import {NextFunction, Response} from 'express';

import {AppError, ErrorCode, HttpStatus} from '../../utils/appError';
import ac from '../../utils/ac';

import Controller, {Methods} from '../../core/Controller';

import authenticationMiddleware from '../../middlewares/authentication';

import AuditLogService from '../../services/auditLog/v1.0';

class AuditLogController extends Controller {
  public path = '/audit-logs';
  public version = 'v1.0';
  public routes = [
    {
      path: '/',
      method: Methods.GET,
      handler: this.index,
      localMiddleware: [authenticationMiddleware],
    },
    {
      path: '/:id',
      method: Methods.GET,
      handler: this.show,
      localMiddleware: [authenticationMiddleware],
    },
  ];

  constructor() {
    super();
  }

  async index(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).readOwn('list');

      if (!permission.granted) {
        throw new AppError(ErrorCode.AuditLog.ForBidden);
      }

      const {limit, page} = req.query;
      const _limit = limit ? parseInt(limit as string) : 10;
      const _page = page ? parseInt(page as string) : 1;

      const data = await AuditLogService.list({
        limit: _limit,
        page: _page,
      });

      res.status(HttpStatus.Ok).json({
        ...data,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).readAny('audit');

      if (!permission.granted) {
        throw new AppError(ErrorCode.AuditLog.ForBidden);
      }

      const auditLog = await AuditLogService.show({
        id: req.params.id,
      });

      if (auditLog) {
        res.status(HttpStatus.Ok).json({
          data: auditLog,
        });
      }

      throw new AppError(ErrorCode.AuditLog.ForBidden);
    } catch (error) {
      next(error);
    }
  }
}

export default AuditLogController;
