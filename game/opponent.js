/* global require */
/* global module */

'use strict';

import Dot from './dot';

const WIDTH = 100;
const HEIGHT = 100;
const JUMPPOWER = 33;

const RUN = 0;
const ONAIR = 1;
const BEND = 2;
const BENDEDONAIR = 3;

class Opponent {

	constructor () {
		if(Opponent._instance) {
			return Opponent._instance;
		}
        Opponent._instance = this;
        this.gameover = false;
	}

	init() {
		this._state = 0;
		this.gameover = false;

		this.time = 0;
		this.skin = 0;
		this.dialogVisible = false;

		this.offtop = 0;

		const bm = new Dot(0, 0);
		const br = new Dot(WIDTH / 2, 0); // doesn't work. I hz pochemy
		br.x = WIDTH / 2;
		const tr = new Dot(WIDTH / 2, HEIGHT);
		const tl = new Dot(-WIDTH / 2, HEIGHT);

		this.geometry = {
			'bm' : bm,
			'br' : br,
			'tr' : tr,
			'tl' : tl,
		};

		this.playerSkinRun = [];
		for(let i = 0; i < 4; i++) {
			let playerImg = new Image();
			playerImg.src = '/img/player0' + i + '.png';
			this.playerSkinRun.push(playerImg);
		}
		
		this.dlgImg = new Image();   
		this.dlgImg.src = '/img/fck.png';

	}

	draw(gameSettings) {
        this.tick();
		gameSettings.canvas.fillStyle = '#000000';

		let sceneCoords = {};
		for(let dot in this.geometry) {
			sceneCoords[dot] = new Dot();
			sceneCoords[dot].x = (gameSettings.defaultW/2 + this.geometry[dot].x) * gameSettings.scale;
			sceneCoords[dot].y = (gameSettings.defaultW/4 - this.geometry[dot].y) * gameSettings.scale;
		}

        
		gameSettings.canvas.drawImage(
			this.playerSkinRun[this.skin],
			sceneCoords['tl'].x, 
			sceneCoords['tl'].y,
			WIDTH * gameSettings.scale, 
			(this.topRightCoords.y - this.bottomRightCoords.y) * gameSettings.scale
		);
        

		if(this.dialogVisible && sceneCoords['tl'].x < 200) {
			gameSettings.canvas.drawImage(
				this.dlgImg,
				sceneCoords['tr'].x, 
				sceneCoords['tr'].y - HEIGHT  * gameSettings.scale,
				100 * gameSettings.scale, 
				100 * gameSettings.scale
			);
		}

		// show control points
		/*gameSettings.canvas.fillStyle = "#FFFF00";
		for(let dot in this.geometry) {
			if (dot == 'br') gameSettings.canvas.fillStyle = "#00FF00";
			if (dot == 'tr') gameSettings.canvas.fillStyle = "#0000FF";
			if (dot == 'tl') gameSettings.canvas.fillStyle = "#FF00FF";
           gameSettings.canvas.fillRect((this.geometry[dot].x+960-7)*gameSettings.scale, (480-this.geometry[dot].y-7)*gameSettings.scale, 14, 14);
        }*/
	}

	changePosition(x,y) {
		for(let d in this.geometry) {
			this.geometry[d].newCoords(x, y);
		}
	}

	tick() {
		this.time++;
		if(this.time % 4 == 0) {
			this.skin == 3 ? this.skin = 0 : this.skin++;
		}
		if(this.time % 40 == 0) {
			this.dialog();
		}
	}
	
	dialog() {
		this.dialogVisible == false ? this.dialogVisible = true : this.dialogVisible = false;
    }
    
    get state() {
		return this._state;
	}

	set state(st) {
		this._state = st;
	}

	set action(f) {
		this._action = f;
	}

	get bottomCenterCoords() {
		return this.geometry.bm;
	}

	get topLeftCoords() {
		return this.geometry.tl;
	}

	get topRightCoords() {
		return this.geometry.tr;
	}

	get bottomRightCoords() {
		return this.geometry.br;
	}

	get bended() {
		return this.state > 1;
	}

	get height() {
		return Math.abs(this.geometry.tl._y - this.geometry.br._y);
	}

	get width() {
		return Math.abs(this.geometry.tl._x - this.geometry.br._x);
	}

}

export default Opponent;
