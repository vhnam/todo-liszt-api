import createError, {initializeErrors} from './createError';
import HttpStatus from './httpStatus';

const ErrorCode = {
  General: {
    NotFound: createError(0, 0, HttpStatus.NotFound),
    InvalidParameters: createError(0, 1, HttpStatus.BadRequest),
  },
  Sessions: {
    InvalidCredentials: createError(1, 0, HttpStatus.BadRequest),
    NotImplemented: createError(1, 1, HttpStatus.NotImplemented),
    BadRequest: createError(1, 2, HttpStatus.BadRequest),
  },
  User: {
    EmailTaken: createError(2, 0, HttpStatus.BadRequest),
  },
};

initializeErrors(ErrorCode);

export default ErrorCode;
