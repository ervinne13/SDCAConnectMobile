
import TaskItem from './TaskItem';

class Task {
  constructor(webTask = {}) {
    this.id = webTask.id;
    this.randomizesTasks = webTask.randomizes_tasks == 1;
    this.timeLimitMinutes = webTask.time_limit_minutes || 0;
    this.typeCode = webTask.type_code;
    this.displayName = webTask.display_name;
    this.description = webTask.description;    
    this.createdAt = new Date(webTask.created_at);
    this.updatedAt = new Date(webTask.updated_at);

    this.items = [];

    webTask.items.forEach(item => {
      this.items.push(new TaskItem(item));
    });
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