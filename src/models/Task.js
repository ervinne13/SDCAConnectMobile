
import TaskItem from './TaskItem';
import Moment from 'moment';

class Task {
  constructor(webTask = {}) {
    this.id = webTask.id;
    this.randomizesTasks = webTask.randomizes_tasks == 1;
    this.timeLimitMinutes = webTask.time_limit_minutes || 0;
    this.typeCode = webTask.type_code;
    this.displayName = webTask.display_name;
    this.description = webTask.description;    
    // this.createdAt = new Date(webTask.created_at);
    // this.updatedAt = new Date(webTask.updated_at);

    this.createdAt = Moment(webTaskItem.created_at).toDate();
    this.updatedAt = Moment(webTaskItem.updated_at).toDate();

    this.items = [];

    webTask.items.forEach(item => {
      this.items.push(new TaskItem(item));
    });
  }

  //  TODO: create global function later
  dateFromString(dateTimeString) {
    let bits = dateTimeString.split(/\D/);
    return new Date(bits[0], --bits[1], bits[2], bits[3], bits[4], bits[5]);
  }
}

Task.schema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    randomizesTasks: { type: 'bool' },
    timeLimitMinutes: { type: 'int' },
    typeCode: { type: 'string' },
    displayName: { type: 'string' },
    description: { type: 'string' },
    items: {type: 'list', objectType: 'TaskItem'},
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' },
  }
};

module.exports = Task;