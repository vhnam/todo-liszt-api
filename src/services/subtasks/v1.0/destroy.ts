import {Op} from 'sequelize';

import db from '../../../models';

interface IDestroy {
  listID: string;
  id: string;
}

const destroy = async (params: IDestroy) => {
  await db.SubTask.destroy({
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
