import {ListModel} from '../../models/ListModel';

class Format {
  private _list: ListModel;

  constructor(list: ListModel) {
    this._list = list;
  }

  async exec() {
    return {
      id: this._list.id,
      name: this._list.name,
      description: this._list.description,
      startAt: this._list.startAt.getTime(),
      endAt: this._list.endAt.getTime(),
      color: this._list.color,
    };
  }
}

const format = (list: ListModel) => {
  return new Format(list).exec();
};

export default format;
