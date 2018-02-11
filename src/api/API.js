
const API = {
  handleResponse: async response => {
    if (response.status === 200) {  //  try out response.ok later
      return await response.json();
    } else if (response.status === 401) {
      // throw new Error(401);
      return Promise.reject(401);
    } else {
      console.error(response);
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
};

module.exports = API;
