import {Op} from 'sequelize';
import bcrypt from 'bcryptjs';

import {User} from '../../../models';

interface IUpdate {
  userID: string;
  name: string;
  password: string;
}

const update = async (params: IUpdate) => {
  const salt = await bcrypt.genSalt();
  const hasedPassword = await bcrypt.hash(params.password, salt);

  await User.update(
    {
      name: params.name,
      password: hasedPassword,
    },
    {
      where: {
        [Op.or]: [{id: params.userID}],
      },
      individualHooks: true,
    },
  );
};

export default update;
