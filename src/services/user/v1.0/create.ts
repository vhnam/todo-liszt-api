import bcrypt from 'bcryptjs';

import {AppError, ErrorCode} from '../../../utils/appError';
import {Role} from '../../../utils/ac/role';

import {User} from '../../../models';

interface ICreate {
  email: string;
  password: string;
  role: Role;
}

const createUser = async (email: string, password: string, role: Role) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const params = {
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    };
    return await User.create(params);
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.User.InvalidParameters, details);
  }
};

const checkExistingUser = async (email: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    throw new AppError(ErrorCode.User.EmailTaken);
  }
};

const create = async (params: ICreate) => {
  await checkExistingUser(params.email);
  const user = await createUser(params.email, params.password, params.role);
  return user;
};

export default create;
