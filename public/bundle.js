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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const urlcom = __webpack_require__(2);

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

  loadPage(url = null) {
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
      this.CurrentRoute.destroy();
    }

    route.Load();
    this.CurrentRoute = route;
  }
}

module.exports = Router;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const router = __webpack_require__(0);
const R = new router();

//const MenuView = require('./views/menu');
const GameView = __webpack_require__(3);
const ScoresView = __webpack_require__(12);
// class SigninView {}
// class SignupView {}
// class AboutView {}
// class PlayView {}
// class ScoresView {}

R.addUrl('/', GameView);
// R.addUrl('/signin', SigninView);
// R.addUrl('/signup', SignupView);
// R.addUrl('/about', AboutView);
// R.addUrl('/play', PlayView);
R.addUrl('/scores', ScoresView);

R.loadPage();


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(4);

class GameView extends View {

  constructor() {
    super();
    if(GameView._instance) {
      return GameView._instance;
    }
    console.log(this);
    GameView._instance = this;

    this.ListenLinks();
  }

  ListenLinks() {
    var SelEvent = [];
    //SelEvent.push({'selector': this.dom.gID("menu-play"), 'route' : "/play"});
    //SelEvent.push({'selector': this.dom.gID("menu-signin"), 'route' : "/signin"});
    //SelEvent.push({'selector': this.dom.gID("menu-signup"), 'route' : "/signup"});
    //SelEvent.push({'selector': this.dom.gID("menu-score"), 'route' : "/score"});
    this.SetEvent(SelEvent);
  }

  ConstructPage() {
    //console.log(this.dom.loadedBlocks['Header']);
    this.dom.loadedBlocks['Header'].hidden = false;
    this.dom.loadedBlocks['Game'].hidden = false;
  }

  DestroyPage() {
    this.dom.loadedBlocks['Header'].hidden = 'true';
    this.dom.loadedBlocks['Game'].hidden = 'true';
  }

}

module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Router = __webpack_require__(0);
const DOM = __webpack_require__(5);

class View {

  constructor() {
    this.router = new Router();
    this.dom = new DOM();
  }

  SetEvent(links) {
    links.forEach(link => {
      link.selector.addEventListener('click', event => {
        event.preventDefault();
        console.log(link);
        this.router.LoadPage(link.route);
      });
    });
  }

  ConstructPage() {

  }

  DestroyPage() {

  }

}

module.exports = View;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Header = __webpack_require__(6);
const Game = __webpack_require__(8);
const Scores = __webpack_require__(10);

class DOM {

  constructor() {
    if(DOM._instance) {
      return DOM._instance;
    }
    DOM._instance = this;

    this.loadedBlocks = {};
    const body = this.gTAG('body')[0];

    this.insertDom(body, Header.rend({loggedin : false}), 'Header');
    this.insertDom(body, Game.rend({}), 'Game');
    this.insertDom(body, Scores.rend({
      'users' : ['John','Mike','Bredd','Jarel','Jane'],
      'place' : ['1','2','3','4','5'],
      'score' : ['999','888','777','666','555'],
      'userplace' : '999',
      'userscore' : '0',
    }), 'Scores');

  }

  insertDom(parent, elem, id) {
    elem.hidden = 'true';
    parent.appendChild(elem);
    this.loadedBlocks[id] = elem;

  }

  gID(id) {
    return document.getElementById(id);
  }

  gTAG(tag) {
    return document.getElementsByTagName(tag);
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
__p += '\n\n                    <li><a href="/score">Top gamers</a></li>\n\n                </ul>\n                <ul class="nav navbar-nav navbar-right">\n                    ';
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

module.exports = {
  rend : function(params){
    var template = __webpack_require__(11);
    let html = template(params);
    const elem = document.createElement('div');
    elem.innerHTML = html;
    return elem;
  }
}


/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(4);

class ScoresView extends View {

  constructor() {
    super();
    if(ScoresView._instance) {
      return ScoresView._instance;
    }
    console.log(this);
    ScoresView._instance = this;

    this.ListenLinks();
  }

  ListenLinks() {
    const SelEvent = [];
    const Links = this.dom.gTAG("a");
    console.log(Links);
    for(let I=0; I < Links.length; I++)
    {
      SelEvent.push({'selector': Links[I], 'route' : Links[I].getAttribute("href")});
    }

    this.SetEvent(SelEvent);
  }

  ConstructPage() {
    console.log(this.dom.loadedBlocks['Scores']);
    this.dom.loadedBlocks['Header'].hidden = false;
    this.dom.loadedBlocks['Scores'].hidden = false;
  }

  DestroyPage() {
    this.dom.loadedBlocks['Header'].hidden = 'true';
    this.dom.loadedBlocks['Scores'].hidden = 'true';
  }

}

module.exports = ScoresView;


/***/ })
/******/ ]);