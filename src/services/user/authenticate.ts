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
        throw new Error('Invalid');
      }
    case 'google':
      return {
        name: 'ahihi',
      };
    default:
      throw new Error('Not Implemented');
  }
};

export default authenticate;
