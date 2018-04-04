import API from './API';

class ProfileAPI {
  constructor(server, authToken) {
    this.server = server;
    this.authToken = authToken;
  }

  async getStudents() {
    let url = this.server + '/api/v1/mobile/students';
    url += '?token=' + this.authToken;

    let response = await fetch(url);

    return API.handleResponse(response);
  }

  async getTeachers() {
    let url = this.server + '/api/v1/mobile/teachers';
    url += '?token=' + this.authToken;

    let response = await fetch(url);

    return API.handleResponse(response);
  }

  async getProfile(username) {
    let url = this.server + '/api/v1/mobile/profile/' + username;
    url += '?token=' + this.authToken;

    let response = await fetch(url);

    return API.handleResponse(response);
  }
}

module.exports = ProfileAPI;