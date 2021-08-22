import {NextFunction, Request, Response} from 'express';

import {HttpStatus} from '../../utils/appError';
import {format} from '../../utils/list';

import Controller, {Methods} from '../../core/Controller';

import authMiddleware from '../../middlewares/auth';

import ListService from '../../services/list/v1.0';

class ListController extends Controller {
  public path = '/lists';
  public version = 'v1.0';
  public routes = [
    {
      path: '/',
      method: Methods.POST,
      handler: this.create,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/:id',
      method: Methods.GET,
      handler: this.show,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/:id',
      method: Methods.PUT,
      handler: this.update,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/',
      method: Methods.GET,
      handler: this.index,
      localMiddleware: [authMiddleware],
    },
  ];

  constructor() {
    super();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {name, description, startAt, endAt, color} = req.body;

      const list = await ListService.create({
        user: req.user.id,
        name,
        description,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        color,
      });

      if (list) {
        res.status(HttpStatus.Created).json({
          data: format(list),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await ListService.show({
        id: req.params.id,
      });

      if (list) {
        res.status(HttpStatus.Ok).json({
          data: format(list),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {name, description, startAt, endAt, color} = req.body;

      await ListService.update({
        id: req.params.id,
        name,
        description,
        startAt,
        endAt,
        color,
      });

      res.status(HttpStatus.Ok).send();
    } catch (error) {
      next(error);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const {limit, page, name, description, startAt, endAt} = req.query;
      const _limit = limit ? parseInt(limit as string) : 10;
      const _page = page ? parseInt(page as string) : 1;

      const data = await ListService.list({
        limit: _limit,
        page: _page,
        where: {
          name: name as string,
          description: description as string,
          startAt: startAt ? new Date(parseInt(startAt as string)) : undefined,
          endAt: endAt ? new Date(parseInt(endAt as string)) : undefined,
        },
      });

      res.status(HttpStatus.Ok).json({
        ...data,
        data: data.data.map((list) => format(list)),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ListController;
