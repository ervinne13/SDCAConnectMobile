import _ from 'lodash';
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

    // console.log('Tasks Fetched', webTasks);

    if (!webTasks.length) {
      console.warn('No tasks available');
      return;
    }

    webTasks.forEach(webTask => {      
      TaskService.save(new Task(webTask));
    });

    console.log('Done sync tasks');

  },

  find: function (id) {
    let result = repository
      .objects('Task')
      .filtered("id = '" + id + "'");

    if (result.length) {
      return result[0];
    } else {
      throw new Error('Task with id: ' + id + ' not found');
    }
  },

  findAll: function (sortBy) {
    //  false = desc
    if (!sortBy) 
      sortBy = [
        [
          'id', false
        ],
        ['displayName', true]
      ];
    return repository
      .objects('Task')
      .sorted(sortBy);
  },

  save: function (task) {
    console.log('Attempting to save task:', task);
    //  update instead if the record already exists
    if (repository.objects('Task').filtered("id = '" + task.id + "'").length) {
      return TaskService.update(task);
    }

    console.log('Attempt');

    return new Promise(resolve => {

      console.log('Promise');      
      
      repository.write(() => {
        console.log('Repository Write');
        task.createdAt = new Date();
        repository.create('Task', task);
        console.log('Task Saved:', task);
        resolve(task);
      });

      console.log('After repository write');
    });
  },

  update: function (task) {

    return new Promise(resolve => {
      repository.write(() => {
        task.updatedAt = new Date();
        //  TODO:
        resolve(task);
      });
    });
  },

  remove: function (task) {
    return new Promise(resolve => {
      repository.write(() => {
        console.log('deleting task items: ');
        console.log(task.items);
        repository.delete(task.items);
        console.log('deleted');

        console.log('deleting task: ');
        console.log(task);
        repository.delete(task);
        console.log('deleted');
        resolve();
      });
    });
  }

};

module.exports = TaskService;