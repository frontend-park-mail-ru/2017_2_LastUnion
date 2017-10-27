/* global require */
/* global module */

'use strict';

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
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
	}

	initLeaderBoard() {
		const userScores = this.user.getScores();
		this.dom.insertDom(this.body, Scores.rend(userScores), 'Scores');
		this.listenLinks();
	}

	constructPage() {
		this.show('Header');
		if (!this.user.isAuth()) {
			console.error('Access denied.');
			this.router.go('/signin/');
		} else {
			this.initLeaderBoard();
			this.show('Scores');
		}
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Scores');
	}

}

module.exports = ScoresView;
