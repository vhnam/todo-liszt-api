import {Op} from 'sequelize';

import {Settings} from '../../../models';
interface IShow {
  userID: string;
}

const show = async (params: IShow) => {
  const setting = await Settings.findOne({
    where: {
      [Op.or]: [{user: params.userID}],
    },
  });

  return setting;
};

export default show;
