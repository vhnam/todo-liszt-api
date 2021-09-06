import {NextFunction, Response} from 'express';

import sequelizeConnection from '../db';

import AuditLogService from '../services/auditLog/v1.0';

interface IAuditLog {
  actionBy: string;
  module: string;
  requestMethod: string;
  requestUrl: string;
  data: Record<string, any>;
}

const checkValidObject = (obj?: Record<string, any>) => {
  if (obj === undefined) {
    return false;
  }

  for (let key in obj) {
    if (obj[key] === undefined) {
      return false;
    }
  }

  return true;
};

const auditLogMiddleware = (req: any, res: Response, next: NextFunction) => {
  const method = req.method.toLowerCase();
  const actionBy = req.user ? req.user.email : 'anonymous';
  const requestUrl = req.originalUrl;

  if (method !== 'get') {
    sequelizeConnection.addHook(
      'afterCreate',
      async (instance: any, options) => {
        try {
          const module = instance.constructor.options.name.plural;

          if ('AuditLogs' === module) {
            return;
          }

          const dataValues = options.fields?.reduce((accumulator, key) => {
            if ('password' === key) {
              return accumulator;
            }

            return Object.assign(accumulator, {
              [key]: instance.getDataValue(key),
            });
          }, {} as Record<string, any>);

          const previousDataValues = options.fields?.reduce(
            (accumulator, key) => {
              if ('password' === key) {
                return accumulator;
              }

              return Object.assign(accumulator, {
                [key]: instance.previous(key),
              });
            },
            {} as Record<string, any>,
          );

          const auditLog: IAuditLog = {
            actionBy,
            module,
            requestMethod: method,
            requestUrl,
            data: {
              dataValues: checkValidObject(dataValues) ? dataValues : null,
              previousDataValues: checkValidObject(previousDataValues)
                ? previousDataValues
                : null,
            },
          };

          await AuditLogService.create(auditLog);
        } catch (error) {
          return next(error);
        }
      },
    );

    next();
  }
};

export default auditLogMiddleware;
