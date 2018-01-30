
class TaskItem {
  constructor(webTaskItem = {}) {
    this.taskId = webTaskItem.task_id;
    this.order = webTaskItem.order;
    this.typeCode = webTaskItem.type_code;
    this.points = webTaskItem.points;
    this.text = webTaskItem.task_item_text;
    this.choices = webTaskItem.choices_json;
    this.correctAnswer = webTaskItem.correct_answer_free_field;
    this.createdAt = webTaskItem.created_at;
    this.updatedAt = webTaskItem.updated_at;
  }
}

module.exports = TaskItem;