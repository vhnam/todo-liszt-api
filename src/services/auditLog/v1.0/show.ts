import {Op} from 'sequelize';

import {AuditLog} from '../../../models';

interface IShow {
  id: string;
}

const show = async (params: IShow) => {
  const list = await AuditLog.findOne({
    where: {
      [Op.or]: [
        {
          id: params.id,
        },
      ],
      deletedAt: null,
    },
  });

  return list;
};

export default show;
