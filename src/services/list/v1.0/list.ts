import {Op} from 'sequelize';

import db from '../../../models';
import {ListModel} from '../../../models/ListModel';

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

class List {
  private _params: IList;

  constructor(params: IList) {
    this._params = params;
  }

  async _generateCondition() {
    const _condition: Record<string, object> = {};

    if (this._params.where.name) {
      _condition['name'] = {
        [Op.like]: `%${this._params.where.name}%`,
      };
    }

    if (this._params.where.description) {
      _condition['description'] = {
        [Op.like]: `%${this._params.where.description}%`,
      };
    }

    if (this._params.where.startAt) {
      _condition['startAt'] = {
        [Op.lte]: this._params.where.startAt,
      };
    }

    if (this._params.where.endAt) {
      _condition['endAt'] = {
        [Op.gte]: this._params.where.endAt,
      };
    }

    return _condition;
  }

  async _getPagination() {
    return {
      limit: this._params.limit,
      offset: (this._params.page - 1) * this._params.limit,
    };
  }

  async _getPagingData(data: ListModel[], totalItems: number) {
    const currentPage = this._params.page;
    const totalPages = Math.ceil(totalItems / this._params.limit);

    return {data, totalPages, currentPage};
  }

  async exec() {
    const _condition = await this._generateCondition();
    const _pagination = await this._getPagination();

    const response = await db.List.findAndCountAll({
      offset: _pagination.offset,
      limit: _pagination.limit,
      where: _condition,
    });

    const data = await this._getPagingData(response.rows, response.count);

    return data;
  }
}

const show = (params: IList) => {
  return new List(params).exec();
};

export default show;
