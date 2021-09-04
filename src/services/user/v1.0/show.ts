import {Op} from 'sequelize';

import {User} from '../../../models';

interface IShow {
  userID: string;
}

const show = async (params: IShow) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{id: params.userID}],
      deletedAt: null,
    },
  });

  return user;
};

export default show;
