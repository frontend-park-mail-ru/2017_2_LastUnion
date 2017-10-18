'use strict';

const Router = require('../routes/router');
const DOM = require('./dom');
const User = require('./user');

class View {

	constructor() {
		this.dom = new DOM();
		this.user = new User();
		this.router = new Router();
		this.body = this.dom.gTAG(null, 'body')[0];
	}


	ListenLinks() {
		const _this = this;
		const SelEvent = [];
		for(var obj in this.dom.loadedBlocks) {
			if(!this.dom.loadedBlocks[obj].listened) {
				const Links = this.dom.gTAG(this.dom.loadedBlocks[obj].html, 'a');
				for(let i=0; i < Links.length; i++)
				{
					Links[i].addEventListener('click', event => {
						event.preventDefault();
						//const router = new Router();
						const route = Links[i].getAttribute('href');
						window.history.pushState({},'',route);
						_this.router.loadPage(route);
					});
				}
				this.dom.loadedBlocks[obj].listened = true;
			}
		}
	}

	Hide(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = 'true';
		}
	}

	Show(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = false;
		}
	}

}

module.exports = View;
