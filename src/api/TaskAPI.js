import API from './API';

class TaskAPI {
  constructor(server, authToken) {
    this.server = server;
    this.authToken = authToken;
  }

  async getTasks() {
    let url = this.server + '/api/v1/mobile/tasks';
    url += '?token=' + this.authToken;

    console.log('Getting tasks: ', url);

    let response = await fetch(url);

    return API.handleResponse(response);
  }

  async submitTaskResponse(taskId, form) {
    let url = this.server + `/api/v1/mobile/task/${taskId}/submit-answers`;
    url += '?token=' + this.authToken;

    form.token = this.authToken;

    console.log('Submitting task response: ', url);

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    return API.handleResponse(response);
  }
}

module.exports = TaskAPI;