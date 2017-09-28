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

const MenuView = __webpack_require__(3);
// class MenuView {}
// class SigninView {}
// class SignupView {}
// class AboutView {}
// class PlayView {}
// class ScoresView {}
console.log("!");
let test_render = __webpack_require__(5);
console.log(test_render);
let result = test_render.rend();
console.log(result);

R.addUrl('/', MenuView);
// R.addUrl('/signin', SigninView);
// R.addUrl('/signup', SignupView);
// R.addUrl('/about', AboutView);
// R.addUrl('/play', PlayView);
// R.addUrl('/scores', ScoresView);

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
  }

}

module.exports = UrlCom;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(4);

class MenuView extends View {

  constructor() {
    if(MenuView._instance) {
      return MenuView._instance;
    }
    MenuView._instance = this;
    super();
    this.ListenLinks();
  }

  ListenLinks() {
    var SelEvent = [];
    SelEvent.push({'selector': this.gID("menu-play"), 'route' : "/play"});
    SelEvent.push({'selector': this.gID("menu-signin"), 'route' : "/signin"});
    SelEvent.push({'selector': this.gID("menu-signup"), 'route' : "/signup"});
    SelEvent.push({'selector': this.gID("menu-score"), 'route' : "/score"});
    this.SetEvent(SelEvent);
  }

  ConstructPage() {

  }

  DestroyPage() {

  }

}

module.exports = MenuView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Router = __webpack_require__(0);

class View {

  constructor() {
    this.router = new Router();
  }

  SetEvent(links) {
    links.forEach(link => {
      link.selector.addEventListener('click', event => {
        event.preventDefault();
        this.router.LoadPage(link.route);
      });
    });
  }

  gID(id) {
    return document.getElementById(id);
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

// module.exports =  render;
//
// function render(app) {
//     console.log('2');
//     //var ejs = app['render'];
//     //var template = ejs.compile('/test',"<%= title %>", {title : 'TEST'});
// //     //console.log(template);
// //   }
// module.exports = {
//   rend : function(){
//     console.log('2');
//     var template = require('ejs!./header.ejs');
//     let data = {
//       loggedin: true
//     };
//     template(data);
//     console.log(template);
//   }
// }
module.exports = {
  rend : function(){
    console.log('2');
    var template = __webpack_require__(6);
    let object = {
      loggedin : false
    }
    let result = template(object);
    console.log(result);
    return result;
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- HEADER -->\n<div class="container">\n    <nav class="navbar navbar-default" role="navigation" align="center">\n        <div class="container-fluid">\n            <div class="navbar-header">\n                <a class="navbar-brand">LastUnion GAME</a>\n            </div>\n            <div class="navbar-default">\n                <ul class="nav navbar-nav">\n                  ';
 if (loggedin) { ;
__p += '\n                    <p class="nav navbar-nav navbar-text">You scope is: 2517</p>\n                  ';
 } ;
__p += '\n\n                    <li><a href="#">Top gamers</a></li>\n\n                </ul>\n                <ul class="nav navbar-nav navbar-right">\n                    ';
 if (loggedin) { ;
__p += '\n                      <li><a href="#">Sign IN</a></li>\n                      <p class="nav navbar-nav navbar-text">or</p>\n                      <li><a href="#">Sign UP</a></li>\n                    ';
 } else { ;
__p += '\n                      <li><a href="#">Log out</a></li>\n                    ';
 } ;
__p += '\n                </ul>\n            </div>\n         </div>\n    </nav>\n</div>\n<!-- HEADER -->\n';

}
return __p
}

/***/ })
/******/ ]);