/* global require */
/* global module */

'use strict';
import Dot from '../dot';
import MathGeom from '../math_geom.js';
import WorldObject from './world_object.js';

const Y = 420;
const WIDTH = 25;
const HEIGHT = 25;

const GEM = new Image();
GEM.src = '/img/gem.png';         

class MidGem extends WorldObject {

	GetWidth () { return WIDTH; } 
	GetHeight () { return HEIGHT; }
	
	draw (gameSettings) {
		
		// spikes (upper half of png)
		gameSettings.canvas.drawImage(GEM,
			(this.x-WIDTH/2)*gameSettings.scale,
			(Y-HEIGHT/2)*gameSettings.scale,
			25,25
		);
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
			
		let playerMidBottom = new Dot(
			(playerUpperLeft.x + playerBottomRight.x)/2,
			playerBottomRight.y
		);	
			
		// check non-Fatal collision
		if (playerMidBottom.x-WIDTH <= this.x && this.x <= playerMidBottom.x + WIDTH && 
				playerUpperLeft.y <= Y && Y <= playerBottomRight.y ) {
					
			result.isCollided = true;
			result.isFatal = false;
			
			result.scoreEffect = function (score, gameSettings) {
				score.extra(20);
			};
			
			// gem disappears in left side of screen
			this.x = -25;
			
			return result;
		}
		
		return result;
	}
}

export default MidGem;