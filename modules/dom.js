'use strict'

class DOM {

  constructor() {
    if(DOM._instance) {
      return DOM._instance;
    }
    DOM._instance = this;

    this.loadedBlocks = {};
  }

  insertDom(parent, elem, id) {
    if (!this.loadedBlocks[id] || typeof this.loadedBlocks[id] === 'undefined') {
      elem.hidden = 'true';
      parent.appendChild(elem);
      this.loadedBlocks[id] = elem;
      console.log("Loaded " + id + " in DOM");
    }
  }

  gID(id) {
    return document.getElementById(id);
  }

  gTAG(tag) {
    return document.getElementsByTagName(tag);
  }

}

module.exports = DOM;
