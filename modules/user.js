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
		this._proto = {};
	}

	checkResponse(response) {
		if(typeof response.result === 'undefined') {
			throw response;
		}
		if(response.result !== true) {
			throw response.responseMessage;
		}
		return response.data;
	}

	isAuth() {
		return this._loggedin;
	}

	getUser() {
		const _this = this;
		return this.api.sendReq('user/data', 'GET').then(function(response) {
			try {
				const data = _this.checkResponse(response);
				_this._loggedin = true;
				_this._proto.score = data.userHighScore;
				_this._proto.login = data.userLogin;
				return true;
			} catch(e) {
				_this._loggedin = false;
				return false;
			}
		});
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

	getScores(limit, offset) {
		let score = 0;
		if(this._loggedin) {
			score = this._proto.score;
		} else {
			score = 0;
		}

		const _this = this;
		return this.api.sendReq('user/get_scores?limit=' + limit + '&offset=' + offset + '&order=asc', 'GET').then(function(response) {
			try {
				const data = _this.checkResponse(response);
				
				let result = [];
				data.forEach(function(element, index) {
					if(_this._proto.login === element.userName) {
						element.userName += ' <b>(YOU)</b>';
					}
					result.push({
						'user': element.userName,
						'place': index + offset + 1,
						'score': element.userHighScore
					})
				});
				return result;
			} catch(e) {
				return false;
			}
		});
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
				errobj.obj.err(errobj.id, errobj.spec, e);
			}
			return _this._loggedin;
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
				return true;
			} catch(e) {
				errobj.obj.err(errobj.id, errobj.spec, e);
				return false;
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
