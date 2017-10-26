/* global require */
/* global module */

'use strict';

const API = require('./api.js');

class User {

	constructor() {
		this.api = new API;
		this._loggedin = true;
		this._proto = {};
	}

	checkResponse(response) {
		if(typeof response.result === 'undefined') {
			throw new Error(response);
		}
		if(response.result !== true) {
			throw new Error(String(response.responseMessage));
		}
		return response.data;
	}

	isAuth() {
		return this._loggedin;
	}

	getScore() {
		return 322;
	}

	getScores() {
		return {
			'Scores' : [
				{
					'user' : 'Jhon',
					'place' : '1',
					'score' : '999',
				},
				{
					'user' : 'Mike',
					'place' : '2',
					'score' : '888'
				},
				{
					'user' : 'Bredd',
					'place' : '3',
					'score' : '777'
				}
			],
			'User' : {
				'place' : '999',
				'score' : '0'
			}
		};
	}

	login(login, password) {
		const _this = this;
		return this.api.call('user/signin', 'POST', {
			userName: login,
			userPassword: password
		}).then(function(response) {
			_this.checkResponse(response);
			_this._proto.login = login;
			_this._loggedin = true;
		});
	}

	signup(login, password, email) {
		const _this = this;
		return this.api.call('user/signup', 'POST', {
			userName: login,
			userPassword: password,
			userEmail: email
		}).then(function(response) {
			_this.checkResponse(response);
		});
	}

	logout() {
		const _this = this;
		return this.api.call('user/logout', 'POST').then(function(response) {
			_this.checkResponse(response);
			_this._proto = {};
			_this._loggedin = false;
		});
	}

}

module.exports = User;
