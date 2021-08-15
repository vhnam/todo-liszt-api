import createError, {initializeErrors} from './createError';
import HttpStatus from './httpStatus';

const ErrorCode = {
  General: {
    NotFound: createError(0, 0, HttpStatus.NotFound),
    InvalidParameters: createError(0, 1, HttpStatus.BadRequest),
    InternalServerError: createError(0, 2, HttpStatus.InternalServerError),
  },
  Sessions: {
    InvalidCredentials: createError(1, 0, HttpStatus.BadRequest),
    NotImplemented: createError(1, 1, HttpStatus.NotImplemented),
    BadRequest: createError(1, 2, HttpStatus.BadRequest),
    InvalidSessionToken: createError(1, 3, HttpStatus.Unauthorized),
    InvalidRefresh: createError(1, 4, HttpStatus.BadRequest),
  },
  User: {
    EmailTaken: createError(2, 0, HttpStatus.BadRequest),
    EmailNotDefined: createError(2, 1, HttpStatus.BadRequest),
  },
};

initializeErrors(ErrorCode);

export default ErrorCode;
