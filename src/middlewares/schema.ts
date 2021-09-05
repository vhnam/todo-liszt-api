import {NextFunction, Request, Response} from 'express';
import {ObjectSchema} from 'joi';

import {AppError, ErrorCode} from '../utils/appError';

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const schemaMiddleware =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const {error, value} = schema.validate(req.body, options);

    if (error) {
      next(
        new AppError(
          ErrorCode.General.InvalidParameters,
          error.details.map((x) => x.message),
        ),
      );
    } else {
      req.body = value;
      next();
    }
  };

export default schemaMiddleware;
