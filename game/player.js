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
        const tr = new Dot(WIDTH / 2, HEIGHT);

        this.geometry = {
            'bm' : bm,
            'tr' : tr,
        };
    }

    draw(drawingInfo) {
        const centerX = drawingInfo.width / 2;
        const centerY = drawingInfo.height / 2;
        drawingInfo.canvas.fillStyle = "#000000";
        drawingInfo.canvas.fillRect(
            centerX - this.xRightPos, 
            centerY - this.yHeadPos, 
            this.xRightPos * 2, 
            this.yHeadPos - this.yBottomPos
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
        this.jumpTime += 0.7;

        if(this.yBottomPos + this.jumpLambda < 0) {
            this.changePosition(0, -this.yBottomPos);
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
            this.geometry.tr.update(0, -HEIGHT / 2);
        }
    }

    run() {
        if(this.bended) {
            this.geometry.tr.update(0, HEIGHT / 2);
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

    get yHeadPos() {
        return this.geometry.tr.y;
    }

    get yBottomPos() {
        return this.geometry.bm.y;
    }

    get xPos() {
        return this.geometry.bm.x;
    }

    get xRightPos() {
        return this.geometry.tr.x;
    }

    get bended() {
        return this.state > 1;
    }

}

module.exports = Player;
