/* global require */
/* global module */

'use strict';

const DEFAULT_W = 1920;
const HORSPEED = 25;
const FRAMETIME = 35;

const User = require('../modules/user');

const Dot = require('./dot');
const Player = require('./player');
const InputController = require('./input');
const WorldObjectsController = require('./world_objects_controller');
const ScoreController = require('./score');

class GameController {

	constructor () {
		if(GameController._instance) {
			return GameController._instance;
		}
		GameController._instance = this;
		
		this.horSpeed = HORSPEED;
		this.frameTime = FRAMETIME;

		this.gameCanvas = document.getElementById('game');
		this.gameCtx = this.gameCanvas.getContext('2d');

		this.UserController = new User();
		
		this.PlayerController = new Player();	
		this.InputController = new InputController(this);
		this.WorldObjectsController = new WorldObjectsController();
		this.ScoreController = new ScoreController();
		
	}

	initGame(_started) {
		this.started = _started;
		this.game = null;
		this._over = false;
		this._pause = false;
		this.PlayerController.init();
		this.WorldObjectsController.resetObjects();
		this.ScoreController.init();
	}
	runScore(gameSettings) {
		this.ScoreController.tick();
		this.text("Score: " + this.ScoreController.scoreValue, 60, 30 * gameSettings.scale, "#000000");
	}

	runPlayer(gameSettings) {
		this._over = this._over || this.PlayerController.trigger();
		this.PlayerController.draw(gameSettings);
	}

	runObjects(gameSettings) {
		let topLeftCoords = this.PlayerController.topLeftCoords;
		let playerUpperLeft = new Dot(topLeftCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.topLeftCoords.y);
		
		let bottomRightCoords = this.PlayerController.bottomRightCoords;
		let playerBottomRight = new Dot(bottomRightCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.bottomRightCoords.y);
		
		
		if (this.WorldObjectsController.getObjectsAmount() <= 0) {
			this.WorldObjectsController.addSeriesOfObjects(DEFAULT_W, 300, 150);
		}
		
		this.WorldObjectsController.moveAllObjects(this.horSpeed);
		this.WorldObjectsController.redrawAllObjects(gameSettings);
		
		let check = this.WorldObjectsController.CheckAllCollisions(playerUpperLeft, playerBottomRight);
		if (check && check.isCollided && check.isFatal) {
			check.playerEffect(this.PlayerController, gameSettings);
			check.scoreEffect(this.ScoreController, gameSettings);
			this._over = true;
		}
		else if (check && check.isCollided && !check.isFatal) {
			check.scoreEffect(this.ScoreController,gameSettings);
			check.playerEffect(this.PlayerController, gameSettings);
		}	
				
	}

	reset(_started) {
		this.initGame(_started);
		this.play();
	}

	play() {
		const _this = this;
		if(this.started) {
			this.game = setInterval(function () {
				
				let gameSettings = {
					'canvas' : _this.gameCtx,
					'height' : _this.gameCanvas.height,
					'width' : _this.gameCanvas.width,
					'scale' : _this.gameCanvas.width / DEFAULT_W,
					'defaultW' : DEFAULT_W,
					'horSpeed' : HORSPEED,
				}
	
				_this.gameCtx.fillStyle = "#FFFFFF";
				_this.gameCtx.strokeStyle = "#000000";
				_this.gameCtx.clearRect(0, 0, _this.gameCanvas.width, _this.gameCanvas.height);
				_this.gameCtx.fillStyle = "#000000";
				_this.gameCtx.fillRect(0, _this.gameCanvas.height / 2, _this.gameCanvas.width, _this.gameCanvas.height / 2);
				
				_this.runScore(gameSettings);
				_this.runObjects(gameSettings);
				_this.runPlayer(gameSettings);
	
				if(_this._over) {
					_this.gameover(gameSettings);
					if(_this.UserController.isAuth()) {
						const currentScore = _this.UserController._proto.score;
						const newScore = _this.ScoreController.scoreValue;
						if(newScore > currentScore) {
							_this.UserController.setScore(newScore);
							document.getElementsByClassName("navbar-scores")[0].innerHTML = "Your score is: "  +  newScore;
						}
					}
				}
				
			}, this.frameTime);
		} else {
			this.startOverlay({
				'canvas' : _this.gameCtx,
				'height' : _this.gameCanvas.height,
				'width' : _this.gameCanvas.width,
				'scale' : _this.gameCanvas.width / DEFAULT_W,
			});
		}
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

	startOverlay() {
		this.setOpacity();
		this.text("LASTUNION presents!", this.gameCanvas.height / 2, 60, "#000000");
		this.text("Press SPACE to start", this.gameCanvas.height / 2 + 30, 30, "#555555");
	}

	pauseOverlay() {
		this.setOpacity();
		this.text("Pause", this.gameCanvas.height / 2, 60, "#000000");
		this.text("Press SPACE to continue", this.gameCanvas.height / 2 + 30, 30, "#555555");
	}

	gameover(gameSettings) {
		clearInterval(this.game);
		this.gameoverOverlay(gameSettings);
	}

	gameoverOverlay(gameSettings) {
		this.setOpacity();
		this.text("Game Over!", 300  * gameSettings.scale, 60 * gameSettings.scale, "#000000");
		this.text("Press SPACE to run again!", 250  * gameSettings.scale + 70 * gameSettings.scale, 30  * gameSettings.scale, "#555555");
		this.text("Your score: " + this.ScoreController.scoreValue, (250 + 70 + 160)  * gameSettings.scale, 60  * gameSettings.scale, "#000000");

		const nekro = new Image();
		nekro.src = '/img/nekro.png';
		const _this = this;
		nekro.onload = function() {
			_this.gameCtx.drawImage(nekro, _this.gameCanvas.width / 2 - 100 * gameSettings.scale, gameSettings.scale * (-25), 200  * gameSettings.scale, 200  * gameSettings.scale);
		}
	}
	
}

module.exports = GameController;
