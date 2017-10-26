/* global require */
/* global module */

'use strict';

const Player = require('./player');

class InputController {

	constructor (canvas) {
        this.PlayerController = new Player();

        const _this = this;
        document.addEventListener('keydown', function(event) {
            switch(event.keyCode) {
                case 87:
                    if(_this.PlayerController._state !== 1) {
                        _this.PlayerController.jumpTime = 0;
                        _this.PlayerController._state = 1;
                    }
                break;
                case 83:
                    if(_this.PlayerController._state == 0) {
                        _this.PlayerController.duck();
                    }
                break;
            }
        });

        document.addEventListener('keyup', function(event) {
            switch(event.keyCode) {
                case 83:
                    if(_this.PlayerController._state != 1) {
                        _this.PlayerController.run();
                    }
                break;
            }
        });
    }

	
}

module.exports = InputController;
