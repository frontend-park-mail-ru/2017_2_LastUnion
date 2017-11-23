/* global require */
/* global module */

'use strict';

const Dot = require('../dot');
const MathGeom = require('../math_geom.js');
const WorldObject = require('./world_object.js');

const Y = 295;
const WIDTH = 50;
const HEIGHT = 100;

const SQUARECOLOUR = '#201919';

const SPIKES = new Image();
SPIKES.src = '/img/spike.png';         

class UpperObstacle extends WorldObject {
	
	GetWidth () { return WIDTH; } 
	GetHeight () { return HEIGHT; }
	
	draw (gameSettings) {
		// drawing central square
		gameSettings.canvas.fillStyle = SQUARECOLOUR;
		gameSettings.canvas.fillRect(
			this.x*gameSettings.scale, 
			(Y+WIDTH/2)*gameSettings.scale, 
			WIDTH*gameSettings.scale, 
			(HEIGHT-WIDTH)*gameSettings.scale
		);
		
		// upper spikes (upper half of png)
		gameSettings.canvas.drawImage(SPIKES, 0, 0, 300, 150,
			this.x*gameSettings.scale,
			Y*gameSettings.scale,
			WIDTH*gameSettings.scale, WIDTH/2*gameSettings.scale);
							
		// bottom spikes (bottom half of png)
		gameSettings.canvas.drawImage(SPIKES, 0, 150, 300, 150,
			this.x*gameSettings.scale,
			(Y+HEIGHT-WIDTH/2)*gameSettings.scale-1,
			WIDTH*gameSettings.scale, WIDTH/2*gameSettings.scale);
	}
	
	// returns object containing: is there a collision (true/false)
	//							  is collision fatal (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'isFatal' : false,
			'scoreEffect' : function (score, gameSettings) {},
			'playerEffect' : function (player, gameSettings) {},
		};
		
		// check spikes
		let playerMidTop = new Dot(
			(playerUpperLeft.x + playerBottomRight.x)/2,
			playerUpperLeft.y
		);
							
		let spikeCenterBottom = new Dot(
			this.x+WIDTH/2,
			Y + HEIGHT - WIDTH/2
		);
		
		// check bottom circle half
		let dist = MathGeom.GetDistance(playerMidTop, spikeCenterBottom);
		
		if ((playerMidTop.y >= spikeCenterBottom.y) && (dist <  WIDTH/2)) {
			result.isCollided = true;
			result.isFatal = true;
							
			return result;
		}
		
		// check non-Fatal collision
		let playerRightTop = new Dot (playerBottomRight.x, playerUpperLeft.y);
		if (this.x <= playerRightTop.x && playerRightTop.x <= this.x+WIDTH && playerRightTop.y < Y+HEIGHT-WIDTH/2) {
			result.isCollided = true;
			result.isFatal = false;
			
			result.playerEffect = function (player, gameSettings) {
				player.changePosition(-gameSettings.horSpeed,0);
								  };
			
			return result;
		}
		
		return result;
	}
}

module.exports = UpperObstacle;