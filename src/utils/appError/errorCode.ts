import createError, {initializeErrors} from './createError';
import HttpStatus from './httpStatus';

const ErrorCode = {
  General: {
    NotFound: createError(0, 0, HttpStatus.NotFound),
  },
  Sessions: {
    InvalidCredentials: createError(1, 0, HttpStatus.BadRequest),
    NotImplemented: createError(2, 1, HttpStatus.NotImplemented),
    BadRequest: createError(3, 2, HttpStatus.BadRequest),
  },
};

initializeErrors(ErrorCode);

export default ErrorCode;
