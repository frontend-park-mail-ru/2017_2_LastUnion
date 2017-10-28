/* global require */
/* global module */

'use strict';

const API = require('./api.js');

class User {

	constructor() {
		this.api = new API;
		this._loggedin = false;
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
		const _this = this;
		// Is this correct 
		this.api.sendReq('user/get_score', 'GET').then(function(response) {
			_this._proto.score = _this.checkResponse(response);
		});
		
		if (typeof this._proto.score === 'undefned' || this._proto.score == null)
			return 0;
		return this._proto.score;
	}

	setScore(score) {
		const _this = this;
		return this.api.sendReq('user/set_score/' + score, 'GET').then(function(response) {
			_this._proto.score = score;
			_this.checkResponse(response);
		});
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
		return this.api.sendReq('user/signin', 'POST', {
			userName: login,
			userPassword: password
		}).then(function(response) {
			_this.checkResponse(response);
			_this._proto.login = login;
			/////////////////////////////////
			// test
			_this.setScore(50);
			console.log(_this.getScore());
			//////////////////////////////////
			_this._loggedin = true;
		});
	}

	signup(login, password, email) {
		const _this = this;
		return this.api.sendReq('user/signup', 'POST', {
			userName: login,
			userPassword: password,
			userEmail: email
		}).then(function(response) {
			_this.checkResponse(response);
		});
	}

	logout() {
		const _this = this;
		return this.api.sendReq('user/logout', 'POST').then(function(response) {
			_this.checkResponse(response);
			_this._proto = {};
			_this._loggedin = false;
		});
	}

}

module.exports = User;
