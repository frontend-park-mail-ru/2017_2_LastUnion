/* global module */

'use strict';

/**Class represanting ??????*/
class UrlCom {

	/**
	 * Creates UrlCom
	 *
	 * @param {strign} url - url path to page
	 * @param {string} view - path to view
	 * @this {UrlCom}
	 */
	constructor(url, view) {
		this.url = url;
		this.view = view;
		this.instance = null;
	}


	/**
	 * Creates instance to view page
	 *
	 * @this {UrlCom}
	 */
	load() {
		if(!this.instance) {
			this.instance = new this.view();
		}

		this.instance.constructPage();
	}

	/**
	 * Destroys instance
	 *
	 * @this {UrlCom}
	 */
	destroy() {
		this.instance.destroyPage();
		this.instance = null;
	}

}

export default UrlCom;
