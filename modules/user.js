/* global require */
/* global module */

'use strict';

import API from './api.js';

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
		if(!this.isAuth()) {
			return 0;
		}

		const _this = this;
		if (typeof this._proto.score === 'undefned' || this._proto.score == null) {
			_this._proto.score = 0;
			this.api.sendReq('user/get_score', 'GET').then(function(response) {
				try {
					_this._proto.score = _this.checkResponse(response);
				} catch(e) {
					console.log("Scores service unavailable.")
				}
			});
		}

		return this._proto.score;
	}

	setScore(score) {
		const _this = this;

		this.api.sendReq('user/set_score/' + score, 'GET').then(function(response) {
			_this._proto.score = score;
		});

	}

	getScores() {
		let score = 0;
		if(this._loggedin) {
			score = this._proto.score;
		}
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
				'score' : score
			}
		};
	}

	login(login, password, errobj) {
		const _this = this;
		return this.api.sendReq('user/signin', 'POST', {
			userName: login,
			userPassword: password
		}).then(function(response) {
			try {
				_this.checkResponse(response);
				_this._proto.login = login;
				_this._loggedin = true;
			} catch(e) {
				errobj.obj(errorobj.id, errorobj.spec, e);
			}
		});
	}

	signup(login, password, email, errobj) {
		const _this = this;
		return this.api.sendReq('user/signup', 'POST', {
			userName: login,
			userPassword: password,
			userEmail: email
		}).then(function(response) {
			try {
				_this.checkResponse(response);
			} catch(e) {
				errobj.obj(errorobj.id, errorobj.spec, e);
			}
		});
	}

	logout() {
		const _this = this;
		return this.api.sendReq('user/logout', 'POST').then(function(response) {
			try {
				_this.checkResponse(response);
				_this._proto = {};
				_this._loggedin = false;
			} catch(e) {
				alert(e);
			}
		});
	}

}

export default User;
