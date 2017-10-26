/* global require */
/* global module */

'use strict';

const Dot = require('./dot');

const WIDTH = 50;
const HEIGHT = 100;
const JUMPPOWER = 35;

/*
    POSSIBLE STATES
    0: RUN
    1: JUMP
    2: BENDED
*/

class Player {

	constructor () {
        if(Player._instance) {
			return Player._instance;
		}
        Player._instance = this;
        
        this._state = 0;

        const bm = new Dot(0,0);
        const tr = new Dot(WIDTH / 2, HEIGHT);
        const br = new Dot(WIDTH / 2, 0);

        this.geometry = {
            'bm' : bm,
            'tr' : tr,
            'br' : br
        };

    }

    trigger() {
        switch(this._state) {
            case 1:
                this.jump();
            break;
        }
    }

    draw(drawingInginfo) {
        const centerX = drawingInginfo.width / 2;
        const centerY = drawingInginfo.height / 2;
        drawingInginfo.canvas.fillStyle = "#000000";
        drawingInginfo.canvas.fillRect(
            centerX + this.geometry.tr.x - WIDTH, 
            centerY - this.geometry.tr.y, 
            WIDTH, 
            this.geometry.tr.y - this.geometry.bm.y
        );
    }

    changePosition(x,y) {
        for(let d in this.geometry) {
            let _x = this.geometry[d].x + x;
            let _y = this.geometry[d].y + y;
            this.geometry[d].update(_x, _y);
        }
    }

    jump() {
        if(this.jumpTime == 0) {
            this._state = 1;
            this.verticalAcceleration = 10;
            this.verticalSpeed = 0;       
            this.jumpLambda = 0;
        }

        this.jumpLambda = JUMPPOWER * this.jumpTime - (this.verticalAcceleration * Math.pow(this.jumpTime, 2) / 2) - this.jumpLambda;
        this.jumpTime = this.jumpTime + 1;
  
        if(this.geometry.bm.y + this.jumpLambda < 0) {
            this.jumpLambda = -this.geometry.bm.y;
            this.changePosition(0, this.jumpLambda);
            this.run();
            return;
        }
        this.changePosition(0, this.jumpLambda);
    }

    duck() {
        this._state = 2;
        this.geometry.tr.update(WIDTH / 2, HEIGHT / 2);
    }

    run() {
        this._state = 0;
        this.geometry.tr.update(WIDTH / 2, HEIGHT);
    }

    get state() {
        return this._state;
    }

	
}

module.exports = Player;
