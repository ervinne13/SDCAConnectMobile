import Realm from 'realm';
import Task from '../models/Task';

let repository = new Realm({
  schema: [{
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      webId: { type: 'int' },
      randomizesTasks: { type: 'bool' },
      timeLimitMinutes: { type: 'int' },
      typeCode: { type: 'string' },
      displayName: { type: 'string' },
      description: { type: 'string' },
    }
  }]
});

let TaskService = {
  findAll: function (sortBy) {
    //  false = desc
    if (!sortBy) sortBy = [['id', false], ['displayName', true]];
    return repository.objects('Task').sorted(sortBy);
  },

  save: function (task) {
    if (repository.objects('Task').filtered("webId = '" + task.webId + "'").length) return;

    return new Promise(resolve => {
      repository.write(() => {
        task.updatedAt = new Date();
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