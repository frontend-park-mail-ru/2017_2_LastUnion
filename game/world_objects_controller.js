/* global require */
/* global module */

'use strict';

const MathGeom = require('./math_geom.js');

const UpperObstacle = require('./world_objects/upper_obstacle.js');
const MidObstacle = require('./world_objects/mid_obstacle.js');
const PitObstacle = require('./world_objects/pit_obstacle.js');
const MidGem = require('./world_objects/mid_gem.js');
const UpperGem = require('./world_objects/upper_gem.js');

const typesAmount = 5;
const Types = {
	UP : 0,
	MID : 1,
	PIT : 2,
	MIDGEM : 3,
	UPGEM: 4,
};

	
class WorldObjectsController {

	constructor() {		
		this.objectsArray = []; 
	}
    
	resetObjects () { 
		this.objectsArray = []; 
	}
	
	getObjectsAmount() {
		return this.objectsArray.length;
	}
		
	CheckAllCollisions(playerUpperLeft, playerBottomRight) {
		let res = null;
		let foundRes = null;
		let found = false;
		
		this.objectsArray.forEach(function(worldObject, index, array) {
			res = worldObject.CheckCollision(playerUpperLeft, playerBottomRight);
			if (!found && res.isCollided) {
				found = true;
				foundRes = res;
			}
		});

		return foundRes;
	}
	
	redrawAllObjects(gameSettings) {  //drawing info contents canvas context, scale, etc..
		this.objectsArray.forEach(function(worldObject, index, array) {
			worldObject.draw(gameSettings);
		});									
	}

	moveAllObjects(horSpeed) {
		this.objectsArray.forEach(function(worldObject, index, array) {
			worldObject.x = worldObject.x - horSpeed;
		});
		
		// deliting left object that's away from screen
		if (this.objectsArray[0].x < -this.objectsArray[0].GetWidth()) {
			this.objectsArray.shift();
		}
	}
	
	CreateObjectByType(type, x) {
		switch (type) {
		case Types.UP : return new UpperObstacle(x);
		case Types.MID : return new MidObstacle(x);
		case Types.PIT : return new PitObstacle(x);
		case Types.MIDGEM : return new MidGem(x);
		case Types.UPGEM : return new UpperGem(x);
		}
	}
	
	addSeriesOfObjects(screenWidth, minRange, delta) {
		
		const baseX = Math.floor(screenWidth * 1.5);
		let curX = baseX;
		
		let obstaclesInSeries = MathGeom.GetRandomNInRange(9, 18);
		while (obstaclesInSeries >= 0) {
			const curType = MathGeom.GetRandomNLessThen(typesAmount);
			
			this.objectsArray.push(this.CreateObjectByType(curType, curX));
			
			curX = curX + minRange + MathGeom.GetRandomNLessThen(delta);
			obstaclesInSeries = obstaclesInSeries - 1;
		}
	}
}

module.exports = WorldObjectsController;