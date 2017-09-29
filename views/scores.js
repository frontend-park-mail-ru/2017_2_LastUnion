'use strict'

const View = require('../modules/view');
const Header = require('./templates/header/header');
const Scores = require('../views/templates/scores/scores');

class ScoresView extends View {

  constructor() {
    super();
    if(ScoresView._instance) {
      return ScoresView._instance;
    }
    ScoresView._instance = this;
    this.dom.insertDom(this.body, Header.rend({loggedin : false}), 'Header');
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
    this.dom.loadedBlocks['Header'].hidden = false;
    this.dom.loadedBlocks['Scores'].hidden = false;
  }

  DestroyPage() {
    this.dom.loadedBlocks['Header'].hidden = 'true';
    this.dom.loadedBlocks['Scores'].hidden = 'true';
  }

}

module.exports = ScoresView;
