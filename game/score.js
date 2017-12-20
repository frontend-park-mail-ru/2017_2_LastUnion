/* global require */
/* global module */

'use strict';

class Score {

	constructor () {
		if(Score._instance) {
			return Score._instance;
		}
		Score._instance = this;
	}

	init() {
		this._time = 0;
		this._score = 0;
	}

	extra(bonus) {
		this._score += Number(bonus);
	}

	tick() {
		this._time++;
	}

	get scoreValue() {
		return Math.floor(Number(this._time) * 0.1) + Number(this._score);
	}

}

export default Score;
