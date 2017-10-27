/* global require */
/* global module */

'use strict';

const Player = require('./player');

class InputController {

	constructor (Controller) {
        this.PlayerController = new Player();
        this.Controller = Controller;

        const _this = this;
        document.addEventListener('keydown', function(event) {
            switch(event.keyCode) {
                case 87:
                    _this.PlayerController.jump();;
                break;
                case 83:
                    _this.PlayerController.duck();
                break;
                case 32:
                    if(!_this.Controller._over) {
                        _this.Controller.pause();
                    } else {
                        _this.Controller.reset();
                    }
                break;
            break;
            }
        });

        document.addEventListener('keyup', function(event) {
            switch(event.keyCode) {
                case 83:
                    _this.PlayerController.run();
                break;
                case 87:
                    _this.PlayerController.jumpFinish();;
                break;
            }
        });
    }

	
}

module.exports = InputController;
