import {NextFunction, Response} from 'express';

import {AppError, ErrorCode, HttpStatus} from '../../utils/appError';
import {formatList, formatSubTask} from '../../utils/list';
import ac from '../../utils/ac';

import Controller, {Methods} from '../../core/Controller';

import authMiddleware from '../../middlewares/auth';
import schemaMiddleware from '../../middlewares/schema';

import {
  createListSchema,
  createSubTaskSchema,
  updateSettingsSchema,
  updateSubTaskSchema,
} from '../../schemas';

import ListService from '../../services/list/v1.0';
import SubTaskService from '../../services/subtasks/v1.0';

class ListController extends Controller {
  public path = '/lists';
  public version = 'v1.0';
  public routes = [
    {
      path: '/',
      method: Methods.POST,
      handler: this.create,
      localMiddleware: [authMiddleware, schemaMiddleware(createListSchema)],
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
      localMiddleware: [authMiddleware, schemaMiddleware(updateSettingsSchema)],
    },
    {
      path: '/:id',
      method: Methods.DELETE,
      handler: this.destroy,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/',
      method: Methods.GET,
      handler: this.index,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/:listID/subtasks',
      method: Methods.GET,
      handler: this.indexSubTask,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/:listID/subtasks',
      method: Methods.POST,
      handler: this.createSubTask,
      localMiddleware: [authMiddleware, schemaMiddleware(createSubTaskSchema)],
    },
    {
      path: '/:listID/subtasks/:subtaskID',
      method: Methods.GET,
      handler: this.showSubTask,
      localMiddleware: [authMiddleware],
    },
    {
      path: '/:listID/subtasks/:subtaskID',
      method: Methods.PUT,
      handler: this.updateSubTask,
      localMiddleware: [authMiddleware, schemaMiddleware(updateSubTaskSchema)],
    },
    {
      path: '/:listID/subtasks/:subtaskID',
      method: Methods.DELETE,
      handler: this.destroySubTask,
      localMiddleware: [authMiddleware],
    },
  ];

  constructor() {
    super();
  }

  async create(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).createOwn('list');

      if (!permission.granted) {
        throw new AppError(ErrorCode.List.ForBidden);
      }

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
          data: formatList(list),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async show(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).readOwn('list');

      if (!permission.granted) {
        throw new AppError(ErrorCode.List.ForBidden);
      }

      const list = await ListService.show({
        id: req.params.id,
      });

      if (list) {
        res.status(HttpStatus.Ok).json({
          data: formatList(list),
        });
      }

      throw new AppError(ErrorCode.List.ForBidden);
    } catch (error) {
      next(error);
    }
  }

  async update(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).updateOwn('list');

      if (!permission.granted) {
        throw new AppError(ErrorCode.List.ForBidden);
      }

      const {name, description, startAt, endAt, color} = req.body;

      await ListService.update({
        id: req.params.id,
        name,
        description,
        startAt,
        endAt,
        color,
      });

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async index(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).readOwn('list');

      if (!permission.granted) {
        throw new AppError(ErrorCode.List.ForBidden);
      }

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
        data: data.data.map((list) => formatList(list)),
      });
    } catch (error) {
      next(error);
    }
  }

  async createSubTask(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).createOwn('subtask');

      if (!permission.granted) {
        throw new AppError(ErrorCode.SubTask.ForBidden);
      }

      const {name, description} = req.body;

      const subTask = await SubTaskService.create({
        listID: req.params.listID,
        name,
        description,
      });

      if (subTask) {
        res.status(HttpStatus.Created).json({
          data: formatSubTask(subTask),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async showSubTask(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).readOwn('subtask');

      if (!permission.granted) {
        throw new AppError(ErrorCode.SubTask.ForBidden);
      }

      const subTask = await SubTaskService.show({
        id: req.params.subtaskID,
        listID: req.params.listID,
      });

      if (subTask) {
        res.status(HttpStatus.Ok).json({
          data: formatSubTask(subTask),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateSubTask(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).updateOwn('subtask');

      if (!permission.granted) {
        throw new AppError(ErrorCode.SubTask.ForBidden);
      }

      const {name, description} = req.body;

      await SubTaskService.update({
        id: req.params.subtaskID,
        listID: req.params.listID,
        name,
        description,
      });

      res.status(HttpStatus.Ok).send();
    } catch (error) {
      next(error);
    }
  }

  async destroySubTask(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).deleteOwn('subtask');

      if (!permission.granted) {
        throw new AppError(ErrorCode.SubTask.ForBidden);
      }

      await SubTaskService.destroy({
        id: req.params.subtaskID,
        listID: req.params.listID,
      });

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).deleteOwn('list');

      if (!permission.granted) {
        throw new AppError(ErrorCode.SubTask.ForBidden);
      }

      await ListService.destroy({
        id: req.params.id,
      });

      res.status(HttpStatus.NoContent).send();
    } catch (error) {
      next(error);
    }
  }

  async indexSubTask(req: any, res: Response, next: NextFunction) {
    try {
      const permission = ac.can(req.user.role).readOwn('subtask');

      if (!permission.granted) {
        throw new AppError(ErrorCode.SubTask.ForBidden);
      }

      const {limit, page} = req.query;
      const _limit = limit ? parseInt(limit as string) : 10;
      const _page = page ? parseInt(page as string) : 1;

      const data = await SubTaskService.list({
        limit: _limit,
        page: _page,
        listID: req.params.listID,
      });

      if (data) {
        res.status(HttpStatus.Ok).json({
          ...data,
          data: data.data.map((subTask) => formatSubTask(subTask)),
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ListController;
