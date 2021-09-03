import {AppError, ErrorCode} from '../../../utils/appError';

import authenticateEmail from './authenticateEmail';

interface AuthenticateProps {
  type: string;
  email?: string;
  password?: string;
  token?: string;
}

const authenticate = async ({
  type,
  email,
  password,
  token,
}: AuthenticateProps) => {
  switch (type) {
    case 'email':
      if (email && password) {
        return await authenticateEmail({
          email,
          password,
        });
      } else {
        throw new AppError(ErrorCode.Sessions.BadRequest);
      }
    // case 'google':
    //   return {
    //     name: 'ahihi',
    //   };
    default:
      throw new AppError(ErrorCode.Sessions.NotImplemented);
  }
};

export default authenticate;
