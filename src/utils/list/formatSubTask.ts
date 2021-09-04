import {SubTask} from '../../models';

const formatSubTask = (subTask: SubTask) => ({
  id: subTask.id,
  listID: subTask.listID,
  name: subTask.name,
  description: subTask.description,
});

export default formatSubTask;
