/* global require */
/* global module */

export default {
	rend : function(params){
		const template = require('./rules.ejs');
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	}
};
