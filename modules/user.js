'use strict'

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

  checkResponse(response) {
    if(respose.status !== 'OK') {
      throw new Error(response.msg);
    }
    return response.data;
  }

  login(login, password) {
    return this.api.call('login', 'POST', {
      login: login,
      password: password
    }).then(function(response) {
      this.checkResponse(response);
      this._proto.login = login;
      this._loggedin = true;
    });
  }

  signup(login, password, email) {
    return this.api.call('signup', 'POST', {
      login: login,
      password: password,
      email: email
    }).then(function(response) {
      this.checkResponse(response);
      this.login(login, password);
    });
  }

  logout() {
    return this.api.call('logout', 'POST').then(function(response) {
      this.checkResponse(response);
      this._proto = {};
      this._loggedin = false;
    });
  }

}

module.exports = User;