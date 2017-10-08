'use strict'

const View = require('../modules/view');
const Form = require('./templates/form/form');
const Header = require('../views/templates/header/header');

class SignInView extends View {

  constructor() {
    super();
    if(SignInView._instance) {
      return SignInView._instance;
    }
    SignInView._instance = this;

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth()
    }), 'Header');
    this.form = Form.rend({
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
      'button' : 'Let me run!'
    });
    this.dom.insertDom(this.body, this.form, 'LoginForm');
    this.ListenLinks();
    this.ListenSubmit();
  }

  ListenSubmit() {
    this.dom.gTAG(this.form, "button")[0].addEventListener('click', event => {
      event.preventDefault();

      let login = this.dom.gID("Login");
      let passw = this.dom.gID("Password");

      if(login.value.length < 4) {
        console.log("err login");
        Form.err('Login', 'Login is at least 4 characters.');
      }
      if(passw.value.length < 6) {
        Form.err('Password', 'Password is at least 6 characters.');
      }
      this.user.login(login, passw);
    });
  }

  ConstructPage() {
    this.Show('Header');
    this.Show('LoginForm');
  }

  DestroyPage() {
    this.Hide('Header');
    this.Hide('LoginForm');
  }

}

module.exports = SignInView;
