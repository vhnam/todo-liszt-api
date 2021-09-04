import {Op} from 'sequelize';

import sequelizeConnection from '../../../db';

import {List, SubTask} from '../../../models';

interface IDestroy {
  id: string;
}

const destroy = async (params: IDestroy) => {
  const transaction = await sequelizeConnection.transaction();

  try {
    await List.destroy({
      where: {
        [Op.or]: [
          {
            id: params.id,
          },
        ],
      },
    });
    await SubTask.destroy({
      where: {
        [Op.or]: [
          {
            listID: params.id,
          },
        ],
      },
    });

    transaction.commit();
  } catch {
    transaction.rollback();
  }
};

export default destroy;
