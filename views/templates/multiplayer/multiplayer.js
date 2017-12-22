/* global require */
/* global module */

export default {
	rend : function(params){
		const template = require('./multiplayer.ejs');
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	},

	resizeInit : function() {
		document.getElementById('multiplayer').width = document.body.clientWidth - 100;		
		document.getElementById('multiplayer').height = document.getElementById('multiplayer').width / 16 * 8;
	},

	resize : function() {
		this.resizeInit();
		window.onresize = this.resizeInit;
	}
};
