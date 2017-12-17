/* global require */
/* global module */

'use strict';

const Router = require('../routes/router');
const DOM = require('./dom');
const User = require('./user');

class View {

	constructor() {
		this.dom = new DOM();
		this.user = new User();
		this.router = new Router();
		this.body = document.getElementsByTagName('body')[0];
	}


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

	hide(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = true;
		} else {
			console.log('Can\'t hide. No such element: ' + obj);
		}
	}

	show(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = false;
		} else {
			console.log('Can\'t show. No such element: ' + obj);
		}
	}

}

module.exports = View;
