'use strict'

class API {

  constructor() {
    this._host = 'boiling-bastion-61743.herokuapp.com';
  }

  call(method, httpMethod, params) {
    const url = 'https://' + this._host + '/api/' + method;
    const httpRequest = {
      method: httpMethod,
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    };

    if(httpMethod === 'POST' && typeof params !== 'undefined') {
      httpRequest.body = JSON.stringify(data);
    }

    return fetch(url, httpRequest).then(
      function(response) {
        console.log("Success");
        return response.json();
      },
      function(response) {
        console.error("Connection issues");
        alert("We didn't get response from server. Please check your internet connection!");
        console.log(response);
      })
  }

}

module.exports = API;
