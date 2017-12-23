/* global require */
/* global module */

'use strict';

import MultiplayerController from './multiplayer';
import Opponent from './opponent';


class Net {

	constructor (Player, Opponent, World, Controller, login) {
		if(Net._instance) {
			return Net._instance;
		}
		Net._instance = this;

		this.netGameState = 0; //0 - connecting
							   //1 - waiting for start
							   //2 - ready
                               //3 - playing
                               
        this.Player = Player;
        this.Opponent = Opponent;
        this.PlayerScore = 0;
        this.OpponentScore = 0;
        this.over = false;

        this.World = World;

        this.Multiplayer = Controller;
        this.login = login;
        console.log(login);
	}

	connect(serverAddr){
		if (this.ws) return;
		this.ws = new WebSocket(serverAddr);
		this.ws.onmessage = this.msgHandler;
		this.ws.onclose = this.closeHandler;

		this.netGameState = 1; 
	}

	send(data) {
		this.ws.send(data);
		console.log('Sent: ' + data);
	}

	msgHandler (recv) {
        let _this = new Net();
        console.log(_this)
        const data = JSON.parse(recv.data);
		console.log('Got: ' + recv.data);
		// if (recv.data[0] == 'p') {
		// 	_this.netGameState = 2;
		// 	_this.nextSeqStr = recv.data.slice(1);
		// 	console.log('stSeq: ' + _this.nextSeqStr);
		// 	_this.ws.send('r');
        // }

        // if (recv.data[0] == 'p') {
		// 	_this.netGameState = 2;
		// 	_this.nextSeqStr = recv.data.slice(1);
		// 	console.log('stSeq: ' + _this.nextSeqStr);
		// 	_this.ws.send('r');
        // }

        
        if(data.command == "Start") {
            _this.Multiplayer.starting();
        }
        //this.starting();

		// if (recv.data[0] == 'w') {
		// 	_this.nextSeqStr = recv.data.slice(1);
		// 	console.log('stSeq: ' + _this.nextSeqStr);
		// }

		// if (recv.data[0] == 's') {
		// 	_this.netGameState = 3;
		// }

		// if (recv.data[0] == 'c') {
		// 	console.log('Com: ' + recv.data[1]);
		// 	switch (recv.data[1]) {				
		// 		case 'j': _this.OpponentController.jump(); break;
		// 		case 'd': _this.OpponentController.duck(); break;
		// 		case 'r': _this.OpponentController.run(); break;
		// 		case 'l': _this.OpponentController.jumpFinish(); break;
		// 	}

		// }
	}


	clsHandler () {

	}

}

export default Net;