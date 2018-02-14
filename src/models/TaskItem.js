
class TaskItem {
  constructor(webTaskItem = {}) {
    this.id = webTaskItem.task_id + '_' + webTaskItem.order;

    this.taskId = webTaskItem.task_id;
    this.order = webTaskItem.order;
    this.typeCode = webTaskItem.type_code;
    this.points = webTaskItem.points;
    this.text = webTaskItem.task_item_text;
    this.choices = webTaskItem.choices_json;
    this.correctAnswer = webTaskItem.correct_answer_free_field;
    this.createdAt = this.dateFromString(webTaskItem.created_at);
    this.updatedAt = this.dateFromString(webTaskItem.updated_at);    
  }

  //  TODO: create global function later
  dateFromString(dateTimeString) {
    let bits = dateTimeString.split(/\D/);
    return new Date(bits[0], --bits[1], bits[2], bits[3], bits[4], bits[5]);
  }

}

TaskItem.schema = {
  name: 'TaskItem',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    taskId: { type: 'int', indexed: true },
    order: { type: 'int', indexed: true },    
    typeCode: { type: 'string' },
    points: { type: 'int' },
    text: { type: 'string' },
    choices: { type: 'string' },
    correctAnswer: { type: 'string' },
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' },
  }
};

module.exports = TaskItem;