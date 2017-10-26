/* global require */
/* global module */

'use strict';

const View = require('../modules/view');
const Game = require('./templates/game/game');
const Header = require('../views/templates/header/header');

const GameController = require('../game/controller.js');

class GameView extends View {

	constructor() {
		super();
		if(GameView._instance) {
			return GameView._instance;
		}
		GameView._instance = this;
		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		if(this.dom.insertDom(this.body, Game.rend({}), 'Game')) {
			Game.resize();
			this.GameController = new GameController();
		}
		this.listenLinks();
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('Game');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Game');
	}

}

module.exports = GameView;
