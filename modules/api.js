/* global module */

'use strict';

const HOST = 'lastunion.herokuapp.com';

class API {

	constructor() {
		this._host = HOST;
	}

	sendReq(method, httpMethod, params) {
		const url = 'https://' + this._host + '/api/' + method;
		const httpRequest = {
			method: httpMethod,
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Request-Method': httpMethod
			},
			mode: 'cors',
			credentials: 'include',
			body: null
		};

		if(httpMethod === 'POST' && typeof params !== 'undefined') {
			httpRequest.body = JSON.stringify(params);
		}

		return fetch(url, httpRequest).then(
			function(response) {
				console.log('Success');
				return response.json();
			},
			function(response) {
				console.error('Connection issues: ', response);
				return response;
			});
	}

}

module.exports = API;
