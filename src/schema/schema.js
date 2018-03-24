import Realm from 'realm';
import Post from '../models/Post';
import Task from '../models/Task';
import TaskItem from '../models/TaskItem';

export default new Realm({schema: [Task.schema, TaskItem.schema, Post.schema], schemaVersion: 11});