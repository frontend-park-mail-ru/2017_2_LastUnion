/* global module */

'use strict';

class UrlCom {

	constructor(url, view) {
		this.url = url;
		this.view = view;
		this.instance = null;
	}

	load() {
		if(!this.instance) {
			this.instance = new this.view();
		}

		this.instance.constructPage();
	}

	destroy() {
		this.instance.destroyPage();
		this.instance = null;
	}

}

module.exports = UrlCom;
