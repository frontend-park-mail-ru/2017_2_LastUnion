'use strict'

const View = require('./view');

class MenuView extends View {

  constructor() {
    if(MenuView._instance) {
      return MenuView._instance;
    }
    MenuView._instance = this;
    super();
    this.ListenLinks();
  }

  ListenLinks() {
    var SelEvent = [];
    SelEvent.push({'selector': this.gID("menu-play"), 'route' : "/play"});
    SelEvent.push({'selector': this.gID("menu-signin"), 'route' : "/signin"});
    SelEvent.push({'selector': this.gID("menu-signup"), 'route' : "/signup"});
    SelEvent.push({'selector': this.gID("menu-score"), 'route' : "/score"});
    this.SetEvent(SelEvent);
  }

  ConstructPage() {

  }

  DestroyPage() {
    
  }

}

module.exports = MenuView;
