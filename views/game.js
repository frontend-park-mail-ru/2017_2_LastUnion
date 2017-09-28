'use strict'

const View = require('../modules/view');

class GameView extends View {

  constructor() {
    super();
    if(GameView._instance) {
      return GameView._instance;
    }
    console.log(this);
    GameView._instance = this;

    this.ListenLinks();
  }

  ListenLinks() {
    var SelEvent = [];
    //SelEvent.push({'selector': this.dom.gID("menu-play"), 'route' : "/play"});
    //SelEvent.push({'selector': this.dom.gID("menu-signin"), 'route' : "/signin"});
    //SelEvent.push({'selector': this.dom.gID("menu-signup"), 'route' : "/signup"});
    //SelEvent.push({'selector': this.dom.gID("menu-score"), 'route' : "/score"});
    this.SetEvent(SelEvent);
  }

  ConstructPage() {
    //console.log(this.dom.loadedBlocks['Header']);
    this.dom.loadedBlocks['Header'].hidden = false;
    this.dom.loadedBlocks['Game'].hidden = false;
  }

  DestroyPage() {
    this.dom.loadedBlocks['Header'].hidden = 'true';
    this.dom.loadedBlocks['Game'].hidden = 'true';
  }

}

module.exports = GameView;
