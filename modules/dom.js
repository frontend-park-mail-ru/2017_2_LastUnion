'use strict'

const Header = require('../views/templates/header/header');
const Game = require('../views/templates/game/game');
const Scores = require('../views/templates/scores/scores');

class DOM {

  constructor() {
    if(DOM._instance) {
      return DOM._instance;
    }
    DOM._instance = this;

    this.loadedBlocks = {};
    const body = this.gTAG('body')[0];

    this.insertDom(body, Header.rend({loggedin : false}), 'Header');
    this.insertDom(body, Game.rend({}), 'Game');
    this.insertDom(body, Scores.rend({
      'users' : ['John','Mike','Bredd','Jarel','Jane'],
      'place' : ['1','2','3','4','5'],
      'score' : ['999','888','777','666','555'],
      'userplace' : '999',
      'userscore' : '0',
    }), 'Scores');

  }

  insertDom(parent, elem, id) {
    elem.hidden = 'true';
    parent.appendChild(elem);
    this.loadedBlocks[id] = elem;

  }

  gID(id) {
    return document.getElementById(id);
  }

  gTAG(tag) {
    return document.getElementsByTagName(tag);
  }

}

module.exports = DOM;
