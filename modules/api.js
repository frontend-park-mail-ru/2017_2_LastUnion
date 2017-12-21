/* global module */

'use strict';

//const HOST = 'localhost:8080';
//const PROTOCOL = 'http://';
const PROTOCOL = 'https://';
const HOST = 'api.lastunion.ml';


class API {

	constructor() {
		this._protocol = PROTOCOL;
		this._host = HOST;
		this._cookie = null;
	}

	sendReq(method, httpMethod, params) {
		const url = this._protocol + this._host + '/api/' + method;
		const httpRequest = {
			method: httpMethod,
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Request-Method': httpMethod,
				'Cookie': this._cookie
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
				return response.json();
			},
			function(response) {
				console.log('Connection issues: ', response);
				return response;
			}
		).catch(function(error) {
			console.log('Bad response: ' + error);
			return error;
		})
	}

}

export default API;
