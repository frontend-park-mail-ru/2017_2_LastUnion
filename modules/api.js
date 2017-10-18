'use strict'

class API {

  constructor() {
    this._host = 'lastunion.herokuapp.com';
  }

  call(method, httpMethod, params) {
    const url = 'https://' + this._host + '/api/' + method;
    const httpRequest = {
      method: httpMethod,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      credentials: 'include',
      body: null
    };

    console.log(method, httpMethod, params);
    if(httpMethod === 'POST' && typeof params !== 'undefined') {
      httpRequest.body = JSON.stringify(params);
    }

    console.log(httpRequest);

    return fetch(url, httpRequest).then(
      function(response) {
        console.log("Success");
        return response.json();
      },
      function(response) {
        console.error("Connection issues: ", response);
        return response;
      })
  }

}

module.exports = API;
