'use strict';

const View = require('../modules/view');
const Form = require('./templates/form/form');
const Header = require('../views/templates/header/header');

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
			this.ListenSubmit();
		}
		this.ListenLinks();
	}

	ListenSubmit() {
		this.dom.gTAG(this.form, 'button')[0].addEventListener('click', event => {
			event.preventDefault();

			let login = this.dom.gID('SignUpForm_Login');
			let email = this.dom.gID('SignUpForm_Email');
			let passw = this.dom.gID('SignUpForm_Password');

			if(this.Validate(login, passw, email)) {
				const _this = this;
				this.user.signup(login.value, passw.value, email.value)
					.then(function() {
						console.log('User ' + login.value + ' registered successfully!');
						_this.user.login(login.value, passw.value)
							.then(function() {
								_this.dom.removeDOM('LoginForm');
								_this.dom.removeDOM('SignUpForm');
								_this.Hide('Header');
								_this.dom.insertDom(_this.body, Header.rend({
									loggedin : _this.user.isAuth(),
									score: _this.user.getScore()
								}), 'Header', true, true);
								_this.ListenLinks();
								_this.router.go('/menu/');
							});
					})
					.catch(function(e) {
						Form.err('SignUpForm', 'Global', e);
					});
				Form.submit('SignUpForm');
			}
		});
	}

	Validate(login, passw, email) {
		let valid = true;
		if(login.value.length < 4) {
			Form.err('SignUpForm', 'Login', 'Login has to be at least 4 characters.');
			valid = false;
		}
		if(passw.value.length < 6) {
			Form.err('SignUpForm', 'Password', 'Password has to be at least 6 characters.');
			valid = false;
		}

		if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) {
			Form.err('SignUpForm', 'Email', 'This is not valid email.');
			valid = false;
		}
		return valid;
	}

	ConstructPage() {
		this.init();
		this.Show('Header');
		this.Show('SignUpForm');
	}

	DestroyPage() {
		this.Hide('Header');
		this.Hide('SignUpForm');
	}

}

module.exports = SignUpView;
