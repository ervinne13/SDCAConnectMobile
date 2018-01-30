import API from './API';

class UserAPI {
  constructor(server) {
    this.server = server;
  }

  async checkToken(token) {
    let url = this.server + '/api/v1/mobile/current-user';
    url += '?token=' + token;

    let response = await fetch(url);

    return API.handleResponse(response);
  }
}

module.exports = UserAPI;