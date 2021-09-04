import {List} from '../../models';

const formatList = (list: List) => ({
  id: list.id,
  name: list.name,
  description: list.description,
  startAt: list.startAt.getTime(),
  endAt: list.endAt.getTime(),
  color: list.color,
});

export default formatList;
