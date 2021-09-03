import {Op} from 'sequelize';

import {SubTask} from '../../../models';

interface IDestroy {
  id: string;
  listID: string;
}

const destroy = async (params: IDestroy) => {
  await SubTask.destroy({
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
};

export default destroy;
