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

  login(login, password) {
    this.api.call('login', 'POST', {
      login: login,
      password: password
    }).then(function(response) {
      console.log(response);
      this._proto.login = login;
      this._loggedin = true;
    });
  }

  signup(login, password, email) {
    this.api.call('signup', 'POST', {
      login: login,
      password: password,
      email: email
    }).then(function(response) {
      this.login(login, password);
    });
  }

  logout() {
    this.api.call('logout', 'POST').then(function(response) {
      this._proto = {};
      this._loggedin = false;
    });
  }

}

module.exports = User;
