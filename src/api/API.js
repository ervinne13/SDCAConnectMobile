
const API = {
  handleResponse: async response => {
    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 401) {
      // throw new Error(401);
      return Promise.reject(401);
    } else {
      console.error(response);
      throw new Error('Server error');
    }
  }
};

module.exports = API;
