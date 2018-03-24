import API from './API';

class PostAPI {
  constructor(server, authToken) {
    this.server = server;
    this.authToken = authToken;
  }

  async getPosts() {
    let url = this.server + '/api/v1/mobile/posts';
    url += '?token=' + this.authToken;

    let response = await fetch(url);

    return API.handleResponse(response);
  }
}

module.exports = PostAPI;