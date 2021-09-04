import {Op} from 'sequelize';

import {List} from '../../../models';

interface IShow {
  id: string;
}

const show = async (params: IShow) => {
  const list = await List.findOne({
    where: {
      [Op.or]: [{id: params.id}],
    },
  });

  return list;
};

export default show;
