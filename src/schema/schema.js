import Realm from 'realm';
import Task from '../models/Task';
import TaskItem from '../models/TaskItem';

export default new Realm({schema: [Task.schema, TaskItem.schema], schemaVersion: 7});