import {IToken} from '../../src/utils/jwt';

declare global {
  namespace Express {
    interface Request {
      token: IToken;
    }
  }
}
