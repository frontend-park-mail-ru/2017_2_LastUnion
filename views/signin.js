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
      loggedin : this.user.isAuth(),
      score: this.user.getScore()
    }), 'Header');
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
      'button' : 'Let me run!'
    });
    this.dom.insertDom(this.body, this.form, 'LoginForm');
    this.ListenLinks();
    this.ListenSubmit();
  }

  ListenSubmit() {
    this.dom.gTAG(this.form, "button")[0].addEventListener('click', event => {
      event.preventDefault();

      let login = this.dom.gID("LoginForm_Login");
      let passw = this.dom.gID("LoginForm_Password");

      if(this.Validate(login, passw)) {
        const _this = this;
        this.user.login(login.value, passw.value)
        .then(function() {
          _this.dom.removeDOM('LoginForm');
          _this.dom.removeDOM('SignUpForm');
          this.dom.insertDom(this.body, Header.rend({
            loggedin : this.user.isAuth(),
            score: this.user.getScore()
          }), 'Header', true);
        })
        .catch(function(e) {
          alert(e);
        });
      }
    });
  }

  Validate(login, passw) {
    let valid = true;
    if(login.value.length < 4) {
      Form.err('LoginForm_Login', 'Login is at least 4 characters.');
      valid = false;
    }
    if(passw.value.length < 6) {
      Form.err('LoginForm_Password', 'Password is at least 6 characters.');
      valid = false;
    }
    return valid;
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
