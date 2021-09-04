import {SubTaskModel} from '../../models/SubTaskModel';

const formatSubTask = (subTask: SubTaskModel) => ({
  id: subTask.id,
  listID: subTask.listID,
  name: subTask.name,
  description: subTask.description,
});

export default formatSubTask;
