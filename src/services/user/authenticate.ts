import {AppError, ErrorCode} from '../../utils/appError';
import AuthenticateEmail from './authenticateEmail';

interface AuthenticateProps {
  type: string;
  email?: string;
  password?: string;
  token?: string;
}

const authenticate = ({type, email, password, token}: AuthenticateProps) => {
  switch (type) {
    case 'email':
      if (email && password) {
        return new AuthenticateEmail({
          email,
          password,
        }).exec();
      } else {
        throw new AppError(ErrorCode.Sessions.BadRequest);
      }
    case 'google':
      return {
        name: 'ahihi',
      };
    default:
      throw new AppError(ErrorCode.Sessions.NotImplemented);
  }
};

export default authenticate;
