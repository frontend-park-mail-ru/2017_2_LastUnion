/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import NotFound from './templates/notfound/notfound';
import Header from './templates/header/header';

class NotFoundView extends View {

	constructor() {
		super();
		if(NotFoundView._instance) {
			return NotFoundView._instance;
		}
		NotFoundView._instance = this;
		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		this.dom.insertDom(this.body, NotFound.rend(), '404');
		this.listenLinks();
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('404');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('404');
	}

}

export default NotFoundView;
