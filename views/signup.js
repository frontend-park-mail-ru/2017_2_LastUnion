'use strict'

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

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth(),
      score: this.user.getScore()
    }), 'Header');
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
      'button' : 'Birth!'
    });
    this.dom.insertDom(this.body, this.form, 'SignUpForm');
    this.ListenLinks();
    this.ListenSubmit();
  }

  ListenSubmit() {
    this.dom.gTAG(this.form, "button")[0].addEventListener('click', event => {
      event.preventDefault();

      let login = this.dom.gID("SignUpForm_Login");
      let email = this.dom.gID("SignUpForm_Email");
      let passw = this.dom.gID("SignUpForm_Password");

      if(this.Validate(login, passw, email)) {
        this.user.signup(login.value, passw.value, email.value)
        .then(function() {
          this.dom.removeDOM('LoginForm');
          this.dom.removeDOM('SignUpForm');
        })
        .catch(function(e) {
          alert(e);
        });
      }
    });
  }

  Validate(login, passw, email) {
    let valid = true;
    if(login.value.length < 4) {
      Form.err('SignUpForm_Login', 'Login has to be at least 4 characters.');
      valid = false;
    }
    if(passw.value.length < 6) {
      Form.err('SignUpForm_Password', 'Password has to be at least 6 characters.');
      valid = false;
    }

    return valid;
  }

  ConstructPage() {
    this.Show('Header');
    this.Show('SignUpForm');
  }

  DestroyPage() {
    this.Hide('Header');
    this.Hide('SignUpForm');
  }

}

module.exports = SignUpView;
