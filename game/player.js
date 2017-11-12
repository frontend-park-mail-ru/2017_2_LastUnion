/* global require */
/* global module */

'use strict';

const Dot = require('./dot');

const WIDTH = 100;
const HEIGHT = 100;
const JUMPPOWER = 33;

const RUN = 0;
const ONAIR = 1;
const BEND = 2;
const BENDEDONAIR = 3;

class Player {

	constructor () {
        if(Player._instance) {
			return Player._instance;
		}
        Player._instance = this;
    }

    init() {
        this._state = 0;
        this._action = null;
        this.gameover = false;

        this.time = 0;
        this.skin = 0;
		this.dialogVisible = false;

        this.jumpTime = 0;
        this.verticalAcceleration = 10;
        this.offtop = 0;

        const bm = new Dot(0,0);
        const br = new Dot( WIDTH / 2, 0 ); // doesn't work. I hz pochemy
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
        const centerX = gameSettings.width / 2;
        const centerY = gameSettings.height / 2;
        gameSettings.canvas.fillStyle = "#000000";

        let sceneCoords = {};
        for(let dot in this.geometry) {
            sceneCoords[dot] = new Dot();
            sceneCoords[dot].x = (gameSettings.defaultW/2 + this.geometry[dot].x) * gameSettings.scale
            sceneCoords[dot].y = (gameSettings.defaultW/4 - this.geometry[dot].y) * gameSettings.scale
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
                sceneCoords['tr'].x + WIDTH, 
                sceneCoords['tr'].y - HEIGHT,
                100 * gameSettings.scale, 
                100 * gameSettings.scale
            );
        }

        if(sceneCoords['tl'].x <= 0) {
            this.gameover = true;
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

    trigger() {
        this.bendedTired();
        this.tick();
        if(!this._action || this._action === null) {
            return this.gameover;
        }
        this._action();
        return this.gameover;
    }

    changePosition(x,y) {
        for(let d in this.geometry) {
            this.geometry[d].update(x, y);
        }
    }

    bendedTired() {
        if(this.bended) {
            this.offtop -= 3;
            this.changePosition(-3, 0);
        } else {
            if(this.offtop < 0) {
                this.offtop += 6;
                this.changePosition(6, 0);
            }
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

    jump() {
        if(this._action === null) {
            this.action = this.jumpAction;
        }
        this.jumpStop = false;
    }

    jumpFinish() {
        this.jumpStop = true;
    }

    jumpAction() {
        if(this.jumpTime == 0) {
            this.bended ? this.state = BENDEDONAIR : this.state = ONAIR; 
            this.jumpLambda = 0;
        }

        this.jumpLambda = JUMPPOWER * this.jumpTime - (this.verticalAcceleration * Math.pow(this.jumpTime, 2) / 2) - this.jumpLambda;
        this.jumpTime += 0.8;

        if(this.bottomCenterCoords.y + this.jumpLambda < 0) {
            this.changePosition(0, -this.bottomCenterCoords.y);
            this.jumpTime = 0;
            if(this.jumpStop) {
                this.action = null;
            }
            if(this.state == ONAIR) {
                this.run();
            }
            return;
        }
        this.changePosition(0, this.jumpLambda);
    }

    duck() {
        if(!this.bended) {
            this.state == ONAIR ? this.state = BENDEDONAIR : this.state = BEND;
            this.topRightCoords.update(0, -HEIGHT / 2);
			this.topLeftCoords.update(0, -HEIGHT / 2);
        }
    }

    run() {
        if(this.bended) {
            this.topRightCoords.update(0, HEIGHT / 2);
			this.topLeftCoords.update(0, HEIGHT / 2);
        }
        this.state = RUN;
    }

    voice() {
        
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

}

module.exports = Player;
