/* global require */
/* global module */

'use strict';

const Dot = require('./dot');
const Player = require('./player');
const InputController = require('./input');

class GameController {

	constructor () {
		this.horSpeed = 30;
		this.frameTime = 33;

		this.gameCanvas = document.getElementById('game');
		this.gameCtx = this.gameCanvas.getContext('2d');
		
		this.PlayerController = new Player();	
		this.InputController = new InputController(this.gameCanvas);
		this.ObjectController;
		this.WorldController;
		
		const _this = this;
		setInterval(function () {
	
			let drawingInginfo = {
				'canvas' : _this.gameCtx,
				'height' : _this.gameCanvas.height,
				'width' : _this.gameCanvas.width,
			}

			_this.gameCtx.clearRect(0, 0, _this.gameCanvas.width, _this.gameCanvas.height);
			_this.PlayerController.trigger();
			_this.PlayerController.draw(drawingInginfo);
		}, this.frameTime);
	}
	
}

module.exports = GameController;
