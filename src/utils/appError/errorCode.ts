import createError, {initializeErrors} from './createError';
import HttpStatus from './httpStatus';

const ErrorCode = {
  Sessions: {
    InvalidCredentials: createError(0, 0, HttpStatus.BadRequest),
    NotImplemented: createError(0, 1, HttpStatus.NotImplemented),
    BadRequest: createError(0, 2, HttpStatus.BadRequest),
  },
};

initializeErrors(ErrorCode);

export default ErrorCode;
