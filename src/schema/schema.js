import Realm from 'realm';
import Task from '../models/Task';
import TaskItem from '../models/TaskItem';

export default new Realm({schema: [TaskItem.schema, Task.schema], schemaVersion: 3});