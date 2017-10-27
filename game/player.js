/* global require */
/* global module */

'use strict';

const Dot = require('./dot');

const WIDTH = 50;
const HEIGHT = 100;
const JUMPPOWER = 35;

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

        this.jumpTime = 0;
        this.verticalAcceleration = 10;  

        const bm = new Dot(0,0);
        const br = new Dot(WIDTH / 2, 0);
        const tr = new Dot(WIDTH / 2, HEIGHT);
        const tl = new Dot(-WIDTH / 2, HEIGHT);

        this.geometry = {
            'bm' : bm,
            'br' : br,
            'tr' : tr,
            'tl' : tl,
        };
    }

    draw(gameSettings) {
        const centerX = gameSettings.width / 2;
        const centerY = gameSettings.height / 2;
        gameSettings.canvas.fillStyle = "#000000";

        let sceneCoords = {};
        for(let dot in this.geometry) {
            sceneCoords[dot] = new Dot();
            sceneCoords[dot].x = centerX - this.geometry[dot].x * gameSettings.scale
            sceneCoords[dot].y = centerY - this.geometry[dot].y * gameSettings.scale
        }

        gameSettings.canvas.fillRect(
            sceneCoords['tr'].x, 
            sceneCoords['tr'].y, 
            (this.topRightCoords.x * 2) * gameSettings.scale, 
            (this.topRightCoords.y - this.bottomRightCoords.y) * gameSettings.scale
        );
    }

    trigger() {
        if(!this._action || this._action === null) {
            return;
        }
        this._action();
    }

    changePosition(x,y) {
        for(let d in this.geometry) {
            this.geometry[d].update(x, y);
        }
    }

    jump() {
        if(this._action === null) {
            this.action = this.jumpAction;
        }
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
            this.action = null;
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
        }
    }

    run() {
        if(this.bended) {
            this.topRightCoords.update(0, HEIGHT / 2);
        }
        this.state = RUN;
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
