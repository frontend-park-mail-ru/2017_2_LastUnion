/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import Game from './templates/multiplayer/multiplayer';
import Header from '../views/templates/header/header';

import MultiplayerController from '../game/multiplayer';

class MultiplayerView extends View {

	constructor() {
		super();
		if(MultiplayerView._instance) {
			return MultiplayerView._instance;
		}
		MultiplayerView._instance = this;
		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		if(this.dom.insertDom(this.body, Game.rend({}), 'Multiplayer')) {
			Game.resize();
			this.MultiplayerController = new MultiplayerController();
			this.MultiplayerController.initGame(false);
			this.MultiplayerController.play();
		}
		this.listenLinks();
	}

	constructPage() {
		if (!this.user.isAuth()) {
			console.error('Access denied.');
			this.router.go('/signin/');
		} else {
			this.init();
			this.show('Header');
			this.show('Multiplayer');
		}
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Multiplayer');
	}

}

export default MultiplayerView;
