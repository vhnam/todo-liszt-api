import {ListModel} from '../../models/ListModel';

const formatList = (list: ListModel) => ({
  id: list.id,
  name: list.name,
  description: list.description,
  startAt: list.startAt.getTime(),
  endAt: list.endAt.getTime(),
  color: list.color,
});

export default formatList;
