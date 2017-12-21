/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import Scores from '../views/templates/scores/scores';
import Header from '../views/templates/header/header';

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

		this.userScores = null;
	}

	initLeaderBoard() {
		const _this = this;
		return this.user.getScores().then(function(data) {
			if(data !== false) {
				_this.userScores = {'Scores': data };
				_this.dom.insertDom(_this.body, Scores.rend(_this.userScores), 'Scores', true);
				_this.listenLinks();
			}
			return data;
		})
	}

	constructPage() {
		this.show('Header');
		if (!this.user.isAuth()) {
			console.error('Access denied.');
			this.router.go('/signin/');
		} else {
			this.initLeaderBoard().then(function() {
				this.show('Scores');
			});
		}
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Scores');
	}

}

export default ScoresView;
