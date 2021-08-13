import HttpStatus from './httpStatus';

interface ErrorCode {
  [service: string]: {
    [code: string]: IError;
  };
}

export interface IError {
  service: number;
  code: number;
  http: HttpStatus;
  message?: string;
}

export const initializeErrors = (errorCode: ErrorCode) => {
  for (const i of Object.keys(errorCode)) {
    for (const j of Object.keys(errorCode[i])) {
      errorCode[i][j].message = `${i} ${j}`;
    }
  }
};

const createError = (
  service: number,
  code: number,
  http = HttpStatus.InternalServerError,
): IError => ({
  service,
  code,
  http,
});

export default createError;
