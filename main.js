/* global require */
'use strict';

import Router from './routes/router';
const R = new Router();

import NotFoundView from './views/404';
import GameView from './views/game';
import MultiplayerView from './views/multiplayer';
import ScoresView from './views/scores';
import MenuView from './views/menu';
import AboutView from './views/about';
import RulesView from './views/rules';
import SignInView from './views/signin';
import SignUpView from './views/signup';
import LogoutView from './views/logout';

R.addUrl('/404', NotFoundView); // should be added first (!)
R.addUrl('/', MenuView);
R.addUrl('/play', GameView);
R.addUrl('/multiplayer', MultiplayerView);
R.addUrl('/scores', ScoresView);
R.addUrl('/menu', MenuView);
R.addUrl('/about', AboutView);
R.addUrl('/rules', RulesView);
R.addUrl('/signin', SignInView);
R.addUrl('/signup', SignUpView);
R.addUrl('/logout', LogoutView);

R.loadPage();
