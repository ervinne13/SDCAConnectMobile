import RealmUtils from '../utils/RealmUtils';

class Task {
  constructor(webTask = {}) {
    this.id = RealmUtils.guid();
    this.webId = webTask.id;
    this.randomizesTasks = webTask.randomizes_tasks || false;
    this.timeLimitMinutes = webTask.time_limit_minutes || 0;
    this.typeCode = webTask.type_code;
    this.displayName = webTask.display_name;
    this.description = webTask.description;
    this.createdAt = webTask.created_at;
    this.updatedAt = webTask.updated_at;
  }
}

module.exports = Task;