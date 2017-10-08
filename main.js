const router = require('./routes/router');
const R = new router();

//const MenuView = require('./views/menu');
const GameView = require('./views/game');
const ScoresView = require('./views/scores');
const MenuView = require('./views/menu');
const SignInView = require('./views/signin');

R.addUrl('/', MenuView);
R.addUrl('/play', GameView);
R.addUrl('/scores', ScoresView);
R.addUrl('/menu', MenuView);
R.addUrl('/signin', SignInView);

R.loadPage();
