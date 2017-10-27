/* global require */
/* global module */

'use strict';

const DEFAULT_W = 1920;

const Dot = require('./dot');
const Player = require('./player');
const InputController = require('./input');
const ObstaclesController = require('./obstacle');

class GameController {

	constructor () {
		if(GameController._instance) {
			return GameController._instance;
		}
		GameController._instance = this;
		
		this.horSpeed = 30;
		this.frameTime = 30;

		this.gameCanvas = document.getElementById('game');
		this.gameCtx = this.gameCanvas.getContext('2d');
		
		this.PlayerController = new Player();	
		this.InputController = new InputController(this);
		this.ObstaclesController = new ObstaclesController();
		this.WorldController;

		this.initGame();
		
		this.game = null;
		this._over = false;
		this._pause = false;
		this.play();
	}

	initGame() {
		this.PlayerController.init();
		this.ObstaclesController.resetObstacles();
	}

	runPlayer(gameSettings) {
		this.PlayerController.trigger();
		this.PlayerController.draw(gameSettings);
	}

	runObstacles(gameSettings) {
		const bottomMid = new Dot(gameSettings.width / 2 + this.PlayerController.xPos, 300 - this.PlayerController.yBottomPos);
		const upperMid = new Dot(gameSettings.width / 2 + this.PlayerController.xPos, 300 - this.PlayerController.yHeadPos);
		
		if (this.ObstaclesController.checkFatalCollisions(upperMid, bottomMid)) {
			this._over = true;
		}
		
		if (this.ObstaclesController.obstaclesAmount <= 0) {
			this.ObstaclesController.addSeriesOfObstacles(gameSettings.width, 300, 150);
		}
		
		this.ObstaclesController.redrawAllObstacles(gameSettings);
		this.ObstaclesController.moveAllObstacles(this.horSpeed);
		if(this._over) {
			this.gameover();
		}
	}

	reset() {
		this.initGame();
		this._over = false;
		this._pause = false;
		this.play();
	}

	play() {
		const _this = this;
		this.game = setInterval(function () {
	
			let gameSettings = {
				'canvas' : _this.gameCtx,
				'height' : _this.gameCanvas.height,
				'width' : _this.gameCanvas.width,
				'scale' : _this.gameCanvas.width / DEFAULT_W,
			}

			_this.gameCtx.fillStyle = "#FFFFFF";
			_this.gameCtx.strokeStyle = "#000000";
			_this.gameCtx.clearRect(0, 0, _this.gameCanvas.width, _this.gameCanvas.height);

			_this.runPlayer(gameSettings);
			_this.runObstacles(gameSettings);
		}, this.frameTime);
	}

	text(source, y, size, color) {
		this.gameCtx.fillStyle = color;
		this.gameCtx.font = size + "px Arial";
		this.gameCtx.textAlign="center";
		this.gameCtx.fillText(source, this.gameCanvas.width / 2, y - size);
	}

	setOpacity() {
		this.gameCtx.globalAlpha = 0.8;
		this.gameCtx.fillStyle = "#FFFFFF";
		this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.gameCtx.globalAlpha = 1.0;
	}

	pause() {
		if(this._over) {
			return;
		}

		if(!this._pause) {
			this._pause = true;
			clearInterval(this.game);
			this.pauseOverlay();
			return;
		}

		this._pause = false;
		this.play();
	}

	pauseOverlay() {
		this.setOpacity();
		this.text("Pause", this.gameCanvas.height / 2, 60, "#000000");
		this.text("Press SPACE to continue", this.gameCanvas.height / 2 + 30, 30, "#555555");
	}

	gameover() {
		clearInterval(this.game);
		this.gameoverOverlay();
	}

	gameoverOverlay() {
		this.setOpacity();
		this.text("Game Over!", this.gameCanvas.height / 2, 60, "#000000");
		this.text("Press SPACE to run again!", this.gameCanvas.height / 2 + 30, 30, "#555555");

		const nekro = new Image();
		nekro.src = '/img/nekro.png';
		const _this = this;
		nekro.onload = function() {
			_this.gameCtx.drawImage(nekro, _this.gameCanvas.width / 2 - 100, 100, 200, 200);
		}
	}
	
}

module.exports = GameController;
