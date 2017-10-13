'use strict'

const View = require('../modules/view');
const Game = require('./templates/game/game');
const Header = require('../views/templates/header/header');

class GameView extends View {

  constructor() {
    super();
    if(GameView._instance) {
      return GameView._instance;
    }
    GameView._instance = this;

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth()
    }), 'Header');
    this.dom.insertDom(this.body, Game.rend({}), 'Game');
    this.ListenLinks();
  }

  ConstructPage() {
    this.Show('Header');
    this.Show('Game');
  }

  DestroyPage() {
    this.Hide('Header');
    this.Hide('Game');
  }

}

module.exports = GameView;
