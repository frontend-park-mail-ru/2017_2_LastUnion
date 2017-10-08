'use strict'

class DOM {

  constructor() {
    if(DOM._instance) {
      return DOM._instance;
    }
    DOM._instance = this;

    this.loadedBlocks = {};
  }

  insertDom(parent, elem, id, upd) {
    if (!this.loadedBlocks[id] ||
      typeof this.loadedBlocks[id] === 'undefined' ||
      upd == true) {
      elem.hidden = 'true';
      parent.appendChild(elem);
      this.loadedBlocks[id] = { 'html' : elem, 'listened' : false };
      console.log("Loaded " + id + " in DOM");
      return this.loadedBlocks[id];
    }
  }

  gID(id) {
    return document.getElementById(id);
  }

  gTAG(parent, tag) {
    if(!parent || typeof parent == 'undefined') {
      parent = document;
    }
    return parent.getElementsByTagName(tag);
  }

}

module.exports = DOM;
