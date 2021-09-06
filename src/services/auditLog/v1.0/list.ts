import {Op} from 'sequelize';

import {AuditLog} from '../../../models';

interface IList {
  page: number;
  limit: number;
}

const getPagination = (params: IList) => {
  return {
    limit: params.limit,
    offset: (params.page - 1) * params.limit,
  };
};

const getPagingData = (
  data: AuditLog[],
  count: number,
  page: number,
  limit: number,
) => {
  const currentPage = page;
  const totalPages = Math.ceil(count / limit);

  return {data, count, totalPages, currentPage};
};

const list = async (params: IList) => {
  const _pagination = getPagination(params);

  const response = await AuditLog.findAndCountAll({
    offset: _pagination.offset,
    limit: _pagination.limit,
    where: {
      [Op.or]: {
        deletedAt: null,
      },
    },
  });

  const data = await getPagingData(
    response.rows,
    response.count,
    params.page,
    params.limit,
  );

  return data;
};

export default list;
