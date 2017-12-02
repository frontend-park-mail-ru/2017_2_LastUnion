/* global require */
/* global module */

'use strict';

const FRAMETIME = 35;
const DEFAULT_W = 1920;

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
		
		this.frameTime = FRAMETIME;

		this.gameCanvas = document.getElementById('game');
		this.gameCtx = this.gameCanvas.getContext('2d');
		this.gameSettings = {
			'canvas' : this.gameCtx,
			'height' : this.gameCanvas.height,
			'width' : this.gameCanvas.width,
			'scale' : this.gameCanvas.width / DEFAULT_W,
			'defaultW' : DEFAULT_W,
			'horSpeed' : 25,
		};

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

	runScore() {
		this.ScoreController.tick();
		this.text('Score: ' + this.ScoreController.scoreValue, 60, 30 * this.gameSettings.scale, '#000000');
	}

	runPlayer() {
		this._over = this._over || this.PlayerController.trigger();
		this.PlayerController.draw(this.gameSettings);
	}

	runObjects() {
		let topLeftCoords = this.PlayerController.topLeftCoords;
		let playerUpperLeft = new Dot(topLeftCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.topLeftCoords.y);
		
		let bottomRightCoords = this.PlayerController.bottomRightCoords;
		let playerBottomRight = new Dot(bottomRightCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.bottomRightCoords.y);
		
		
		if (this.WorldObjectsController.getObjectsAmount() <= 0) {
			this.WorldObjectsController.addSeriesOfObjects(DEFAULT_W, 300, 150);
		}
		
		this.WorldObjectsController.moveAllObjects(this.gameSettings.horSpeed);
		this.WorldObjectsController.redrawAllObjects(this.gameSettings);
		
		let check = this.WorldObjectsController.CheckAllCollisions(playerUpperLeft, playerBottomRight);
		if (check && check.isCollided && check.isFatal) {
			check.playerEffect(this.PlayerController, this.gameSettings);
			check.scoreEffect(this.ScoreController, this.gameSettings);
			this._over = true;
		}
		else if (check && check.isCollided && !check.isFatal) {
			check.scoreEffect(this.ScoreController, this.gameSettings);
			check.playerEffect(this.PlayerController, this.gameSettings);
		}	
				
	}

	reset(_started) {
		this.initGame(_started);
		this.play();
	}

	drawSurface() {
		// Reset canvas
		this.gameCtx.fillStyle = '#FFFFFF';
		this.gameCtx.strokeStyle = '#000000';
		this.gameCtx.clearRect(0, 0, this.gameSettings.width, this.gameSettings.height);

		// Draw background
		this.gameCtx.fillStyle = '#000000';
		this.gameCtx.fillRect(0, this.gameSettings.height / 2, this.gameSettings.width, this.gameSettings.height / 2);
	}

	play() {
		const _this = this;
		if(this.started) {

			this.game = setInterval(function () {
				
				// Update canvas width
				_this.gameSettings.height = _this.gameCanvas.height;
				_this.gameSettings.width = _this.gameCanvas.width;
				_this.gameSettings.scale = _this.gameCanvas.width / DEFAULT_W;
	
				_this.drawSurface();
				
				_this.runScore();
				_this.runObjects();
				_this.runPlayer();
	
				if(_this._over) {
					_this.gameover();
					if(_this.UserController.isAuth()) {
						const currentScore = _this.UserController._proto.score;
						const newScore = _this.ScoreController.scoreValue;
						if(newScore > currentScore) {
							_this.UserController.setScore(newScore);
							document.getElementsByClassName('navbar-scores')[0].innerHTML = 'Your score is: '  +  newScore;
						}
					}
				}
				
			}, this.frameTime);
		} else {
			this.startOverlay();
		}
	}

	text(source, y, size, color) {
		this.gameCtx.fillStyle = color;
		this.gameCtx.font = size * this.gameSettings.scale + 'px Arial';
		this.gameCtx.textAlign='center';
		this.gameCtx.fillText(source, this.gameCanvas.width / 2, y * this.gameSettings.scale);
	}

	setOpacity() {
		this.gameCtx.globalAlpha = 0.8;
		this.gameCtx.fillStyle = '#FFFFFF';
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
		this.text('LASTUNION presents!', this.gameCanvas.height / 2, 60, '#000000');
		this.text('Press SPACE to start', this.gameCanvas.height / 2 + 30, 30, '#555555');
	}

	pauseOverlay() {
		this.setOpacity();
		this.text('Pause', this.gameCanvas.height / 2, 60, '#000000');
		this.text('Press SPACE to continue', this.gameCanvas.height / 2 + 30, 30, '#555555');
	}

	gameover() {
		clearInterval(this.game);
		this.gameoverOverlay();
	}

	gameoverOverlay() {
		this.setOpacity();

		const imgHeight = 200 * this.gameSettings.scale;
		const imgWidth = imgHeight

		this.text('Game Over!', 250, 60, '#000000');
		this.text('Press SPACE to run again!', 300, 30, '#555555');
		this.text('Your score: ' + this.ScoreController.scoreValue, imgHeight + 360, 60, '#000000');

		const nekro = new Image();
		nekro.src = '/img/nekro.png';
		const _this = this;
		nekro.onload = function() {
			_this.gameCtx.drawImage(nekro, _this.gameCanvas.width / 2 - 100 * _this.gameSettings.scale, 0, imgWidth, imgHeight);
		};
	}
	
}

module.exports = GameController;
