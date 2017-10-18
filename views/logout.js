'use strict'

const View = require('../modules/view');
const Header = require('../views/templates/header/header');

class LogoutView extends View {

  constructor() {
    super();
    if(LogoutView._instance) {
      return LogoutView._instance;
    }
    LogoutView._instance = this;

    this.user.logout();

    this.Hide('Header');
    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth(),
      score: this.user.getScore()
    }), 'Header', true);
  }

  ConstructPage() {
    window.history.pushState({},'','/menu/');
    this.router.loadPage('/menu/');
  }

  DestroyPage() {

  }

}

module.exports = LogoutView;
