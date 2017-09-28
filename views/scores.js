'use strict'

const View = require('../modules/view');

class ScoresView extends View {

  constructor() {
    super();
    if(ScoresView._instance) {
      return ScoresView._instance;
    }
    console.log(this);
    ScoresView._instance = this;

    this.ListenLinks();
  }

  ListenLinks() {
    const SelEvent = [];
    const Links = this.dom.gTAG("a");
    console.log(Links);
    for(let I=0; I < Links.length; I++)
    {
      SelEvent.push({'selector': Links[I], 'route' : Links[I].getAttribute("href")});
    }

    this.SetEvent(SelEvent);
  }

  ConstructPage() {
    console.log(this.dom.loadedBlocks['Scores']);
    this.dom.loadedBlocks['Header'].hidden = false;
    this.dom.loadedBlocks['Scores'].hidden = false;
  }

  DestroyPage() {
    console.log('destroy');
    this.dom.loadedBlocks['Header'].hidden = 'true';
    this.dom.loadedBlocks['Scores'].hidden = 'true';
  }

}

module.exports = ScoresView;
