/* global require */
/* global module */

'use strict';

const FRAMETIME = 35;
const DEFAULT_W = 1920;

import User from '../modules/user';

import Dot from './dot';
import Player from './player';
import InputController from './input';
import WorldObjectsController from './world_objects_controller';
import ScoreController from './score';

class GameController {

	constructor () {
		if(GameController._instance) {
			return GameController._instance;
		}
		GameController._instance = this;

		this.monsterSkinRun = [];
		for(let i = 0; i < 3; i++) {
			let monsterImg = new Image();
			monsterImg.src = '/img/m' + i + '.png';
			this.monsterSkinRun.push(monsterImg);
		}
		this.amount = 1;
		this.frameTime = FRAMETIME;

		this.gameCanvas = document.getElementById('game');
		//this.gameCanvas.height -= 80;
		this.gameCtx = this.gameCanvas.getContext('2d');
		this.gameSettings = {
			'canvas' : this.gameCtx,
			'height' : this.gameCanvas.height,
			'width' : this.gameCanvas.width,
			'scale' : this.gameCanvas.width / DEFAULT_W,
			'defaultW' : DEFAULT_W,
			'horSpeed' : 20,
		};

		this._over = false;
		this._pause = false;

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
		this.time = 0;
		this.skin = 0;
	}

	runLogic() {
		this.ScoreController.tick();
		this._over = this._over || this.PlayerController.trigger();

		let topLeftCoords = this.PlayerController.topLeftCoords;
		let playerUpperLeft = new Dot(topLeftCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.topLeftCoords.y);	
		let bottomRightCoords = this.PlayerController.bottomRightCoords;
		let playerBottomRight = new Dot(bottomRightCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.bottomRightCoords.y);
		
		if (this.WorldObjectsController.getObjectsAmount() <= 0) {
			this.WorldObjectsController.addSeriesOfObjects(DEFAULT_W, 300, 150);
		}

		this.WorldObjectsController.moveAllObjects(this.gameSettings.horSpeed);

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
		this.time++;
		if(this.time % 4 == 0) {
			this.skin == 2 ? this.skin = 0 : this.skin++;
		}	
	}

	redrawScene(prev) {
		if(!this._over && !this._pause) {
			this.gameSettings.height = this.gameCanvas.height;
			this.gameSettings.width = this.gameCanvas.width;
			this.gameSettings.scale = this.gameCanvas.width / DEFAULT_W;
			
			this.runLogic();

			this.drawSurface();
			this.text('Score: ' + this.ScoreController.scoreValue, 60 + 80, 30, '#000000');
			this.WorldObjectsController.redrawAllObjects(this.gameSettings);
			this.PlayerController.draw(this.gameSettings);

			requestAnimationFrame(() => this.redrawScene());
		}
		if(this._over) {
			this.gameover();
			if(this.UserController.isAuth()) {
				const currentScore = this.UserController._proto.score;
				const newScore = this.ScoreController.scoreValue;
				if(newScore > currentScore) {
					this.UserController.setScore(newScore);
					document.getElementById('header__scores').innerHTML = 'Your score is: '  +  newScore;
				}
			}
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

		this.gameCtx.drawImage(
			this.monsterSkinRun[this.skin],
			0, 
			this.gameSettings.height / 2 - 130 * this.gameSettings.scale,
			130 * this.gameSettings.scale, 
			130 * this.gameSettings.scale
		);

		if( /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
			this.gameCtx.strokeStyle = '#ffffff';
			this.gameCtx.strokeRect(100, this.gameSettings.height / 2 + 100 * this.gameSettings.scale, 200 * this.gameSettings.scale, 200 * this.gameSettings.scale);
			this.gameCtx.strokeRect(this.gameSettings.width - 100 - 200 * this.gameSettings.scale, this.gameSettings.height / 2 + 100 * this.gameSettings.scale, 200 * this.gameSettings.scale, 200 * this.gameSettings.scale);
			this.gameCtx.fillStyle = '#ffffff';
			this.gameCtx.font = 64 * this.gameSettings.scale + 'px Arial';
			this.gameCtx.fillText("W", 100 + 100 * this.gameSettings.scale, this.gameSettings.height / 2 + 200 * this.gameSettings.scale);
			this.gameCtx.fillText("S", this.gameSettings.width - 100 - 100 * this.gameSettings.scale, this.gameSettings.height / 2 + 200 * this.gameSettings.scale);
		}
	}

	play() {
		const _this = this;
		if(this.started) {
			requestAnimationFrame(() => this.redrawScene());
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
		this.text('Pause', this.gameCanvas.height / 2 + 80, 60, '#000000');
		this.text('Press SPACE to continue', this.gameCanvas.height / 2 + 30 + 80, 30, '#555555');
	}

	gameover() {
		clearInterval(this.game);
		this.gameoverOverlay();
	}

	gameoverOverlay() {
		this.setOpacity();

		const imgHeight = 200 * this.gameSettings.scale;
		const imgWidth = imgHeight

		this.text('Game Over!', 250 + 80, 60, '#000000');
		this.text('Press SPACE to run again!', 300 + 80, 30, '#555555');
		this.text('Your score: ' + this.ScoreController.scoreValue, imgHeight + 360 + 80, 60, '#000000');

		const nekro = new Image();
		nekro.src = '/img/nekro.png';
		const _this = this;
		nekro.onload = function() {
			_this.gameCtx.drawImage(nekro, _this.gameCanvas.width / 2 - 100 * _this.gameSettings.scale, 0, imgWidth, imgHeight);
		};
	}
	
}

export default GameController;
