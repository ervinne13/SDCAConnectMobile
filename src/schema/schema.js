import Realm from 'realm';
import Task from '../models/Task';

export default new Realm({schema: [Task.schema], schemaVersion: 2});