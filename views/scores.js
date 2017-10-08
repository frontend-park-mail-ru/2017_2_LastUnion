'use strict'

const View = require('../modules/view');
const Scores = require('../views/templates/scores/scores');
const Header = require('../views/templates/header/header');

class ScoresView extends View {

  constructor() {
    super();
    if(ScoresView._instance) {
      return ScoresView._instance;
    }
    ScoresView._instance = this;

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth()
    }), 'Header');
  }

  InitLeaderBoard() {
    this.dom.insertDom(this.body, Scores.rend({
      'users' : ['John','Mike','Bredd','Jarel','Jane'],
      'place' : ['1','2','3','4','5'],
      'score' : ['999','888','777','666','555'],
      'userplace' : '999',
      'userscore' : '0',
    }), 'Scores');
    this.ListenLinks();
  }

  ConstructPage() {
    this.Show('Header');
    if (!this.user.isAuth()) {
      console.error("Access denied.");
      window.history.pushState({},'','/signin/');
      this.router.loadPage('/signin/');
    } else {
      this.InitLeaderBoard();
      this.Show('Scores');
    }
  }

  DestroyPage() {
    this.Hide('Header');
    this.Hide('Scores');
  }

}

module.exports = ScoresView;
