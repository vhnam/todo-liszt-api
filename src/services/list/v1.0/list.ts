import {Op} from 'sequelize';

import {List} from '../../../models';

interface IList {
  page: number;
  limit: number;
  where: {
    name?: string;
    description?: string;
    startAt?: Date;
    endAt?: Date;
  };
}

const generateCondition = (params: IList) => {
  const _condition: Record<string, object> = {};

  if (params.where.name) {
    _condition['name'] = {
      [Op.like]: `%${params.where.name}%`,
    };
  }

  if (params.where.description) {
    _condition['description'] = {
      [Op.like]: `%${params.where.description}%`,
    };
  }

  if (params.where.startAt) {
    _condition['startAt'] = {
      [Op.lte]: params.where.startAt,
    };
  }

  if (params.where.endAt) {
    _condition['endAt'] = {
      [Op.gte]: params.where.endAt,
    };
  }

  return _condition;
};

const getPagination = (params: IList) => {
  return {
    limit: params.limit,
    offset: (params.page - 1) * params.limit,
  };
};

const getPagingData = (
  data: List[],
  count: number,
  page: number,
  limit: number,
) => {
  const currentPage = page;
  const totalPages = Math.ceil(count / limit);

  return {data, count, totalPages, currentPage};
};

const list = async (params: IList) => {
  const _condition = generateCondition(params);
  const _pagination = getPagination(params);

  const response = await List.findAndCountAll({
    offset: _pagination.offset,
    limit: _pagination.limit,
    where: _condition,
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
