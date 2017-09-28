const router = require('./routes/router');
const R = new router();

const MenuView = require('./views/menu');
// class MenuView {}
// class SigninView {}
// class SignupView {}
// class AboutView {}
// class PlayView {}
// class ScoresView {}
console.log("!");
let test_render = require('./views/templates/header/header');
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
