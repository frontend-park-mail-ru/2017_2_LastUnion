/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import Rules from './templates/rules/rules';
import Header from './templates/header/header';

class RulesView extends View {

	constructor() {
		super();
		if(RulesView._instance) {
			return RulesView._instance;
		}
		RulesView._instance = this;
		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		this.dom.insertDom(this.body, Rules.rend(), 'Rules');
		this.listenLinks();
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('Rules');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Rules');
	}

}

export default RulesView;
