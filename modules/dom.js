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
      if(upd) {
        console.log("Reloading " + id + " in DOM");
      }
      elem.hidden = 'true';
      parent.appendChild(elem);
      this.loadedBlocks[id] = { 'html' : elem, 'listened' : false };
      console.log("Loaded " + id + " in DOM");
      return this.loadedBlocks[id];
    }
  }

  removeDOM(id) {
    if(!this.loadedBlocks[id] || typeof this.loadedBlocks[id] === 'undefined') {
      console.log("Can't remove " + id + " from DOM. Item not exists.");
      return false;
    }
    this.loadedBlocks[id].html.remove();
    delete this.loadedBlocks[id];
    console.log("Removed " + id + " from DOM");
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
