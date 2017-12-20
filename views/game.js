/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import Game from './templates/game/game';
import Header from '../views/templates/header/header';

import GameController from '../game/controller';

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
			this.GameController.initGame(false);
			this.GameController.play();
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

export default GameView;
