/* global require */
/* global module */

'use strict';

const Types = {
	UP : 0,
	GROUND : 1,
};

const typesAmount = 2;
const spikeColor = '#000000';

function GetRandomNLessThen(Restrict) {
	return Math.floor(Math.random() * Restrict);
}

function GetRandomNInRange(a, b) {
    return Math.floor(Math.random() * (b + 1 - a) + a);
}

class Obstacle {

	constructor(x, y, type, drawAt, checkFatal, checkCollision) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 100;
		
		this.type = type;
		
		this.drawAt = drawAt;					// drawAt(canvas, ctx, x)
		this.checkFatal = checkFatal;			// checkFatal(upperMidPoint, lowerMidPoint)
		this.checkCollision = checkCollision;	// checkCollision(upperRightPoint,lowerRightPoint)
	}
	
	static drawUpperObstacleAt(drawingInfo, x) {
		drawingInfo.canvas.fillStyle = '#440000';
		drawingInfo.canvas.strokeStyle = '#FF0000';
		drawingInfo.canvas.fillRect(x, 100, 50, 100);
		
		drawingInfo.canvas.beginPath();
		drawingInfo.canvas.moveTo(x,100);
		
		let spikeX = 5;
		const spikeHeight = 10;
        
		while (spikeX < 50) {
			drawingInfo.canvas.lineTo(
				x + spikeX, 
				98 - (spikeHeight + (spikeX / 5) * (spikeX / 5 % 2)) * (spikeX / 5 % 2)
			);
			spikeX = spikeX + 5;
		}
        
		drawingInfo.canvas.lineTo(x + 50, 100);
		drawingInfo.canvas.fillStyle = spikeColor;
		drawingInfo.canvas.fill();
		
		drawingInfo.canvas.beginPath();
		drawingInfo.canvas.moveTo(x,200);
		
		spikeX = 5;
        
		while (spikeX < 50) {
			drawingInfo.canvas.lineTo(
				x + spikeX,
				202 + (spikeHeight + (spikeX / 5) * (spikeX / 5 % 2)) * (spikeX / 5 % 2));
			spikeX = spikeX + 5;
		}
        
		drawingInfo.canvas.lineTo(x + 50, 200);
		drawingInfo.canvas.fillStyle = spikeColor;
		drawingInfo.canvas.fill();
	}
	
	CheckUpperObstacleFatal(upperMidPoint, lowerMidPoint) {
		return (
			this.x < upperMidPoint.x && 
            upperMidPoint.x < this.x + this.width &&
            200 <= upperMidPoint.y && 
            upperMidPoint.y <= 210
		);
	}
	
	CheckGroundObstacleFatal (upperMidPoint, lowerMidPoint) {
		return (
			this.x < upperMidPoint.x && 
            upperMidPoint.x < this.x + this.width &&
            lowerMidPoint.y > 190
		);
	}
	
	static drawGroundObstacleAt (drawingInfo, x) {
		drawingInfo.canvas.fillStyle = '#440000';
		drawingInfo.canvas.strokeStyle = '#FF0000';
		drawingInfo.canvas.fillRect(x, 200, 50, 100);
		
		drawingInfo.canvas.beginPath();
		drawingInfo.canvas.moveTo(x,200);
		
		let spikeX = 5;
		const spikeHeight = 10;
		while (spikeX < 50) {
			drawingInfo.canvas.lineTo(
				x + spikeX,
				198 - (spikeHeight + (spikeX / 5) * (spikeX / 5 % 2)) * (spikeX / 5 % 2));
			spikeX = spikeX + 5;
		}
        
		drawingInfo.canvas.lineTo(x + 50, 200);
		drawingInfo.canvas.fillStyle = spikeColor;
		drawingInfo.canvas.fill();
	}
	
}

class ObstacleCreator {

	static CreateByType(type, x) {
		switch (type) {
		case Types.UP : return ObstacleCreator.CreateUpperObstacle(x);
		case Types.GROUND : return ObstacleCreator.CreateGroundObstacle(x);
		}
	}
	
	static CreateUpperObstacle(x) {
		const Obst = new Obstacle(x, 200, Types.UP, Obstacle.drawUpperObstacleAt);
		Obst.width = 50;
		Obst.height = 100;
		Obst.checkFatal = Obst.CheckUpperObstacleFatal;
		
		return Obst;
	}
	static CreateGroundObstacle(x) {
		const Obst = new Obstacle(x, 0, Types.GROUND, Obstacle.drawGroundObstacleAt);
		Obst.width = 50;
		Obst.height = 100;
		Obst.checkFatal = Obst.CheckGroundObstacleFatal;
		
		return Obst;
	}
}
	
class ObstaclesController {

	constructor() {		
		this.obstaclesArray = []; 
	}
    
	resetObstacles () { 
		this.obstaclesArray = []; 
	}
	
	get obstaclesAmount() {
		return this.obstaclesArray.length;
	}
	
	checkStoppingCollisions(upperRightPoint,lowerRightPoint) {
		
	}
	
	checkFatalCollisions(upperMidPoint, lowerMidPoint) {
		let flag = false;
		this.obstaclesArray.forEach(function(obstacle, index, array) {
			if (obstacle.checkFatal(upperMidPoint, lowerMidPoint)) 
				flag = true;
		});

		return flag;
	}
	
	redrawAllObstacles(drawingInfo) {  //drawing info contents canvas context, scale, etc..
		this.obstaclesArray.forEach(function(obstacle, index, array) {
			obstacle.drawAt(drawingInfo, obstacle.x);
		});									
	}

	moveAllObstacles(horSpeed) {
		this.obstaclesArray.forEach(function(item, index, array) {
			item.x = item.x - horSpeed;
		});
		
		// deliting left object that's away from screen
		if (this.obstaclesArray[0].x < -this.obstaclesArray[0].width) {
			this.obstaclesArray.shift();
		}
	}
	
	addSeriesOfObstacles(screenWidth, minRange, delta) {
		const obstacleCreator = new ObstacleCreator;
		
		const baseX = Math.floor(screenWidth * 1.5);
		let curX = baseX;
		
		let obstaclesInSeries = GetRandomNInRange(3, 6);
		while (obstaclesInSeries >= 0) {
			const curType = GetRandomNLessThen(typesAmount);
			
			this.obstaclesArray.push(ObstacleCreator.CreateByType(curType, curX));
			
			curX = curX + minRange + GetRandomNLessThen(delta);
			obstaclesInSeries = obstaclesInSeries - 1;
		}
	}
}

export default ObstaclesController;
