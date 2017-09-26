'use strict'

const Router = require('../routes/router');

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
