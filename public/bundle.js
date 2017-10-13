/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Router = __webpack_require__(1);
const DOM = __webpack_require__(5);
const User = __webpack_require__(20);

class View {

  constructor() {
    this.dom = new DOM();
    this.user = new User();
    this.router = new Router();
    this.body = this.dom.gTAG(null, 'body')[0];
  }


  ListenLinks() {
    const _this = this;
    const SelEvent = [];
    for(var obj in this.dom.loadedBlocks) {
      if(!this.dom.loadedBlocks[obj].listened) {
        const Links = this.dom.gTAG(this.dom.loadedBlocks[obj].html, "a");
        for(let i=0; i < Links.length; i++)
        {
          Links[i].addEventListener('click', event => {
            event.preventDefault();
            //const router = new Router();
            const route = Links[i].getAttribute("href");
            window.history.pushState({},'',route);
            _this.router.loadPage(route);
          });
        }
        this.dom.loadedBlocks[obj].listened = true;
      }
    }
  }

  Hide(obj) {
    const elem = this.dom.loadedBlocks[obj];
    if(elem && typeof elem !== 'undefined') {
      elem.html.hidden = 'true';
    }
  }

  Show(obj) {
    const elem = this.dom.loadedBlocks[obj];
    if(elem && typeof elem !== 'undefined') {
      elem.html.hidden = false;
    }
  }

}

module.exports = View;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const urlcom = __webpack_require__(3);

class Router {

  constructor() {
    if(Router._instance) {
      return Router._instance;
    }
    Router._instance = this;
    this.urls = [];
  }

  addUrl(url, view) {
    const Url = new urlcom(url, view);
    this.urls.push(Url);
  }

  getUrl() {
    return window.location.pathname;
  }

  loadPage(url) {
    if (!url || typeof url === 'undefined')
      url = null;
    if(url == null) {
      url = this.getUrl();
    }

    if(url != '/' && url[url.length - 1] == '/') {
      url = url.substring(0, url.length - 1);
    }

    const route = this.urls.filter(function(urlObj) {
      // later better use regular expression
      // but here we just compare 2 strings
      // console.log(urlObj.url, url, urlObj.url == url);
      return (urlObj.url == url);
    })[0];

    if(this.CurrentRoute) {
      this.CurrentRoute.Destroy();
      console.log("Destroyed page " + this.CurrentRoute.url);
    }
    this.CurrentRoute = route;
    console.log("Loaded new page: " + url);
    route.Load();
  }
}

module.exports = Router;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const router = __webpack_require__(1);
const R = new router();

//const MenuView = require('./views/menu');
const GameView = __webpack_require__(4);
const ScoresView = __webpack_require__(10);
const MenuView = __webpack_require__(13);
const SignInView = __webpack_require__(16);
const SignUpView = __webpack_require__(22);

R.addUrl('/', MenuView);
R.addUrl('/play', GameView);
R.addUrl('/scores', ScoresView);
R.addUrl('/menu', MenuView);
R.addUrl('/signin', SignInView);
R.addUrl('/signup', SignUpView);

R.loadPage();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class UrlCom {

  constructor(url, view) {
    this.url = url;
    this.view = view;
    this.instance = null;
  }

  Load() {
    if(!this.instance) {
      this.instance = new this.view();
    }

    this.instance.ConstructPage();
  }

  Destroy() {
    this.instance.DestroyPage();
    this.instance = null;
  }

}

module.exports = UrlCom;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(0);
const Game = __webpack_require__(8);
const Header = __webpack_require__(6);

class GameView extends View {

  constructor() {
    super();
    if(GameView._instance) {
      return GameView._instance;
    }
    GameView._instance = this;

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth()
    }), 'Header');
    this.dom.insertDom(this.body, Game.rend({}), 'Game');
    this.ListenLinks();
  }

  ConstructPage() {
    this.Show('Header');
    this.Show('Game');
  }

  DestroyPage() {
    this.Hide('Header');
    this.Hide('Game');
  }

}

module.exports = GameView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class DOM {

  constructor() {
    if(DOM._instance) {
      return DOM._instance;
    }
    DOM._instance = this;

    this.loadedBlocks = {};
  }

  insertDom(parent, elem, id, upd) {
    if (!this.loadedBlocks[id] ||
      typeof this.loadedBlocks[id] === 'undefined' ||
      upd == true) {
      elem.hidden = 'true';
      parent.appendChild(elem);
      this.loadedBlocks[id] = { 'html' : elem, 'listened' : false };
      console.log("Loaded " + id + " in DOM");
      return this.loadedBlocks[id];
    }
  }

  removeDOM(id) {
    if(!this.loadedBlocks[id] || typeof this.loadedBlocks[id] === 'undefined') {
      return false;
    }
    this.loadedBlocks[id].remove();
    delete this.loadedBlocks[id];
  }

  gID(id) {
    return document.getElementById(id);
  }

  gTAG(parent, tag) {
    if(!parent || typeof parent == 'undefined') {
      parent = document;
    }
    return parent.getElementsByTagName(tag);
  }

}

module.exports = DOM;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  rend : function(params){
    var template = __webpack_require__(7);
    let html = template(params);
    const elem = document.createElement('div');
    elem.innerHTML = html;
    return elem;
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- HEADER -->\n<div class="container">\n    <nav class="navbar navbar-default" role="navigation" align="center">\n        <div class="container-fluid">\n            <div class="navbar-header">\n                <a class="navbar-brand" href="/">LastUnion GAME</a>\n            </div>\n            <div class="navbar-default">\n                <ul class="nav navbar-nav">\n                  ';
 if (loggedin) { ;
__p += '\n                    <p class="nav navbar-nav navbar-text">You scope is: 2517</p>\n                  ';
 } ;
__p += '\n\n                    <li><a href="/menu">Menu</a></li>\n\n                </ul>\n                <ul class="nav navbar-nav navbar-right">\n                    ';
 if (loggedin) { ;
__p += '\n                      <li><a href="/logout">Log out</a></li>\n                    ';
 } else { ;
__p += '\n                      <li><a href="/signin">Sign IN</a></li>\n                      <p class="nav navbar-nav navbar-text">or</p>\n                      <li><a href="/signup">Sign UP</a></li>\n                    ';
 } ;
__p += '\n                </ul>\n            </div>\n         </div>\n    </nav>\n</div>\n<!-- HEADER -->\n';

}
return __p
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  rend : function(params){
    var template = __webpack_require__(9);
    let html = template(params);
    const elem = document.createElement('div');
    elem.innerHTML = html;
    return elem;
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<!-- GAME -->\n<center>\n  <img src="/img/octocat.png">\n  <br>\n  <span class="loading">Loading game</span>\n</center>\n<!-- GAME -->\n';

}
return __p
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(0);
const Scores = __webpack_require__(11);
const Header = __webpack_require__(6);

class ScoresView extends View {

  constructor() {
    super();
    if(ScoresView._instance) {
      return ScoresView._instance;
    }
    ScoresView._instance = this;

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth()
    }), 'Header');
  }

  InitLeaderBoard() {
    this.dom.insertDom(this.body, Scores.rend({
      'users' : ['John','Mike','Bredd','Jarel','Jane'],
      'place' : ['1','2','3','4','5'],
      'score' : ['999','888','777','666','555'],
      'userplace' : '999',
      'userscore' : '0',
    }), 'Scores');
    this.ListenLinks();
  }

  ConstructPage() {
    this.Show('Header');
    if (!this.user.isAuth()) {
      console.error("Access denied.");
      window.history.pushState({},'','/signin/');
      this.router.loadPage('/signin/');
    } else {
      this.InitLeaderBoard();
      this.Show('Scores');
    }
  }

  DestroyPage() {
    this.Hide('Header');
    this.Hide('Scores');
  }

}

module.exports = ScoresView;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  rend : function(params){
    var template = __webpack_require__(12);
    let html = template(params);
    const elem = document.createElement('div');
    elem.innerHTML = html;
    return elem;
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- SCORES -->\n<div class="container">\n    <div class="panel panel-default">\n        <div class="panel-heading">Best GAMERS</div>\n        <table class="table">\n            <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Username</th>\n                    <th>Scope</th>\n                </tr>\n            </thead>\n            <tbody>\n                ';
 for(var i=0; i<users.length; i++) { ;
__p += '\n                <tr>\n                    <th scope="row">' +
((__t = ( place[i] )) == null ? '' : __t) +
'</th>\n                    <th>' +
((__t = ( users[i] )) == null ? '' : __t) +
'</th>\n                    <th>' +
((__t = ( score[i] )) == null ? '' : __t) +
'</th>\n                </tr>\n                ';
 } ;
__p += '\n                <tr>\n                    <th scope="row">' +
((__t = ( userplace )) == null ? '' : __t) +
'</th>\n                    <th>YOU</th>\n                    <th>' +
((__t = ( userscore )) == null ? '' : __t) +
'</th>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n<!-- SCORES -->\n';

}
return __p
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(0);
const Menu = __webpack_require__(14);
const Header = __webpack_require__(6);

class MenuView extends View {

  constructor() {
    super();
    if(MenuView._instance) {
      return MenuView._instance;
    }
    MenuView._instance = this;

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth()
    }), 'Header');
    this.dom.insertDom(this.body, Menu.rend({
      'menuitems' : ['Play', 'About us', 'Scores'],
      'links' : ['/play/', '/about/', '/scores/'],
    }), 'Menu');
    this.ListenLinks();
  }

  ConstructPage() {
    this.Show('Header');
    this.Show('Menu');
  }

  DestroyPage() {
    this.Hide('Header');
    this.Hide('Menu');
  }

}

module.exports = MenuView;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  rend : function(params){
    var template = __webpack_require__(15);
    let html = template(params);
    const elem = document.createElement('div');
    elem.innerHTML = html;
    return elem;
  }
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- MENU -->\n<div class="container">\n    <ul>\n      ';
 for(var i = 0; i<menuitems.length; i++) { ;
__p += '\n      <li><a href="' +
((__t = ( links[i] )) == null ? '' : __t) +
'">' +
((__t = ( menuitems[i] )) == null ? '' : __t) +
'</a>\n      ';
 } ;
__p += '\n    </ul>\n</div>\n<!-- MENU -->\n';

}
return __p
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(0);
const Form = __webpack_require__(17);
const Header = __webpack_require__(6);

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
        this.user.login(login, passw)
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


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  rend : function(params) {
    var template = __webpack_require__(18);
    let html = template(params);
    const elem = document.createElement('div');
    elem.innerHTML = html;
    const inputs = elem.getElementsByTagName("input");
    for(let i=0; i < inputs.length; i++)
    {
      let id = inputs[i].getAttribute("id");
      inputs[i].addEventListener('focus', event => {
        document.getElementById(id + '_err').hidden = 'true';
      });
    }
    return elem;
  },

  err : function(id, msg) {
    const span = document.getElementById(id + '_err');
    console.log(span);
    span.innerHTML = msg;
    span.hidden = false;
  },

  ok : function(id) {
    document.getElementById(id + '_err').hidden = 'true';
  }
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- MENU -->\n<div class="container">\n  ' +
((__t = ( title )) == null ? '' : __t) +
'\n  <form>\n    ';
 for(var i = 0; i<inputs.length; i++) { ;
__p += '\n    <div class="form-group">\n      <label class="control-label" for="' +
((__t = ( formname )) == null ? '' : __t) +
'_' +
((__t = (inputs[i].label )) == null ? '' : __t) +
'">\n        ' +
((__t = ( inputs[i].label )) == null ? '' : __t) +
'\n      </label>\n      <input type="' +
((__t = ( inputs[i].type )) == null ? '' : __t) +
'" id="' +
((__t = ( formname )) == null ? '' : __t) +
'_' +
((__t = ( inputs[i].label )) == null ? '' : __t) +
'" placeholder="' +
((__t = ( inputs[i].placeholder )) == null ? '' : __t) +
'">\n      <span id="' +
((__t = ( formname )) == null ? '' : __t) +
'_' +
((__t = ( inputs[i].label )) == null ? '' : __t) +
'_err" class="error-message"></span>\n    </div>\n    ';
 } ;
__p += '\n    <button class="btn btn-default">' +
((__t = ( button )) == null ? '' : __t) +
'</button>\n  </form>\n</div>\n<!-- MENU -->\n';

}
return __p
}

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const API = __webpack_require__(21);

class User {

  constructor() {
    if(User._instance) {
      return User._instance;
    }
    User._instance = this;

    this.api = new API;
    this._loggedin = false;
    this._proto = {};
  }

  isAuth() {
    return this._loggedin;
  }

  checkResponse(response) {
    if(respose.status !== 'OK') {
      throw new Error(response.msg);
    }
    return response.data;
  }

  login(login, password) {
    return this.api.call('login', 'POST', {
      login: login,
      password: password
    }).then(function(response) {
      this.checkResponse(response);
      this._proto.login = login;
      this._loggedin = true;
    });
  }

  signup(login, password, email) {
    return this.api.call('signup', 'POST', {
      login: login,
      password: password,
      email: email
    }).then(function(response) {
      this.checkResponse(response);
      this.login(login, password);
    });
  }

  logout() {
    return this.api.call('logout', 'POST').then(function(response) {
      this.checkResponse(response);
      this._proto = {};
      this._loggedin = false;
    });
  }

}

module.exports = User;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class API {

  constructor() {
    this._host = 'boiling-bastion-61743.herokuapp.com';
  }

  call(method, httpMethod, params) {
    const url = 'https://' + this._host + '/api/' + method;
    const httpRequest = {
      method: httpMethod,
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    };

    if(httpMethod === 'POST' && typeof params !== 'undefined') {
      httpRequest.body = JSON.stringify(data);
    }

    return fetch(url, httpRequest).then(
      function(response) {
        console.log("Success");
        return response.json();
      },
      function(response) {
        console.error("Connection issues");
        alert("We didn't get response from server. Please check your internet connection!");
        console.log(response);
      })
  }

}

module.exports = API;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(0);
const Form = __webpack_require__(17);
const Header = __webpack_require__(6);

class SignUpView extends View {

  constructor() {
    super();
    if(SignUpView._instance) {
      return SignUpView._instance;
    }
    SignUpView._instance = this;

    this.dom.insertDom(this.body, Header.rend({
      loggedin : this.user.isAuth()
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
        this.user.signup(login, passw, email)
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


/***/ })
/******/ ]);