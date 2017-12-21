/* global require */
/* global module */

'use strict';

import Router from '../routes/router';
import DOM from './dom';
import User from './user';

/** Class View represents View From MVC */
class View {
	/**
	 * Creates View
	 *
	 * @this {View}
	 */
	constructor() {
		this.dom = new DOM();
		this.user = new User();
		this.router = new Router();
		this.body = document.getElementsByTagName('body')[0];
	}

	/**
	 * Goes through loaded blocks and handle links events
	 */
	listenLinks() {
		const _this = this;

		for(let obj in this.dom.loadedBlocks) {
			if(!this.dom.loadedBlocks[obj].listened) {
				const links = this.dom.loadedBlocks[obj].html.getElementsByTagName('a');
				for(let i=0; i < links.length; i++)
				{
					links[i].addEventListener('click', event => {
						event.preventDefault();
						const route = links[i].getAttribute('href');
						_this.router.go(route);
					});
				}
				this.dom.loadedBlocks[obj].listened = true;
			}
		}
	}

	/**
	 * hide block
	 *
	 * @param {HTMLElement} obj - element
	 * @this {View}
	 */
	hide(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = true;
		} else {
			console.log('Can\'t hide. No such element: ' + obj);
		}
	}

	/**
	 * Shows rendered view
	 *
	 * @param {HTMLElement} obj - element
	 * @this {View}
	 */
	show(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = false;
		} else {
			console.log('Can\'t show. No such element: ' + obj);
		}
	}

}

export default View;
