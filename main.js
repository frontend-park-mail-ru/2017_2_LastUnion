/* global require */
'use strict';

const Router = require('./routes/router');
const R = new Router();

//const MenuView = require('./views/menu');
const GameView = require('./views/game');
const ScoresView = require('./views/scores');
const MenuView = require('./views/menu');
const SignInView = require('./views/signin');
const SignUpView = require('./views/signup');
const LogoutView = require('./views/logout');

R.addUrl('/', MenuView);
R.addUrl('/play', GameView);
R.addUrl('/scores', ScoresView);
R.addUrl('/menu', MenuView);
R.addUrl('/signin', SignInView);
R.addUrl('/signup', SignUpView);
R.addUrl('/logout', LogoutView);

R.loadPage();
