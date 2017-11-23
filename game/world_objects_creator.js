/* global require */
/* global module */

'use strict';

class WorldObject {
	constructor (x) {
		this.x = x;
	}
	
	drawAt (x) {}
	
	// returns object containing: is there a collision (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'height' : function(scoreController, sceneInfo) {},
			'width' : function(player, sceneInfo) {},
		};
		
		return result;
	}
}

module.exports = WorldObject;