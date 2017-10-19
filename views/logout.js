'use strict';

const View = require('../modules/view');
const Header = require('../views/templates/header/header');

class LogoutView extends View {

	constructor() {
		super();
		if(LogoutView._instance) {
			return LogoutView._instance;
		}
		LogoutView._instance = this;
	}

	ConstructPage() {
		const _this = this;
		this.user.logout()
			.then(function() {
				_this.Hide('Header');
				_this.dom.insertDom(_this.body, Header.rend({
					loggedin : _this.user.isAuth(),
					score: _this.user.getScore()
				}), 'Header', true, true);
				_this.router.go('/menu/');
			})
			.catch(function(e) {
				alert(e);
			});
	}

	DestroyPage() {

	}

}

module.exports = LogoutView;
