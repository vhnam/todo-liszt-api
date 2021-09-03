import {Op} from 'sequelize';

import db from '../../../models';

interface IUpdate {
  listID: string;
  id: string;
  name: string;
  description: string;
}

const update = async (params: IUpdate) => {
  const subTask = await db.SubTask.update(
    {
      name: params.name,
      description: params.description,
    },
    {
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
    },
  );

  return subTask;
};

export default update;
