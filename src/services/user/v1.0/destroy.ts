import {Op} from 'sequelize';

import {User} from '../../../models';

interface IDestroy {
  userID: string;
}

const destroy = async (params: IDestroy) => {
  await User.update(
    {
      deletedAt: new Date(),
    },
    {
      where: {
        [Op.or]: [{id: params.userID}],
      },
    },
  );
};

export default destroy;
