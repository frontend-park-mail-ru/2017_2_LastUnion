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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



class Dot {
    
	constructor(x, y) {
		if(!y || y == 'undefined') {
			this._x = 0;
			this._y = 0;
		} else {
			this._x = x;
			this._y = y;
		}
	}

	update(x, y) {
		this._x += x;
		this._y += y;
	}

	get x() {
		return this._x;
	}

	set x(__x) {
		this._x = __x;
	}

	get y() {
		return this._y;
	}

	set y(__y) {
		this._y = __y;
	}

	newCoords(x, y) {
		this._x = x;
		this._y = y;
	}

	get coords() {
		return {
			'x' : this._x,
			'y' : this._y
		};
	}

}

module.exports = Dot;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Router = __webpack_require__(5);
const DOM = __webpack_require__(12);
const User = __webpack_require__(6);

class View {

	constructor() {
		this.dom = new DOM();
		this.user = new User();
		this.router = new Router();
		this.body = document.getElementsByTagName('body')[0];
	}


	listenLinks() {
		const _this = this;
		
		for(let obj in this.dom.loadedBlocks) {
			if(!this.dom.loadedBlocks[obj].listened) {
				const links = this.dom.loadedBlocks[obj].html.getElementsByTagName('a');
				for(let i=0; i < links.length; i++)
				{
					links[i].addEventListener('click', event => {
						event.preventDefault();
						const route = links[i].getAttribute('href');
						_this.router.go(route);
					});
				}
				this.dom.loadedBlocks[obj].listened = true;
			}
		}
	}

	hide(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = true;
		} else {
			console.error('Can\'t hide. No such element: ' + obj);
		}
	}

	show(obj) {
		const elem = this.dom.loadedBlocks[obj];
		if(elem && typeof elem !== 'undefined') {
			elem.html.hidden = false;
		} else {
			console.error('Can\'t show. No such element: ' + obj);
		}
	}

}

module.exports = View;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(16);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	}
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



module.exports = {
	GetRandomNLessThen : function GetRandomNLessThen(Restrict) {
		return Math.floor(Math.random() * Restrict);
	},

	GetRandomNInRange : function GetRandomNInRange(a, b) {
		return Math.floor(Math.random() * (b + 1 - a) + a);
	},
	
	GetDistance : function GetDistance(a, b) {
		let dx = a.x - b.x;
		let dy = a.y - b.y;
		
		return Math.sqrt(dx*dx + dy*dy);
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



class WorldObject {
	constructor (x) {
		this.x = x;
	}
	
	drawAt (x) {}
	
	// returns object containing: is there a collision (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'scoreEffect' : function(scoreController, gameSettings) {},
			'playerEffect' : function(player, gameSettings) {},
		};
		
		return result;
	}
}

module.exports = WorldObject;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const UrlCom = __webpack_require__(10);

class Router {

	constructor() {
		if(Router._instance) {
			return Router._instance;
		}
		Router._instance = this;
		this.urls = [];

		const _this = this;
		window.addEventListener('popstate', function() {
			_this.loadPage(location.pathname);
		}, false);
	}

	addUrl(url, view) {
		const Url = new UrlCom(url, view);
		this.urls.push(Url);
	}

	getUrl() {
		return window.location.pathname;
	}

	go(url) {
		if (window.location.pathname === url) {
			return;
		}
		window.history.pushState({}, '', url);
		this.loadPage(url);
	}

	loadPage(url) {
		if (!url || typeof url === 'undefined' || url == null) {
			url = this.getUrl();
		}

		if(url != '/' && url[url.length - 1] == '/') {
			url = url.substring(0, url.length - 1);
		}

		const Route = this.urls.filter(function(urlObj) {
			// later better use regular expression
			// but here we just compare 2 strings
			// console.log(urlObj.url, url, urlObj.url == url);
			return (urlObj.url == url);
		})[0];

		if(this.CurrentRoute) {
			this.CurrentRoute.destroy();
			console.log('Destroyed page ' + this.CurrentRoute.url);
		}
		this.CurrentRoute = Route;
		console.log('Loaded new page: ' + url);
		Route.load();
	}
}

module.exports = Router;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const API = __webpack_require__(13);

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

	checkResponse(response) {
		if(typeof response.result === 'undefined') {
			throw new Error(response);
		}
		if(response.result !== true) {
			throw new Error(String(response.responseMessage));
		}
		return response.data;
	}

	isAuth() {
		return this._loggedin;
	}

	getScore() {
		const _this = this;
		// Is this correct 
		this.api.sendReq('user/get_score', 'GET').then(function(response) {
			_this._proto.score = _this.checkResponse(response);
		});
		
		if (typeof this._proto.score === 'undefned' || this._proto.score == null)
			return 0;
		return this._proto.score;
	}

	setScore(score) {
		const _this = this;
		return this.api.sendReq('user/set_score/' + score, 'GET').then(function(response) {
			_this._proto.score = score;
			_this.checkResponse(response);
		});
	}

	getScores() {
		let score = 0;
		if(this._loggedin) {
			score = this._proto.score;
		}
		return {
			'Scores' : [
				{
					'user' : 'Jhon',
					'place' : '1',
					'score' : '999',
				},
				{
					'user' : 'Mike',
					'place' : '2',
					'score' : '888'
				},
				{
					'user' : 'Bredd',
					'place' : '3',
					'score' : '777'
				}
			],
			'User' : {
				'place' : '999',
				'score' : score
			}
		};
	}

	login(login, password) {
		const _this = this;
		return this.api.sendReq('user/signin', 'POST', {
			userName: login,
			userPassword: password
		}).then(function(response) {
			_this.checkResponse(response);
			_this._proto.login = login;
			_this._loggedin = true;
			_this.getScore();
		});
	}

	signup(login, password, email) {
		const _this = this;
		return this.api.sendReq('user/signup', 'POST', {
			userName: login,
			userPassword: password,
			userEmail: email
		}).then(function(response) {
			_this.checkResponse(response);
		});
	}

	logout() {
		const _this = this;
		return this.api.sendReq('user/logout', 'POST').then(function(response) {
			_this.checkResponse(response);
			_this._proto = {};
			_this._loggedin = false;
		});
	}

}

module.exports = User;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(0);

const WIDTH = 100;
const HEIGHT = 100;
const JUMPPOWER = 33;

const RUN = 0;
const ONAIR = 1;
const BEND = 2;
const BENDEDONAIR = 3;

class Player {

	constructor () {
		if(Player._instance) {
			return Player._instance;
		}
		Player._instance = this;
	}

	init() {
		this._state = 0;
		this._action = null;
		this.gameover = false;

		this.time = 0;
		this.skin = 0;
		this.dialogVisible = false;

		this.jumpTime = 0;
		this.verticalAcceleration = 10;
		this.offtop = 0;

		const bm = new Dot(0, 0);
		const br = new Dot(WIDTH / 2, 0); // doesn't work. I hz pochemy
		br.x = WIDTH / 2;
		const tr = new Dot(WIDTH / 2, HEIGHT);
		const tl = new Dot(-WIDTH / 2, HEIGHT);

		this.geometry = {
			'bm' : bm,
			'br' : br,
			'tr' : tr,
			'tl' : tl,
		};

		this.playerSkinRun = [];
		for(let i = 0; i < 4; i++) {
			let playerImg = new Image();
			playerImg.src = '/img/player0' + i + '.png';
			this.playerSkinRun.push(playerImg);
		}
		
		this.dlgImg = new Image();   
		this.dlgImg.src = '/img/fck.png';

	}

	draw(gameSettings) {
		const centerX = gameSettings.width / 2;
		const centerY = gameSettings.height / 2;
		gameSettings.canvas.fillStyle = '#000000';

		let sceneCoords = {};
		for(let dot in this.geometry) {
			sceneCoords[dot] = new Dot();
			sceneCoords[dot].x = (gameSettings.defaultW/2 + this.geometry[dot].x) * gameSettings.scale;
			sceneCoords[dot].y = (gameSettings.defaultW/4 - this.geometry[dot].y) * gameSettings.scale;
		}

        
		gameSettings.canvas.drawImage(
			this.playerSkinRun[this.skin],
			sceneCoords['tl'].x, 
			sceneCoords['tl'].y,
			WIDTH * gameSettings.scale, 
			(this.topRightCoords.y - this.bottomRightCoords.y) * gameSettings.scale
		);
        

		if(this.dialogVisible && sceneCoords['tl'].x < 200) {
			gameSettings.canvas.drawImage(
				this.dlgImg,
				sceneCoords['tr'].x + WIDTH, 
				sceneCoords['tr'].y - HEIGHT,
				100 * gameSettings.scale, 
				100 * gameSettings.scale
			);
		}

		if(sceneCoords['tl'].x <= 0) {
			this.gameover = true;
		}	

		// show control points
		/*gameSettings.canvas.fillStyle = "#FFFF00";
		for(let dot in this.geometry) {
			if (dot == 'br') gameSettings.canvas.fillStyle = "#00FF00";
			if (dot == 'tr') gameSettings.canvas.fillStyle = "#0000FF";
			if (dot == 'tl') gameSettings.canvas.fillStyle = "#FF00FF";
           gameSettings.canvas.fillRect((this.geometry[dot].x+960-7)*gameSettings.scale, (480-this.geometry[dot].y-7)*gameSettings.scale, 14, 14);
        }*/
	}

	trigger() {
		this.bendedTired();
		this.tick();
		if(!this._action || this._action === null) {
			return this.gameover;
		}
		this._action();
		return this.gameover;
	}

	changePosition(x,y) {
		for(let d in this.geometry) {
			this.geometry[d].update(x, y);
		}
	}

	bendedTired() {
		if(this.bended) {
			this.offtop -= 3;
			this.changePosition(-3, 0);
		} else {
			if(this.offtop < 0) {
				this.offtop += 6;
				this.changePosition(6, 0);
			}
		}
	}

	tick() {
		this.time++;
		if(this.time % 4 == 0) {
			this.skin == 3 ? this.skin = 0 : this.skin++;
		}
		if(this.time % 40 == 0) {
			this.dialog();
		}
	}
	
	dialog() {
		this.dialogVisible == false ? this.dialogVisible = true : this.dialogVisible = false;
	}

	jump() {
		if(this._action === null) {
			this.action = this.jumpAction;
		}
		this.jumpStop = false;
	}

	jumpFinish() {
		this.jumpStop = true;
	}

	jumpAction() {
		if(this.jumpTime == 0) {
			this.bended ? this.state = BENDEDONAIR : this.state = ONAIR; 
			this.jumpLambda = 0;
		}

		this.jumpLambda = JUMPPOWER * this.jumpTime - (this.verticalAcceleration * Math.pow(this.jumpTime, 2) / 2) - this.jumpLambda;
		this.jumpTime += 0.8;

		if(this.bottomCenterCoords.y + this.jumpLambda < 0) {
			this.changePosition(0, -this.bottomCenterCoords.y);
			this.jumpTime = 0;
			if(this.jumpStop) {
				this.action = null;
			}
			if(this.state == ONAIR) {
				this.run();
			}
			return;
		}
		this.changePosition(0, this.jumpLambda);
	}

	duck() {
		if(!this.bended) {
			this.state == ONAIR ? this.state = BENDEDONAIR : this.state = BEND;
			this.topRightCoords.update(0, -HEIGHT / 2);
			this.topLeftCoords.update(0, -HEIGHT / 2);
		}
	}

	run() {
		if(this.bended) {
			this.topRightCoords.update(0, HEIGHT / 2);
			this.topLeftCoords.update(0, HEIGHT / 2);
		}
		this.state = RUN;
	}

	get state() {
		return this._state;
	}

	set state(st) {
		this._state = st;
	}

	set action(f) {
		this._action = f;
	}

	get bottomCenterCoords() {
		return this.geometry.bm;
	}

	get topLeftCoords() {
		return this.geometry.tl;
	}

	get topRightCoords() {
		return this.geometry.tr;
	}

	get bottomRightCoords() {
		return this.geometry.br;
	}

	get bended() {
		return this.state > 1;
	}

	get height() {
		return Math.abs(this.geometry.tl._y - this.geometry.br._y);
	}

	get width() {
		return Math.abs(this.geometry.tl._x - this.geometry.br._x);
	}

}

module.exports = Player;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



module.exports = {
	rend : function(params) {
		const template = __webpack_require__(33);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		const inputs = elem.getElementsByTagName('input');
		for(let i=0; i < inputs.length; i++)
		{
			let id = inputs[i].getAttribute('id');
			inputs[i].addEventListener('focus', () => {
				document.getElementById(id + '_err').hidden = 'true';
			});
		}
		return elem;
	},

	err : function(form, input, msg) {
		const span = document.getElementById(form + '_' + input + '_err');
		span.innerHTML = msg;
		span.hidden = false;
		document.getElementById(form + '_loader').hidden = 'true';
		document.getElementById(form + '_btn').style.display = 'inline-block';
	},

	ok : function(id) {
		document.getElementById(id + '_err').hidden = 'true';
	},

	revert : function(form) {
		document.getElementById(form + '_loader').hidden = 'true';
		document.getElementById(form + '_btn').style.display = 'inline-block';
	},

	submit : function(form) {
		document.getElementById(form + '_btn').style.display = 'none';
		document.getElementById(form + '_loader').hidden = false;
		document.getElementById(form + '_Global_err').innerHTML = '';
	}

};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */


const Router = __webpack_require__(5);
const R = new Router();

//const MenuView = require('./views/menu');
const GameView = __webpack_require__(11);
const ScoresView = __webpack_require__(26);
const MenuView = __webpack_require__(29);
const SignInView = __webpack_require__(32);
const SignUpView = __webpack_require__(34);
const LogoutView = __webpack_require__(35);

R.addUrl('/', MenuView);
R.addUrl('/play', GameView);
R.addUrl('/scores', ScoresView);
R.addUrl('/menu', MenuView);
R.addUrl('/signin', SignInView);
R.addUrl('/signup', SignUpView);
R.addUrl('/logout', LogoutView);

R.loadPage();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global module */



class UrlCom {

	constructor(url, view) {
		this.url = url;
		this.view = view;
		this.instance = null;
	}

	load() {
		if(!this.instance) {
			this.instance = new this.view();
		}

		this.instance.constructPage();
	}

	destroy() {
		this.instance.destroyPage();
		this.instance = null;
	}

}

module.exports = UrlCom;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(1);
const Game = __webpack_require__(14);
const Header = __webpack_require__(2);

const GameController = __webpack_require__(17);

class GameView extends View {

	constructor() {
		super();
		if(GameView._instance) {
			return GameView._instance;
		}
		GameView._instance = this;
		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		if(this.dom.insertDom(this.body, Game.rend({}), 'Game')) {
			Game.resize();
			this.GameController = new GameController();
			this.GameController.initGame(false);
			this.GameController.play();
		}
		this.listenLinks();
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('Game');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Game');
	}

}

module.exports = GameView;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global module */



class DOM {

	constructor() {
		if(DOM._instance) {
			return DOM._instance;
		}
		DOM._instance = this;

		this.loadedBlocks = {};
	}

	insertDom(parent, elem, id, upd, first) {
		if (!this.loadedBlocks[id] || typeof this.loadedBlocks[id] === 'undefined' || upd == true) {
			if(upd) {
				console.log('Reloading ' + id + ' in DOM');
				this.removeDOM(id);
			}
			elem.hidden = 'true';
			(typeof first === 'undefined' || first == false) ? parent.appendChild(elem) : parent.insertBefore(elem, parent.firstChild);
			this.loadedBlocks[id] = { 'html' : elem, 'listened' : false };
			console.log('Loaded ' + id + ' in DOM');
			return true;
		}
		return false;
	}

	removeDOM(id) {
		if(!this.loadedBlocks[id] || typeof this.loadedBlocks[id] === 'undefined') {
			console.log('Can\'t remove ' + id + ' from DOM. Item not exists.');
			return false;
		}
		this.loadedBlocks[id].html.remove();
		delete this.loadedBlocks[id];
		console.log('Removed ' + id + ' from DOM');
	}

}

module.exports = DOM;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global module */



//const HOST = 'localhost:8080';
//const PROTOCOL = 'http://';
const PROTOCOL = 'https://';
const HOST = 'lastunion.herokuapp.com';


class API {

	constructor() {
		this._protocol = PROTOCOL;
		this._host = HOST;
	}

	sendReq(method, httpMethod, params) {
		const url = this._protocol + this._host + '/api/' + method;
		const httpRequest = {
			method: httpMethod,
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Request-Method': httpMethod
			},
			mode: 'cors',
			credentials: 'include',
			body: null
		};

		if(httpMethod === 'POST' && typeof params !== 'undefined') {
			httpRequest.body = JSON.stringify(params);
		}

		return fetch(url, httpRequest).then(
			function(response) {
				console.log('Success');
				return response.json();
			},
			function(response) {
				console.error('Connection issues: ', response);
				return response;
			});
	}

}

module.exports = API;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(15);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	},

	resizeInit : function() {
		document.getElementById('game').width = document.body.clientWidth - 100;		
		document.getElementById('game').height = document.getElementById('game').width / 16 * 8;
	},

	resize : function() {
		this.resizeInit();
		window.onresize = this.resizeInit;
	}
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<!-- GAME -->\r\n<center>\r\n  <canvas id="game"></canvas>\r\n</center>\r\n<!-- GAME -->\r\n';

}
return __p
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- HEADER -->\r\n<header class="header">\r\n    <nav class="header__nav navbar navbar-default" role="navigation" align="center">\r\n        <div class="container-fluid">\r\n            <div class="navbar-header">\r\n                <a class="header__nav__brand navbar-brand" href="/">\r\n                    <img class="header__nav__brand__img" src="img/logo.png" alt="Logo" />\r\n                    <span>LastUnion GAME</span>\r\n                </a>\r\n                ';
 if (loggedin) { ;
__p += '\r\n                <span class="header__nav__scores nav navbar-nav navbar-text">Your score is: ' +
((__t = ( score )) == null ? '' : __t) +
'</span>\r\n                ';
 } ;
__p += '\r\n                <ul class="nav navbar-nav navbar-right header__nav__menu_user">\r\n                    ';
 if (loggedin) { ;
__p += '\r\n                      <li><a class="header__nav__menu_user__a" href="/logout">Log out</a></li>\r\n                    ';
 } else { ;
__p += '\r\n                      <li><a class="header__nav__menu_user__a" href="/signin">Sign IN</a></li>\r\n                      <p class="header__nav__menu_user__p nav navbar-nav navbar-text">or</p>\r\n                      <li><a class="header__nav__menu_user__a" href="/signup">Sign UP</a></li>\r\n                    ';
 } ;
__p += '\r\n                </ul>\r\n            </div>  \r\n         </div>\r\n    </nav>\r\n</header>\r\n<!-- HEADER -->\r\n';

}
return __p
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const FRAMETIME = 35;
const DEFAULT_W = 1920;

const User = __webpack_require__(6);

const Dot = __webpack_require__(0);
const Player = __webpack_require__(7);
const InputController = __webpack_require__(18);
const WorldObjectsController = __webpack_require__(19);
const ScoreController = __webpack_require__(25);

class GameController {

	constructor () {
		if(GameController._instance) {
			return GameController._instance;
		}
		GameController._instance = this;
		
		this.frameTime = FRAMETIME;

		this.gameCanvas = document.getElementById('game');
		this.gameCtx = this.gameCanvas.getContext('2d');
		this.gameSettings = {
			'canvas' : this.gameCtx,
			'height' : this.gameCanvas.height,
			'width' : this.gameCanvas.width,
			'scale' : this.gameCanvas.width / DEFAULT_W,
			'defaultW' : DEFAULT_W,
			'horSpeed' : 25,
		};

		this.UserController = new User();
		
		this.PlayerController = new Player();	
		this.InputController = new InputController(this);
		this.WorldObjectsController = new WorldObjectsController();
		this.ScoreController = new ScoreController();
		
	}

	initGame(_started) {
		this.started = _started;
		this.game = null;
		this._over = false;
		this._pause = false;
		this.PlayerController.init();
		this.WorldObjectsController.resetObjects();
		this.ScoreController.init();
	}

	runScore() {
		this.ScoreController.tick();
		this.text('Score: ' + this.ScoreController.scoreValue, 60, 30 * this.gameSettings.scale, '#000000');
	}

	runPlayer() {
		this._over = this._over || this.PlayerController.trigger();
		this.PlayerController.draw(this.gameSettings);
	}

	runObjects() {
		let topLeftCoords = this.PlayerController.topLeftCoords;
		let playerUpperLeft = new Dot(topLeftCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.topLeftCoords.y);
		
		let bottomRightCoords = this.PlayerController.bottomRightCoords;
		let playerBottomRight = new Dot(bottomRightCoords.x + DEFAULT_W/2, DEFAULT_W/16*8/2 - this.PlayerController.bottomRightCoords.y);
		
		
		if (this.WorldObjectsController.getObjectsAmount() <= 0) {
			this.WorldObjectsController.addSeriesOfObjects(DEFAULT_W, 300, 150);
		}
		
		this.WorldObjectsController.moveAllObjects(this.gameSettings.horSpeed);
		this.WorldObjectsController.redrawAllObjects(this.gameSettings);
		
		let check = this.WorldObjectsController.CheckAllCollisions(playerUpperLeft, playerBottomRight);
		if (check && check.isCollided && check.isFatal) {
			check.playerEffect(this.PlayerController, this.gameSettings);
			check.scoreEffect(this.ScoreController, this.gameSettings);
			this._over = true;
		}
		else if (check && check.isCollided && !check.isFatal) {
			check.scoreEffect(this.ScoreController, this.gameSettings);
			check.playerEffect(this.PlayerController, this.gameSettings);
		}	
				
	}

	reset(_started) {
		this.initGame(_started);
		this.play();
	}

	drawSurface() {
		// Reset canvas
		this.gameCtx.fillStyle = '#FFFFFF';
		this.gameCtx.strokeStyle = '#000000';
		this.gameCtx.clearRect(0, 0, this.gameSettings.width, this.gameSettings.height);

		// Draw background
		this.gameCtx.fillStyle = '#000000';
		this.gameCtx.fillRect(0, this.gameSettings.height / 2, this.gameSettings.width, this.gameSettings.height / 2);
	}

	play() {
		const _this = this;
		if(this.started) {

			this.game = setInterval(function () {
				
				// Update canvas width
				_this.gameSettings.height = _this.gameCanvas.height;
				_this.gameSettings.width = _this.gameCanvas.width;
				_this.gameSettings.scale = _this.gameCanvas.width / DEFAULT_W;
	
				_this.drawSurface();
				
				_this.runScore();
				_this.runObjects();
				_this.runPlayer();
	
				if(_this._over) {
					_this.gameover();
					if(_this.UserController.isAuth()) {
						const currentScore = _this.UserController._proto.score;
						const newScore = _this.ScoreController.scoreValue;
						if(newScore > currentScore) {
							_this.UserController.setScore(newScore);
							document.getElementsByClassName('navbar-scores')[0].innerHTML = 'Your score is: '  +  newScore;
						}
					}
				}
				
			}, this.frameTime);
		} else {
			this.startOverlay();
		}
	}

	text(source, y, size, color) {
		this.gameCtx.fillStyle = color;
		this.gameCtx.font = size * this.gameSettings.scale + 'px Arial';
		this.gameCtx.textAlign='center';
		this.gameCtx.fillText(source, this.gameCanvas.width / 2, y * this.gameSettings.scale);
	}

	setOpacity() {
		this.gameCtx.globalAlpha = 0.8;
		this.gameCtx.fillStyle = '#FFFFFF';
		this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.gameCtx.globalAlpha = 1.0;
	}

	pause() {
		if(this._over) {
			return;
		}

		if(!this._pause) {
			this._pause = true;
			clearInterval(this.game);
			this.pauseOverlay();
			return;
		}

		this._pause = false;
		this.play();
	}

	startOverlay() {
		this.setOpacity();
		this.text('LASTUNION presents!', this.gameCanvas.height / 2, 60, '#000000');
		this.text('Press SPACE to start', this.gameCanvas.height / 2 + 30, 30, '#555555');
	}

	pauseOverlay() {
		this.setOpacity();
		this.text('Pause', this.gameCanvas.height / 2, 60, '#000000');
		this.text('Press SPACE to continue', this.gameCanvas.height / 2 + 30, 30, '#555555');
	}

	gameover() {
		clearInterval(this.game);
		this.gameoverOverlay();
	}

	gameoverOverlay() {
		this.setOpacity();

		const imgHeight = 200 * this.gameSettings.scale;
		const imgWidth = imgHeight

		this.text('Game Over!', 250, 60, '#000000');
		this.text('Press SPACE to run again!', 300, 30, '#555555');
		this.text('Your score: ' + this.ScoreController.scoreValue, imgHeight + 360, 60, '#000000');

		const nekro = new Image();
		nekro.src = '/img/nekro.png';
		const _this = this;
		nekro.onload = function() {
			_this.gameCtx.drawImage(nekro, _this.gameCanvas.width / 2 - 100 * _this.gameSettings.scale, 0, imgWidth, imgHeight);
		};
	}
	
}

module.exports = GameController;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Player = __webpack_require__(7);

class InputController {

	constructor (Controller) {
		this.PlayerController = new Player();
		this.Controller = Controller;

		const _this = this;
		document.addEventListener('keydown', function(event) {
			switch(event.keyCode) {
			case 87:
				_this.PlayerController.jump();
				break;
			case 83:
				_this.PlayerController.duck();
				break;
			case 32:
				if(!_this.Controller._over && _this.Controller.started) {
					_this.Controller.pause();
				} else {
					_this.Controller.reset(true);
				}
				break;
			}
		});

		document.addEventListener('keyup', function(event) {
			switch(event.keyCode) {
			case 83:
				_this.PlayerController.run();
				break;
			case 87:
				_this.PlayerController.jumpFinish();
				break;
			}
		});
	}

	
}

module.exports = InputController;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const MathGeom = __webpack_require__(3);

const UpperObstacle = __webpack_require__(20);
const MidObstacle = __webpack_require__(21);
const PitObstacle = __webpack_require__(22);
const MidGem = __webpack_require__(23);
const UpperGem = __webpack_require__(24);

const typesAmount = 5;
const Types = {
	UP : 0,
	MID : 1,
	PIT : 2,
	MIDGEM : 3,
	UPGEM: 4,
};

	
class WorldObjectsController {

	constructor() {		
		this.objectsArray = []; 
	}
    
	resetObjects () { 
		this.objectsArray = []; 
	}
	
	getObjectsAmount() {
		return this.objectsArray.length;
	}
		
	CheckAllCollisions(playerUpperLeft, playerBottomRight) {
		let res = null;
		let foundRes = null;
		let found = false;
		
		this.objectsArray.forEach(function(worldObject, index, array) {
			res = worldObject.CheckCollision(playerUpperLeft, playerBottomRight);
			if (!found && res.isCollided) {
				found = true;
				foundRes = res;
			}
		});

		return foundRes;
	}
	
	redrawAllObjects(gameSettings) {  //drawing info contents canvas context, scale, etc..
		this.objectsArray.forEach(function(worldObject, index, array) {
			worldObject.draw(gameSettings);
		});									
	}

	moveAllObjects(horSpeed) {
		this.objectsArray.forEach(function(worldObject, index, array) {
			worldObject.x = worldObject.x - horSpeed;
		});
		
		// deliting left object that's away from screen
		if (this.objectsArray[0].x < -this.objectsArray[0].GetWidth()) {
			this.objectsArray.shift();
		}
	}
	
	CreateObjectByType(type, x) {
		switch (type) {
		case Types.UP : return new UpperObstacle(x);
		case Types.MID : return new MidObstacle(x);
		case Types.PIT : return new PitObstacle(x);
		case Types.MIDGEM : return new MidGem(x);
		case Types.UPGEM : return new UpperGem(x);
		}
	}
	
	addSeriesOfObjects(screenWidth, minRange, delta) {
		
		const baseX = Math.floor(screenWidth * 1.5);
		let curX = baseX;
		
		let obstaclesInSeries = MathGeom.GetRandomNInRange(9, 18);
		while (obstaclesInSeries >= 0) {
			const curType = MathGeom.GetRandomNLessThen(typesAmount);
			
			this.objectsArray.push(this.CreateObjectByType(curType, curX));
			
			curX = curX + minRange + MathGeom.GetRandomNLessThen(delta);
			obstaclesInSeries = obstaclesInSeries - 1;
		}
	}
}

module.exports = WorldObjectsController;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(0);
const MathGeom = __webpack_require__(3);
const WorldObject = __webpack_require__(4);

const Y = 295;
const WIDTH = 50;
const HEIGHT = 100;

const SQUARECOLOUR = '#201919';

const SPIKES = new Image();
SPIKES.src = '/img/spike.png';         

class UpperObstacle extends WorldObject {
	
	GetWidth () { return WIDTH; } 
	GetHeight () { return HEIGHT; }
	
	draw (gameSettings) {
		// drawing central square
		gameSettings.canvas.fillStyle = SQUARECOLOUR;
		gameSettings.canvas.fillRect(
			this.x*gameSettings.scale, 
			(Y+WIDTH/2)*gameSettings.scale, 
			WIDTH*gameSettings.scale, 
			(HEIGHT-WIDTH)*gameSettings.scale
		);
		
		// upper spikes (upper half of png)
		gameSettings.canvas.drawImage(SPIKES, 0, 0, 300, 150,
			this.x*gameSettings.scale,
			Y*gameSettings.scale,
			WIDTH*gameSettings.scale, WIDTH/2*gameSettings.scale);
							
		// bottom spikes (bottom half of png)
		gameSettings.canvas.drawImage(SPIKES, 0, 150, 300, 150,
			this.x*gameSettings.scale,
			(Y+HEIGHT-WIDTH/2)*gameSettings.scale-1,
			WIDTH*gameSettings.scale, WIDTH/2*gameSettings.scale);
	}
	
	// returns object containing: is there a collision (true/false)
	//							  is collision fatal (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'isFatal' : false,
			'scoreEffect' : function (score, gameSettings) {},
			'playerEffect' : function (player, gameSettings) {},
		};
		
		// check spikes
		let playerMidTop = new Dot(
			(playerUpperLeft.x + playerBottomRight.x)/2,
			playerUpperLeft.y
		);
							
		let spikeCenterBottom = new Dot(
			this.x+WIDTH/2,
			Y + HEIGHT - WIDTH/2
		);
		
		// check bottom circle half
		let dist = MathGeom.GetDistance(playerMidTop, spikeCenterBottom);
		
		if ((playerMidTop.y >= spikeCenterBottom.y) && (dist <  WIDTH/2)) {
			result.isCollided = true;
			result.isFatal = true;
							
			return result;
		}
		
		// check non-Fatal collision
		let playerRightTop = new Dot (playerBottomRight.x, playerUpperLeft.y);
		if (this.x <= playerRightTop.x && playerRightTop.x <= this.x+WIDTH && playerRightTop.y < Y+HEIGHT-WIDTH/2) {
			result.isCollided = true;
			result.isFatal = false;
			
			result.playerEffect = function (player, gameSettings) {
				player.changePosition(-gameSettings.horSpeed,0);
			};
			
			return result;
		}
		
		return result;
	}
}

module.exports = UpperObstacle;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(0);
const MathGeom = __webpack_require__(3);
const WorldObject = __webpack_require__(4);

const Y = 405;
const WIDTH = 50;
const HEIGHT = 100;

const SQUARECOLOUR = '#201919';

const SPIKES = new Image();
SPIKES.src = '/img/spike.png';         

class MidObstacle extends WorldObject {
	
	GetWidth () { return WIDTH; } 
	GetHeight () { return HEIGHT; }
	
	draw (gameSettings) {
		// drawing central square
		gameSettings.canvas.fillStyle = SQUARECOLOUR;
		gameSettings.canvas.fillRect(
			this.x*gameSettings.scale, 
			(Y+WIDTH/2)*gameSettings.scale, 
			WIDTH*gameSettings.scale, 
			(HEIGHT-WIDTH)*gameSettings.scale
		);
		
		// upper spikes (upper half of png)
		gameSettings.canvas.drawImage(SPIKES, 0, 0, 300, 150,
			this.x*gameSettings.scale,
			Y*gameSettings.scale+1,
			WIDTH*gameSettings.scale, WIDTH/2*gameSettings.scale);
	}
	
	// returns object containing: is there a collision (true/false)
	//							  is collision fatal (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'isFatal' : false,
			'scoreEffect' : function (score, gameSettings) {},
			'playerEffect' : function (player, gameSettings) {},
		};
		
		// check spikes
		let playerMidBottom = new Dot(
			(playerUpperLeft.x + playerBottomRight.x)/2,
			playerBottomRight.y
		);
							
		let spikeCenterBottom = new Dot(
			this.x+WIDTH/2,
			Y + WIDTH/2
		);
									
		// check top circle half
		let dist = MathGeom.GetDistance(playerMidBottom, spikeCenterBottom);
		
		if ((dist <  WIDTH/2)) {
			result.isCollided = true;
			result.isFatal = true;
							
			return result;
		}
		
		// check non-Fatal collision
		if (this.x <= playerBottomRight.x && playerBottomRight.x <= this.x+WIDTH && playerBottomRight.y > Y+WIDTH/2) {
			result.isCollided = true;
			result.isFatal = false;
			
			result.playerEffect = function (player, gameSettings) {
				player.changePosition(-gameSettings.horSpeed*1.5,0);
			};
			
			return result;
		}
		
		return result;
	}
}

module.exports = MidObstacle;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(0);
const MathGeom = __webpack_require__(3);
const WorldObject = __webpack_require__(4);

const Y = 480;
const WIDTH = 100;
const HEIGHT = 100;

const SQUARECOLOUR = '#FFFFFF';

const SPIKES = new Image();
SPIKES.src = '/img/spike.png';         

class PitObstacle extends WorldObject {
	
	GetWidth () { return WIDTH; } 
	GetHeight () { return HEIGHT; }
	
	draw (gameSettings) {
		// drawing central square
		gameSettings.canvas.fillStyle = SQUARECOLOUR;
		gameSettings.canvas.fillRect(
			this.x*gameSettings.scale, 
			Y*gameSettings.scale-1, 
			WIDTH*gameSettings.scale, 
			(HEIGHT)*gameSettings.scale
		);
		
		// spikes (upper half of png)
		gameSettings.canvas.drawImage(SPIKES, 0, 0, 300, 150,
			this.x*gameSettings.scale,
			(Y+HEIGHT-WIDTH/2)*gameSettings.scale+1,
			WIDTH*gameSettings.scale, WIDTH/2*gameSettings.scale);
	}
	
	// returns object containing: is there a collision (true/false)
	//							  is collision fatal (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'isFatal' : false,
			'scoreEffect' : function (score, gameSettings) {},
			'playerEffect' : function (player, gameSettings) {},
		};
		
		// check spikes
		let playerMidBottom = new Dot(
			(playerUpperLeft.x + playerBottomRight.x)/2,
			playerBottomRight.y
		);
							
		let spikeCenterBottom = new Dot(
			this.x+WIDTH/2,
			Y + WIDTH/2
		);
							
		if (this.x <= playerMidBottom.x && playerMidBottom.x <= this.x+WIDTH && playerMidBottom.y > Y+5) {
			result.isCollided = true;
			result.isFatal = true;
							
			return result;
		}
		
		// check non-Fatal collision
		if (this.x <= playerMidBottom.x && playerMidBottom.x <= this.x+WIDTH && playerMidBottom.y >= Y-5) {
			result.isCollided = true;
			result.isFatal = false;
			
			result.playerEffect = function (player, gameSettings) {
				player.changePosition(-gameSettings.horSpeed*0.5,-55);
			};
			
			return result;
		}
		
		return result;
	}
}

module.exports = PitObstacle;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(0);
const MathGeom = __webpack_require__(3);
const WorldObject = __webpack_require__(4);

const Y = 420;
const WIDTH = 25;
const HEIGHT = 25;

const GEM = new Image();
GEM.src = '/img/gem.png';         

class MidGem extends WorldObject {
	
	GetWidth () { return WIDTH; } 
	GetHeight () { return HEIGHT; }
	
	draw (gameSettings) {
		
		// spikes (upper half of png)
		gameSettings.canvas.drawImage(GEM,
			(this.x-WIDTH/2)*gameSettings.scale,
			(Y-HEIGHT/2)*gameSettings.scale,
			25,25
		);
	}
	
	// returns object containing: is there a collision (true/false)
	//							  is collision fatal (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'isFatal' : false,
			'scoreEffect' : function (score, gameSettings) {},
			'playerEffect' : function (player, gameSettings) {},
		};
			
		let playerMidBottom = new Dot(
			(playerUpperLeft.x + playerBottomRight.x)/2,
			playerBottomRight.y
		);	
			
		// check non-Fatal collision
		if (playerMidBottom.x-WIDTH <= this.x && this.x <= playerMidBottom.x + WIDTH && 
				playerUpperLeft.y <= Y && Y <= playerBottomRight.y ) {
					
			result.isCollided = true;
			result.isFatal = false;
			
			result.scoreEffect = function (score, gameSettings) {
				score.extra(20);
			};
			
			// gem disappears in left side of screen
			this.x = -25;
			
			return result;
		}
		
		return result;
	}
}

module.exports = MidGem;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(0);
const MathGeom = __webpack_require__(3);
const WorldObject = __webpack_require__(4);

const Y = 320;
const WIDTH = 25;
const HEIGHT = 25;

const GEM = new Image();
GEM.src = '/img/gem.png';         

class UpperGem extends WorldObject {
	
	GetWidth () { return WIDTH; } 
	GetHeight () { return HEIGHT; }
	
	draw (gameSettings) {
		
		// spikes (upper half of png)
		gameSettings.canvas.drawImage(GEM,
			(this.x-WIDTH/2)*gameSettings.scale,
			(Y-HEIGHT/2)*gameSettings.scale,
			25,25
		);
	}
	
	// returns object containing: is there a collision (true/false)
	//							  is collision fatal (true/false)
	//							  score effect of collision - function(scoreController, sceneInfo)
	// 							  player effect of collision - function(player, sceneInfo)
	CheckCollision(playerUpperLeft, playerBottomRight) {
		let result = {
			'isCollided' : false,
			'isFatal' : false,
			'scoreEffect' : function (score, gameSettings) {},
			'playerEffect' : function (player, gameSettings) {},
		};
			
		let playerMidBottom = new Dot(
			(playerUpperLeft.x + playerBottomRight.x)/2,
			playerBottomRight.y
		);	
			
		// check non-Fatal collision
		if (playerMidBottom.x-WIDTH <= this.x && this.x <= playerMidBottom.x + WIDTH && 
				playerUpperLeft.y <= Y && Y <= playerBottomRight.y ) {
					
			result.isCollided = true;
			result.isFatal = false;
			
			result.scoreEffect = function (score, gameSettings) {
				score.extra(40);
			};
			
			// gem disappears in left side of screen
			this.x = -25;
			
			return result;
		}
		
		return result;
	}
}

module.exports = UpperGem;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(0);

const WIDTH = 100;
const HEIGHT = 100;
const JUMPPOWER = 33;

const RUN = 0;
const ONAIR = 1;
const BEND = 2;
const BENDEDONAIR = 3;

class Score {

	constructor () {
		if(Score._instance) {
			return Score._instance;
		}
		Score._instance = this;
	}

	init() {
		this._time = 0;
		this._score = 0;
	}

	extra(bonus) {
		this._score += Number(bonus);
	}

	tick() {
		this._time++;
	}

	get scoreValue() {
		return Math.floor(Number(this._time) * 0.1) + Number(this._score);
	}

}

module.exports = Score;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(1);
const Scores = __webpack_require__(27);
const Header = __webpack_require__(2);

class ScoresView extends View {

	constructor() {
		super();
		if(ScoresView._instance) {
			return ScoresView._instance;
		}
		ScoresView._instance = this;

		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
	}

	initLeaderBoard() {
		const userScores = this.user.getScores();
		this.dom.insertDom(this.body, Scores.rend(userScores), 'Scores');
		this.listenLinks();
	}

	constructPage() {
		this.show('Header');
		if (!this.user.isAuth()) {
			console.error('Access denied.');
			this.router.go('/signin/');
		} else {
			this.initLeaderBoard();
			this.show('Scores');
		}
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Scores');
	}

}

module.exports = ScoresView;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(28);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	}
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- SCORES -->\r\n<div class="container">\r\n    <div class="panel panel-default">\r\n        <div class="panel-heading">Best GAMERS</div>\r\n        <table class="table">\r\n            <thead>\r\n                <tr>\r\n                    <th>#</th>\r\n                    <th>Username</th>\r\n                    <th>Scope</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                ';
 for(var i=0; i<Scores.length; i++) { ;
__p += '\r\n                <tr>\r\n                    <th scope="row">' +
((__t = ( Scores[i].place )) == null ? '' : __t) +
'</th>\r\n                    <th>' +
((__t = ( Scores[i].user )) == null ? '' : __t) +
'</th>\r\n                    <th>' +
((__t = ( Scores[i].score )) == null ? '' : __t) +
'</th>\r\n                </tr>\r\n                ';
 } ;
__p += '\r\n                <tr>\r\n                    <th scope="row">' +
((__t = ( User.place )) == null ? '' : __t) +
'</th>\r\n                    <th>YOU</th>\r\n                    <th>' +
((__t = ( User.score )) == null ? '' : __t) +
'</th>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n<!-- SCORES -->\r\n';

}
return __p
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(1);
const Menu = __webpack_require__(30);
const Header = __webpack_require__(2);

class MenuView extends View {

	constructor() {
		super();
		if(MenuView._instance) {
			return MenuView._instance;
		}
		MenuView._instance = this;

		this.init();
	}

	init() {
		this.dom.insertDom(this.body, Header.rend({
			loggedin : this.user.isAuth(),
			score: this.user.getScore()
		}), 'Header');
		this.dom.insertDom(this.body, Menu.rend({
			'menuitems' : ['Play', 'Scores'],
			'links' : ['/play/', '/scores/'],
		}), 'Menu');
		this.listenLinks();
	}

	constructPage() {
		this.init();
		this.show('Header');
		this.show('Menu');
	}

	destroyPage() {
		this.hide('Header');
		this.hide('Menu');
	}

}

module.exports = MenuView;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(31);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	}
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- MENU -->\r\n<div class="container bnek">\r\n  <div class="menu">\r\n    <ul>\r\n      ';
 for(var i = 0; i<menuitems.length; i++) { ;
__p += '\r\n      <li><a href="' +
((__t = ( links[i] )) == null ? '' : __t) +
'">' +
((__t = ( menuitems[i] )) == null ? '' : __t) +
'</a>\r\n      ';
 } ;
__p += '\r\n    </ul>\r\n  </div>\r\n</div>\r\n<!-- MENU -->\r\n';

}
return __p
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(1);
const Form = __webpack_require__(8);
const Header = __webpack_require__(2);

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
				this.user.login(login.value, passw.value)
					.then(function() {
						Form.revert('LoginForm');
						_this.dom.removeDOM('LoginForm');
						_this.dom.removeDOM('SignUpForm');
						_this.hide('Header');
						_this.dom.insertDom(_this.body, Header.rend({
							loggedin : _this.user.isAuth(),
							score: _this.user.getScore()
						}), 'Header', true, true);
						_this.listenLinks();
						_this.router.go('/menu/');
					})
					.catch(function(e) {
						Form.err('LoginForm', 'Global', e);
					});
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

module.exports = SignInView;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- FORM -->\r\n<div class="wrapper">\r\n  <form class="form">\r\n    <span class="form__title">' +
((__t = ( title )) == null ? '' : __t) +
'</span>\r\n    ';
 for(var i = 0; i<inputs.length; i++) { ;
__p += '\r\n    <div class="form-group">\r\n      ';
 if(labels_enable) { ;
__p += '\r\n      <label class="control-label" for="' +
((__t = ( formname )) == null ? '' : __t) +
'_' +
((__t = (inputs[i].label )) == null ? '' : __t) +
'">\r\n        ' +
((__t = ( inputs[i].label )) == null ? '' : __t) +
'\r\n      </label>\r\n      ';
 } ;
__p += '\r\n      <input type="' +
((__t = ( inputs[i].type )) == null ? '' : __t) +
'" id="' +
((__t = ( formname )) == null ? '' : __t) +
'_' +
((__t = ( inputs[i].label )) == null ? '' : __t) +
'" class="form__input" placeholder="' +
((__t = ( inputs[i].placeholder )) == null ? '' : __t) +
'">\r\n      <span id="' +
((__t = ( formname )) == null ? '' : __t) +
'_' +
((__t = ( inputs[i].label )) == null ? '' : __t) +
'_err" class="message_error"></span>\r\n    </div>\r\n    ';
 } ;
__p += '\r\n    <button id="' +
((__t = ( formname )) == null ? '' : __t) +
'_btn" class="form__btn btn btn-default">' +
((__t = ( button )) == null ? '' : __t) +
'</button>\r\n    <div id="' +
((__t = ( formname )) == null ? '' : __t) +
'_loader" class="form__loader" hidden></div>\r\n    <span id="' +
((__t = ( formname )) == null ? '' : __t) +
'_Global_err" class="message_global message_error"></span>\r\n  </form>\r\n</div>\r\n<!-- FORM -->\r\n';

}
return __p
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(1);
const Form = __webpack_require__(8);
const Header = __webpack_require__(2);

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
				this.user.signup(login.value, passw.value, email.value)
					.then(function() {
						Form.revert('SignUpForm');
						console.log('User ' + login.value + ' registered successfully!');
						_this.user.login(login.value, passw.value)
							.then(function() {
								_this.dom.removeDOM('LoginForm');
								_this.dom.removeDOM('SignUpForm');
								_this.hide('Header');
								_this.dom.insertDom(_this.body, Header.rend({
									loggedin : _this.user.isAuth(),
									score: _this.user.getScore()
								}), 'Header', true, true);
								_this.listenLinks();
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

module.exports = SignUpView;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(1);
const Header = __webpack_require__(2);

class LogoutView extends View {

	constructor() {
		super();
		if(LogoutView._instance) {
			return LogoutView._instance;
		}
		LogoutView._instance = this;
	}

	constructPage() {
		const _this = this;
		this.user.logout()
			.then(function() {
				_this.dom.removeDOM('Scores');
				_this.hide('Header');
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

	destroyPage() {

	}

}

module.exports = LogoutView;


/***/ })
/******/ ]);