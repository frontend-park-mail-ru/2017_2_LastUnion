/* global require */
/* global module */

'use strict';

import View from '../modules/view';
import Form from './templates/form/form';
import Header from '../views/templates/header/header';

class SignUpView extends View {

	constructor() {
		super();
		if(SignUpView._instance) {
			return SignUpView._instance;
		}
		SignUpView._instance = this;

		this.form = Form.rend({
			'formname' : 'SignUpForm',
			'title' : 'Birth of a necromancer!',
			'inputs' : [
				{
					'label' : 'Login',
					'type' : 'text',
					'placeholder' : 'Your login',
				},
				{
					'label' : 'Email',
					'type' : 'text',
					'placeholder' : 'necro@fast.me',
				},
				{
					'label' : 'Password',
					'type' : 'password',
					'placeholder' : '**********',
				}
			],
			'labels_enable' : false,
			'button' : 'Birth!'
		});

		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		if(this.dom.insertDom(this.body, this.form, 'SignUpForm')) {
			this.listenSubmit();
		}
		this.listenLinks();
	}

	listenSubmit() {
		this.form.getElementsByTagName('button')[0].addEventListener('click', event => {
			event.preventDefault();

			let login = document.getElementById('SignUpForm_Login');
			let email = document.getElementById('SignUpForm_Email');
			let passw = document.getElementById('SignUpForm_Password');

			if(this.validate(login, passw, email)) {
				const _this = this;
				const obj = { 'obj': Form, 'id': 'SignUpForm', 'spec': 'Global' };
				this.user.signup(login.value, passw.value, email.value, obj)
					.then(function(signup_success) {
						if(signup_success) {
							Form.revert('SignUpForm');
							console.log('User ' + login.value + ' registered successfully!');
							_this.user.login(login.value, passw.value)
								.then(function(signin_success) {
									if(signin_success) {
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
								});
						}
					})
				Form.submit('SignUpForm');
			}
		});
	}

	validate(login, passw, email) {
		let valid = true;
		if(login.value.length < 4) {
			Form.err('SignUpForm', 'Login', 'Login has to be at least 4 characters.');
			valid = false;
		}
		if(passw.value.length < 6) {
			Form.err('SignUpForm', 'Password', 'Password has to be at least 6 characters.');
			valid = false;
		}

		if (!/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) {
			Form.err('SignUpForm', 'Email', 'This is not valid email.');
			valid = false;
		}
		return valid;
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('SignUpForm');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('SignUpForm');
	}

}

export default SignUpView;
