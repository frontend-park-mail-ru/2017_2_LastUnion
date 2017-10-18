'use strict';

class UrlCom {

	constructor(url, view) {
		this.url = url;
		this.view = view;
		this.instance = null;
	}

	Load() {
		if(!this.instance) {
			this.instance = new this.view();
		}

		this.instance.ConstructPage();
	}

	Destroy() {
		this.instance.DestroyPage();
		this.instance = null;
	}

}

module.exports = UrlCom;
