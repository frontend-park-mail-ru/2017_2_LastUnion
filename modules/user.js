'use strict';

const API = require('./api.js');

class User {

	constructor() {
		if(User._instance) {
			return User._instance;
		}
		User._instance = this;

		this.api = new API;
		this._loggedin = false;
		this._proto = {};
	}

	isAuth() {
		return this._loggedin;
	}

	getScore() {
		return 322;
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
