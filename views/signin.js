/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import Form from './templates/form/form';
import Header from '../views/templates/header/header';

class SignInView extends View {

	constructor() {
		super();
		if(SignInView._instance) {
			return SignInView._instance;
		}
		SignInView._instance = this;

		this.form = Form.rend({
			'formname' : 'LoginForm',
			'title' : 'Enter the cave!',
			'inputs' : [
				{
					'label' : 'Login',
					'type' : 'text',
					'placeholder' : 'Your login'
				},
				{
					'label' : 'Password',
					'type' : 'password',
					'placeholder' : '**********',
				}
			],
			'labels_enable' : false,
			'button' : 'Let me run!'
		});
		
		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		if(this.dom.insertDom(this.body, this.form, 'LoginForm')) {
			this.listenSubmit();
		}
		this.listenLinks();
	}

	listenSubmit() {
		this.form.getElementsByTagName('button')[0].addEventListener('click', event => {
			event.preventDefault();

			let login = document.getElementById('LoginForm_Login');
			let passw = document.getElementById('LoginForm_Password');

			if(this.validate(login, passw)) {
				const _this = this;
				const obj = { 'obj': Form, 'id': 'LoginForm', 'spec': 'Global' };
				this.user.login(login.value, passw.value, obj)
					.then(function(success) {
						if(success) {
							Form.revert('LoginForm');
							_this.dom.removeDOM('LoginForm');
							_this.dom.removeDOM('SignUpForm');
							_this.dom.removeDOM('Menu');
							_this.hide('Header');
							_this.dom.insertDom(_this.body, Header.rend({
								loggedin : _this.user.isAuth(),
								score: _this.user.getScore()
							}), 'Header', true, true);
							_this.listenLinks();
							_this.router.go('/menu/');
						}
					})
				Form.submit('LoginForm');
			}
		});
	}

	validate(login, passw) {
		let valid = true;
		if(login.value.length < 4) {
			Form.err('LoginForm', 'Login', 'Login is at least 4 characters.');
			valid = false;
		}
		if(passw.value.length < 6) {
			Form.err('LoginForm', 'Password', 'Password is at least 6 characters.');
			valid = false;
		}
		return valid;
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('LoginForm');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('LoginForm');
	}

}

export default SignInView;
