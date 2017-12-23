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
		document.getElementById('multiplayer').height = window.innerHeight - 100;
		document.getElementById('multiplayer').width = document.getElementById('multiplayer').height * 2;
	},

	resize : function() {
		this.resizeInit();
		window.onresize = this.resizeInit;
	}
};
