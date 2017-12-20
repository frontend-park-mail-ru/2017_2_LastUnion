/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import About from './templates/about/about';
import Header from './templates/header/header';

class AboutView extends View {

	constructor() {
		super();
		if(AboutView._instance) {
			return AboutView._instance;
		}
		AboutView._instance = this;
		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		this.dom.insertDom(this.body, About.rend(), 'About');
		this.listenLinks();
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('About');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('About');
	}

}

export default AboutView;
