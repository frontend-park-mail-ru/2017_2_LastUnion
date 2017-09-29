'use strict'

const Router = require('../routes/router');
const DOM = require('./dom');

class View {

  constructor() {
    this.dom = new DOM();
    this.body = this.dom.gTAG('body')[0];
  }

  ListenLinks() {
    const SelEvent = [];
    const Links = this.dom.gTAG("a");
    for(let I=0; I < Links.length; I++)
    {
      SelEvent.push({'selector': Links[I], 'route' : Links[I].getAttribute("href")});
    }

    this.SetEvent(SelEvent);
  }

  SetEvent(links) {
    links.forEach(link => {
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
