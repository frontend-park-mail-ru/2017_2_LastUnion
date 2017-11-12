/* global require */
/* global module */

'use strict';

module.exports = {
	GetRandomNLessThen : function GetRandomNLessThen(Restrict) {
		return Math.floor(Math.random() * Restrict);
	},

	GetRandomNInRange : function GetRandomNInRange(a, b) {
		return Math.floor(Math.random() * (b + 1 - a) + a);
	},
	
	GetDistance : function GetDistance(a, b) {
		let dx = a.x - b.x;
		let dy = a.y - b.y;
		
		return Math.sqrt(dx*dx + dy*dy);
	}
};