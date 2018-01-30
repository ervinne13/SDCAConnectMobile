import Realm from 'realm';
import Task from '../models/Task';
import TaskAPI from '../api/TaskAPI';

import Schema from '../schema/schema';

const repository = Schema;

const TaskService = {
  beginSync: async function (server, authToken) {
    console.log('Starting sync task');
    let api = new TaskAPI(server, authToken);
    let webTasks = await api.getTasks(); //  TODO: add date filtering
    
    webTasks.forEach(webTask => {
      TaskService.save(new Task(webTask));
    });

    let tasks = TaskService.findAll();

    tasks.forEach(task => {
      console.log(task);
      console.log(task.id);
    });

  },

  find: function(id) {
    return repository.objects('Task').filtered("id = '" + task.id + "'");
  },

  findAll: function (sortBy) {
    //  false = desc
    if (!sortBy) sortBy = [['id', false], ['displayName', true]];
    return repository.objects('Task').sorted(sortBy);
  },

  save: function (task) {
    //  update instead if the record already exists
    if (repository.objects('Task').filtered("id = '" + task.id + "'").length) {
      return TaskService.update(task);
    }

    return new Promise(resolve => {
      repository.write(() => {
        task.createdAt = new Date();
        repository.create('Task', task);
        resolve(task);
      });
    });
  },

  update: function (task) {

    return new Promise(resolve => {
      repository.write(() => {
        task.updatedAt = new Date();
        resolve(task);
      });
    });
  }
};

module.exports = TaskService;