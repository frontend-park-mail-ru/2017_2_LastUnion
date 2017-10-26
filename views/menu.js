/* global require */
/* global module */

'use strict';

const View = require('../modules/view');
const Menu = require('./templates/menu/menu');
const Header = require('../views/templates/header/header');

class MenuView extends View {

	constructor() {
		super();
		if(MenuView._instance) {
			return MenuView._instance;
		}
		MenuView._instance = this;

		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		this.dom.insertDom(this.body, Menu.rend({
			'menuitems' : ['Play', 'Scores'],
			'links' : ['/play/', '/scores/'],
		}), 'Menu');
		this.listenLinks();
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('Menu');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Menu');
	}

}

module.exports = MenuView;
