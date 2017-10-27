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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Router = __webpack_require__(2);
const DOM = __webpack_require__(9);
const User = __webpack_require__(10);

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(14);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	}
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const UrlCom = __webpack_require__(7);

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
/* 3 */
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
        }
    }

}

module.exports = Dot;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Dot = __webpack_require__(3);

const WIDTH = 50;
const HEIGHT = 100;
const JUMPPOWER = 35;

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

        this.jumpTime = 0;
        this.verticalAcceleration = 10;  

        const bm = new Dot(0,0);
        const br = new Dot(WIDTH / 2, 0);
        const tr = new Dot(WIDTH / 2, HEIGHT);
        const tl = new Dot(-WIDTH / 2, HEIGHT);

        this.geometry = {
            'bm' : bm,
            'br' : br,
            'tr' : tr,
            'tl' : tl,
        };
    }

    draw(gameSettings) {
        const centerX = gameSettings.width / 2;
        const centerY = gameSettings.height / 2;
        gameSettings.canvas.fillStyle = "#000000";

        let sceneCoords = {};
        for(let dot in this.geometry) {
            sceneCoords[dot] = new Dot();
            sceneCoords[dot].x = centerX - this.geometry[dot].x * gameSettings.scale
            sceneCoords[dot].y = centerY - this.geometry[dot].y * gameSettings.scale
        }

        gameSettings.canvas.fillRect(
            sceneCoords['tr'].x, 
            sceneCoords['tr'].y, 
            (this.topRightCoords.x * 2) * gameSettings.scale, 
            (this.topRightCoords.y - this.bottomRightCoords.y) * gameSettings.scale
        );
    }

    trigger() {
        if(!this._action || this._action === null) {
            return;
        }
        this._action();
    }

    changePosition(x,y) {
        for(let d in this.geometry) {
            this.geometry[d].update(x, y);
        }
    }

    jump() {
        if(this._action === null) {
            this.action = this.jumpAction;
        }
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
            this.action = null;
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
        }
    }

    run() {
        if(this.bended) {
            this.topRightCoords.update(0, HEIGHT / 2);
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

}

module.exports = Player;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



module.exports = {
	rend : function(params) {
		const template = __webpack_require__(25);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */


const Router = __webpack_require__(2);
const R = new Router();

//const MenuView = require('./views/menu');
const GameView = __webpack_require__(8);
const ScoresView = __webpack_require__(18);
const MenuView = __webpack_require__(21);
const SignInView = __webpack_require__(24);
const SignUpView = __webpack_require__(26);
const LogoutView = __webpack_require__(27);

R.addUrl('/', MenuView);
R.addUrl('/play', GameView);
R.addUrl('/scores', ScoresView);
R.addUrl('/menu', MenuView);
R.addUrl('/signin', SignInView);
R.addUrl('/signup', SignUpView);
R.addUrl('/logout', LogoutView);

R.loadPage();


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(0);
const Game = __webpack_require__(12);
const Header = __webpack_require__(1);

const GameController = __webpack_require__(15);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const API = __webpack_require__(11);

class User {

	constructor() {
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
		return 322;
	}

	getScores() {
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
				'score' : '0'
			}
		};
	}

	login(login, password) {
		const _this = this;
		return this.api.call('user/signin', 'POST', {
			userName: login,
			userPassword: password
		}).then(function(response) {
			_this.checkResponse(response);
			_this._proto.login = login;
			_this._loggedin = true;
		});
	}

	signup(login, password, email) {
		const _this = this;
		return this.api.call('user/signup', 'POST', {
			userName: login,
			userPassword: password,
			userEmail: email
		}).then(function(response) {
			_this.checkResponse(response);
		});
	}

	logout() {
		const _this = this;
		return this.api.call('user/logout', 'POST').then(function(response) {
			_this.checkResponse(response);
			_this._proto = {};
			_this._loggedin = false;
		});
	}

}

module.exports = User;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global module */



const HOST = 'lastunion.herokuapp.com';

class API {

	constructor() {
		this._host = HOST;
	}

	sendReq(method, httpMethod, params) {
		const url = 'https://' + this._host + '/api/' + method;
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(13);
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- HEADER -->\r\n<header>\r\n    <nav class="navbar navbar-default" role="navigation" align="center">\r\n        <div class="container-fluid">\r\n            <div class="navbar-header">\r\n                <a class="navbar-brand" href="/">\r\n                    <img src="img/logo.png" alt="Logo" />\r\n                    <span>LastUnion GAME</span>\r\n                </a>\r\n                ';
 if (loggedin) { ;
__p += '\r\n                <span class="nav navbar-nav navbar-text navbar-scores">Your score is: ' +
((__t = ( score )) == null ? '' : __t) +
'</span>\r\n                ';
 } ;
__p += '\r\n                <ul class="nav navbar-nav navbar-right user-menu">\r\n                    ';
 if (loggedin) { ;
__p += '\r\n                      <li><a href="/logout">Log out</a></li>\r\n                    ';
 } else { ;
__p += '\r\n                      <li><a href="/signin">Sign IN</a></li>\r\n                      <p class="nav navbar-nav navbar-text">or</p>\r\n                      <li><a href="/signup">Sign UP</a></li>\r\n                    ';
 } ;
__p += '\r\n                </ul>\r\n            </div>  \r\n         </div>\r\n    </nav>\r\n</header>\r\n<!-- HEADER -->\r\n';

}
return __p
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const DEFAULT_W = 1920;

const Dot = __webpack_require__(3);
const Player = __webpack_require__(4);
const InputController = __webpack_require__(16);
const ObstaclesController = __webpack_require__(17);

class GameController {

	constructor () {
		if(GameController._instance) {
			return GameController._instance;
		}
		GameController._instance = this;
		
		this.horSpeed = 30;
		this.frameTime = 30;

		this.gameCanvas = document.getElementById('game');
		this.gameCtx = this.gameCanvas.getContext('2d');
		
		this.PlayerController = new Player();	
		this.InputController = new InputController(this);
		this.ObstaclesController = new ObstaclesController();
		this.WorldController;

		this.initGame();
		
		this.game = null;
		this._over = false;
		this._pause = false;
		this.play();
	}

	initGame() {
		this.PlayerController.init();
		this.ObstaclesController.resetObstacles();
	}

	runPlayer(gameSettings) {
		this.PlayerController.trigger();
		this.PlayerController.draw(gameSettings);
	}

	runObstacles(gameSettings) {
		const bottomMid = new Dot(gameSettings.width / 2 + this.PlayerController.xPos, 300 - this.PlayerController.yBottomPos);
		const upperMid = new Dot(gameSettings.width / 2 + this.PlayerController.xPos, 300 - this.PlayerController.yHeadPos);
		
		if (this.ObstaclesController.checkFatalCollisions(upperMid, bottomMid)) {
			this._over = true;
		}
		
		if (this.ObstaclesController.obstaclesAmount <= 0) {
			this.ObstaclesController.addSeriesOfObstacles(gameSettings.width, 300, 150);
		}
		
		this.ObstaclesController.redrawAllObstacles(gameSettings);
		this.ObstaclesController.moveAllObstacles(this.horSpeed);
		if(this._over) {
			this.gameover();
		}
	}

	reset() {
		this.initGame();
		this._over = false;
		this._pause = false;
		this.play();
	}

	play() {
		const _this = this;
		this.game = setInterval(function () {
	
			let gameSettings = {
				'canvas' : _this.gameCtx,
				'height' : _this.gameCanvas.height,
				'width' : _this.gameCanvas.width,
				'scale' : _this.gameCanvas.width / DEFAULT_W,
			}

			_this.gameCtx.fillStyle = "#FFFFFF";
			_this.gameCtx.strokeStyle = "#000000";
			_this.gameCtx.clearRect(0, 0, _this.gameCanvas.width, _this.gameCanvas.height);

			_this.runPlayer(gameSettings);
			_this.runObstacles(gameSettings);
		}, this.frameTime);
	}

	text(source, y, size, color) {
		this.gameCtx.fillStyle = color;
		this.gameCtx.font = size + "px Arial";
		this.gameCtx.textAlign="center";
		this.gameCtx.fillText(source, this.gameCanvas.width / 2, y - size);
	}

	setOpacity() {
		this.gameCtx.globalAlpha = 0.8;
		this.gameCtx.fillStyle = "#FFFFFF";
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

	pauseOverlay() {
		this.setOpacity();
		this.text("Pause", this.gameCanvas.height / 2, 60, "#000000");
		this.text("Press SPACE to continue", this.gameCanvas.height / 2 + 30, 30, "#555555");
	}

	gameover() {
		clearInterval(this.game);
		this.gameoverOverlay();
	}

	gameoverOverlay() {
		this.setOpacity();
		this.text("Game Over!", this.gameCanvas.height / 2, 60, "#000000");
		this.text("Press SPACE to run again!", this.gameCanvas.height / 2 + 30, 30, "#555555");

		const nekro = new Image();
		nekro.src = '/img/nekro.png';
		const _this = this;
		nekro.onload = function() {
			_this.gameCtx.drawImage(nekro, _this.gameCanvas.width / 2 - 100, 100, 200, 200);
		}
	}
	
}

module.exports = GameController;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Player = __webpack_require__(4);

class InputController {

	constructor (Controller) {
        this.PlayerController = new Player();
        this.Controller = Controller;

        const _this = this;
        document.addEventListener('keydown', function(event) {
            switch(event.keyCode) {
                case 87:
                    _this.PlayerController.jump();;
                break;
                case 83:
                    _this.PlayerController.duck();
                break;
                case 32:
                    if(!_this.Controller._over) {
                        _this.Controller.pause();
                    } else {
                        _this.Controller.reset();
                    }
                break;
            break;
            }
        });

        document.addEventListener('keyup', function(event) {
            switch(event.keyCode) {
                case 83:
                    _this.PlayerController.run();
                break;
            }
        });
    }

	
}

module.exports = InputController;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const Types = {
	UP : 0,
	GROUND : 1,
}

const typesAmount = 2;
const spikeColor = "#000000";

function GetRandomNLessThen(Restrict) {
	 return Math.floor(Math.random() * Restrict);
}

function GetRandomNInRange(a, b) {
	 return Math.floor(Math.random() * (b + 1 - a) + a);
}

class Obstacle {

	constructor(x, y, type, drawAt, checkFatal, checkCollision) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 100;
		
		this.type = type;
		
		this.drawAt = drawAt;					// drawAt(canvas, ctx, x)
		this.checkFatal = checkFatal;			// checkFatal(upperMidPoint, lowerMidPoint)
		this.checkCollision = checkCollision;	// checkCollision(upperRightPoint,lowerRightPoint)
	}
	
	static drawUpperObstacleAt(drawingInfo, x) {
		drawingInfo.canvas.fillStyle = "#440000";
		drawingInfo.canvas.strokeStyle = "#FF0000";
		drawingInfo.canvas.fillRect(x, 100, 50, 100);
		
		drawingInfo.canvas.beginPath();
		drawingInfo.canvas.moveTo(x,100);
		
		let spikeX = 5;
        const spikeHeight = 10;
        
		while (spikeX < 50) {
			drawingInfo.canvas.lineTo(
                x + spikeX, 
                98 - (spikeHeight + (spikeX / 5) * (spikeX / 5 % 2)) * (spikeX / 5 % 2)
            );
			spikeX = spikeX + 5;
        }
        
		drawingInfo.canvas.lineTo(x + 50, 100);
		drawingInfo.canvas.fillStyle = spikeColor;
		drawingInfo.canvas.fill();
		
		drawingInfo.canvas.beginPath();
		drawingInfo.canvas.moveTo(x,200);
		
		spikeX = 5;
        
		while (spikeX < 50) {
			drawingInfo.canvas.lineTo(
                x + spikeX,
                202 + (spikeHeight + (spikeX / 5) * (spikeX / 5 % 2)) * (spikeX / 5 % 2));
			spikeX = spikeX + 5;
        }
        
		drawingInfo.canvas.lineTo(x + 50, 200);
		drawingInfo.canvas.fillStyle = spikeColor;
		drawingInfo.canvas.fill();
	}
	
	CheckUpperObstacleFatal(upperMidPoint, lowerMidPoint) {
		return (
            this.x < upperMidPoint.x && 
            upperMidPoint.x < this.x + this.width &&
            200 <= upperMidPoint.y && 
            upperMidPoint.y <= 210
        );
	}
	
	CheckGroundObstacleFatal (upperMidPoint, lowerMidPoint) {
		return (
            this.x < upperMidPoint.x && 
            upperMidPoint.x < this.x + this.width &&
            lowerMidPoint.y > 190
        );
	}
	
	static drawGroundObstacleAt (drawingInfo, x) {
		drawingInfo.canvas.fillStyle = "#440000";
		drawingInfo.canvas.strokeStyle = "#FF0000";
		drawingInfo.canvas.fillRect(x, 200, 50, 100);
		
		drawingInfo.canvas.beginPath();
		drawingInfo.canvas.moveTo(x,200);
		
		let spikeX = 5;
		const spikeHeight = 10;
		while (spikeX < 50) {
			drawingInfo.canvas.lineTo(
                x + spikeX,
                198 - (spikeHeight + (spikeX / 5) * (spikeX / 5 % 2)) * (spikeX / 5 % 2));
			spikeX = spikeX + 5;
        }
        
		drawingInfo.canvas.lineTo(x + 50, 200);
		drawingInfo.canvas.fillStyle = spikeColor;
		drawingInfo.canvas.fill();
	}
	
}

class ObstacleCreator {

	static CreateByType(type, x) {
		switch (type) {
			case Types.UP : return ObstacleCreator.CreateUpperObstacle(x);
			case Types.GROUND : return ObstacleCreator.CreateGroundObstacle(x);
		}
	}
	
	static CreateUpperObstacle(x) {
		const Obst = new Obstacle(x, 200, Types.UP, Obstacle.drawUpperObstacleAt);
		Obst.width = 50;
		Obst.height = 100;
		Obst.checkFatal = Obst.CheckUpperObstacleFatal;
		
		return Obst;
	}
	static CreateGroundObstacle(x) {
		const Obst = new Obstacle(x, 0, Types.GROUND, Obstacle.drawGroundObstacleAt);
		Obst.width = 50;
		Obst.height = 100;
		Obst.checkFatal = Obst.CheckGroundObstacleFatal;
		
		return Obst;
	}
}
	
class ObstaclesController {

	constructor() {		
		this.obstaclesArray = []; 
    }
    
    resetObstacles () { 
        this.obstaclesArray = []; 
    }
	
	get obstaclesAmount() {
		return this.obstaclesArray.length;
	}
	
	checkStoppingCollisions(upperRightPoint,lowerRightPoint) {
		
	}
	
	checkFatalCollisions(upperMidPoint, lowerMidPoint) {
		let flag = false;
		this.obstaclesArray.forEach(function(obstacle, index, array) {
            if (obstacle.checkFatal(upperMidPoint, lowerMidPoint)) 
                flag = true;
        });

		return flag;
	}
	
	redrawAllObstacles(drawingInfo) {  //drawing info contents canvas context, scale, etc..
		this.obstaclesArray.forEach(function(obstacle, index, array) {
            obstacle.drawAt(drawingInfo, obstacle.x);
        });									
	}

	moveAllObstacles(horSpeed) {
		this.obstaclesArray.forEach(function(item, index, array) {
            item.x = item.x - horSpeed;
        });
		
		// deliting left object that's away from screen
		if (this.obstaclesArray[0].x < -this.obstaclesArray[0].width) {
			this.obstaclesArray.shift();
		}
	}
	
	addSeriesOfObstacles(screenWidth, minRange, delta) {
		const obstacleCreator = new ObstacleCreator;
		
		const baseX = Math.floor(screenWidth * 1.5);
		let curX = baseX;
		
		let obstaclesInSeries = GetRandomNInRange(3, 6);
		while (obstaclesInSeries >= 0) {
			const curType = GetRandomNLessThen(typesAmount);
			
			this.obstaclesArray.push(ObstacleCreator.CreateByType(curType, curX));
			
			curX = curX + minRange + GetRandomNLessThen(delta);
			obstaclesInSeries = obstaclesInSeries - 1;
		}
	}
}

module.exports = ObstaclesController;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(0);
const Scores = __webpack_require__(19);
const Header = __webpack_require__(1);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(20);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	}
};


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(0);
const Menu = __webpack_require__(22);
const Header = __webpack_require__(1);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* global require */
/* global module */

module.exports = {
	rend : function(params){
		const template = __webpack_require__(23);
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		return elem;
	}
};


/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(0);
const Form = __webpack_require__(5);
const Header = __webpack_require__(1);

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
/* 25 */
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- FORM -->\r\n<div class="container form">\r\n  <form>\r\n    <span class="title">' +
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
'" placeholder="' +
((__t = ( inputs[i].placeholder )) == null ? '' : __t) +
'">\r\n      <span id="' +
((__t = ( formname )) == null ? '' : __t) +
'_' +
((__t = ( inputs[i].label )) == null ? '' : __t) +
'_err" class="error-message"></span>\r\n    </div>\r\n    ';
 } ;
__p += '\r\n    <button id="' +
((__t = ( formname )) == null ? '' : __t) +
'_btn" class="btn btn-default">' +
((__t = ( button )) == null ? '' : __t) +
'</button>\r\n    <div id="' +
((__t = ( formname )) == null ? '' : __t) +
'_loader" class="loader" hidden></div>\r\n    <span id="' +
((__t = ( formname )) == null ? '' : __t) +
'_Global_err" class="global error-message"></span>\r\n  </form>\r\n</div>\r\n<!-- FORM -->\r\n';

}
return __p
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(0);
const Form = __webpack_require__(5);
const Header = __webpack_require__(1);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */
/* global module */



const View = __webpack_require__(0);
const Header = __webpack_require__(1);

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