import {Op} from 'sequelize';

import {SubTask} from '../../../models';

interface IShow {
  id: string;
  listID: string;
}

const show = async (params: IShow) => {
  const subTask = await SubTask.findOne({
    where: {
      [Op.and]: [
        {
          id: params.id,
        },
        {
          listID: params.listID,
        },
      ],
    },
  });

  return subTask;
};

export default show;
