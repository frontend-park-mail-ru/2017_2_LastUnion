'use strict'

const API = require('./api.js');

const DEMO_MODE = true;

class User {

  constructor() {
    this._loggedin = false;
    this._proto = {};
  }

  isAuth() {
    return this._loggedin;
  }

  login(login, password) {
    if(DEMO_MODE) {
      this._proto.login = 'Demo';
      this._loggedin = true;
      return true;
    }
  }

  signup(login, password, email) {
    if(DEMO_MODE) {
      this.login(login, password);
    }
  }

  logout() {
    if(DEMO_MODE) {
      this._proto = {};
      this._loggedin = false;
    }
  }

}

module.exports = User;
