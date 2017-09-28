'use strict'

const Router = require('../routes/router');
const DOM = require('./dom');

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
