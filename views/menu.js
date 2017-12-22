/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import Menu from './templates/menu/menu';
import Header from '../views/templates/header/header';

class MenuView extends View {

	constructor() {
		super();
		if(MenuView._instance) {
			return MenuView._instance;
		}
		MenuView._instance = this;
	}

	init() {
		console.log("INIT")
		this.dom.insertDom(this.body, Header.rend({
			loggedin: this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');

		const items = {
			'menuitems' : ['Play', 'About', 'Rules'],
			'links' : ['/play/', '/about/', '/rules/'],
		}
		if(this.user.isAuth()) {
			items.menuitems.push('Scores');
			items.links.push('/scores/');
			items.menuitems.push('Multiplayer');
			items.links.push('/multiplayer/');
		}

		this.dom.insertDom(this.body, Menu.rend(
			items
		), 'Menu');

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

export default MenuView;
