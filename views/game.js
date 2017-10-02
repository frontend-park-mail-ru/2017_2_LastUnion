'use strict'

const View = require('../modules/view');
const Header = require('./templates/header/header');
const Game = require('./templates/game/game');

class GameView extends View {

  constructor() {
    super();
    if(GameView._instance) {
      return GameView._instance;
    }
    GameView._instance = this;
    this.dom.insertDom(this.body, Header.rend({loggedin : false}), 'Header');
    this.dom.insertDom(this.body, Game.rend({}), 'Game');
    this.ListenLinks();
  }

  ConstructPage() {
    //console.log(this.dom.loadedBlocks['Header']);
    this.dom.loadedBlocks['Header'].html.hidden = false;
    this.dom.loadedBlocks['Game'].html.hidden = false;
  }

  DestroyPage() {
    this.dom.loadedBlocks['Header'].html.hidden = 'true';
    this.dom.loadedBlocks['Game'].html.hidden = 'true';
  }

}

module.exports = GameView;
