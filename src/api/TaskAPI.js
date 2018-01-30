
import API from './API';

class TaskAPI {
  constructor(server, authToken) {
    this.server = server;
    this.authToken = authToken;
  }

  async getTasks() {
    let url = this.server + '/api/v1/mobile/tasks';
    url += '?token=' + this.authToken;

    let response = await fetch(url);

    return API.handleResponse(response);
  }
}

module.exports = TaskAPI;