/* global module */

'use strict';

/** Class DOM represents api for work with DOM */
class DOM {

  /**
    * Creates DOM instance (singleton)
    *
    * @this {DOM}
  */
	constructor() {
		if(DOM._instance) {
			return DOM._instance;
		}
		DOM._instance = this;

		this.loadedBlocks = {};
	}

  /**
    * Inserts data into page
    *
    * @param {} parent -
    * @param {} elem -
    * @param {} id -
    * @param {} upd -
    * @param {} first
    * @this {DOM}
    * @return {boolean} - result of insertion
  */
	insertDom(parent, elem, id, upd, first) {
		if (!this.loadedBlocks[id] || typeof this.loadedBlocks[id] === 'undefined' || upd == true) {
			if(upd) {
				console.log('Reloading ' + id + ' in DOM');
				this.removeDOM(id);
			}
			elem.hidden = 'true';
			(typeof first === 'undefined' || first == false) ? parent.appendChild(elem) : parent.insertBefore(elem, parent.firstChild);
			this.loadedBlocks[id] = { 'html' : elem, 'listened' : false };
			console.log('Loaded ' + id + ' in DOM');
			return true;
		}
		return false;
	}

  /**
    * Removes data from page
    *
    * @param {} id -
    * @this {DOM}
    * @return {boolean} - result of insertion
  */
	removeDOM(id) {
		if(!this.loadedBlocks[id] || typeof this.loadedBlocks[id] === 'undefined') {
			console.log('Can\'t remove ' + id + ' from DOM. Item not exists.');
			return false;
		}
		this.loadedBlocks[id].html.remove();
		delete this.loadedBlocks[id];
		console.log('Removed ' + id + ' from DOM');
	}

}

export default DOM;
