import {Op} from 'sequelize';

import {SubTask} from '../../../models';

interface IUpdate {
  id: string;
  listID: string;
  name: string;
  description: string;
}

const update = async (params: IUpdate) => {
  const subTask = await SubTask.update(
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
