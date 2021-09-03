import {Op} from 'sequelize';

import db from '../../../models';

interface IShow {
  listID: string;
  id: string;
}

const show = async (params: IShow) => {
  const subTask = await db.SubTask.findOne({
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
