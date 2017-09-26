const router = require('./routes/router');
const R = new router();

const MenuView = require('./views/menu')
class MenuView {}
class SigninView {}
class SignupView {}
class AboutView {}
class PlayView {}
class ScoresView {}

R.addUrl('/', MenuView);
R.addUrl('/signin', SigninView);
R.addUrl('/signup', SignupView);
R.addUrl('/about', AboutView);
R.addUrl('/play', PlayView);
R.addUrl('/scores', ScoresView);

R.loadPage();
