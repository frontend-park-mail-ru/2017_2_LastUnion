/* global require */
/* global module */

'use strict';
/** Class Dot represents 2d mathematic Dot */
class Dot {
  /**
   * Creates Dot
   *
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @this {Dot}
   */
	constructor(x, y) {
		if(!y || y == 'undefined') {
			this._x = 0;
			this._y = 0;
		} else {
			this._x = x;
			this._y = y;
		}
	}

  /**
   * Updates coordinates
   *
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @this {Dot}
   */
	update(x, y) {
		this._x += x;
		this._y += y;
	}

  /**
   * getter x coordinates
   *
   * @this {Dot}
   */
	get x() {
		return this._x;
	}

  /**
   * setter x coordinate
   *
   * @param {number} __x - x coordinate
   * @this {Dot}
   */
	set x(__x) {
		this._x = __x;
	}

  /**
   * getter y coordinate
   *
   * @this {Dot}
   */
	get y() {
		return this._y;
	}

  /**
   * setter x coordinate
   *
   * @param {number} __y - y coordinate
   * @this {Dot}
   */
	set y(__y) {
		this._y = __y;
	}

  /**
   * set new coordinates
   *
   * @param {number} x - y coordinate
   * @param {number} y - y coordinate
   * @this {Dot}
   */
	newCoords(x, y) {
		this._x = x;
		this._y = y;
	}


  /**
   * returns coordinates
   *
   * @this {Dot}
   */
	get coords() {
		return {
			'x' : this._x,
			'y' : this._y
		};
	}

}

export default Dot;
