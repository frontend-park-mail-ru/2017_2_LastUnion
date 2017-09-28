'use strict'

const Router = require('../routes/router');
const DOM = require('./dom');

class View {

  constructor() {
    this.dom = new DOM();
  }



  SetEvent(links) {
    links.forEach(link => {
      console.log(link.selector);
      link.selector.addEventListener('click', event => {
        event.preventDefault();
        const router = new Router();
        window.history.pushState({},'',link.route);
        router.loadPage(link.route);
      });
    });
  }

  ConstructPage() {

  }

  DestroyPage() {

  }

}

module.exports = View;
