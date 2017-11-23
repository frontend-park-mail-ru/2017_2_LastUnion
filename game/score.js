/* global require */
/* global module */

'use strict';

const Dot = require('./dot');

const WIDTH = 100;
const HEIGHT = 100;
const JUMPPOWER = 33;

const RUN = 0;
const ONAIR = 1;
const BEND = 2;
const BENDEDONAIR = 3;

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

module.exports = Score;
