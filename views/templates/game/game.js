/* global require */
/* global module */

export default {
	rend : function(params){
		const template = require('./game.ejs');
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	},

	resizeInit : function() {	
		if( /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
			document.getElementById('game').width = window.innerWidth - 100;
			document.getElementById('game').height = (window.innerWidth - 100) / 2;
		} else {
			document.getElementById('game').height = window.innerHeight - 100;
			document.getElementById('game').width = document.getElementById('game').height * 2;
		}
	},

	resize : function() {
		this.resizeInit();
		window.onresize = this.resizeInit;
	}
};
